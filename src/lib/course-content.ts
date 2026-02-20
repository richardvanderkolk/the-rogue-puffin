export interface DayContent {
    day: number;
    title: string;
    description: string;
    focus: "Sub-vocalization" | "Peripheral Vision" | "Variable Speed" | "Confidence" | "Comprehension";
    drift: string; // The "Drift" text explaining the day's concept
    duration: string; // e.g. "15 min"
    skills: string[];
    isLocked?: boolean;
    content?: string; // Specific reading text for the day
    sequence?: DrillStep[];
}

export interface DrillStep {
    title: string;
    subtitle: string;
    mode: "normal" | "inverted" | "peripheral" | "backward" | "flash";
    wpm: number;
    text?: string;
    duration: number; // Seconds to run this step
    highlightMode?: boolean;
    chunkSize?: number;
    acceleration?: number;
}

const COMMON_DRILL_TEXT = `The Time Traveller (for so it will be convenient to speak of him) was expounding a recondite matter to us. His grey eyes shone and twinkled, and his usually pale face was flushed and animated. The fire burned brightly, and the soft radiance of the incandescent lights in the lilies of silver caught the bubbles that flashed and passed in our glasses. Our chairs, being his patents, embraced and caressed us rather than submitted to be sat upon, and there was that luxurious after-dinner atmosphere when thought runs gracefully free of the trammels of precision. And he put it to us in this way—marking the points with a lean forefinger—as we sat and lazily admired his earnestness over this new paradox (as we thought it) and his fecundity. 'You must follow me carefully. I shall have to controvert one or two ideas that are almost universally accepted. The geometry, for instance, they taught you at school is founded on a misconception.' 'Is not that rather a large thing to expect us to begin upon?' said Filby, an argumentative person with red hair. 'I do not mean to ask you to accept anything without reasonable ground for it. You will soon admit as much as I need from you. You know of course that a mathematical line, a line of thickness nil, has no real existence. They taught you that? Neither has a mathematical plane. These things are mere abstractions.' 'That is all right,' said the Psychologist. 'Nor, having only length, breadth, and thickness, can a cube have a real existence.' 'There I object,' said Filby. 'Of course a solid body may exist. All real things—' 'So most people think. But wait a moment. Can an instantaneous cube exist?' 'Don't follow you,' said Filby. 'Can a cube that does not last for any time at all, have a real existence?' Filby became pensive. 'Clearly,' the Time Traveller proceeded, 'any real body must have extension in four directions: it must have Length, Breadth, Thickness, and—Duration. But through a natural infirmity of the flesh, which I will explain to you in a moment, we incline to overlook this fact. There are really four dimensions, three which we call the three planes of Space, and a fourth, Time. There is, however, a tendency to draw an unreal distinction between the former three dimensions and the latter, because it happens that our consciousness moves intermittently in one direction along the latter from the beginning to the end of our lives.'`;

// Repeat text to simulate longer reading material
const SEQUENCE_TEXT = COMMON_DRILL_TEXT.repeat(10);

