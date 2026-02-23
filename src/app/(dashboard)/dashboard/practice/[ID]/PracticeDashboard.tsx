"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import {
  Send, Sparkles, ArrowLeft, Loader2, RotateCcw,
  CheckCircle2, Mic, MicOff, Volume2, VolumeX, Target,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { getPracticeResponse } from "@/actions/practice";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import type { ChatMessage, PracticeResponse } from "../../../../../../types";

/* ─── Mic waveform ─── */
function MicWaveform() {
  return (
    <div className="flex items-center gap-[2px] h-4">
      {Array.from({ length: 8 }).map((_, i) => (
        <motion.div key={i} className="w-[2px] rounded-full bg-red-400"
          animate={{ height: [2, 6 + (i % 3) * 4, 2], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 0.4 + (i % 3) * 0.1, repeat: Infinity, delay: i * 0.06, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

/* ─── TTS waveform ─── */
function SpeakingWaveform() {
  return (
    <div className="flex items-center gap-[3px] h-5">
      {Array.from({ length: 12 }).map((_, i) => (
        <motion.div key={i} className="w-[2.5px] rounded-full bg-indigo-400"
          animate={{ height: [3, 8 + (i % 4) * 5, 3], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 0.5 + (i % 4) * 0.1, repeat: Infinity, delay: i * 0.05, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

/* ─── Attempt dots ─── */
function AttemptDots({ count, max = 6 }: { count: number; max?: number }) {
  return (
    <div className="flex items-center gap-1.5">
      {Array.from({ length: max }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ scale: 0 }}
          animate={{ scale: i < count ? 1 : 0.6 }}
          transition={{ delay: i * 0.05 }}
          className="rounded-full"
          style={{
            width: 8, height: 8,
            background: i < count ? "#6366f1" : "#e2e8f0",
          }}
        />
      ))}
    </div>
  );
}

export function PracticeDashboard({
  scenarioId, scenarioTitle, scenarioContext, lifeStage,
}: {
  scenarioId: string; scenarioTitle: string;
  scenarioContext: string; lifeStage: string;
}) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [hasSucceeded, setHasSucceeded] = useState(false);
  const [lastSuggestion, setLastSuggestion] = useState("");
  const [attemptCount, setAttemptCount] = useState(0);

  /* ── TTS state ── */
  const [isMuted, setIsMuted] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speakingIdx, setSpeakingIdx] = useState<number | null>(null);
  const isMutedRef = useRef(false);
  useEffect(() => { isMutedRef.current = isMuted; }, [isMuted]);

  /* ── Mic state ── */
  const [isRecording, setIsRecording] = useState(false);
  const [micAvailable, setMicAvailable] = useState(true);
  const [micError, setMicError] = useState<string | null>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const interimRef = useRef<string>("");

  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { scrollRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, isTyping]);

  /* ── Load voices ── */
  useEffect(() => {
    if (typeof window === "undefined") return;
    window.speechSynthesis?.getVoices();
    if (window.speechSynthesis)
      window.speechSynthesis.onvoiceschanged = () => window.speechSynthesis.getVoices();
  }, []);

  /* ── Check mic ── */
  useEffect(() => {
    const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SR) setMicAvailable(false);
  }, []);

  useEffect(() => { return () => { recognitionRef.current?.stop(); }; }, []);

  /* ── TTS speak ── */
  const speak = useCallback((text: string, idx: number) => {
    if (isMutedRef.current || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const voices = window.speechSynthesis.getVoices();
    const utt = new SpeechSynthesisUtterance(text);
    utt.rate = 0.82; utt.pitch = 0.95; utt.volume = 1;
    const preferred = voices.find(v =>
      v.name.includes("Samantha") || v.name.includes("Karen") ||
      v.name.includes("Google UK English Female") || v.name.includes("Microsoft Zira")
    );
    if (preferred) utt.voice = preferred;
    utt.onstart = () => { setIsSpeaking(true); setSpeakingIdx(idx); };
    utt.onend = () => { setIsSpeaking(false); setSpeakingIdx(null); };
    utt.onerror = () => { setIsSpeaking(false); setSpeakingIdx(null); };
    window.speechSynthesis.speak(utt);
  }, []);

  const stopSpeaking = useCallback(() => {
    window.speechSynthesis?.cancel();
    setIsSpeaking(false); setSpeakingIdx(null);
  }, []);

  const toggleMute = () => {
    if (!isMuted) stopSpeaking();
    setIsMuted(m => !m);
  };

  /* ── Mic start ── */
  const startRecording = useCallback(() => {
    const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SR) { setMicError("Not supported in this browser."); return; }
    setMicError(null);
    interimRef.current = "";
    const recognition = new SR();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-US";
    recognition.onresult = (event: SpeechRecognitionEvent) => {
      let interim = "", final = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const t = event.results[i][0].transcript;
        if (event.results[i].isFinal) final += t; else interim += t;
      }
      if (final) interimRef.current += final;
      setInput(interimRef.current + interim);
    };
    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      if (event.error === "not-allowed") { setMicError("Microphone access denied."); setMicAvailable(false); }
      else if (event.error !== "aborted") setMicError("Mic error — please try again.");
      setIsRecording(false);
    };
    recognition.onend = () => { setIsRecording(false); setTimeout(() => inputRef.current?.focus(), 100); };
    recognitionRef.current = recognition;
    recognition.start();
    setIsRecording(true);
  }, []);

  const stopRecording = useCallback(() => {
    recognitionRef.current?.stop(); recognitionRef.current = null; setIsRecording(false);
  }, []);

  const toggleMic = useCallback(() => {
    if (isRecording) stopRecording(); else startRecording();
  }, [isRecording, startRecording, stopRecording]);

  /* ── Use script button ── */
  const useScript = (script: string) => {
    setInput(script);
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  /* ── Send ── */
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isTyping || hasSucceeded) return;
    if (isRecording) stopRecording();
    stopSpeaking();

    const userMsg = input.trim();
    setInput(""); interimRef.current = "";
    setAttemptCount(c => c + 1);
    setMessages(prev => [...prev, { role: "user", content: userMsg }]);
    setIsTyping(true);

    try {
      const response: PracticeResponse = await getPracticeResponse({
        userMessage: userMsg, scenarioContext, scenarioId, lifeStage, lastSuggestion,
      });
      if (response.isSuccessful) setHasSucceeded(true);
      setLastSuggestion(response.suggestion || "");
      const aiIdx = messages.length + 1;
      setMessages(prev => [...prev, {
        role: "ai", content: response.reflection, suggestion: response.suggestion || "",
      }]);
      // Auto-speak AI response
      const toSpeak = [response.reflection, response.suggestion].filter(Boolean).join(". ");
      if (!isMutedRef.current && toSpeak)
        setTimeout(() => speak(toSpeak, aiIdx), 300);
    } catch {
      setMessages(prev => [...prev, { role: "ai", content: "Mirror encountered an error. Please try your response again." }]);
    } finally {
      setIsTyping(false);
    }
  };

  const resetPractice = () => {
    setMessages([]); setHasSucceeded(false);
    setInput(""); setLastSuggestion("");
    setAttemptCount(0); interimRef.current = "";
    stopSpeaking();
  };

  return (
    <div className="flex flex-col h-screen" style={{ background: "#F8FAFC" }}>

      {/* ── HEADER ── */}
      <nav className="sticky top-0 z-10 bg-white border-b border-slate-100 px-5 h-16 flex items-center justify-between"
        style={{ boxShadow: "0 1px 12px rgba(0,0,0,0.04)" }}>

        <Link href="/dashboard"
          className="text-slate-400 hover:text-indigo-600 flex items-center gap-2 group transition-colors">
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          <span className="hidden md:block text-[10px] font-black uppercase tracking-widest">Exit</span>
        </Link>

        <div className="absolute left-1/2 -translate-x-1/2 text-center">
          <p className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400">Mission Rehearsal</p>
          <p className="text-sm font-black text-slate-800 truncate max-w-[180px]">{scenarioTitle}</p>
        </div>

        {/* Right: attempt counter + mute */}
        <div className="flex items-center gap-3">
          <div className="hidden md:flex flex-col items-end gap-1">
            <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">Attempts</span>
            <AttemptDots count={attemptCount} />
          </div>
          <button onClick={toggleMute} title={isMuted ? "Unmute" : "Mute AI voice"}
            className="w-8 h-8 rounded-full flex items-center justify-center transition-colors"
            style={{ background: isMuted ? "#f1f5f9" : "#eef2ff", color: isMuted ? "#94a3b8" : "#6366f1" }}>
            {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
          </button>
        </div>
      </nav>

      {/* ── MESSAGES ── */}
      <main className="flex-1 overflow-y-auto no-scrollbar p-4 md:p-8">
        <div className="max-w-3xl mx-auto space-y-6">

          {/* Scenario card */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            className="rounded-[2rem] p-7 text-center"
            style={{ background: "linear-gradient(135deg, #eef2ff 0%, #e0e7ff 100%)", border: "1.5px dashed #c7d2fe" }}>
            <div className="w-10 h-10 rounded-xl bg-white/70 flex items-center justify-center mx-auto mb-3 shadow-sm">
              <Target size={18} className="text-indigo-500" />
            </div>
            <p className="text-[9px] font-black uppercase tracking-widest text-indigo-400 mb-2">The Situation</p>
            <p className="text-indigo-900 font-semibold italic text-[15px] leading-relaxed">"{scenarioContext}"</p>
            {attemptCount > 0 && (
              <div className="mt-4 flex items-center justify-center gap-2">
                <AttemptDots count={attemptCount} />
                <span className="text-[10px] font-bold text-indigo-400">{attemptCount} attempt{attemptCount !== 1 ? "s" : ""}</span>
              </div>
            )}
          </motion.div>

          {/* Messages */}
          <AnimatePresence mode="popLayout">
            {messages.map((msg, idx) => (
              <motion.div key={idx}
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div className="max-w-[85%] md:max-w-[75%] space-y-3">
                  {/* Message bubble */}
                  <div style={{
                    padding: "1.25rem 1.5rem",
                    borderRadius: "1.75rem",
                    borderTopRightRadius: msg.role === "user" ? "0.375rem" : "1.75rem",
                    borderTopLeftRadius: msg.role === "ai" ? "0.375rem" : "1.75rem",
                    background: msg.role === "user" ? "#4f46e5" : "white",
                    color: msg.role === "user" ? "white" : "#334155",
                    border: msg.role === "ai" ? "1px solid #f1f5f9" : "none",
                    boxShadow: msg.role === "user"
                      ? "0 4px 16px rgba(79,70,229,0.2)"
                      : "0 2px 8px rgba(0,0,0,0.05)",
                    fontSize: "0.9375rem",
                    fontWeight: 500,
                    lineHeight: 1.65,
                  }}>
                    {msg.content}
                  </div>

                  {/* TTS replay for AI messages */}
                  {msg.role === "ai" && !isMuted && (
                    <div className="flex items-center gap-3 px-2">
                      {isSpeaking && speakingIdx === idx && <SpeakingWaveform />}
                      <button
                        onClick={() => isSpeaking && speakingIdx === idx
                          ? stopSpeaking()
                          : speak([msg.content, msg.suggestion].filter(Boolean).join(". "), idx)
                        }
                        className="text-[10px] font-black uppercase tracking-widest transition-colors"
                        style={{ color: isSpeaking && speakingIdx === idx ? "#6366f1" : "#a5b4fc" }}
                      >
                        {isSpeaking && speakingIdx === idx ? "■ Stop" : "↺ Replay"}
                      </button>
                    </div>
                  )}

                  {/* Rehearsal Script card */}
                  {msg.role === "ai" && msg.suggestion && (
                    <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                      style={{
                        padding: "1.1rem 1.25rem",
                        borderRadius: "1.5rem",
                        background: "white",
                        border: "1.5px solid #e0e7ff",
                        boxShadow: "0 2px 8px rgba(99,102,241,0.07)",
                      }}
                    >
                      <div className="flex items-start gap-3">
                        <Sparkles className="text-indigo-400 shrink-0 mt-0.5" size={16} />
                        <div className="flex-1 min-w-0">
                          <p className="text-[9px] font-black uppercase tracking-widest text-indigo-400 mb-1.5">
                            Rehearsal Script
                          </p>
                          <p className="text-[13.5px] font-bold text-slate-800 leading-snug mb-3">
                            {msg.suggestion}
                          </p>
                          {/* ✅ Use this script button */}
                          <button
                            onClick={() => useScript(msg.suggestion!)}
                            disabled={hasSucceeded || isTyping}
                            className="text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full transition-all disabled:opacity-40"
                            style={{ background: "#eef2ff", color: "#6366f1", border: "1px solid #c7d2fe" }}
                          >
                            ↳ Use this script
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Typing indicator */}
          {isTyping && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
              <div className="flex items-center gap-2.5 px-5 py-3 rounded-2xl"
                style={{ background: "white", border: "1px solid #f1f5f9", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
                <Loader2 className="w-4 h-4 animate-spin text-indigo-500" />
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Analysing…</span>
              </div>
            </motion.div>
          )}

          {/* ── SUCCESS SCREEN ── */}
          {hasSucceeded && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="rounded-[2rem] p-10 text-center space-y-5"
              style={{ background: "linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%)", border: "1.5px solid #a7f3d0" }}>

              {/* Glow circle */}
              <motion.div
                initial={{ scale: 0.7, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="w-16 h-16 rounded-2xl mx-auto flex items-center justify-center shadow-lg"
                style={{ background: "#10b981", boxShadow: "0 8px 24px rgba(16,185,129,0.3)" }}>
                <CheckCircle2 size={28} className="text-white" />
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}>
                <p className="text-lg font-black text-emerald-800 tracking-tight">Mission Complete</p>
                <p className="text-sm text-emerald-600 font-medium mt-1">
                  You navigated that in {attemptCount} attempt{attemptCount !== 1 ? "s" : ""}. That takes real skill.
                </p>
              </motion.div>

              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
                className="flex flex-col items-center gap-3 pt-2">
                <button onClick={resetPractice}
                  className="flex items-center gap-2 px-6 py-3 rounded-full font-black text-xs uppercase tracking-widest transition-all"
                  style={{ background: "white", color: "#10b981", border: "1.5px solid #a7f3d0", boxShadow: "0 2px 8px rgba(16,185,129,0.1)" }}>
                  <RotateCcw size={13} /> Try another approach
                </button>
                <Link href="/dashboard/practice"
                  className="text-emerald-600 text-xs font-bold hover:underline opacity-70">
                  Return to Practice Hub
                </Link>
              </motion.div>
            </motion.div>
          )}

          <div ref={scrollRef} className="h-24" />
        </div>
      </main>

      {/* ── INPUT FOOTER ── */}
      <footer className={`bg-white border-t border-slate-100 px-5 py-4 transition-all duration-500 ${hasSucceeded ? "opacity-40 grayscale pointer-events-none" : ""}`}
        style={{ boxShadow: "0 -1px 12px rgba(0,0,0,0.04)" }}>

        <div className="max-w-3xl mx-auto flex flex-col gap-2">

          {/* Mic error */}
          <AnimatePresence>
            {micError && (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="text-[11px] text-red-500 font-medium px-2">{micError}</motion.p>
            )}
          </AnimatePresence>

          {/* Recording indicator */}
          <AnimatePresence>
            {isRecording && (
              <motion.div initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                className="flex items-center gap-2 px-2">
                <MicWaveform />
                <span className="text-[11px] font-black uppercase tracking-widest text-red-500">
                  Listening… tap mic to stop
                </span>
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleSendMessage} className="flex items-center gap-3">
            <input ref={inputRef} autoFocus
              disabled={hasSucceeded || isTyping}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  if (!isTyping && !hasSucceeded && input.trim()) handleSendMessage(e as any);
                }
              }}
              placeholder={isRecording ? "Listening…" : hasSucceeded ? "Mission complete." : "Type or speak your response…"}
              className="flex-1 h-14 px-6 font-medium text-slate-700 outline-none transition-all"
              style={{
                borderRadius: "3rem",
                background: "#f8fafc",
                border: "2px solid #e2e8f0",
                fontSize: "0.9375rem",
              }}
              onFocus={e => e.target.style.borderColor = "#6366f1"}
              onBlur={e => e.target.style.borderColor = "#e2e8f0"}
            />

            {/* Mic button */}
            {micAvailable && !hasSucceeded && (
              <button type="button" onClick={toggleMic} disabled={isTyping}
                title={isRecording ? "Stop recording" : "Speak your response"}
                className="w-14 h-14 rounded-full flex items-center justify-center shrink-0 transition-all disabled:opacity-40"
                style={{
                  background: isRecording ? "#ef4444" : "#f1f5f9",
                  color: isRecording ? "white" : "#64748b",
                  boxShadow: isRecording ? "0 0 0 4px rgba(239,68,68,0.15)" : undefined,
                }}>
                <AnimatePresence mode="wait">
                  {isRecording
                    ? <motion.div key="on" animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 1, repeat: Infinity }}><MicOff size={20} /></motion.div>
                    : <motion.div key="off" initial={{ scale: 0.8 }} animate={{ scale: 1 }}><Mic size={20} /></motion.div>
                  }
                </AnimatePresence>
              </button>
            )}

            {/* Send button */}
            <button type="submit"
              disabled={isTyping || hasSucceeded || !input.trim()}
              className="w-14 h-14 rounded-full flex items-center justify-center shrink-0 transition-all disabled:opacity-40 active:scale-95"
              style={{ background: "#4f46e5", boxShadow: "0 4px 16px rgba(79,70,229,0.3)" }}>
              {isTyping
                ? <Loader2 className="animate-spin text-white" size={20} />
                : <Send size={20} className="text-white" />
              }
            </button>
          </form>
        </div>
      </footer>
    </div>
  );
}