export interface DayContent {
    day: number;
    title: string;
    description: string;
    focus: "Sub-vocalization" | "Peripheral Vision" | "Variable Speed" | "Learning Mindset" | "Confidence" | "Comprehension" | "Eye Movement" | "Free Choice";
    drift: string; // The "Drift" text explaining the day's concept
    duration: string; // e.g. "15 min"
    skills: string[];
    isLocked?: boolean;
    content?: string; // Specific reading text for the day
    sequence?: DrillStep[];
    choices?: { title: string; subtitle: string; sequence: DrillStep[] }[];
}

export interface DrillStepInterruption {
    triggerAtRemaining: number;
    text: string;
}

export interface DrillStep {
    title: string;
    subtitle: string;
    mode: "normal" | "inverted" | "peripheral" | "backward" | "flash" | "read" | "message" | "recall";
    wpm: number;
    text?: string;
    duration: number; // Seconds to run this step
    highlightMode?: boolean;
    chunkSize?: number;
    acceleration?: number;
    customInterval?: number;
    autoStart?: boolean;
    interruptions?: DrillStepInterruption[];
    reduceFontSizeAfter?: number; // seconds after which to apply a smallFont class
    reduceFontSizeAgainAfter?: number; // seconds after which to apply an extraSmallFont class
    increaseChunkSizeAfter?: number; // seconds after which to increase chunk size
    increaseChunkSizeTo?: number; // target chunk size
    autoAdvance?: boolean;
}

const COMMON_DRILL_TEXT = `Alice was beginning to get very tired of sitting by her sister on the bank, and of having nothing to do: once or twice she had peeped into the book her sister was reading, but it had no pictures or conversations in it, "and what is the use of a book," thought Alice "without pictures or conversations?" So she was considering in her own mind (as well as she could, for the hot day made her feel very sleepy and stupid), whether the pleasure of making a daisy-chain would be worth the trouble of getting up and picking the daisies, when suddenly a White Rabbit with pink eyes ran close by her. There was nothing so very remarkable in that; nor did Alice think it so very much out of the way to hear the Rabbit say to itself, "Oh dear! Oh dear! I shall be late!" (when she thought it over afterwards, it occurred to her that she ought to have wondered at this, but at the time it all seemed quite natural); but when the Rabbit actually took a watch out of its waistcoat-pocket, and looked at it, and then hurried on, Alice started to her feet, for it flashed across her mind that she had never before seen a rabbit with either a waistcoat-pocket, or a watch to take out of it, and burning with curiosity, she ran across the field after it, and fortunately was just in time to see it pop down a large rabbit-hole under the hedge. In another moment down went Alice after it, never once considering how in the world she was to get out again. The rabbit-hole went straight on like a tunnel for some way, and then dipped suddenly down, so suddenly that Alice had not a moment to think about stopping herself before she found herself falling down a very deep well. Either the well was very deep, or she fell very slowly, for she had plenty of time as she went down to look about her and to wonder what was going to happen next. First, she tried to look down and make out what she was coming to, but it was too dark to see anything; then she looked at the sides of the well, and noticed that they were filled with cupboards and book-shelves; here and there she saw maps and pictures hung upon pegs. She took down a jar from one of the shelves as she passed; it was labelled "ORANGE MARMALADE", but to her great disappointment it was empty: she did not like to drop the jar for fear of killing somebody, so managed to put it into one of the cupboards as she fell past it. "Well!" thought Alice to herself, "after such a fall as this, I shall think nothing of tumbling down stairs! How brave they'll all think me at home! Why, I wouldn't say anything about it, even if I fell off the top of the house!" (Which was very likely true.) Down, down, down. Would the fall never come to an end! "I wonder how many miles I've fallen by this time?" she said aloud. "I must be getting somewhere near the center of the earth. Let me see: that would be four thousand miles down, I think--" (for, you see, Alice had learnt several things of this sort in her lessons in the schoolroom, and though this was not a very good opportunity for showing off her knowledge, as there was no one to listen to her, still it was good practice to say it over) "--yes, that's about the right distance--but then I wonder what Latitude or Longitude I've got to?" (Alice had no idea what Latitude was, or Longitude either, but thought they were nice grand words to say.) Presently she began again. "I wonder if I shall fall right through the earth! How funny it'll seem to come out among the people that walk with their heads downward! The Antipathies, I think--" (she was rather glad there WAS no one listening, this time, as it didn't sound at all the right word) "--but I shall have to ask them what the name of the country is, you know. Please, Ma'am, is this New Zealand or Australia?" (and she tried to curtsey as she spoke--fancy curtseying as you're falling through the air! Do you think you could manage it?) "And what an ignorant little girl she'll think me for asking! No, it'll never do to ask: perhaps I shall see it written up somewhere." Down, down, down. There was nothing else to do, so Alice soon began talking again. "Dinah'll miss me very much to-night, I should think!" (Dinah was the cat.) "I hope they'll remember her saucer of milk at tea-time. Dinah my dear! I wish you were down here with me! There are no mice in the air, I'm afraid, but you might catch a bat, and that's very like a mouse, you know. But do cats eat bats, I wonder?" And here Alice began to get rather sleepy, and went on saying to herself, in a dreamy sort of way, "Do cats eat bats? Do cats eat bats?" and sometimes, "Do bats eat cats?" for, you see, as she couldn't answer either question, it didn't much matter which way she put it. She felt that she was dozing off, and had just begun to dream that she was walking hand in hand with Dinah, and saying to her very earnestly, "Now, Dinah, tell me the truth: did you ever eat a bat?" when suddenly, thump! thump! down she came upon a heap of sticks and dry leaves, and the fall was over. Alice was not a bit hurt, and she jumped up on to her feet in a moment: she looked up, but it was all dark overhead; before her was another long passage, and the White Rabbit was still in sight, hurrying down it. There was not a moment to be lost: away went Alice like the wind, and was just in time to hear it say, as it turned a corner, "Oh my ears and whiskers, how late it's getting!" She was close behind it when she turned the corner, but the Rabbit was no longer to be seen: she found herself in a long, low hall, which was lit up by a row of lamps hanging from the roof. There were doors all round the hall, but they were all locked; and when Alice had been all the way down one side and up the other, trying every door, she walked sadly down the middle, wondering how she was ever to get out again. Suddenly she came upon a little three-legged table, all made of solid glass; there was nothing on it except a tiny golden key, and Alice's first thought was that it might belong to one of the doors of the hall; but, alas! either the locks were too large, or the key was too small, but at any rate it would not open any of them. However, on the second time round, she came upon a low curtain she had not noticed before, and behind it was a little door about fifteen inches high: she tried the little golden key in the lock, and to her great delight it fitted! Alice opened the door and found that it led into a small passage, not much larger than a rat-hole: she knelt down and looked along the passage into the loveliest garden you ever saw. How she longed to get out of that dark hall, and wander about among those beds of bright flowers and those cool fountains, but she could not even get her head through the doorway; "and even if my head would go through," thought poor Alice, "it would be of very little use without my shoulders. Oh, how I wish I could shut up like a telescope! I think I could, if I only knew how to begin." For, you see, so many out-of-the-way things had happened lately, that Alice had begun to think that very few things indeed were really impossible.`;

