export interface ScenarioItem {
  id: string;
  title: string;
  context: string;
  research_goal: string;
}

export type PracticeLibrary = Record<string, Record<string, ScenarioItem[]>>;

export const PRACTICE_LIBRARY: PracticeLibrary = {
  college: {
    Social: [
      {
        id: "c-s1",
        title: "Roommate 'Hints'",
        context:
          "Your roommate says 'The trash is getting pretty full, isn't it?' while looking at you.",
        research_goal: "Interpreting indirect requests (hints).",
      },
      {
        id: "c-s2",
        title: "The Study Invite",
        context:
          "A classmate says 'We usually go to the cafe after lab if you're not busy.'",
        research_goal: "Identifying open-ended social invitations.",
      },
      {
        id: "c-s3",
        title: "Group Tension",
        context:
          "A team member is sighing loudly while you are talking about your part of the project.",
        research_goal: "Decoding non-verbal frustration cues.",
      },
      {
        id: "c-s4",
        title: "The White Lie",
        context:
          "A friend asks if you liked their presentation, but you thought it was disorganized.",
        research_goal: "Navigating social honesty vs. white lies.",
      },
      {
        id: "c-s5",
        title: "Joining a Table",
        context:
          "You see classmates laughing at a table with one empty chair; you want to join them.",
        research_goal: "Breaking into existing social clusters.",
      },
      {
        id: "c-s6",
        title: "The Cancelled Plan",
        context:
          "A friend texts 'Hey, something came up tonight, can we reschedule?' thirty minutes before you were supposed to meet.",
        research_goal: "Interpreting vague cancellations without over-reacting.",
      },
      {
        id: "c-s7",
        title: "Professor After Class",
        context:
          "You go to ask your professor a question after class. She is packing her bag and glancing at the door while you talk.",
        research_goal: "Reading availability signals from authority figures.",
      },
      {
        id: "c-s8",
        title: "The Unsolicited Opinion",
        context:
          "You mention your major to a new acquaintance and they say 'Oh, that major is really hard to get a job in.'",
        research_goal: "Responding to unsolicited negative opinions without conflict.",
      },
      {
        id: "c-s9",
        title: "Group Chat Silence",
        context:
          "You send a message in the group chat with a question for the team project. Two hours pass and nobody replies.",
        research_goal: "Managing uncertainty from non-response in digital communication.",
      },
      {
        id: "c-s10",
        title: "Borrowed and Not Returned",
        context:
          "You lent a classmate your notes two weeks ago. You need them back but they have not mentioned it.",
        research_goal: "Making a polite direct request without sounding accusatory.",
      },
    ],
  },

  job: {
    Social: [
      {
        id: "j-s1",
        title: "The Boss's Sarcasm",
        context:
          "Your boss says 'Great job on being early' when you arrived 10 minutes late.",
        research_goal: "Detecting sarcasm and vocal irony.",
      },
      {
        id: "j-s2",
        title: "The 'Soft' No",
        context:
          "You ask for help, and a colleague says 'I'd love to, but I have a huge deadline at 5 PM.'",
        research_goal: "Understanding polite refusals.",
      },
      {
        id: "j-s3",
        title: "Watercooler Silence",
        context:
          "You join a group and the conversation suddenly stops for 3 seconds.",
        research_goal: "Interpreting social pauses and awkward silence.",
      },
      {
        id: "j-s4",
        title: "Professional Distance",
        context:
          "A manager asks 'How was your weekend?' but looks at their watch while you answer.",
        research_goal: "Recognizing phatic communication vs. real interest.",
      },
      {
        id: "j-s5",
        title: "Implicit Feedback",
        context:
          "A peer says 'That's a very... unique way to solve the problem.'",
        research_goal: "Decoding hedging or coded negative feedback.",
      },
      {
        id: "j-s6",
        title: "The Meeting Interruption",
        context:
          "You are explaining your idea in a team meeting and your manager cuts in and starts talking over you.",
        research_goal: "Responding to being interrupted without escalating tension.",
      },
      {
        id: "j-s7",
        title: "The Undeserved Credit",
        context:
          "In a meeting, a colleague presents your idea as their own and receives praise from the team.",
        research_goal: "Asserting ownership of work professionally without aggression.",
      },
      {
        id: "j-s8",
        title: "Too Much Detail",
        context:
          "You are explaining a task to your manager and she says 'Got it, thanks' before you finish.",
        research_goal: "Reading signals that the listener has enough information.",
      },
      {
        id: "j-s9",
        title: "The Unclear Deadline",
        context:
          "Your manager sends an email saying 'Can you finish the report soon?' but does not give a date.",
        research_goal: "Asking for clarification on vague instructions without seeming difficult.",
      },
      {
        id: "j-s10",
        title: "After the Mistake",
        context:
          "You sent an email to the wrong client yesterday. Your manager has now called you into her office.",
        research_goal: "Taking accountability professionally without over-apologising or deflecting.",
      },
    ],
  },

  school: {
    Social: [
      {
        id: "s-s1",
        title: "Sharing Nuance",
        context:
          "A friend says 'I guess you can use my pencil if you really need to.'",
        research_goal: "Detecting reluctant vs. enthusiastic sharing.",
      },
      {
        id: "s-s2",
        title: "Recess Exclusion",
        context:
          "You ask to play and they say 'Maybe in a little bit, the game is full right now.'",
        research_goal: "Differentiating between delay and rejection.",
      },
      {
        id: "s-s3",
        title: "The 'Secret' Hint",
        context:
          "A friend whispers 'Don't look now, but the teacher is watching.'",
        research_goal: "Shared attention and social bonding.",
      },
      {
        id: "s-s4",
        title: "Humor Boundaries",
        context:
          "Everyone is laughing at a joke you made, but one person looks like they are about to cry.",
        research_goal: "Identifying when teasing goes too far.",
      },
      {
        id: "s-s5",
        title: "Teacher Moods",
        context:
          "The teacher says 'I'm waiting...' while standing with arms crossed at the front of the room.",
        research_goal: "Interpreting non-verbal authority cues.",
      },
      {
        id: "s-s6",
        title: "The Accidental Spoiler",
        context:
          "You tell a friend the ending of a book the class is reading because you finished it early. They look upset.",
        research_goal: "Recognising when sharing information can upset others.",
      },
      {
        id: "s-s7",
        title: "Partner Pick",
        context:
          "The teacher says 'Find a partner.' Everyone around you quickly pairs up and you are left standing alone.",
        research_goal: "Asking to join a pair or group without feeling rejected.",
      },
      {
        id: "s-s8",
        title: "The Wrong Answer",
        context:
          "You answer a question in class confidently. The teacher says 'Interesting... does anyone else have a thought?'",
        research_goal: "Understanding indirect correction from a teacher.",
      },
      {
        id: "s-s9",
        title: "Lunchtime Topic",
        context:
          "You are talking about your favourite video game at lunch. A friend says 'Yeah, cool' and looks at their food.",
        research_goal: "Noticing when the listener is losing interest in a conversation.",
      },
      {
        id: "s-s10",
        title: "The Apology",
        context:
          "You accidentally knocked a classmate's water bottle off their desk and it spilled everywhere.",
        research_goal: "Apologising clearly and taking simple responsibility.",
      },
    ],
  },
};