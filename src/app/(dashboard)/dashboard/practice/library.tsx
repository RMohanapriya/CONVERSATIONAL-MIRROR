export const PRACTICE_LIBRARY: Record<string, Record<string, { id: string; title: string; context: string; research_goal: string }[]>> = {
  college: {
    Social: [
      { id: "c-s1", title: "Roommate 'Hints'", context: "Your roommate says 'The trash is getting pretty full, isn't it?' while looking at you.", research_goal: "Interpreting indirect requests (hints)." },
      { id: "c-s2", title: "The Study Invite", context: "A classmate says 'We usually go to the cafe after lab if you're not busy.'", research_goal: "Identifying 'open-ended' social invitations." },
      { id: "c-s3", title: "Group Tension", context: "A team member is sighing loudly while you are talking about your part of the project.", research_goal: "Decoding non-verbal frustration cues." },
      { id: "c-s4", title: "The White Lie", context: "A friend asks if you liked their presentation, but you thought it was disorganized.", research_goal: "Navigating social honesty vs. 'White Lies'." },
      { id: "c-s5", title: "Joining a Table", context: "You see classmates laughing at a table with one empty chair; you want to join them.", research_goal: "Breaking into existing social clusters." }
    ],
    // Categories for General and Emotion follow...
  },
  workplace: {
    Social: [
      { id: "w-s1", title: "The Boss's Sarcasm", context: "Your boss says 'Great job on being early' when you arrived 10 minutes late.", research_goal: "Detecting sarcasm and vocal irony." },
      { id: "w-s2", title: "The 'Soft' No", context: "You ask for help, and a colleague says 'I'd love to, but I have a huge deadline at 5 PM.'", research_goal: "Understanding polite refusals." },
      { id: "w-s3", title: "Watercooler Silence", context: "You join a group and the conversation suddenly stops for 3 seconds.", research_goal: "Interpreting social pauses and 'awkward silence'." },
      { id: "w-s4", title: "Professional Distance", context: "A manager asks 'How was your weekend?' but looks at their watch while you answer.", research_goal: "Recognizing 'Phatic' communication (small talk vs. real interest)." },
      { id: "w-s5", title: "Implicit Feedback", context: "A peer says 'That’s a very... unique way to solve the problem.'", research_goal: "Decoding 'Hedging' or coded negative feedback." }
    ]
  },
  school: {
    Social: [
      { id: "s-s1", title: "Sharing Nuance", context: "A friend says 'I guess you can use my pencil if you really need to.'", research_goal: "Detecting reluctant vs. enthusiastic sharing." },
      { id: "s-s2", title: "Recess Exclusion", context: "You ask to play and they say 'Maybe in a little bit, the game is full right now.'", research_goal: "Differentiating between 'Delay' and 'Rejection'." },
      { id: "s-s3", title: "The 'Secret' Hint", context: "A friend whispers 'Don't look now, but the teacher is watching.'", research_goal: "Shared attention and conspiracy-based social bonding." },
      { id: "s-s4", title: "Humor Boundaries", context: "Everyone is laughing at a joke you made, but one person looks like they are about to cry.", research_goal: "Identifying when 'Teasing' goes too far." },
      { id: "s-s5", title: "Teacher Moods", context: "The teacher says 'I'm waiting...' while standing with arms crossed at the front of the room.", research_goal: "Interpreting non-verbal authority cues." }
    ]
  }
};