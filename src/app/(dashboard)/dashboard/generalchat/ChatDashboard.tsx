"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send,
  Bot,
  User,
  Loader2,
  ArrowLeft,
  MessageCircle,
  Volume2,
  VolumeX,
  PauseCircle,
  PlayCircle,
  Eye,
  EyeOff,
  Mic,
  MicOff,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getAiResponse, resetChatSession, saveModeSelection } from "@/actions/chat";
import { normalizeLifeStageForAI } from "@/lib/utils";
import type { ChatMessage } from "../../../../../types";

/* ── Extended message type ── */
interface ExtendedMessage extends ChatMessage {
  showYesNo?: boolean;
  showPastFuture?: boolean;
  msgId: number;
  inquiry?: string;
  scenarios?: string;
  actions?: string;
  hidden_rules?: string;
  isSessionEnd?: boolean;
}

/* ── Mode-switch keywords — treated as navigation, not content ── */
const MODE_SWITCH_KEYWORDS = ["past", "future"];
const isModeSwitch = (text: string) =>
  MODE_SWITCH_KEYWORDS.includes(text.trim().toLowerCase());

/* ── Waveform component ── */
function Waveform({ speaking }: { speaking: boolean }) {
  return (
    <div className="flex items-center gap-[3px] h-6">
      {Array.from({ length: 14 }).map((_, i) => (
        <motion.div
          key={i}
          className="w-[3px] rounded-full bg-indigo-400"
          animate={
            speaking
              ? {
                  height: [4, 10 + (i % 4) * 6, 4],
                  opacity: [0.5, 1, 0.5],
                }
              : { height: 4, opacity: 0.2 }
          }
          transition={
            speaking
              ? {
                  duration: 0.5 + (i % 4) * 0.1,
                  repeat: Infinity,
                  delay: i * 0.05,
                  ease: "easeInOut",
                }
              : { duration: 0.2 }
          }
        />
      ))}
    </div>
  );
}