// Repeat text to simulate longer reading material
const SEQUENCE_TEXT = COMMON_DRILL_TEXT.repeat(10);
const TORTOISE_HARE_TEXT = `A Hare was making fun of the Tortoise one day for being so slow. "Do you ever get anywhere?" he asked with a mocking laugh. "Yes," replied the Tortoise, "and I get there sooner than you think. I'll run you a race and prove it." The Hare was much amused at the idea of running a race with the Tortoise, but for the fun of the thing he agreed. So the Fox, who had consented to act as judge, marked the distance and started the runners off. The Hare was soon far out of sight, and to make the Tortoise feel very deeply how ridiculous it was for him to try a race with a Hare, he lay down beside the course to take a nap until the Tortoise should catch up. The Tortoise meanwhile kept going slowly but steadily, and, after a time, passed the place where the Hare was sleeping. But the Hare slept on very peacefully; and when at last he did wake up, the Tortoise was near the goal. The Hare now ran his swiftest, but he could not overtake the Tortoise in time.`;


export const STANDARD_FLASH_SEQUENCE: DrillStep[] = [
    {
        title: "Flash Pages: Baseline",
        subtitle: "1 page per second.",
        mode: "flash",
        wpm: 600,
        customInterval: 1000,
        duration: 90,
        chunkSize: 150,
        highlightMode: false,
        autoAdvance: true
    },
    {
        title: "",
        subtitle: "Speeding up",
        mode: "message",
        wpm: 0,
        duration: 0,
        text: "We will now increase the speed to 2 pages per second.\n\nClick to continue."
    },
    {
        title: "Flash Pages: Push Speed",
        subtitle: "1 page per half-second (2 pages/sec).",
        mode: "flash",
        wpm: 1200,
        customInterval: 500,
        duration: 90,
        chunkSize: 150,
        highlightMode: false,
        autoAdvance: true
    },
    {
        title: "",
        subtitle: "Speeding up",
        mode: "message",
        wpm: 0,
        duration: 0,
        text: "We will now increase the speed to 3 pages per second. Do not try to read, just look at the words.\n\nClick to continue."
    },
    {
        title: "Flash Pages: Overdrive",
        subtitle: "3 pages per second. Do not try to read, just look.",
        mode: "flash",
        wpm: 1800,
        customInterval: 333,
        duration: 90,
        chunkSize: 150,
        highlightMode: false,
        autoAdvance: true
    },
    {
        title: "Recall Check",
        subtitle: "Take a breath",
        mode: "recall",
        wpm: 0,
        duration: 10,
        autoStart: true,
        autoAdvance: true,
        text: "How many words can you remember?"
    },
    {
        title: "",
        subtitle: "Speeding up",
        mode: "message",
        wpm: 0,
        duration: 0,
        text: "We will now increase the speed to 4 pages per second.\n\nClick to continue."
    },
    {
        title: "Flash Pages: Speed Demon",
        subtitle: "4 pages per second.",
        mode: "flash",
        wpm: 2400,
        customInterval: 250,
        duration: 90,
        chunkSize: 150,
        highlightMode: false,
        autoAdvance: true
    },
    {
        title: "Recall Check",
        subtitle: "Mental snapshot",
        mode: "recall",
        wpm: 0,
        duration: 10,
        autoStart: true,
        autoAdvance: true,
        text: "How many words can you remember?"
    },
    {
        title: "",
        subtitle: "Inverting perspective",
        mode: "message",
        wpm: 0,
        duration: 0,
        text: "We will now turn the text upside down.\n\nClick to continue."
    },
    {
        title: "Flash Pages: Inverted",
        subtitle: "Upside down at 3 pages per second.",
        mode: "inverted",
        wpm: 1800,
        customInterval: 333,
        duration: 90,
        chunkSize: 150,
        highlightMode: false,
        autoAdvance: true
    },
    {
        title: "Recall Check",
        subtitle: "Mental reset",
        mode: "recall",
        wpm: 0,
        duration: 10,
        autoStart: true,
        autoAdvance: true,
        text: "How many words can you remember?"
    },
    {
        title: "",
        subtitle: "Cooling down",
        mode: "message",
        wpm: 0,
        duration: 0,
        text: "Time to cool down and read normally.\n\nClick to continue."
    },
    {
        title: "Reading Practice",
        subtitle: "Scroll down and read normally.",
        mode: "read",
        wpm: 0,
        duration: 120,
        chunkSize: 99999,
        highlightMode: false
    }
];

