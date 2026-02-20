"use client";

import DrillContainer from "@/components/drills/DrillContainer";
import { BOOK_PAGES } from "@/data/bookContent";

// Text from User Screenshots
const INTRO_TEXT = [
    "In order for you to genuinely increase your reading speed by at least 50%,",
    "you will need to remove distractions or remove yourself from distractions for the next 20 minutes.",
    "This could be the difference between you saving hundreds of hours of reading time for the rest of your life or not."
];

const RELAX_TEXT = "Relax your eyes";
const RELAX_INSTRUCTION = "Allow your eyes to take in all the words in the oval in one 'view' (without moving your eyes from word to word) — simply look at the middle of the oval shape.";

// Grouped Flash Words (2-3 words per view)
const FLASH_WORDS = [
    "unfocus your",
    "eyes a little",
    "and soften",
    "your gaze",
    "take in all",
    "the words",
    "in the oval",
    "in one view",
    // Transition Text
    "Now, we will",
    "move to the",
    "next exercise.",
    "Follow the",
    "blue asterisks",
    "to get your",
    "eyes used to",
    "moving in a",
    "different pattern",
    "than they",
    "are used to."
];

// Asterisk Pyramid
const PYRAMID_CONTENT = [
    "*",
    "**",
    "***",
    "****",
    "******",
    "********",
    "**********",
    "************",
    "**************",
    "****************",
    "******************"
];

// Content for Expanding Columns
const EXPANDING_TEXT = [
    "This exercise", "will help",
    "you to", "get used",
    "to moving", "your eyes",
    "in a", "different",
    "way than", "you have",
    "been up", "until now."
];

// Content for Three Columns
// We pass this as [LeftCol..., CenterCol..., RightCol...]
// Three Columns Data (Full Sequence)
const THREE_COL_SCREENS = [
    // Screen 1
    {
        left: ["This", "help", "used to", "in a different", "up until now.", "your eyes will"],
        center: ["exercise", "you to", "moving", "way than you", "By using your", "easily be able to"],
        right: ["will", "get", "your eyes", "have been", "peripheral vision", "take in this text."]
    },
    // Screen 2
    {
        left: ["The more", "you’ll find it.", "to see so", "Focus your eyes", "of words.", "you may find", "you do it", "Just allow your eyes"],
        center: ["you do this", "Your eyes", "much more than", "in the centre of", "Because you’re", "this strange,", "the easier", "to move three times"],
        right: ["the easier", "are able", "you realise.", "each group", "just getting started", "but the longer", "it will become.", "per line."]
    },
    // Screen 3
    {
        left: ["We’re going to", "we will increase", "and open them", "Focus your eyes", "of words.", "and flow", "At this stage,"],
        center: ["do that again,", "the speed.", "a little more", "in the centre of", "The goal is to", "as your eyes move", "we are mainly using"],
        right: ["but this time", "Let your eyes relax", "than normal.", "each group", "get a nice rhythm", "across the page.", "easy words."]
    },
    // Screen 4
    {
        left: ["If we used", "slow down more", "we are forcing you", "but when", "you will"],
        center: ["harder words", "to comprehend them.", "to follow along", "you read", "choose your own"],
        right: ["you would need to", "At this stage,", "at this speed,", "by yourself", "comfortable speed."]
    }
];

// Content for Paragraph Pace
const PARAGRAPH_SCREENS = [
    // Screen 1
    [
        "Before we do this again,", "let me stress that", "this is about getting",
        "your eyes used to", "moving differently to", "disrupt your normal",
        "pattern. You may", "not understand it all,", "but we are disrupting your",
        "normal pattern of eye", "movement when reading.", "However, if you",
        "are not distracted", "and able to concentrate,", "you should understand",
        "most of this."
    ],
    // Screen 2
    [
        "By going faster,", "it has helped you to", "reduce how much you hear",
        "the words in your head.", "With easy words,", "you only need to see",
        "them to comprehend them.", "We are also using", "simple grammar to",
        "make it easier to read.", "If you read more", "difficult text you will",
        "need to slow down", "appropriately to understand", "and process it."
    ]
];

// Content for Post-Breath Paragraph
const POST_BREATH_SCREENS = [
    [
        "Let's start again,", "but faster.", "Don't forget to keep your", "\n",
        "eyes relaxed with", "a softened focus", "on the center of each", "\n",
        "group of words", "allowing your peripheral", "vision to take in", "\n",
        "all the words."
    ]
];

// Something Different Stage (3 Columns)
const SOMETHING_DIFFERENT_CONTENT = {
    left: ["Now we are", "To change", "and at the", "sounding out", "we will", "of text", "ONE PAGE", "You did read"],
    center: ["going to do", "your perception", "same time.", "every word", "show you", "at a time.", "of text", "that right!"],
    right: ["something different.", "of speed,", "help you to stop", "in your mind,", "ONE PAGE", "Yes ...", "at a time."]
};

// Look Like This Stage
const LOOK_LIKE_THIS_TEXT = "It will look something like this ...";

const FORCE_PACE_THREE_COL_SCREENS = THREE_COL_SCREENS.slice(0, 4);
const FORCE_PACE_PARAGRAPH_SCREENS = PARAGRAPH_SCREENS;

export default function InitialAssessmentDrill() {
    return (
        <DrillContainer
            title="Phase 1: Foundation"
            introText={["Ready to Initialize?", "Drill 1: The Soft Gaze"]}
            countdownText1={INTRO_TEXT.join(" ")}
            countdownText2="Take a moment to find a place to be relaxed and focussed."
            getStartedText="OK, let's get started ..."
            relaxText={RELAX_TEXT}
            relaxInstruction={RELAX_INSTRUCTION}
            flashWords={FLASH_WORDS}
            flashSpeedMs={1000}
            pyramidContent={PYRAMID_CONTENT}
            pyramidDurationSec={15}
            expandingText={EXPANDING_TEXT}
            threeColScreens={THREE_COL_SCREENS}
            paragraphScreens={PARAGRAPH_SCREENS}
            finalBreathText="Take a deep breath to relax your body and also your eyes."
            finalBreathDurationSec={10}
            postBreathScreens={POST_BREATH_SCREENS}
            threeColScreensRepeated={FORCE_PACE_THREE_COL_SCREENS}
            fasterDescriptionText={["It will just be a bit FASTER.", "Don't worry if you don't understand it."]}
            fifthBreathText="Take a deep breath to relax your body and your eyes."
            somethingDifferentContent={SOMETHING_DIFFERENT_CONTENT}
            lookLikeThisText={LOOK_LIKE_THIS_TEXT}
            bookPages={BOOK_PAGES}
            initialStage="BOOK_INTRO"
        />
    );
}