/* ── Mic recording waveform (input) ── */
function MicWaveform() {
  return (
    <div className="flex items-center gap-[2px] h-4">
      {Array.from({ length: 8 }).map((_, i) => (
        <motion.div
          key={i}
          className="w-[2px] rounded-full bg-red-400"
          animate={{
            height: [2, 6 + (i % 3) * 4, 2],
            opacity: [0.4, 1, 0.4],
          }}
          transition={{
            duration: 0.4 + (i % 3) * 0.1,
            repeat: Infinity,
            delay: i * 0.06,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

/* ── Main component ── */
const INITIAL_MESSAGE: ExtendedMessage = {
  msgId: 0,
  role: "ai",
  content:
    "Hi. I'm your Mirror.\n\nChoose one option to begin:\n1️⃣ Past — to reflect on something that already happened\n2️⃣ Future — to think through something that is coming up\n\nYou can choose now or take a moment.",
  showYesNo: false,
  showPastFuture: true,
};

export function ChatDashboard({ lifeStage }: { lifeStage: string }) {
  const [messages, setMessages] = useState<ExtendedMessage[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentSpeakingId, setCurrentSpeakingId] = useState<number | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [isLowStim, setIsLowStim] = useState(false);
  const [sessionEnded, setSessionEnded] = useState(false);

  /* ── Mic state ── */
  const [isRecording, setIsRecording] = useState(false);
  const [micAvailable, setMicAvailable] = useState(true);
  const [micError, setMicError] = useState<string | null>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const interimRef = useRef<string>("");

  const scrollRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const msgCounter = useRef(1);

  const isMutedRef = useRef(isMuted);
  useEffect(() => {
    isMutedRef.current = isMuted;
  }, [isMuted]);

  // Always-fresh ref to messages so recognition callbacks can read current state
  const messagesRef = useRef(messages);
  useEffect(() => {
    messagesRef.current = messages;
  }, [messages]);

  /* ── Check mic availability on mount ── */
  useEffect(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setMicAvailable(false);
    }
  }, []);

  /* ── Auto scroll ── */
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  /* ── Textarea resize ── */
  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = Math.min(el.scrollHeight, 96) + "px";
  }, [input]);

  /* ── Load voices on mount ── */
  useEffect(() => {
    if (typeof window === "undefined") return;
    window.speechSynthesis?.getVoices();
    if (window.speechSynthesis)
      window.speechSynthesis.onvoiceschanged = () =>
        window.speechSynthesis.getVoices();
  }, []);

  /* ── ASD-friendly TTS ── */
  const speak = useCallback((text: string, msgId: number) => {
    if (isMutedRef.current || typeof window === "undefined" || !window.speechSynthesis)
      return;

    window.speechSynthesis.cancel();

    const voices = window.speechSynthesis.getVoices();
    if (!voices.length) {
      window.speechSynthesis.onvoiceschanged = () => speak(text, msgId);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.78;
    utterance.pitch = 0.95;
    utterance.volume = 1;

    const preferred = voices.find(
      (v) =>
        v.name.includes("Samantha") ||
        v.name.includes("Karen") ||
        v.name.includes("Google UK English Female") ||
        v.name.includes("Microsoft Zira"),
    );
    if (preferred) utterance.voice = preferred;

    utterance.onstart = () => {
      setIsSpeaking(true);
      setCurrentSpeakingId(msgId);
    };
    utterance.onend = () => {
      setIsSpeaking(false);
      setCurrentSpeakingId(null);
    };
    utterance.onerror = () => {
      setIsSpeaking(false);
      setCurrentSpeakingId(null);
    };

    window.speechSynthesis.speak(utterance);
  }, []);

  const stopSpeaking = useCallback(() => {
    window.speechSynthesis?.cancel();
    setIsSpeaking(false);
    setCurrentSpeakingId(null);
    setIsPaused(false);
  }, []);

  const togglePause = useCallback(() => {
    if (!window.speechSynthesis) return;
    if (window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
      setIsPaused(false);
    } else {
      window.speechSynthesis.pause();
      setIsPaused(true);
    }
  }, []);

  const toggleMute = () => {
    if (!isMuted) stopSpeaking();
    setIsMuted((m) => !m);
  };

  // Ref so recognition callbacks can call sendMessage without stale closure
  const sendMessageRef = useRef<(text: string) => Promise<void>>(async () => {});

  /* ── Normalise spoken text to button commands ── */
  const matchVoiceCommand = (text: string): string | null => {
    const t = text.trim().toLowerCase().replace(/[.,!?]+$/, "");
    // Past / Future
    if (t === "past" || t === "the past") return "past";
    if (t === "future" || t === "the future") return "future";
    // Yes variants
    if (["yes", "yeah", "yep", "yup", "sure", "ok", "okay", "yes please",
         "show me", "continue", "yes show me"].includes(t)) return "yes";
    // No variants
    if (["no", "nope", "not now", "no thanks", "end session", "end",
         "stop", "not right now", "no thank you"].includes(t)) return "no";
    return null;
  };

  /* ── Mic: start / stop recording ── */
  const startRecording = useCallback(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setMicError("Speech recognition not supported in this browser.");
      return;
    }

    setMicError(null);
    interimRef.current = "";

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-US";

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      let interim = "";
      let final = "";

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          final += transcript;
        } else {
          interim += transcript;
        }
      }

      // Append finalized text; show interim as preview
      if (final) {
        interimRef.current += final;
      }

      // Update textarea with finalized + interim preview
      setInput(interimRef.current + interim);
    };

    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      if (event.error === "not-allowed") {
        setMicError("Microphone access denied. Please allow mic permissions.");
        setMicAvailable(false);
      } else if (event.error !== "aborted") {
        setMicError("Mic error. Please try again.");
      }
      setIsRecording(false);
    };

    recognition.onend = () => {
      setIsRecording(false);
      const spoken = interimRef.current.trim();
      // Check if the last message has active buttons and spoken text matches a command
      const lastMsg = messagesRef.current[messagesRef.current.length - 1];
      const hasButtons = lastMsg?.showYesNo || lastMsg?.showPastFuture;
      const command = matchVoiceCommand(spoken);

      if (hasButtons && command) {
        // Clear the textarea and auto-send the command
        setInput("");
        interimRef.current = "";
        setTimeout(() => sendMessageRef.current(command), 150);
      } else {
        // Normal flow — let user review and edit before sending
        setTimeout(() => textareaRef.current?.focus(), 100);
      }
    };

    recognitionRef.current = recognition;
    recognition.start();
    setIsRecording(true);
  }, []);

  const stopRecording = useCallback(() => {
    recognitionRef.current?.stop();
    recognitionRef.current = null;
    setIsRecording(false);
  }, []);

  const toggleMic = useCallback(() => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  }, [isRecording, startRecording, stopRecording]);

  /* ── Stop recording when user navigates away ── */
  useEffect(() => {
    return () => {
      recognitionRef.current?.stop();
    };
  }, []);

  /* ── Reset to greeting only on intentional navigation ── */
  useEffect(() => {
    const isFreshEntry = sessionStorage.getItem("mirror_active") !== "true";
    if (isFreshEntry) {
      resetChatSession({ scenarioId: "general-chat" }).catch(() => {});
      setMessages([INITIAL_MESSAGE]);
      msgCounter.current = 1;
      sessionStorage.setItem("mirror_active", "true");
      const timer = setTimeout(() => speak(INITIAL_MESSAGE.content, 0), 600);
      return () => clearTimeout(timer);
    }
  }, [speak]);

  useEffect(() => {
    return () => { sessionStorage.removeItem("mirror_active"); };
  }, []);

  const isYesNoQuestion = (text: string) => {
    const lower = text.toLowerCase();
    return (
      lower.includes("would you like") ||
      lower.includes("do you want") ||
      lower.includes("shall we") ||
      lower.includes("is there anything") ||
      lower.includes("anything else") ||
      lower.includes("would you want") ||
      lower.includes("is there something") ||
      lower.includes("is there another") ||
      lower.includes("like to reflect") ||
      lower.includes("like to think") ||
      lower.includes("like some ideas") ||
      lower.includes("like help")
    );
  };

  /* ── Detect if the last AI message is a follow-up loop (end-of-session prompt) ── */
  const isFollowUpLoopMsg = (msg: ExtendedMessage) =>
    !!(msg.inquiry && (
      msg.inquiry.toLowerCase().includes("like to reflect") ||
      msg.inquiry.toLowerCase().includes("like to think") ||
      msg.inquiry.toLowerCase().includes("something else") ||
      msg.inquiry.toLowerCase().includes("think through") ||
      msg.inquiry.toLowerCase().includes("anything else")
    ));

  /* ── Core send ── */
  const sendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;

    // Stop mic if recording
    if (isRecording) stopRecording();
    stopSpeaking();

    // Detect session end: user says "no" when last message is a follow-up loop
    const lastAiMsg = [...messagesRef.current].reverse().find((m) => m.role === "ai");
    const isEndingSession =
      text.trim().toLowerCase() === "no" &&
      !!lastAiMsg?.showYesNo &&
      isFollowUpLoopMsg(lastAiMsg);

    setMessages((prev) => prev.map((m) => ({ ...m, showYesNo: false, showPastFuture: false })));

    const userMsgId = msgCounter.current++;
    setMessages((prev) => [
      ...prev,
      { msgId: userMsgId, role: "user", content: text },
    ]);
    setInput("");
    interimRef.current = "";

    if (isModeSwitch(text)) {
      const mode = text.trim().toLowerCase() as "past" | "future";
      const reply =
        mode === "past"
          ? "Okay. Describe the situation you'd like to reflect on."
          : "Okay. Describe the situation you're thinking about.";
      const aiMsgId = msgCounter.current++;
      setMessages((prev) => [
        ...prev,
        { msgId: aiMsgId, role: "ai", content: reply, showYesNo: false },
      ]);
      setTimeout(() => speak(reply, aiMsgId), 300);
      setIsLoading(true);
      await saveModeSelection({ mode, scenarioId: "general-chat" }).catch(() => {});
      setIsLoading(false);
      return;
    }

    setIsLoading(true);

    try {
      const response = await getAiResponse({
        message: text,
        scenarioId: "general-chat",
        lifeStage: normalizeLifeStageForAI(lifeStage),
      });

      const aiMsgId = msgCounter.current++;
      const showButtons = isYesNoQuestion(
        response.inquiry || response.summary || "",
      );

      const isChooseModeSignal = response.summary === "CHOOSE_MODE";

      // Also detect session end from AI response content —
      // the AI sometimes sends its own goodbye instead of triggering showYesNo
      const aiSummary = (response.summary || "").toLowerCase();
      const isAiClosing =
        aiSummary.includes("thank you for sharing") ||
        aiSummary.includes("come back whenever") ||
        aiSummary.includes("take care") ||
        aiSummary.includes("well done today") ||
        aiSummary.includes("that took courage") ||
        aiSummary.includes("you did well") ||
        aiSummary.includes("session is complete") ||
        aiSummary.includes("until next time") ||
        (aiSummary.includes("take") && aiSummary.includes("care"));

      setMessages((prev) => [
        ...prev,
        {
          msgId: aiMsgId,
          role: "ai",
          content: isChooseModeSignal
            ? "Great. What would you like to explore next?"
            : (response.summary || ""),
          suggestion: response.suggestion || "",
          inquiry: response.inquiry || "",
          scenarios: (response as any).scenarios || "",
          actions: (response as any).actions || "",
          hidden_rules: (response as any).hidden_rules || "",
          showYesNo: showButtons && !isChooseModeSignal && !isAiClosing,
          showPastFuture: isChooseModeSignal,
        },
      ]);

      const spokenText = [
        response.summary,
        (response as any).scenarios,
        (response as any).actions,
        (response as any).hidden_rules,
        response.suggestion,
        response.inquiry,
      ].filter(Boolean).join(". ");
      if (!isMutedRef.current && spokenText)
        setTimeout(() => speak(spokenText, aiMsgId), 300);

      // Trigger closure screen — either user explicitly ended OR the AI wrapped up naturally
      if (isEndingSession || isAiClosing) {
        setTimeout(() => setSessionEnded(true), 2200);
      }
    } catch {
      const errId = msgCounter.current++;
      setMessages((prev) => [
        ...prev,
        {
          msgId: errId,
          role: "ai",
          content: "The mirror is momentarily hazy. Please try again.",
          showYesNo: false,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  /* ── Keep sendMessageRef current ── */
  useEffect(() => {
    sendMessageRef.current = sendMessage;
  });

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input.trim());
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (!isLoading && input.trim()) sendMessage(input.trim());
    }
  };

  /* ── Calm mode design tokens (used inline to avoid Tailwind purge issues) ── */
  const calm = {
    // Page
    pageBg:      "#EDE8DF",
    // Navbar
    navBg:       "rgba(237,232,223,0.92)",
    navBorder:   "#D8D0C4",
    navText:     "#7A6F63",
    navHover:    "#4A4035",
    // Avatars
    aiAvatar:    "#6B6560",
    userAvatar:  "#C4BDB5",
    // Bubbles
    aiBubbleBg:     "#F5F1EB",
    aiBubbleBorder: "#DDD7CE",
    aiBubbleText:   "#3D3530",
    userBubbleBg:   "#6B6560",
    userBubbleBorder:"#5A504C",
    userBubbleText: "#F5F1EB",
    // Cards
    cardScenarioBg:  "#EEE9E1",
    cardScenarioBorder:"#D5CDBF",
    cardActionBg:    "#E9E4DB",
    cardActionBorder:"#D0C8BA",
    cardRulesBg:     "#E4DFD5",
    cardRulesBorder: "#CAC2B2",
    cardLabel:       "#8A8077",
    cardText:        "#3D3530",
    // Inquiry bubble
    inquiryBg:     "#F0EBE3",
    inquiryBorder: "#D8D0C4",
    inquiryText:   "#3D3530",
    // Buttons
    btnYesBg:    "#7A6F63",
    btnYesHover: "#6B6157",
    btnNoBg:     "#DDD7CE",
    btnNoText:   "#4A4035",
    // Input
    inputBg:     "#F0EBE3",
    inputBorder: "#C8C0B4",
    inputFocus:  "#8A8077",
    inputText:   "#3D3530",
    // Footer
    footerBg:    "#E8E2D9",
    footerBorder:"#D0C8BA",
    // Misc
    replayText:  "#8A8077",
    loadingText: "#8A8077",
  };

  /* ── Closure screen messages ── */
  const CLOSURE_MESSAGES = [
    "You did something good for yourself today.",
    "Taking time to reflect takes courage.",
    "Understanding yourself a little better — that matters.",
    "You showed up for yourself today.",
    "That kind of thinking takes real effort. Well done.",
  ];
  const closureMessage = CLOSURE_MESSAGES[Math.floor(Math.random() * CLOSURE_MESSAGES.length)];

  /* ── Render ── */
  return (
    <div
      className="flex flex-col h-full transition-colors duration-700"
      style={{ background: isLowStim ? calm.pageBg : "#F8FAFC" }}
    >

      {/* SESSION END CLOSURE OVERLAY */}
      <AnimatePresence>
        {sessionEnded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center"
            style={{
              background: isLowStim
                ? "rgba(237,232,223,0.97)"
                : "rgba(248,250,252,0.97)",
              backdropFilter: "blur(12px)",
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.7, ease: "easeOut" }}
              className="flex flex-col items-center text-center max-w-sm px-8"
              style={{ gap: "2rem" }}
            >
              {/* Soft glow circle */}
              <motion.div
                initial={{ scale: 0.7, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
                style={{
                  width: "5rem",
                  height: "5rem",
                  borderRadius: "50%",
                  background: isLowStim
                    ? "radial-gradient(circle, #C4BDB5 0%, #EDE8DF 70%)"
                    : "radial-gradient(circle, #c7d2fe 0%, #e0e7ff 60%, #f8fafc 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "2rem",
                }}
              >
                ✦
              </motion.div>

              {/* Closure message */}
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55, duration: 0.6 }}
                style={{
                  fontSize: isLowStim ? "1.375rem" : "1.25rem",
                  lineHeight: isLowStim ? "2.0" : "1.75",
                  fontWeight: isLowStim ? 400 : 500,
                  letterSpacing: isLowStim ? "0.01em" : undefined,
                  color: isLowStim ? "#3D3530" : "#1e293b",
                }}
              >
                {closureMessage}
              </motion.p>

              {/* Subtle divider */}
              <motion.div
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                style={{
                  width: "3rem",
                  height: "1px",
                  background: isLowStim ? "#C4BDB5" : "#cbd5e1",
                }}
              />

              {/* Action buttons */}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0, duration: 0.5 }}
                style={{ display: "flex", flexDirection: "column", gap: "0.75rem", width: "100%" }}
              >
                <button
                  onClick={() => {
                    setSessionEnded(false);
                    setMessages([INITIAL_MESSAGE]);
                    msgCounter.current = 1;
                    resetChatSession({ scenarioId: "general-chat" }).catch(() => {});
                    setTimeout(() => speak(INITIAL_MESSAGE.content, 0), 300);
                  }}
                  style={{
                    padding: "0.875rem 1.5rem",
                    borderRadius: "1rem",
                    background: isLowStim ? "#6B6560" : "#4f46e5",
                    color: "white",
                    fontWeight: 600,
                    fontSize: "0.875rem",
                    border: "none",
                    cursor: "pointer",
                    letterSpacing: "0.01em",
                  }}
                >
                  Start a new reflection
                </button>
                <Link
                  href="/dashboard"
                  style={{
                    padding: "0.875rem 1.5rem",
                    borderRadius: "1rem",
                    background: "transparent",
                    color: isLowStim ? "#7A6F63" : "#64748b",
                    fontWeight: 500,
                    fontSize: "0.875rem",
                    border: `1px solid ${isLowStim ? "#C4BDB5" : "#e2e8f0"}`,
                    cursor: "pointer",
                    textDecoration: "none",
                    display: "block",
                    textAlign: "center",
                  }}
                >
                  Back to Hub
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* NAVBAR */}
      <nav
        className="sticky top-0 w-full z-50 px-6 h-16 flex items-center justify-between backdrop-blur-md"
        style={isLowStim
          ? { background: calm.navBg, borderBottom: `1px solid ${calm.navBorder}` }
          : { background: "rgba(255,255,255,0.8)", borderBottom: "1px solid #f1f5f9" }
        }
      >
        <Link
          href="/dashboard"
          className="flex items-center gap-2 font-bold text-[10px] uppercase tracking-widest transition-all group shrink-0"
          style={{ color: isLowStim ? calm.navText : "#94a3b8" }}
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Hub</span>
        </Link>

        <div className="flex items-center gap-2 absolute left-1/2 -translate-x-1/2">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center text-white"
            style={{ background: isLowStim ? calm.aiAvatar : "#4f46e5", boxShadow: isLowStim ? "none" : "0 2px 8px rgba(79,70,229,0.25)" }}
          >
            <MessageCircle className="w-4 h-4" />
          </div>
          <span
            className="font-black uppercase tracking-tighter text-lg"
            style={{ color: isLowStim ? calm.aiBubbleText : "#0f172a" }}
          >
            Social Sandbox
          </span>
        </div>

        <div className="flex items-center gap-4">
          {/* Quiet Mode toggle */}
          <button
            onClick={() => setIsLowStim((v) => !v)}
            title={isLowStim ? "Switch to standard mode" : "Reduce visual noise"}
            className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest transition-colors"
            style={{ color: isLowStim ? calm.navHover : "#94a3b8" }}
          >
            {isLowStim ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            <span className="hidden md:block">{isLowStim ? "Quiet on" : "Quiet mode"}</span>
          </button>

          {/* Mute toggle */}
          <button
            onClick={toggleMute}
            title={isMuted ? "Unmute Mirror" : "Mute Mirror"}
            className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest transition-colors"
            style={{ color: isLowStim ? calm.navText : "#94a3b8" }}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            <span className="hidden md:block">{isMuted ? "Muted" : "Audio on"}</span>
          </button>
        </div>
      </nav>

      {/* MESSAGES */}
      <main
        className="flex-1 overflow-y-auto no-scrollbar"
        style={{ padding: isLowStim ? "2.5rem 1.5rem" : "1.5rem" }}
      >
        <div
          className="mx-auto"
          style={{ maxWidth: "48rem", display: "flex", flexDirection: "column", gap: isLowStim ? "2rem" : "1.5rem" }}
        >
          <AnimatePresence initial={false}>
            {messages.map((msg) => (
              <motion.div
                key={msg.msgId}
                initial={isLowStim ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={isLowStim ? { duration: 0 } : { duration: 0.2 }}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`flex max-w-[85%] ${msg.role === "user" ? "flex-row-reverse" : ""}`}
                  style={{ gap: isLowStim ? "1.25rem" : "1rem" }}
                >
                  {/* Avatar */}
                  <div
                    className="flex items-center justify-center shrink-0 text-white"
                    style={{
                      width: isLowStim ? "2.75rem" : "2.5rem",
                      height: isLowStim ? "2.75rem" : "2.5rem",
                      borderRadius: isLowStim ? "50%" : "1rem",
                      background: msg.role === "user"
                        ? (isLowStim ? calm.userAvatar : "#f8fafc")
                        : (isLowStim ? calm.aiAvatar : "#4f46e5"),
                      color: msg.role === "user"
                        ? (isLowStim ? "#6B6560" : "#94a3b8")
                        : "white",
                      boxShadow: isLowStim ? "none" : "0 1px 4px rgba(0,0,0,0.08)",
                      border: isLowStim ? "none" : "1px solid #e2e8f0",
                    }}
                  >
                    {msg.role === "user"
                      ? <User size={isLowStim ? 18 : 20} />
                      : <Bot size={isLowStim ? 18 : 20} />
                    }
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", minWidth: 0 }}>

                    {/* Main bubble */}
                    {msg.content && (
                      <div
                        className="whitespace-pre-wrap"
                        style={{
                          padding: isLowStim ? "1.25rem 1.75rem" : "1rem 1.5rem",
                          borderTopLeftRadius: msg.role === "ai"
                            ? (isLowStim ? "0.375rem" : "0.5rem")
                            : (isLowStim ? "1.5rem" : "2.2rem"),
                          borderTopRightRadius: msg.role === "user"
                            ? (isLowStim ? "0.375rem" : "0.5rem")
                            : (isLowStim ? "1.5rem" : "2.2rem"),
                          borderBottomLeftRadius: isLowStim ? "1.5rem" : "2.2rem",
                          borderBottomRightRadius: isLowStim ? "1.5rem" : "2.2rem",
                          fontSize: isLowStim ? "1.125rem" : "0.97rem",
                          lineHeight: isLowStim ? "2.1" : "1.65",
                          fontWeight: isLowStim ? 400 : 500,
                          letterSpacing: isLowStim ? "0.01em" : undefined,
                          background: msg.role === "user"
                            ? (isLowStim ? calm.userBubbleBg : "#4f46e5")
                            : (isLowStim ? calm.aiBubbleBg : "white"),
                          color: msg.role === "user"
                            ? (isLowStim ? calm.userBubbleText : "white")
                            : (isLowStim ? calm.aiBubbleText : "#1e293b"),
                          border: isLowStim
                            ? `1px solid ${msg.role === "user" ? calm.userBubbleBorder : calm.aiBubbleBorder}`
                            : "1px solid #f1f5f9",
                          boxShadow: isLowStim ? "none" : "0 1px 4px rgba(0,0,0,0.06)",
                        }}
                      >
                        {msg.content}
                      </div>
                    )}

                    {/* Waveform + Stop + Replay + Pause — AI only */}
                    {msg.role === "ai" && (
                      <div className="flex items-center gap-3 px-2">
                        {!isLowStim && (
                          <Waveform speaking={isSpeaking && currentSpeakingId === msg.msgId} />
                        )}
                        {!isMuted && (
                          <button
                            onClick={() =>
                              isSpeaking && currentSpeakingId === msg.msgId
                                ? stopSpeaking()
                                : speak(
                                    [msg.content, msg.scenarios, msg.actions, msg.hidden_rules, msg.suggestion, msg.inquiry]
                                      .filter(Boolean).join(". "),
                                    msg.msgId,
                                  )
                            }
                            className="text-[10px] font-bold uppercase tracking-widest transition-colors"
                            style={{ color: isLowStim ? calm.replayText : "#a5b4fc" }}
                          >
                            {isSpeaking && currentSpeakingId === msg.msgId ? "■ Stop" : "↺ Replay"}
                          </button>
                        )}
                        {!isMuted && isSpeaking && currentSpeakingId === msg.msgId && (
                          <button
                            onClick={togglePause}
                            title={isPaused ? "Resume" : "Pause"}
                            className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest transition-colors"
                            style={{ color: isLowStim ? calm.replayText : "#94a3b8" }}
                          >
                            {isPaused
                              ? <><PlayCircle className="w-3.5 h-3.5" /><span>Resume</span></>
                              : <><PauseCircle className="w-3.5 h-3.5" /><span>Pause</span></>
                            }
                          </button>
                        )}
                      </div>
                    )}

                    {/* Structured cards */}
                    {msg.role === "ai" && (msg.scenarios || msg.actions || msg.hidden_rules) && (
                      <div style={{ marginTop: "0.25rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                        {msg.scenarios && (
                          <div style={{
                            padding: isLowStim ? "1.1rem 1.4rem" : "1rem",
                            borderRadius: "1rem",
                            background: isLowStim ? calm.cardScenarioBg : "#eff6ff",
                            border: `1px solid ${isLowStim ? calm.cardScenarioBorder : "#bfdbfe"}`,
                            color: isLowStim ? calm.cardText : "#1e3a5f",
                            fontSize: isLowStim ? "1.0625rem" : "0.9rem",
                            lineHeight: isLowStim ? "1.9" : "1.6",
                            boxShadow: "none",
                          }}>
                            <strong style={{ display: "flex", alignItems: "center", gap: "0.375rem", marginBottom: "0.375rem", fontSize: "0.625rem", textTransform: "uppercase", letterSpacing: "0.1em", color: isLowStim ? calm.cardLabel : "#3b82f6" }}>
                              <span>🔭</span> What might happen
                            </strong>
                            {msg.scenarios}
                          </div>
                        )}
                        {msg.actions && (
                          <div style={{
                            padding: isLowStim ? "1.1rem 1.4rem" : "1rem",
                            borderRadius: "1rem",
                            background: isLowStim ? calm.cardActionBg : "#eef2ff",
                            border: `1px solid ${isLowStim ? calm.cardActionBorder : "#c7d2fe"}`,
                            color: isLowStim ? calm.cardText : "#1e1b4b",
                            fontSize: isLowStim ? "1.0625rem" : "0.9rem",
                            lineHeight: isLowStim ? "1.9" : "1.6",
                            boxShadow: "none",
                          }}>
                            <strong style={{ display: "flex", alignItems: "center", gap: "0.375rem", marginBottom: "0.375rem", fontSize: "0.625rem", textTransform: "uppercase", letterSpacing: "0.1em", color: isLowStim ? calm.cardLabel : "#6366f1" }}>
                              <span>💡</span> What you could do
                            </strong>
                            {msg.actions}
                          </div>
                        )}
                        {msg.hidden_rules && (
                          <div style={{
                            padding: isLowStim ? "1.1rem 1.4rem" : "1rem",
                            borderRadius: "1rem",
                            background: isLowStim ? calm.cardRulesBg : "#fffbeb",
                            border: `1px solid ${isLowStim ? calm.cardRulesBorder : "#fde68a"}`,
                            color: isLowStim ? calm.cardText : "#451a03",
                            fontSize: isLowStim ? "1.0625rem" : "0.9rem",
                            lineHeight: isLowStim ? "1.9" : "1.6",
                            boxShadow: "none",
                          }}>
                            <strong style={{ display: "flex", alignItems: "center", gap: "0.375rem", marginBottom: "0.375rem", fontSize: "0.625rem", textTransform: "uppercase", letterSpacing: "0.1em", color: isLowStim ? calm.cardLabel : "#d97706" }}>
                              <span>🔑</span> Unwritten rules
                            </strong>
                            {msg.hidden_rules}
                          </div>
                        )}
                      </div>
                    )}

                    {/* Plain suggestion (past mode) */}
                    {msg.role === "ai" && msg.suggestion && !msg.scenarios && (
                      <div style={{
                        marginTop: "0.25rem",
                        padding: isLowStim ? "1.1rem 1.4rem" : "1rem",
                        borderRadius: "1rem",
                        background: isLowStim ? calm.cardActionBg : "#eef2ff",
                        border: `1px solid ${isLowStim ? calm.cardActionBorder : "#c7d2fe"}`,
                        color: isLowStim ? calm.cardText : "#1e1b4b",
                        fontSize: isLowStim ? "1.0625rem" : "0.875rem",
                        lineHeight: isLowStim ? "1.9" : "1.6",
                        boxShadow: "none",
                      }}>
                        <strong style={{ display: "block", marginBottom: "0.25rem", fontSize: "0.625rem", textTransform: "uppercase", letterSpacing: "0.1em", color: isLowStim ? calm.cardLabel : "#6366f1" }}>
                          Mirror Suggestion
                        </strong>
                        {msg.suggestion}
                      </div>
                    )}

                    {/* Follow-up question bubble */}
                    {msg.role === "ai" && msg.inquiry && (
                      <div style={{
                        padding: isLowStim ? "1.25rem 1.75rem" : "1rem 1.5rem",
                        borderTopLeftRadius: isLowStim ? "0.375rem" : "0.5rem",
                        borderTopRightRadius: isLowStim ? "1.5rem" : "2.2rem",
                        borderBottomLeftRadius: isLowStim ? "1.5rem" : "2.2rem",
                        borderBottomRightRadius: isLowStim ? "1.5rem" : "2.2rem",
                        fontSize: isLowStim ? "1.125rem" : "0.97rem",
                        lineHeight: isLowStim ? "2.1" : "1.65",
                        fontWeight: isLowStim ? 400 : 500,
                        letterSpacing: isLowStim ? "0.01em" : undefined,
                        background: isLowStim ? calm.inquiryBg : "white",
                        color: isLowStim ? calm.inquiryText : "#1e293b",
                        border: `1px solid ${isLowStim ? calm.inquiryBorder : "#f1f5f9"}`,
                        boxShadow: isLowStim ? "none" : "0 1px 4px rgba(0,0,0,0.06)",
                      }}>
                        {msg.inquiry}
                      </div>
                    )}

                    {/* Yes / No buttons */}
                    {msg.role === "ai" && msg.showYesNo && (() => {
                      const isFollowUpLoop = !!(msg.inquiry && (
                        msg.inquiry.toLowerCase().includes("like to reflect") ||
                        msg.inquiry.toLowerCase().includes("like to think") ||
                        msg.inquiry.toLowerCase().includes("something else") ||
                        msg.inquiry.toLowerCase().includes("think through") ||
                        msg.inquiry.toLowerCase().includes("anything else")
                      ));
                      return (
                        <div className="flex gap-3 mt-1">
                          <button
                            onClick={() => sendMessage("yes")}
                            disabled={isLoading}
                            className="flex-1 py-3 px-4 font-bold text-sm disabled:opacity-50 transition-colors"
                            style={{
                              borderRadius: "1rem",
                              background: isLowStim ? calm.btnYesBg : "#4f46e5",
                              color: "white",
                              border: "none",
                              boxShadow: "none",
                            }}
                          >
                            {isFollowUpLoop ? "🔄 Continue" : "✅ Yes, show me"}
                          </button>
                          <button
                            onClick={() => sendMessage("no")}
                            disabled={isLoading}
                            className="flex-1 py-3 px-4 font-bold text-sm disabled:opacity-50 transition-colors"
                            style={{
                              borderRadius: "1rem",
                              background: isLowStim ? calm.btnNoBg : "#f1f5f9",
                              color: isLowStim ? calm.btnNoText : "#475569",
                              border: "none",
                              boxShadow: "none",
                            }}
                          >
                            {isFollowUpLoop ? "✅ End session" : "❌ Not right now"}
                          </button>
                        </div>
                      );
                    })()}

                    {/* Past / Future buttons */}
                    {msg.role === "ai" && msg.showPastFuture && (
                      <div className="flex gap-3 mt-1">
                        <button
                          onClick={() => sendMessage("past")}
                          disabled={isLoading}
                          className="flex-1 py-3 px-4 font-bold text-sm disabled:opacity-50 transition-colors"
                          style={{
                            borderRadius: "1rem",
                            background: isLowStim ? calm.btnYesBg : "#4f46e5",
                            color: "white",
                            border: "none",
                            boxShadow: "none",
                          }}
                        >
                          🕰️ Past
                        </button>
                        <button
                          onClick={() => sendMessage("future")}
                          disabled={isLoading}
                          className="flex-1 py-3 px-4 font-bold text-sm disabled:opacity-50 transition-colors"
                          style={{
                            borderRadius: "1rem",
                            background: isLowStim ? calm.btnNoBg : "#f1f5f9",
                            color: isLowStim ? calm.btnNoText : "#334155",
                            border: "none",
                            boxShadow: "none",
                          }}
                        >
                          🔮 Future
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {isLoading && (
            <div
              className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest"
              style={{ color: isLowStim ? calm.loadingText : "#94a3b8" }}
            >
              <Loader2
                className="w-4 h-4 animate-spin"
                style={{ color: isLowStim ? calm.aiAvatar : "#4f46e5" }}
              />
              Mirror is reflecting…
            </div>
          )}

          <div ref={scrollRef} />
        </div>
      </main>

      {/* INPUT */}
      <footer
        className="sticky bottom-0 w-full py-4 px-4"
        style={isLowStim
          ? { background: calm.footerBg, borderTop: `1px solid ${calm.footerBorder}` }
          : { background: "white", borderTop: "1px solid #f1f5f9" }
        }
      >
        <form
          onSubmit={handleSendMessage}
          className="max-w-4xl mx-auto flex flex-col gap-2"
        >
          {/* Mic error notice */}
          <AnimatePresence>
            {micError && (
              <motion.p
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 4 }}
                className="text-[11px] text-red-500 font-medium px-2"
              >
                {micError}
              </motion.p>
            )}
          </AnimatePresence>

          {/* Recording indicator */}
          <AnimatePresence>
            {isRecording && (
              <motion.div
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-2 px-2"
              >
                <MicWaveform />
                <span
                  className="text-[11px] font-bold uppercase tracking-widest"
                  style={{ color: isLowStim ? "#b45309" : "#ef4444" }}
                >
                  Listening… tap mic to stop
                </span>
              </motion.div>
            )}
          </AnimatePresence>

          <div
            className="flex items-end flex-1 min-h-[3.5rem] px-2 py-2"
            style={{
              borderRadius: "1.75rem",
              background: isLowStim ? calm.inputBg : "#f1f5f9",
              border: `1px solid ${isLowStim ? calm.inputBorder : "#e2e8f0"}`,
              boxShadow: isLowStim ? "none" : undefined,
              outline: "none",
            }}
          >
            <textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={isRecording ? "Listening…" : "Type here or use mic…"}
              rows={1}
              className="flex-1 resize-none bg-transparent border-none focus:outline-none overflow-y-auto"
              style={{
                padding: "0.5rem 1rem",
                fontSize: isLowStim ? "1.0625rem" : "1.0625rem",
                fontWeight: isLowStim ? 400 : 500,
                lineHeight: isLowStim ? "1.8" : "1.6",
                color: isLowStim ? calm.inputText : "#1e293b",
                letterSpacing: isLowStim ? "0.01em" : undefined,
              }}
            />

            {/* Mic button */}
            {micAvailable && (
              <button
                type="button"
                onClick={toggleMic}
                title={isRecording ? "Stop recording" : "Speak instead of type"}
                className="flex items-center justify-center shrink-0 mr-1 transition-all"
                style={{
                  width: "2.5rem",
                  height: "2.5rem",
                  borderRadius: "50%",
                  background: isRecording
                    ? "#ef4444"
                    : (isLowStim ? calm.btnNoBg : "#e2e8f0"),
                  color: isRecording ? "white" : (isLowStim ? calm.navText : "#64748b"),
                  border: "none",
                  boxShadow: isRecording ? "0 0 0 4px rgba(239,68,68,0.15)" : "none",
                }}
              >
                <AnimatePresence mode="wait">
                  {isRecording ? (
                    <motion.div
                      key="recording"
                      animate={{ scale: [1, 1.15, 1] }}
                      transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <MicOff className="w-4 h-4" />
                    </motion.div>
                  ) : (
                    <motion.div key="idle" initial={{ scale: 0.8 }} animate={{ scale: 1 }}>
                      <Mic className="w-4 h-4" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            )}

            {/* Send button */}
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="flex items-center justify-center shrink-0 disabled:opacity-40 transition-colors"
              style={{
                width: "2.5rem",
                height: "2.5rem",
                borderRadius: "50%",
                background: isLowStim ? calm.btnYesBg : "#4f46e5",
                color: "white",
                border: "none",
                boxShadow: isLowStim ? "none" : "0 2px 8px rgba(79,70,229,0.3)",
              }}
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </form>
      </footer>
    </div>
  );
}