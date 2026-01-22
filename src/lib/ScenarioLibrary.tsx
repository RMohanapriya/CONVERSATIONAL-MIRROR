import { 
  MessageCircle, Users, GraduationCap, Beaker, Volume2, 
  BookOpen, Home, Briefcase, Lock, Mic, Coffee, 
  HelpCircle, GlassWater, Monitor, MessageSquare 
} from 'lucide-react';

export const allScenarios = [
  // --- SCHOOL: Focus on Academic Environment & Peer Interaction ---
  { 
    id: "s1", category: "school", title: "The Group Chat", 
    desc: "Digital etiquette and sarcasm.", icon: MessageCircle, 
    color: "text-blue-500", bg: "bg-blue-50", 
    prompt: "Your class group chat is making jokes about a teacher. You want to participate but aren't sure if your joke is too harsh. How do you respond?" 
  },
  { 
    id: "s2", category: "school", title: "Unstructured Time", 
    desc: "Joining a cafeteria table.", icon: Users, 
    color: "text-emerald-500", bg: "bg-emerald-50", 
    prompt: "You see a group of classmates sitting together at lunch. There is one empty chair. How do you ask to join?" 
  },
  { 
    id: "s3", category: "school", title: "Teacher Correction", 
    desc: "Addressing a grading error.", icon: GraduationCap, 
    color: "text-rose-500", bg: "bg-rose-50", 
    prompt: "Your teacher marked an answer wrong that you believe is correct. How do you approach them?" 
  },
  { 
    id: "s4", category: "school", title: "The Lab Partner", 
    desc: "Coordinating tasks fairly.", icon: Beaker, 
    color: "text-amber-500", bg: "bg-amber-50", 
    prompt: "Your lab partner is doing all the work. How do you tell them you'd like to help?" 
  },
  { 
    id: "s5", category: "school", title: "Sensory Overload", 
    desc: "Advocating for quiet space.", icon: Volume2, 
    color: "text-indigo-500", bg: "bg-indigo-50", 
    prompt: "The assembly is too loud. How do you tell your teacher you need to step out to the library?" 
  },

  // --- COLLEGE: Focus on Campus Independence & Professional Boundaries ---
  { 
    id: "c1", category: "college", title: "Office Hours", 
    desc: "Clarifying complex topics.", icon: BookOpen, 
    color: "text-indigo-500", bg: "bg-indigo-50", 
    prompt: "The professor seems busy and is checking their watch. How do you start the conversation politely?" 
  },
  { 
    id: "c2", category: "college", title: "Dorm Conflict", 
    desc: "Setting roommate boundaries.", icon: Home, 
    color: "text-rose-500", bg: "bg-rose-50", 
    prompt: "Your roommate plays loud music late at night. How do you bring this up without an argument?" 
  },
  { 
    id: "c3", category: "college", title: "Career Fair Pitch", 
    desc: "Professional 'Elevator Pitch'.", icon: Briefcase, 
    color: "text-emerald-500", bg: "bg-emerald-50", 
    prompt: "A recruiter asks, 'So, tell me about yourself.' How do you answer concisely?" 
  },
  { 
    id: "c4", category: "college", title: "Study Group Ethics", 
    desc: "Saying 'No' to social pressure.", icon: Lock, 
    color: "text-amber-500", bg: "bg-amber-50", 
    prompt: "A friend asks to see your essay 'for inspiration.' How do you decline without losing the friend?" 
  },
  { 
    id: "c5", category: "college", title: "Club Leadership", 
    desc: "Managing peer meetings.", icon: Mic, 
    color: "text-blue-500", bg: "bg-blue-50", 
    prompt: "Two members are talking over each other. How do you regain control of the meeting politely?" 
  },

  // --- JOB: Focus on Workplace Hierarchy & Career Nuances ---
  { 
    id: "j1", category: "job", title: "The Watercooler Chat", 
    desc: "Identifying social 'Exit Cues'.", icon: Coffee, 
    color: "text-amber-500", bg: "bg-amber-50", 
    prompt: "A colleague is chatting, but you have a meeting in 2 mins. How do you end the chat?" 
  },
  { 
    id: "j2", category: "job", title: "Vague Feedback", 
    desc: "Clarifying boss instructions.", icon: HelpCircle, 
    color: "text-blue-500", bg: "bg-blue-50", 
    prompt: "Your boss says a report was 'disorganized' but doesn't explain why. How do you ask for details?" 
  },
  { 
    id: "j3", category: "job", title: "Social Event", 
    desc: "Declining team outings.", icon: GlassWater, 
    color: "text-rose-500", bg: "bg-rose-50", 
    prompt: "The team is going for drinks but you are exhausted. How do you decline while being a 'team player'?" 
  },
  { 
    id: "j4", category: "job", title: "Accommodations", 
    desc: "Advocating for workspace needs.", icon: Monitor, 
    color: "text-indigo-500", bg: "bg-indigo-50", 
    prompt: "A flickering light is distracting you. How do you ask the manager to fix it or let you move?" 
  },
  { 
    id: "j5", category: "job", title: "Meeting Input", 
    desc: "Knowing when to interject.", icon: MessageSquare, 
    color: "text-emerald-500", bg: "bg-emerald-50", 
    prompt: "A manager says something incorrect about your project. How do you correct them politely?" 
  }
];