export const COURSE_CONTENT: DayContent[] = [
    // --- Day 1: Your Peripheral Vision ---
    {
        day: 1,
        title: "Day 1: Your Peripheral Vision",
        description: "Increase your field of vision to capture more words at once.",
        focus: "Peripheral Vision",
        drift: "Welcome to Day 1! The biggest barrier to reading faster is reading word-by-word. Today, we begin expanding your peripheral vision so you can see chunks of words at once. Keep your eyes locked on the center dot and let the words come to you.",
        duration: "15 min",
        skills: ["Soft Gaze", "Visual Recognition"],
        isLocked: false,
        content: SEQUENCE_TEXT,
        sequence: [
            {
                title: "",
                subtitle: "Your Peripheral Vision",
                mode: "message",
                wpm: 0,
                duration: 0,
                text: "We are going to start with a Your Peripheral Vision drill.\n\nKeep your eyes locked on the red dot.\n\nDo not move your eyes to read the words. Relax your eyes and experiment with your focus to enlarge your view."
            },
            {
                title: "Warmup: Center-Fixation Expansion",
                subtitle: "Lock your eyes on the red dot. Let your peripheral vision expand outward to catch the words.",
                mode: "peripheral",
                wpm: 400,
                duration: 180,
                chunkSize: 4,
                highlightMode: false,
                autoAdvance: true
            },
            {
                title: "",
                subtitle: "Getting Ready",
                mode: "message",
                wpm: 0,
                duration: 0,
                text: "Now we will begin the flash pages exercises. Continue to focus on the middle of the screen and allow your peripheral vision to take in as many words as you can."
            },
            {
                title: "Flash Pages: Baseline",
                subtitle: "1 page per second. Expand your vision.",
                mode: "flash",
                wpm: 600,
                customInterval: 1000,
                duration: 90,
                chunkSize: 150,
                highlightMode: false,
                autoAdvance: true,
                interruptions: [
                    {
                        triggerAtRemaining: 60,
                        text: "Pause for a moment. You are doing well.\n\nIf you are struggling to see many words right now, that is completely normal.\n\nThe point of this exercise is not that you can read and understand what is being said. Instead, we are trying to change your perception of speed and break your habit of subvocalising (speaking the words in your head), while actively increasing the number of words recognized in your field of vision.\n\nKeep a relaxed confidence. You are doing exactly what you need to do and your brain is adapting."
                    }
                ]
            },
            ...STANDARD_FLASH_SEQUENCE.slice(1)
        ]
    },
    // --- Day 2: Kinetic Words ---
    {
        day: 2,
        title: "Day 2: Kinetic Words",
        description: "Use kinetic text to break the habit of needing to hear every word.",
        focus: "Sub-vocalization",
        drift: "Welcome to Day 2! The inner reading voice (sub-vocalization) limits your speed to how fast you talk. Today we use kinetic text to move faster than your inner voice can speak. Try to just see the words instead of saying them.",
        duration: "15 min",
        skills: ["Pattern Matching", "Subvocalization Breaking"],
        isLocked: false,
        content: SEQUENCE_TEXT,
        sequence: [
            {
                title: "Warmup: Kinetic Stream",
                subtitle: "Words will appear rapidly in the center. Don't speak them, just see them.",
                mode: "normal",
                wpm: 500,
                duration: 180,
                chunkSize: 1,
                highlightMode: false
            },
            ...STANDARD_FLASH_SEQUENCE
        ]
    },
    // --- Day 3: Your Eye Movement ---
    {
        day: 3,
        title: "Day 3: Your Eye Movement",
        description: "Train your eyes to move rhythmically across the page.",
        focus: "Eye Movement",
        drift: "Welcome to Day 3! Now that we are widening our vision and silencing the voice, it is time to practice smooth eye movement. Your eyes should jump across the page rather than glide smoothly. We use a bouncing pacer to train these rhythmic jumps.",
        duration: "15 min",
        skills: ["Visual Pacing", "Eye Movement"],
        isLocked: false,
        content: TORTOISE_HARE_TEXT.repeat(10),
        sequence: [
            {
                title: "",
                subtitle: "How the Pacer Works",
                mode: "message",
                wpm: 0,
                duration: 0,
                text: "We are going to start with a Pacer Drill.\n\nWords will be highlighted automatically at a specific speed (300 WPM, then 450 WPM). Your job is simply to keep your eyes on the highlighted word.\n\nDo not try to read aloud in your head. Just let your eyes follow the bouncing ball. If you miss a word, let it go. Keep moving.\n\nWhen you are ready, Click to get started."
            },
            {
                title: "Warmup: Follow the Highlight",
                subtitle: "Let your eyes glide. Don't speak.",
                mode: "normal",
                wpm: 60,
                customInterval: 1000,
                duration: 45,
                chunkSize: 1,
                highlightMode: true
            },
            {
                title: "",
                subtitle: "Getting Faster",
                mode: "message",
                wpm: 0,
                duration: 0,
                autoStart: true,
                text: "We are going to speed things up a little.\n\nYou may not be able to understand everything, but that is OK, just relax and let your eyes follow the red dot a third of a line at a time.\n\nClick here when you are ready."
            },
            {
                title: "Push: Breaking the Voice",
                subtitle: "Faster than you can speak.",
                mode: "normal",
                wpm: 120,
                customInterval: 500,
                duration: 45,
                chunkSize: 1,
                highlightMode: true,
                autoStart: true
            },
            {
                title: "",
                subtitle: "Getting Faster",
                mode: "message",
                wpm: 0,
                duration: 0,
                autoStart: true,
                text: "We are going to speed things up a little.\n\nYou may not be able to understand everything, but that is OK, just relax and let your eyes follow the red dot a third of a line at a time.\n\nClick here when you are ready."
            },
            {
                title: "Push: Breaking the Voice",
                subtitle: "Faster than you can speak.",
                mode: "normal",
                wpm: 180,
                customInterval: 333,
                duration: 45,
                chunkSize: 1,
                highlightMode: true,
                autoStart: true,
                interruptions: [
                    {
                        triggerAtRemaining: 20,
                        text: "You should feel like you can't read the words aloud fast enough.\n\nThat is the goal. Stop trying to speak them. Just look at them as they light up."
                    }
                ]
            },
            {
                title: "",
                subtitle: "Proceeding to Flash Pages",
                mode: "message",
                wpm: 0,
                duration: 0,
                text: "Warmup complete. You have shown your brain that it's possible to process words without speaking them.\n\nWe are now going to begin the core 10-minute Flash Pages sequence to build your neurological speed.\n\nWhen you are ready, click continue to start."
            },
            ...STANDARD_FLASH_SEQUENCE
        ]
    },
    // --- Day 4: Your Confidence ---
    {
        day: 4,
        title: "Day 4: Your Confidence",
        description: "Cultivate a relaxed confidence before diving into the core flash training.",
        focus: "Learning Mindset",
        drift: "Welcome to Day 4. Today is about the Learning Mindset. When you push your reading speed, your comprehension will initially drop. This is not failure; it is the necessary friction of neuroplasticity. To build confidence today, let go of the need to understand every single word perfectly. Trust your incredible visual cortex. Relax your eyes, don't panic if you miss a sentence, and simply let the text wash over you. The comprehension will follow.",
        duration: "15 min",
        skills: ["Relaxation", "Visual Flow"],
        isLocked: false,
        content: SEQUENCE_TEXT,
        sequence: [
            {
                title: "The Learning Mindset",
                subtitle: "The Foundation",
                mode: "message",
                wpm: 0,
                duration: 0,
                text: "Your learning doesn't begin with a book.\n\nIt begins with your mind.\n\nBefore techniques. Before speed reading. What you believe about yourself—right at the start—shapes everything that follows."
            },
            {
                title: "The Learning Mindset",
                subtitle: "The Study",
                mode: "message",
                wpm: 0,
                duration: 0,
                text: "In the 1960s, a study in a primary school told teachers that certain randomly chosen students were “academic bloomers.”\n\nBy the end of the year, those students showed significantly greater progress. Not because of intelligence, but because of expectation."
            },
            {
                title: "The Learning Mindset",
                subtitle: "What This Means for You",
                mode: "message",
                wpm: 0,
                duration: 0,
                text: "You don't have that teacher standing over you. But you do have something just as powerful: the way you speak to yourself before you begin.\n\nWhen you push your reading speed with these drills, you will likely feel uncomfortable. Your comprehension will drop.\n\nThis is not failure; it is the necessary friction of neuroplasticity. We are stretching your abilities."
            },
            {
                title: "The Learning Mindset",
                subtitle: "The Shift to Confidence",
                mode: "message",
                wpm: 0,
                duration: 0,
                text: "Every time you sit down to train, there is a quiet narrative running: “This is going to be hard,” or “I can do this! I can grow into this.”\n\nThat voice matters more than you think. The difference is not intelligence. It’s posture.\n\nIf you want to read faster, you don’t need hype. You need Confidence. Confidence says: “I can grow into this—even if it’s uncomfortable.”"
            },
            {
                title: "A Simple Exercise",
                subtitle: "Remember Confidence",
                mode: "message",
                wpm: 0,
                duration: 0,
                text: "Think back to a time when you were at your most confident. Remember how it felt to feel that way. Carry that into your reading."
            },
            {
                title: "A Simple Exercise",
                subtitle: "Use Your Confidence",
                mode: "message",
                wpm: 0,
                duration: 0,
                text: "Bring that sense of confidence into your reading and see the difference that it makes. Relax your eyes and don't worry about not being able to see everything... the goal is to recognise the difference bringing confidence makes, even into an exercise like this."
            },
            {
                title: "The Learning Mindset",
                subtitle: "",
                mode: "message",
                wpm: 0,
                duration: 0,
                text: "You can do this!"
            },
            ...STANDARD_FLASH_SEQUENCE
        ]
    },
    // --- Day 5: Your Peripheral Vision ---
    {
        day: 5,
        title: "Day 5: Your Peripheral Vision",
        description: "Continue expanding your peripheral capabilities.",
        focus: "Peripheral Vision",
        drift: "Welcome to Day 5! Notice if the edges of the text feel slightly clearer today than they did on Day 1. We're repeating the Peripheral drill at a slightly faster pace.",
        duration: "15 min",
        skills: ["Soft Gaze", "Visual Recognition"],
        isLocked: false,
        content: SEQUENCE_TEXT,
        sequence: [
            {
                title: "",
                subtitle: "Your Peripheral Vision",
                mode: "message",
                wpm: 0,
                duration: 0,
                text: "We are going to start with a Your Peripheral Vision drill.\n\nKeep your eyes locked on the red dot.\n\nDo not move your eyes to read the words. Relax your eyes and experiment with your focus to enlarge your view."
            },
            {
                title: "Warmup: Center-Fixation Expansion",
                subtitle: "Lock your eyes on the red dot. Let your peripheral vision expand outward to catch the words.",
                mode: "peripheral",
                wpm: 500,
                duration: 180,
                chunkSize: 4,
                highlightMode: false,
                reduceFontSizeAfter: 15,
                autoAdvance: true
            },
            {
                title: "",
                subtitle: "Getting Ready",
                mode: "message",
                wpm: 0,
                duration: 0,
                text: "Now we will begin the flash pages exercises. Continue to focus on the middle of the screen and allow your peripheral vision to take in as many words as you can."
            },
            ...STANDARD_FLASH_SEQUENCE
        ]
    },
    // --- Day 6: Kinetic Words ---
    {
        day: 6,
        title: "Day 6: Kinetic Words",
        description: "Push the kinetic limit past the sub-vocalization barrier.",
        focus: "Sub-vocalization",
        drift: "Welcome back! Today we return to Kinetic Words. Let's push the kinetic text speed even faster to completely shatter that inner reading voice before the main drill.",
        duration: "15 min",
        skills: ["Pattern Matching", "Subvocalization Breaking"],
        isLocked: false,
        content: SEQUENCE_TEXT,
        sequence: [
            {
                title: "Warmup: High-Speed Kinetic",
                subtitle: "1000 WPM streams. Do not try to read, just process.",
                mode: "normal",
                wpm: 1000,
                duration: 240,
                chunkSize: 1,
                highlightMode: false
            },
            ...STANDARD_FLASH_SEQUENCE
        ]
    },
    // --- Day 7: Your Eye Movement ---
    {
        day: 7,
        title: "Day 7: Your Eye Movement",
        description: "Sharpening your eye movements at higher speeds.",
        focus: "Eye Movement",
        drift: "Welcome to Day 7! Your eyes are adapting to grouping words together rather than looking at individual ones. This drill will be faster than last time—flow with it.",
        duration: "15 min",
        skills: ["Visual Pacing", "Eye Movement"],
        isLocked: false,
        content: TORTOISE_HARE_TEXT.repeat(10),
        sequence: [
            {
                title: "Warmup: Follow the Highlight",
                subtitle: "Let your eyes glide. Don't speak.",
                mode: "normal",
                wpm: 60,
                customInterval: 800,
                duration: 45,
                chunkSize: 1,
                highlightMode: true,
                autoStart: true
            },
            {
                title: "Push: Breaking the Voice",
                subtitle: "Faster than you can speak.",
                mode: "normal",
                wpm: 120,
                customInterval: 400,
                duration: 45,
                chunkSize: 1,
                highlightMode: true,
                autoStart: true
            },
            {
                title: "Push: Overdrive",
                subtitle: "Just follow the light.",
                mode: "normal",
                wpm: 180,
                customInterval: 250,
                duration: 45,
                chunkSize: 1,
                highlightMode: true,
                autoStart: true
            },
            ...STANDARD_FLASH_SEQUENCE
        ]
    },
    // --- Day 8: Learning Mindset ---
    {
        day: 8,
        title: "Day 8: Your Confidence",
        description: "Maintaining flow state during high speeds.",
        focus: "Learning Mindset",
        drift: "Welcome back! The speeds feel normal now. That is your learning mindset adapting. Let's practice maintaining that flow state.",
        duration: "15 min",
        skills: ["Relaxation", "Visual Flow"],
        isLocked: false,
        content: SEQUENCE_TEXT,
        sequence: [
            {
                title: "Your Confidence",
                subtitle: "The Journey So Far",
                mode: "message",
                wpm: 0,
                duration: 0,
                text: "You are halfway there.\n\nBack on Day 4, we talked about how learning doesn't begin with a book. It begins with your mind."
            },
            {
                title: "Your Confidence",
                subtitle: "The Friction of Growth",
                mode: "message",
                wpm: 0,
                duration: 0,
                text: "You have been pushing your reading speeds into uncomfortable territory.\n\nAs a reminder: When you struggle to comprehend at these new speeds, it is not failure. It is the necessary friction of neuroplasticity."
            },
            {
                title: "Your Confidence",
                subtitle: "The Shift",
                mode: "message",
                wpm: 0,
                duration: 0,
                text: "Every time you sit down to train, that quiet narrative matters: “This is going to be hard,” or “I can do this! I can grow into this.”\n\nIf you want to keep breaking through plateaus, you don’t need hype. You need Confidence."
            },
            {
                title: "A Simple Exercise",
                subtitle: "Remember Confidence",
                mode: "message",
                wpm: 0,
                duration: 0,
                text: "Just like before: Think back to a time when you were at your most confident. Remember how it felt to feel that way. Carry that into today's session."
            },
            {
                title: "A Simple Exercise",
                subtitle: "Use Your Confidence",
                mode: "message",
                wpm: 0,
                duration: 0,
                text: "Bring that sense of confidence into your reading and see the difference that it makes. Relax your eyes and let the text wash over you."
            },
            ...STANDARD_FLASH_SEQUENCE
        ]
    },
    // --- Day 9: Your Peripheral Vision ---
    {
        day: 9,
        title: "Day 9: Your Peripheral Vision",
        description: "Advanced peripheral processing.",
        focus: "Peripheral Vision",
        drift: "Welcome to Day 9! Your peripheral vision is getting stronger. Today we use wider blocks to test your new limits before hitting the flash pages.",
        duration: "15 min",
        skills: ["Soft Gaze", "Visual Recognition"],
        isLocked: false,
        content: SEQUENCE_TEXT,
        sequence: [
            {
                title: "Warmup: Center-Fixation Expansion",
                subtitle: "Lock your eyes on the red dot. Let your peripheral vision expand outward to catch the words.",
                mode: "peripheral",
                wpm: 600,
                duration: 180,
                chunkSize: 4,
                highlightMode: false,
                reduceFontSizeAfter: 15,
                reduceFontSizeAgainAfter: 30,
                autoAdvance: true
            },
            {
                title: "",
                subtitle: "Getting Ready",
                mode: "message",
                wpm: 0,
                duration: 0,
                text: "Now we will begin the flash pages exercises. Continue to focus on the middle of the screen and allow your peripheral vision to take in as many words as you can."
            },
            ...STANDARD_FLASH_SEQUENCE
        ]
    },
    // --- Day 10: Kinetic Words ---
    {
        day: 10,
        title: "Day 10: Kinetic Words",
        description: "Extreme kinetic speed to force visual processing.",
        focus: "Sub-vocalization",
        drift: "Welcome back! Just 5 days left. We are throwing extreme kinetic speeds at you today to completely bypass auditory processing.",
        duration: "15 min",
        skills: ["Pattern Matching", "Subvocalization Breaking"],
        isLocked: false,
        content: SEQUENCE_TEXT,
        sequence: [
            {
                title: "Warmup: Extreme Kinetic",
                subtitle: "Lightning-fast text bursts.",
                mode: "normal",
                wpm: 1200,
                duration: 240,
                chunkSize: 1,
                highlightMode: false
            },
            ...STANDARD_FLASH_SEQUENCE
        ]
    },
    // --- Day 11: Your Eye Movement ---
    {
        day: 11,
        title: "Day 11: Your Eye Movement",
        description: "Maximum pacing rhythm.",
        focus: "Eye Movement",
        drift: "Welcome to Day 11! This is the most demanding pacing drill in the program. Lock into the rhythm.",
        duration: "15 min",
        skills: ["Visual Pacing", "Eye Movement"],
        isLocked: false,
        content: TORTOISE_HARE_TEXT.repeat(10),
        sequence: [
            {
                title: "Warmup: Lightning Pacer",
                subtitle: "Blinking fast.",
                mode: "normal",
                wpm: 200,
                customInterval: 200,
                duration: 120,
                chunkSize: 1,
                highlightMode: true,
                autoStart: true
            },
            ...STANDARD_FLASH_SEQUENCE
        ]
    },
    // --- Day 12: Learning Mindset ---
    {
        day: 12,
        title: "Day 12: Your Confidence",
        description: "Visualizing the end goal of instant comprehension.",
        focus: "Learning Mindset",
        drift: "Welcome back! Imagine absorbing the entire screen in a single heartbeat. Hold that relaxed visual confidence as we warm up today.",
        duration: "15 min",
        skills: ["Visualization", "Speed Perception"],
        isLocked: false,
        content: SEQUENCE_TEXT,
        sequence: [
            {
                title: "Your Confidence",
                subtitle: "The Final Stretch",
                mode: "message",
                wpm: 0,
                duration: 0,
                text: "You are nearing the end of the program.\n\nThe speeds you are reading at today would have seemed completely impossible to you on Day 1."
            },
            {
                title: "Your Confidence",
                subtitle: "The Ongoing Practice",
                mode: "message",
                wpm: 0,
                duration: 0,
                text: "As we push your limits one last time, remember what we discussed on Day 4: What you believe about yourself shapes everything that follows."
            },
            {
                title: "Your Confidence",
                subtitle: "Posturing for Success",
                mode: "message",
                wpm: 0,
                duration: 0,
                text: "You are capable of absorbing vast amounts of visual information. The difference between a master and a novice is not raw intelligence. It’s posture.\n\nConfidence says: “I can comprehend this—even at this blazing speed.”"
            },
            {
                title: "A Simple Exercise",
                subtitle: "Total Confidence",
                mode: "message",
                wpm: 0,
                duration: 0,
                text: "Once more, visualize yourself at your absolute most confident.\n\nBring that ultimate state of flow into this session today. Trust your visual cortex."
            },
            ...STANDARD_FLASH_SEQUENCE
        ]
    },
    // --- Day 13: Free Choice ---
    {
        day: 13,
        title: "Day 13: Free Choice",
        description: "Choose your preferred warmup to conquer your greatest weakness.",
        focus: "Free Choice",
        drift: "Welcome to Day 13! You've mastered the foundational skills. Today, you get to choose exactly which warmup drill you want to do before the Flash Pages session.",
        duration: "15 min",
        skills: ["Mastery", "Self-Assessment"],
        isLocked: false,
        content: SEQUENCE_TEXT,
        choices: [
            {
                title: "Your Peripheral Vision",
                subtitle: "Expand your field of view",
                sequence: [
                    { title: "Warmup", subtitle: "Peripheral", mode: "peripheral", wpm: 600, duration: 180, chunkSize: 4, highlightMode: false },
                    ...STANDARD_FLASH_SEQUENCE
                ]
            },
            {
                title: "Kinetic Words",
                subtitle: "Break inner voice",
                sequence: [
                    { title: "Warmup", subtitle: "Extreme Kinetic", mode: "normal", wpm: 1200, duration: 180, chunkSize: 3, highlightMode: false },
                    ...STANDARD_FLASH_SEQUENCE
                ]
            },
            {
                title: "Your Eye Movement",
                subtitle: "Rhythmic pacing",
                sequence: [
                    { title: "Warmup", subtitle: "Lightning Pacer", mode: "normal", wpm: 200, customInterval: 250, duration: 180, chunkSize: 1, highlightMode: true },
                    ...STANDARD_FLASH_SEQUENCE
                ]
            }
        ]
    },
    // --- Day 14: Free Choice & Graduation ---
    {
        day: 14,
        title: "Day 14: Graduation",
        description: "The final session. Choose your warmup and solidify your new speed reading baseline.",
        focus: "Free Choice",
        drift: "Welcome to Day 14! This is it. Choose your final sprint, and then your last 10-minute Flash Page session to lock in your new reading habits permanently.",
        duration: "15 min",
        skills: ["Mastery"],
        isLocked: false,
        content: SEQUENCE_TEXT,
        choices: [
            {
                title: "Your Peripheral Vision",
                subtitle: "Expand your field of view",
                sequence: [
                    { title: "Warmup", subtitle: "Peripheral", mode: "peripheral", wpm: 600, duration: 180, chunkSize: 4, highlightMode: false },
                    ...STANDARD_FLASH_SEQUENCE
                ]
            },
            {
                title: "Kinetic Words",
                subtitle: "Break inner voice",
                sequence: [
                    { title: "Warmup", subtitle: "Extreme Kinetic", mode: "normal", wpm: 1200, duration: 180, chunkSize: 3, highlightMode: false },
                    ...STANDARD_FLASH_SEQUENCE
                ]
            },
            {
                title: "Your Eye Movement",
                subtitle: "Rhythmic pacing",
                sequence: [
                    { title: "Warmup", subtitle: "Lightning Pacer", mode: "normal", wpm: 200, customInterval: 250, duration: 180, chunkSize: 1, highlightMode: true },
                    ...STANDARD_FLASH_SEQUENCE
                ]
            }
        ]
    }
];
