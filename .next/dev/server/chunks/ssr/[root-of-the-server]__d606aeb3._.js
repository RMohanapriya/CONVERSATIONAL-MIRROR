module.exports = [
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[project]/src/app/layout.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/src/app/layout.tsx [app-rsc] (ecmascript)"));
}),
"[externals]/crypto [external] (crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}),
"[project]/src/lib/mongodb.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$mongodb__$5b$external$5d$__$28$mongodb$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$mongodb$29$__ = __turbopack_context__.i("[externals]/mongodb [external] (mongodb, cjs, [project]/node_modules/mongodb)");
;
if (!process.env.MONGODB_URI) {
    throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
}
const uri = process.env.MONGODB_URI;
const options = {};
let client;
let clientPromise;
if ("TURBOPACK compile-time truthy", 1) {
    // In development mode, use a global variable to preserve the value 
    // across module reloads caused by HMR (Hot Module Replacement).
    let globalWithMongo = /*TURBOPACK member replacement*/ __turbopack_context__.g;
    if (!globalWithMongo._mongoClientPromise) {
        client = new __TURBOPACK__imported__module__$5b$externals$5d2f$mongodb__$5b$external$5d$__$28$mongodb$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$mongodb$29$__["MongoClient"](uri, options);
        globalWithMongo._mongoClientPromise = client.connect();
    }
    clientPromise = globalWithMongo._mongoClientPromise;
} else //TURBOPACK unreachable
;
const __TURBOPACK__default__export__ = clientPromise;
}),
"[project]/src/auth.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "auth",
    ()=>auth,
    "handlers",
    ()=>handlers,
    "signIn",
    ()=>signIn,
    "signOut",
    ()=>signOut
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/next-auth/index.js [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$providers$2f$credentials$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/next-auth/providers/credentials.js [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$providers$2f$credentials$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@auth/core/providers/credentials.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mongodb$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/mongodb.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$bcryptjs$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/bcryptjs/index.js [app-rsc] (ecmascript)");
;
;
;
;
const { handlers, auth, signIn, signOut } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"])({
    providers: [
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$providers$2f$credentials$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"])({
            name: "Credentials",
            async authorize (credentials) {
                if (!credentials?.email || !credentials?.password) return null;
                const client = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mongodb$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"];
                const db = client.db("mirrorDB");
                // Find user by email
                const user = await db.collection("users").findOne({
                    email: credentials.email.toLowerCase()
                });
                if (!user || !user.password) return null;
                // Verify password
                const isPasswordCorrect = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$bcryptjs$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].compare(credentials.password, user.password);
                if (!isPasswordCorrect) return null;
                // Return the user object with lifeStage included
                // This object is passed to the 'jwt' callback below as 'user'
                return {
                    id: user._id.toString(),
                    name: user.name,
                    email: user.email,
                    lifeStage: user.lifeStage
                };
            }
        })
    ],
    callbacks: {
        // 1. JWT Callback: Persists the lifeStage into the encrypted token
        async jwt ({ token, user }) {
            if (user) {
                token.id = user.id;
                token.lifeStage = user.lifeStage;
            }
            return token;
        },
        // 2. Session Callback: Makes the data available to your Server & Client components
        async session ({ session, token }) {
            if (session.user) {
                session.user.id = token.id;
                session.user.lifeStage = token.lifeStage;
            }
            return session;
        }
    },
    pages: {
        signIn: "/login"
    },
    session: {
        strategy: "jwt"
    }
});
}),
"[project]/src/app/(dashboard)/dashboard/practice/library.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PRACTICE_LIBRARY",
    ()=>PRACTICE_LIBRARY
]);
const PRACTICE_LIBRARY = {
    college: {
        Social: [
            {
                id: "c-s1",
                title: "Roommate 'Hints'",
                context: "Your roommate says 'The trash is getting pretty full, isn't it?' while looking at you.",
                research_goal: "Interpreting indirect requests (hints)."
            },
            {
                id: "c-s2",
                title: "The Study Invite",
                context: "A classmate says 'We usually go to the cafe after lab if you're not busy.'",
                research_goal: "Identifying 'open-ended' social invitations."
            },
            {
                id: "c-s3",
                title: "Group Tension",
                context: "A team member is sighing loudly while you are talking about your part of the project.",
                research_goal: "Decoding non-verbal frustration cues."
            },
            {
                id: "c-s4",
                title: "The White Lie",
                context: "A friend asks if you liked their presentation, but you thought it was disorganized.",
                research_goal: "Navigating social honesty vs. 'White Lies'."
            },
            {
                id: "c-s5",
                title: "Joining a Table",
                context: "You see classmates laughing at a table with one empty chair; you want to join them.",
                research_goal: "Breaking into existing social clusters."
            }
        ]
    },
    workplace: {
        Social: [
            {
                id: "w-s1",
                title: "The Boss's Sarcasm",
                context: "Your boss says 'Great job on being early' when you arrived 10 minutes late.",
                research_goal: "Detecting sarcasm and vocal irony."
            },
            {
                id: "w-s2",
                title: "The 'Soft' No",
                context: "You ask for help, and a colleague says 'I'd love to, but I have a huge deadline at 5 PM.'",
                research_goal: "Understanding polite refusals."
            },
            {
                id: "w-s3",
                title: "Watercooler Silence",
                context: "You join a group and the conversation suddenly stops for 3 seconds.",
                research_goal: "Interpreting social pauses and 'awkward silence'."
            },
            {
                id: "w-s4",
                title: "Professional Distance",
                context: "A manager asks 'How was your weekend?' but looks at their watch while you answer.",
                research_goal: "Recognizing 'Phatic' communication (small talk vs. real interest)."
            },
            {
                id: "w-s5",
                title: "Implicit Feedback",
                context: "A peer says 'That’s a very... unique way to solve the problem.'",
                research_goal: "Decoding 'Hedging' or coded negative feedback."
            }
        ]
    },
    school: {
        Social: [
            {
                id: "s-s1",
                title: "Sharing Nuance",
                context: "A friend says 'I guess you can use my pencil if you really need to.'",
                research_goal: "Detecting reluctant vs. enthusiastic sharing."
            },
            {
                id: "s-s2",
                title: "Recess Exclusion",
                context: "You ask to play and they say 'Maybe in a little bit, the game is full right now.'",
                research_goal: "Differentiating between 'Delay' and 'Rejection'."
            },
            {
                id: "s-s3",
                title: "The 'Secret' Hint",
                context: "A friend whispers 'Don't look now, but the teacher is watching.'",
                research_goal: "Shared attention and conspiracy-based social bonding."
            },
            {
                id: "s-s4",
                title: "Humor Boundaries",
                context: "Everyone is laughing at a joke you made, but one person looks like they are about to cry.",
                research_goal: "Identifying when 'Teasing' goes too far."
            },
            {
                id: "s-s5",
                title: "Teacher Moods",
                context: "The teacher says 'I'm waiting...' while standing with arms crossed at the front of the room.",
                research_goal: "Interpreting non-verbal authority cues."
            }
        ]
    }
};
}),
"[project]/src/app/(dashboard)/dashboard/practice/page.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>PracticeEntryPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/auth.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$api$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/next/dist/api/navigation.react-server.js [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/components/navigation.react-server.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$dashboard$292f$dashboard$2f$practice$2f$library$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/(dashboard)/dashboard/practice/library.tsx [app-rsc] (ecmascript)");
;
;
;
async function PracticeEntryPage() {
    const session = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["auth"])();
    if (!session) (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["redirect"])("/login");
    const userStage = session.user.lifeStage?.toLowerCase() || "college";
    const stageData = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$dashboard$292f$dashboard$2f$practice$2f$library$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["PRACTICE_LIBRARY"][userStage] || __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$dashboard$292f$dashboard$2f$practice$2f$library$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["PRACTICE_LIBRARY"].college;
    // Flatten the library to pick any random scenario
    const allScenarios = Object.values(stageData).flat();
    const randomScenario = allScenarios[Math.floor(Math.random() * allScenarios.length)];
    // Jump to the dynamic session page
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["redirect"])(`/dashboard/practice/${randomScenario.id}`);
}
}),
"[project]/src/app/(dashboard)/dashboard/practice/page.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/src/app/(dashboard)/dashboard/practice/page.tsx [app-rsc] (ecmascript)"));
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__d606aeb3._.js.map