export const COURSE_CONTENT: DayContent[] = [
    {
        day: 1,
        title: "Silence the Inner Voice",
        description: "Break the habit of reading aloud in your head.",
        focus: "Sub-vocalization",
        drift: "Today we tackle the biggest barrier to speed: subvocalization. You will use the high-speed pacer to force your brain to process visual information faster than your inner voice can speak.",
        duration: "15 min",
        skills: ["Visual Recognition", "Pattern Matching"],
        isLocked: false,
        content: SEQUENCE_TEXT,
        sequence: [
            {
                title: "Warmup: Baseline Reading",
                subtitle: "Read at a comfortable pace. Focus on smooth eye movement.",
                mode: "normal",
                wpm: 250,
                duration: 120, // 2 mins
                chunkSize: 3,
                highlightMode: true
            },
            {
                title: "The Push: Speed Up",
                subtitle: "We bump the speed to 350 WPM. Do not try to say the words.",
                mode: "normal",
                wpm: 350,
                duration: 180, // 3 mins
                chunkSize: 3,
                highlightMode: false
            },
            {
                title: "Visual Reset: High Speed Flash",
                subtitle: "500 WPM Flash. Just let your eyes catch the words.",
                mode: "normal",
                wpm: 500,
                duration: 60, // 1 min
                chunkSize: 1,
                highlightMode: false
            },
            {
                title: "Cooldown: Return to Baseline",
                subtitle: "Back to 250 WPM. Notice how slow and easy this feels now.",
                mode: "normal",
                wpm: 250,
                duration: 120, // 2 mins
                chunkSize: 4,
                highlightMode: true
            }
        ]
    },
    {
        day: 2,
        title: "Expand Your Vision",
        description: "Use your peripheral vision to capture more words at once.",
        focus: "Peripheral Vision",
        drift: "Most readers focus on one word at a time. Today, we widen the lens. You will practice softening your gaze to see 3-5 words at a glance.",
        duration: "15 min",
        skills: ["Peripheral Awareness", "Soft Gaze"],
        isLocked: false, // Unlocked for demo flow
        content: SEQUENCE_TEXT,
        sequence: [
            {
                title: "Peripheral Warmup",
                subtitle: "Focus on the center. Let your vision expand.",
                mode: "peripheral",
                wpm: 300,
                duration: 180,
                chunkSize: 5,
                highlightMode: true
            },
            {
                title: "Wide Flash",
                subtitle: "Catch 5 words at time. Do not move your eyes left/right.",
                mode: "normal",
                wpm: 400,
                duration: 180,
                chunkSize: 5,
                highlightMode: false
            },
            {
                title: "Peripheral Sprint",
                subtitle: "Pushing the limit of your peripheral processing.",
                mode: "peripheral",
                wpm: 500,
                duration: 120,
                chunkSize: 5,
                highlightMode: false
            }
        ]
    },
    {
        day: 3,
        title: "The Rhythm of Speed",
        description: "Learn to control your reading pace with variable speeds.",
        focus: "Variable Speed",
        drift: "Speed is not constant. Just like a runner adjusts their pace for terrain, a reader adjusts for complexity. Today we practice shifting gears.",
        duration: "15 min",
        skills: ["Speed Variation", "Rhythm Control"],
        isLocked: false,
        content: SEQUENCE_TEXT,
        sequence: [
            {
                title: "Slow Gear",
                subtitle: "Deep comprehension pace.",
                mode: "normal",
                wpm: 200,
                duration: 120,
                chunkSize: 3,
                highlightMode: true
            },
            {
                title: "Fast Gear",
                subtitle: "Scanning pace. Visual capture only.",
                mode: "normal",
                wpm: 600,
                duration: 120,
                chunkSize: 4,
                highlightMode: false
            },
            {
                title: "Variable Intervals",
                subtitle: "Alternating speeds every few seconds.",
                mode: "normal",
                wpm: 400,
                duration: 180,
                chunkSize: 4,
                highlightMode: true,
                acceleration: 10 // Ramp up
            }
        ]
    },
    {
        day: 4,
        title: "Laser Focus",
        description: "Maintain high concentration for longer periods.",
        focus: "Confidence",
        drift: "Distraction is the enemy of speed. Today's drills are designed to test your focus and build your mental endurance.",
        duration: "20 min",
        skills: ["Sustained Attention", "Mental Stamina"],
        isLocked: false,
        content: SEQUENCE_TEXT,
        sequence: [
            {
                title: "Endurance Block 1",
                subtitle: "Sustain focus for 5 minutes straight.",
                mode: "normal",
                wpm: 350,
                duration: 300,
                chunkSize: 4,
                highlightMode: true
            },
            {
                title: "Visual Reset",
                subtitle: "Inverted text to force visual engagement.",
                mode: "inverted",
                wpm: 250,
                duration: 60,
                chunkSize: 3,
                highlightMode: true
            },
            {
                title: "Endurance Block 2",
                subtitle: "Another 5 minutes. Push through the boredom.",
                mode: "normal",
                wpm: 400,
                duration: 300,
                chunkSize: 4,
                highlightMode: true
            }
        ]
    },
    {
        day: 5,
        title: "The Comprehension Check",
        description: "Speed without understanding is meaningless.",
        focus: "Comprehension",
        drift: "We pause today to ensure you are retaining what you read. We will slow down slightly to lock in comprehension at higher speeds.",
        duration: "15 min",
        skills: ["Active Recall", "Key Point Extraction"],
        isLocked: false,
        content: SEQUENCE_TEXT,
        sequence: [
            {
                title: "Comprehension Mode",
                subtitle: "Read for meaning. Visualize the scenes.",
                mode: "normal",
                wpm: 300,
                duration: 300,
                chunkSize: 3,
                highlightMode: true
            },
            {
                title: "Rapid Review",
                subtitle: "Scan back over the text quickly.",
                mode: "normal",
                wpm: 600,
                duration: 60,
                chunkSize: 5,
                highlightMode: false
            },
            {
                title: "Detailed Read",
                subtitle: "Read again. Catch details you missed.",
                mode: "normal",
                wpm: 350,
                duration: 300,
                chunkSize: 3,
                highlightMode: true
            }
        ]
    },
    {
        day: 6,
        title: "Advanced Scannning",
        description: "Techniques for rapid information extraction.",
        focus: "Peripheral Vision",
        drift: "Sometimes you don't need to read every word. Today you will learn advanced scanning techniques to find information instantly.",
        duration: "15 min",
        skills: ["Scanning", "Skimming"],
        isLocked: false,
        content: SEQUENCE_TEXT,
        sequence: [
            {
                title: "High Speed Scan",
                subtitle: "Let your eyes glide over the text without stopping.",
                mode: "normal",
                wpm: 800,
                duration: 180,
                chunkSize: 10,
                highlightMode: true
            },
            {
                title: "Reverse Scan",
                subtitle: "Scan backwards to break linear habits.",
                mode: "backward",
                wpm: 400,
                duration: 120,
                chunkSize: 4,
                highlightMode: true
            },
            {
                title: "Vertical Scan",
                subtitle: "Peripheral mode: center focus only.",
                mode: "peripheral",
                wpm: 600,
                duration: 180,
                chunkSize: 6,
                highlightMode: false
            }
        ]
    },
    {
        day: 7,
        title: "The Final Sprint",
        description: "Put it all together in a high-intensity session.",
        focus: "Confidence",
        drift: "Congratulations on reaching Day 7. Today we combine everything: silence, vision, and focus. Let's see how fast you can go.",
        duration: "25 min",
        skills: ["Integration", "Flow State"],
        isLocked: false,
        content: SEQUENCE_TEXT,
        sequence: [
            {
                title: "Warmup",
                subtitle: "Easy pace 300 WPM.",
                mode: "normal",
                wpm: 300,
                duration: 120,
                chunkSize: 3,
                highlightMode: true
            },
            {
                title: "Acceleration Phase 1",
                subtitle: "Ramping up to 500 WPM.",
                mode: "normal",
                wpm: 400,
                duration: 180,
                chunkSize: 4,
                highlightMode: true,
                acceleration: 5
            },
            {
                title: "Super Speed",
                subtitle: "Brief burst at 1000 WPM. Don't panic.",
                mode: "normal",
                wpm: 1000,
                duration: 60,
                chunkSize: 5,
                highlightMode: false
            },
            {
                title: "Sustained Velocity",
                subtitle: "Holding 600 WPM for 5 minutes.",
                mode: "normal",
                wpm: 600,
                duration: 300,
                chunkSize: 4,
                highlightMode: true
            }
        ]
    },
    // Week 2: Mastery (Days 8-14) - Repeating concepts with higher intensity
    {
        day: 8,
        title: "Silence 2.0",
        description: "Removing the whisper.",
        focus: "Sub-vocalization",
        drift: "Week 2. We revisit subvocalization, but this time at 450 WPM baseline.",
        duration: "15 min",
        skills: ["Silence", "Speed"],
        isLocked: false,
        content: SEQUENCE_TEXT,
        sequence: [
            { title: "Baseline 2.0", subtitle: "Start at 400 WPM.", mode: "normal", wpm: 400, duration: 300, chunkSize: 4, highlightMode: true },
            { title: "Supersonic", subtitle: "800 WPM Flash.", mode: "normal", wpm: 800, duration: 120, chunkSize: 2, highlightMode: false },
            { title: "Recovery", subtitle: "Back to 450 WPM.", mode: "normal", wpm: 450, duration: 300, chunkSize: 4, highlightMode: true }
        ]
    },
    {
        day: 9,
        title: "Peripheral Extension",
        description: "Seeing paragraphs, not lines.",
        focus: "Peripheral Vision",
        drift: "Push your vision to the absolute edge. Can you see the start of the next line before you finish the current one?",
        duration: "15 min",
        skills: ["Wide Eye", "Vertical Vision"],
        isLocked: false,
        content: SEQUENCE_TEXT,
        sequence: [
            { title: "Wide Angle", subtitle: "Blocks of 8 words.", mode: "normal", wpm: 500, duration: 300, chunkSize: 8, highlightMode: true },
            { title: "Peripheral Blur", subtitle: "Focus center.", mode: "peripheral", wpm: 600, duration: 300, chunkSize: 6, highlightMode: false }
        ]
    },
    {
        day: 10,
        title: "Variable Control",
        description: "Mastering the throttle.",
        focus: "Variable Speed",
        drift: "Complete control. Fast for easy sections, thoughtful for hard ones.",
        duration: "15 min",
        skills: ["Throttle Control", "Dynamic Pacing"],
        isLocked: false,
        content: SEQUENCE_TEXT,
        sequence: [
            { title: "Intervals", subtitle: "300 -> 600 -> 300.", mode: "normal", wpm: 300, duration: 600, chunkSize: 4, highlightMode: true, acceleration: 20 }
        ]
    },
    {
        day: 11,
        title: "Hyper-Focus",
        description: "Immunity to distraction.",
        focus: "Confidence",
        drift: "Build an iron mind. Read through noise (simulated or real).",
        duration: "20 min",
        skills: ["Iron Focus", "Flow"],
        isLocked: false,
        content: SEQUENCE_TEXT,
        sequence: [
            { title: "Deep Work", subtitle: "10 minutes unbroken at 500 WPM.", mode: "normal", wpm: 500, duration: 600, chunkSize: 4, highlightMode: true }
        ]
    },
    {
        day: 12,
        title: "Visual Processing",
        description: "Brain speed over eye speed.",
        focus: "Comprehension",
        drift: "Your eyes are fast enough. Now your brain must catch up.",
        duration: "15 min",
        skills: ["Processing Speed", "Synaptic Fire"],
        isLocked: false,
        content: SEQUENCE_TEXT,
        sequence: [
            { title: "Flash Cards", subtitle: "Single word flash at 1000 WPM.", mode: "normal", wpm: 1000, duration: 180, chunkSize: 1, highlightMode: false },
            { title: "Integration", subtitle: "Reading at 600 WPM.", mode: "normal", wpm: 600, duration: 420, chunkSize: 5, highlightMode: true }
        ]
    },
    {
        day: 13,
        title: "The Review",
        description: "Consolidating gains.",
        focus: "Comprehension",
        drift: "Reviewing the techniques. Prepare for the final day.",
        duration: "15 min",
        skills: ["Review", "Consolidation"],
        isLocked: false,
        content: SEQUENCE_TEXT,
        sequence: [
            { title: "Technique Medley", subtitle: "2 mins each: Peripheral, Inverted, Normal.", mode: "normal", wpm: 400, duration: 120, chunkSize: 4, highlightMode: true },
            { title: "Inverted", subtitle: "Upside down reading.", mode: "inverted", wpm: 300, duration: 120, chunkSize: 3, highlightMode: true },
            { title: "Peripheral", subtitle: "Wide focus.", mode: "peripheral", wpm: 400, duration: 120, chunkSize: 5, highlightMode: false },
            { title: "Normal", subtitle: "Standard reading.", mode: "normal", wpm: 500, duration: 120, chunkSize: 4, highlightMode: true }
        ]
    },
    {
        day: 14,
        title: "Graduation",
        description: "The new baseline.",
        focus: "Confidence",
        drift: "This is it. You are a Rogue Reader. Today we set your new permanent baseline.",
        duration: "30 min",
        skills: ["Mastery", "Speed"],
        isLocked: false,
        content: SEQUENCE_TEXT,
        sequence: [
            { title: "Warmup", subtitle: "Easy 400 WPM.", mode: "normal", wpm: 400, duration: 300, chunkSize: 4, highlightMode: true },
            { title: "The Standard", subtitle: "Sustained 600 WPM.", mode: "normal", wpm: 600, duration: 600, chunkSize: 5, highlightMode: true },
            { title: "Limit Break", subtitle: "Push to 1200 WPM.", mode: "normal", wpm: 1200, duration: 120, chunkSize: 10, highlightMode: false },
            { title: "Cool Down", subtitle: "Settle at 500 WPM.", mode: "normal", wpm: 500, duration: 300, chunkSize: 5, highlightMode: true }
        ]
    }
];
