"use client";

import React, { useState, useEffect, useRef } from "react";
import { 
  Compass, 
  Brain, 
  Layers, 
  Timer, 
  Search, 
  Sparkles, 
  Volume2, 
  VolumeX, 
  Play, 
  Pause, 
  RotateCcw, 
  BookOpen, 
  Plus, 
  Trash2, 
  AlertTriangle, 
  Check, 
  ArrowRight,
  HelpCircle
} from "lucide-react";

interface Flashcard {
  id: string;
  question: string;
  answer: string;
  tags?: string[];
  ease: "hard" | "medium" | "easy" | "new";
  reviewedCount: number;
}

interface CognitiveToolkitProps {
  userId: string;
}

export default function CognitiveToolkit({ userId }: CognitiveToolkitProps) {
  const [activeSubTab, setActiveSubTab] = useState<"pathfinder" | "feynman" | "recall" | "focus">("pathfinder");

  // ==========================================
  // TAB 1: COGNITIVE PATHFINDER STATE & LOGIC
  // ==========================================
  const [subject, setSubject] = useState("");
  const [learningStyle, setLearningStyle] = useState<"visual" | "auditory" | "reading" | "kinesthetic">("visual");
  const [showStudyGuide, setShowStudyGuide] = useState(false);
  const [guideContent, setGuideContent] = useState<{ title: string; sections: { heading: string; body: string }[] } | null>(null);
  
  // Questionnaire Wizard state
  const [wizardStep, setWizardStep] = useState<"idle" | "questionnaire" | "generating" | "complete">("idle");
  const [focusArea, setFocusArea] = useState<string>("Core Principles & Architecture");
  const [familiarityLevel, setFamiliarityLevel] = useState<string>("Beginner");
  const [questionnaireSubstep, setQuestionnaireSubstep] = useState(1);

  // Interactive UI specific states
  // Visual Mind Map
  const [activeVisualNode, setActiveVisualNode] = useState<string>("input");
  // Reading/Writing Cornell notes
  const [personalNotes, setPersonalNotes] = useState("");
  // Kinesthetic Sandbox Sliders
  const [simLoad, setSimLoad] = useState(50);
  const [simSpeed, setSimSpeed] = useState(400);
  const [simComplexity, setSimComplexity] = useState(3);
  // Kinesthetic Drag-and-swap sequencer cards
  const [kinSteps, setKinSteps] = useState([
    { id: "step-2", text: "Apply Core Operations", correctOrder: 1 },
    { id: "step-4", text: "Execute Memory Recall Loop", correctOrder: 3 },
    { id: "step-1", text: "Isolate Variables", correctOrder: 0 },
    { id: "step-3", text: "Validate Output Metrics", correctOrder: 2 }
  ]);
  const [selectedStepIdx, setSelectedStepIdx] = useState<number | null>(null);

  // Auditory TTS Speech synthesis
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speechRate, setSpeechRate] = useState(1);
  const speechUtteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  // Auto-Flashcard Extractor State
  const [rawTextToExtract, setRawTextToExtract] = useState("");
  const [extractedCards, setExtractedCards] = useState<{ question: string; answer: string }[]>([]);

  // Local Cornell Notes sync
  useEffect(() => {
    if (showStudyGuide && subject && userId) {
      const notesKey = `rogue_cornell_notes_${userId}_${subject.replace(/\s+/g, '_')}`;
      const savedNotes = localStorage.getItem(notesKey);
      setPersonalNotes(savedNotes || "");
    }
  }, [showStudyGuide, subject, userId]);

  const handleNotesChange = (val: string) => {
    setPersonalNotes(val);
    if (subject && userId) {
      const notesKey = `rogue_cornell_notes_${userId}_${subject.replace(/\s+/g, '_')}`;
      localStorage.setItem(notesKey, val);
    }
  };

  // Kinesthetic Step Sequencer Swap logic
  const handleSwapSteps = (idx: number) => {
    if (selectedStepIdx === null) {
      setSelectedStepIdx(idx);
    } else {
      const updatedSteps = [...kinSteps];
      const temp = updatedSteps[selectedStepIdx];
      updatedSteps[selectedStepIdx] = updatedSteps[idx];
      updatedSteps[idx] = temp;
      setKinSteps(updatedSteps);
      setSelectedStepIdx(null);
    }
  };

  const isKinSequenceCorrect = kinSteps.every((step, index) => step.correctOrder === index);

  // Trigger resource search on external sites
  const handleSearchWeb = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject.trim()) return;

    let query = encodeURIComponent(subject);
    let url = "";

    switch (learningStyle) {
      case "visual":
        url = `https://www.youtube.com/results?search_query=${query}+animation+explanation+visual+diagram`;
        break;
      case "auditory":
        url = `https://open.spotify.com/search/${query}%20education`;
        break;
      case "reading":
        url = `https://scholar.google.com/scholar?q=${query}+introduction+overview`;
        break;
      case "kinesthetic":
        url = `https://phet.colorado.edu/en/simulations/filter?query=${query}`;
        break;
    }
    window.open(url, "_blank");
  };

  // Overhauled customized study guide generation based on questionnaire results
  const handleGenerateStudyGuide = () => {
    if (!subject.trim()) return;
    setIsSpeaking(false);
    if (window.speechSynthesis) window.speechSynthesis.cancel();

    const title = `${subject.toUpperCase()} - Complete Study Map`;
    let sections: { heading: string; body: string }[] = [];

    // Synthesize body text utilizing familiarity levels
    const levelIntro = familiarityLevel === "Beginner" 
      ? "Let's begin with simple conceptual frameworks and basic analogies." 
      : familiarityLevel === "Intermediate"
      ? "Assuming foundational awareness, let's focus on system interactions, relationships, and execution flow."
      : "For advanced optimization, let's prioritize edge cases, boundary parameters, and deep synthesis dynamics.";

    switch (learningStyle) {
      case "visual":
        sections = [
          { 
            heading: "Interactive Concept Map Architecture", 
            body: `${levelIntro} Analyze the interactive mind-map diagram below to visualize the layout of ${subject}. The topic flows from the Input Trigger through the Processor Node to produce the final Output. Click on different nodes in the diagram below to explore their functions.` 
          },
          { 
            heading: `Concept Mapping: ${focusArea}`, 
            body: `Focusing on ${focusArea}, mentally map out the system hierarchy. For this, create a colored representation: visualize the Input Node in cobalt blue, the Processor Node in neon green, and the Output State in gold. Track how visual pathways flow from left to right.` 
          },
          { 
            heading: "Visual Retrieval Anchor", 
            body: "To lock this into permanent memory: mentally place a 3D structural model of this topic inside a glowing glass prism. Focus on the central connections. Watch the lines light up when processing variables change." 
          }
        ];
        break;
      case "auditory":
        sections = [
          { 
            heading: "Puffin Audio Brief Transcript", 
            body: `${levelIntro} Welcome to the verbal study guide for ${subject}. Today we are focusing specifically on ${focusArea}. Pay close attention to how the input trigger feeds back into the processing loop to reinforce neural pathways.` 
          },
          { 
            heading: "Verbal Synap-Drill", 
            body: `Repeat the following core definition out loud to activate auditory memory: "The structural essence of ${subject} relies on active feedback signals to adjust processing speed." Close your eyes, listen to the metronome focus sweep, and say it now.` 
          }
        ];
        break;
      case "reading":
        sections = [
          { 
            heading: "Cornell Cues & Outline", 
            body: `Topic Analysis: ${subject}\n- Primary Focus: ${focusArea}\n- Knowledge Target: ${familiarityLevel}\n\nCore Assumptions:\n1. The system state is initialized by external triggers.\n2. Processing efficiency depends on structural complexity.` 
          },
          { 
            heading: "Structured Theoretical Summary", 
            body: `${levelIntro} In academic literature, the study of ${subject} revolves around optimization. By adjusting variables, researchers analyze the variance in output behavior. Double-click any key term to define it in your Cornell notes sheet on the right.` 
          },
          { 
            heading: "Active Retrieval & Review Questions", 
            body: `1. How does the focus area (${focusArea}) behave under basic boundary parameters?\n2. Detail the primary relationship between input nodes and overall system speed.\n3. Critique the standard model of ${subject} from a high-efficiency viewpoint.` 
          }
        ];
        break;
      case "kinesthetic":
        sections = [
          { 
            heading: "Simulator Sandbox Protocol", 
            body: `${levelIntro} Open the Simulator Sandbox below to run an active model. To analyze ${focusArea}, pull the Input Load slider to maximum and observe the system reaction. Adjust the Complexity slider to notice the pacing change.` 
          },
          { 
            heading: "Hands-On Step Sequence Checklist", 
            body: `1. Isolate the independent parameters.\n2. Adjust variable controls manually to change structural states.\n3. Verify the state warnings (Stable, Saturated, or Failed).\n4. Drag the steps in the concept sequence builder below to match the execution pipeline.` 
          },
          { 
            heading: "Practical Model Application", 
            body: "Using a physical notepad or digital whiteboard, sketch out a flowchart of this process. Label each node and draw active connection arrows showing the direction of flow." 
          }
        ];
        break;
    }

    setGuideContent({ title, sections });
    setWizardStep("complete");
    setShowStudyGuide(true);
  };

  // Text-To-Speech Controls
  const toggleSpeech = () => {
    if (!window.speechSynthesis || !guideContent) return;

    if (isSpeaking) {
      window.speechSynthesis.pause();
      setIsSpeaking(false);
    } else {
      if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
        setIsSpeaking(true);
      } else {
        window.speechSynthesis.cancel();
        
        // Compile guide text to read
        const textToRead = `${guideContent.title}. ` + guideContent.sections.map(s => `${s.heading}: ${s.body}`).join(" ");
        const utterance = new SpeechSynthesisUtterance(textToRead);
        utterance.rate = speechRate;
        utterance.onend = () => {
          setIsSpeaking(false);
          speechUtteranceRef.current = null;
        };
        speechUtteranceRef.current = utterance;
        window.speechSynthesis.speak(utterance);
        setIsSpeaking(true);
      }
    }
  };

  const stopSpeech = () => {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      speechUtteranceRef.current = null;
    }
  };

  useEffect(() => {
    if (speechUtteranceRef.current && window.speechSynthesis) {
      // If speed changes, restart speech with new speed
      const wasSpeaking = isSpeaking;
      window.speechSynthesis.cancel();
      if (wasSpeaking && guideContent) {
        const textToRead = `${guideContent.title}. ` + guideContent.sections.map(s => `${s.heading}: ${s.body}`).join(" ");
        const utterance = new SpeechSynthesisUtterance(textToRead);
        utterance.rate = speechRate;
        utterance.onend = () => {
          setIsSpeaking(false);
          speechUtteranceRef.current = null;
        };
        speechUtteranceRef.current = utterance;
        window.speechSynthesis.speak(utterance);
      }
    }
  }, [speechRate]);

  // Client-Side Flashcard Extractor Logic
  const handleExtractFlashcards = () => {
    if (!rawTextToExtract.trim()) return;

    // Split text into sentences
    const sentences = rawTextToExtract.split(/[.!?]+/).map(s => s.trim()).filter(s => s.length > 10);
    const newCards: { question: string; answer: string }[] = [];

    sentences.forEach((sentence) => {
      // Check for common definition markers: is defined as, refers to, is a, means
      const markers = [
        { phrase: " is defined as ", split: "is defined as" },
        { phrase: " refers to ", split: "refers to" },
        { phrase: " is a process where ", split: "is a process where" },
        { phrase: " is the ", split: "is the" },
        { phrase: " means ", split: "means" }
      ];

      for (let marker of markers) {
        if (sentence.toLowerCase().includes(marker.phrase)) {
          const parts = sentence.split(new RegExp(marker.phrase, "i"));
          if (parts[0] && parts[1]) {
            const topic = parts[0].trim();
            const definition = parts[1].trim();
            
            // Format Question: "What does [Topic] refer to / What is [Topic]?"
            let question = `What is ${topic}?`;
            if (marker.split === "refers to") question = `What does "${topic}" refer to?`;
            
            // Capitalize answer
            const answer = definition.charAt(0).toUpperCase() + definition.slice(1);
            
            newCards.push({ question, answer });
            break; // Stop checking markers for this sentence once one matches
          }
        }
      }
    });

    setExtractedCards(newCards);
  };

  // Import extracted cards into the Recall Deck
  const handleImportExtractedCards = () => {
    if (extractedCards.length === 0) return;

    const savedDeck = localStorage.getItem(`rogue_recall_deck_${userId}`);
    let currentDeck: Flashcard[] = savedDeck ? JSON.parse(savedDeck) : [];

    const cardsToImport: Flashcard[] = extractedCards.map((c, i) => ({
      id: `ext-${Date.now()}-${i}`,
      question: c.question,
      answer: c.answer,
      tags: [subject || "Extracted"],
      ease: "new",
      reviewedCount: 0
    }));

    const updatedDeck = [...currentDeck, ...cardsToImport];
    localStorage.setItem(`rogue_recall_deck_${userId}`, JSON.stringify(updatedDeck));
    setRecallDeck(updatedDeck); // Sync Tab 3 state

    alert(`Successfully imported ${extractedCards.length} flashcards into your Recall Deck!`);
    setExtractedCards([]);
    setRawTextToExtract("");
  };

  // ==========================================
  // TAB 2: FEYNMAN CONCEPT SIMPLIFIER
  // ==========================================
  const [feynmanSource, setFeynmanSource] = useState("");
  const [feynmanExplanation, setFeynmanExplanation] = useState("");
  
  // Real-time metrics
  const feynmanWordCount = feynmanExplanation.trim().split(/\s+/).filter(w => w.length > 0).length;
  const isFeynmanOverLimit = feynmanWordCount > 100;

  // Simple Grade Level Index (Gunning-Fog approximation)
  const calculateSimplicityGrade = (text: string): { grade: string; color: string; label: string } => {
    const cleanText = text.trim();
    if (!cleanText) return { grade: "N/A", color: "text-slate-500", label: "No text" };

    const words = cleanText.split(/\s+/).filter(w => w.length > 0);
    const sentences = cleanText.split(/[.!?]+/).filter(s => s.trim().length > 0);
    
    if (words.length === 0 || sentences.length === 0) {
      return { grade: "N/A", color: "text-slate-500", label: "Too short" };
    }

    // Heuristics:
    // Avg sentence length = words / sentences
    // Complex words = words with length > 7 characters
    const avgSentenceLength = words.length / sentences.length;
    const complexWordCount = words.filter(w => w.replace(/[^\w]/g, "").length > 7).length;
    const pctComplexWords = (complexWordCount / words.length) * 100;
    
    const index = Math.round(0.4 * (avgSentenceLength + pctComplexWords));

    if (index <= 5) return { grade: "Grade 5", color: "text-emerald-400", label: "Extremely Simple (Child level)" };
    if (index <= 8) return { grade: "Grade 8", color: "text-indigo-400", label: "Clear & Effective (Layperson level)" };
    if (index <= 12) return { grade: "Grade 12", color: "text-amber-400", label: "Moderately Complex (High School)" };
    return { grade: "Graduate", color: "text-red-400", label: "Highly Complex Jargon (Academic)" };
  };

  const simplicityGrade = calculateSimplicityGrade(feynmanExplanation);

  // Scan text for complex jargon synonyms
  const checkJargonSynonyms = (text: string): { word: string; suggestion: string }[] => {
    const jargonMap: Record<string, string> = {
      utilize: "use",
      utilization: "use",
      facilitate: "help / ease",
      juxtapose: "compare",
      concomitant: "accompanying",
      synergy: "cooperation",
      paradigm: "pattern / model",
      efficacy: "effectiveness",
      conceptualize: "imagine",
      methodology: "method",
      subvocalize: "say in your head"
    };

    const found: { word: string; suggestion: string }[] = [];
    const words = text.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?"']/g, "").split(/\s+/);
    
    Object.keys(jargonMap).forEach((jargon) => {
      if (words.includes(jargon)) {
        found.push({ word: jargon, suggestion: jargonMap[jargon] });
      }
    });

    return found;
  };

  const detectedJargon = checkJargonSynonyms(feynmanExplanation);

  // ==========================================
  // TAB 3: ACTIVE RECALL FLASHCARD DECK
  // ==========================================
  const [recallDeck, setRecallDeck] = useState<Flashcard[]>([]);
  const [newQuestion, setNewQuestion] = useState("");
  const [newAnswer, setNewAnswer] = useState("");
  const [newTag, setNewTag] = useState("");
  
  // Card Flip / Review State
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);
  const [isCardFlipped, setIsCardFlipped] = useState(false);
  const [isReviewMode, setIsReviewMode] = useState(false);

  // Load recall deck from localStorage
  useEffect(() => {
    const savedDeck = localStorage.getItem(`rogue_recall_deck_${userId}`);
    if (savedDeck) {
      setRecallDeck(JSON.parse(savedDeck));
    } else {
      // Load sample flashcards if deck is empty
      const sampleDeck: Flashcard[] = [
        { id: "s1", question: "What is the primary function of subvocalization suppression?", answer: "To bypass the motor-vocal pathway, letting you process words directly at the visual cognitive layer (doubling reading speed).", tags: ["Theory"], ease: "new", reviewedCount: 0 },
        { id: "s2", question: "Explain the Feynman Technique in under 15 words.", answer: "Teach a concept simply to a child to identify gaps in your own understanding.", tags: ["Methods"], ease: "new", reviewedCount: 0 },
        { id: "s3", question: "What is Desirable Difficulty in active recall?", answer: "The mental effort required to retrieve information. Harder retrieval creates stronger neural pathways.", tags: ["Retention"], ease: "new", reviewedCount: 0 }
      ];
      localStorage.setItem(`rogue_recall_deck_${userId}`, JSON.stringify(sampleDeck));
      setRecallDeck(sampleDeck);
    }
  }, [userId]);

  // Create flashcard
  const handleAddCard = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuestion.trim() || !newAnswer.trim()) return;

    const newCard: Flashcard = {
      id: `card-${Date.now()}`,
      question: newQuestion.trim(),
      answer: newAnswer.trim(),
      tags: newTag.trim() ? [newTag.trim()] : ["General"],
      ease: "new",
      reviewedCount: 0
    };

    const updatedDeck = [newCard, ...recallDeck];
    setRecallDeck(updatedDeck);
    localStorage.setItem(`rogue_recall_deck_${userId}`, JSON.stringify(updatedDeck));

    // Reset inputs
    setNewQuestion("");
    setNewAnswer("");
    setNewTag("");
  };

  // Delete card
  const handleDeleteCard = (cardId: string) => {
    const updatedDeck = recallDeck.filter(c => c.id !== cardId);
    setRecallDeck(updatedDeck);
    localStorage.setItem(`rogue_recall_deck_${userId}`, JSON.stringify(updatedDeck));
    if (currentReviewIndex >= updatedDeck.length && currentReviewIndex > 0) {
      setCurrentReviewIndex(updatedDeck.length - 1);
    }
  };

  // Sort deck so Hard or New cards appear first for active recall reviews
  const getReviewQueue = (): Flashcard[] => {
    const priorityWeight = {
      hard: 4,
      new: 3,
      medium: 2,
      easy: 1
    };

    return [...recallDeck].sort((a, b) => priorityWeight[b.ease] - priorityWeight[a.ease]);
  };

  const reviewQueue = getReviewQueue();

  // Rate card recall ease
  const handleRateCard = (rating: "hard" | "medium" | "easy") => {
    const activeCard = reviewQueue[currentReviewIndex];
    if (!activeCard) return;

    const updatedDeck = recallDeck.map((c) => {
      if (c.id === activeCard.id) {
        return {
          ...c,
          ease: rating,
          reviewedCount: c.reviewedCount + 1
        };
      }
      return c;
    });

    setRecallDeck(updatedDeck);
    localStorage.setItem(`rogue_recall_deck_${userId}`, JSON.stringify(updatedDeck));

    // Transition to next card
    setIsCardFlipped(false);
    setTimeout(() => {
      if (currentReviewIndex < reviewQueue.length - 1) {
        setCurrentReviewIndex(prev => prev + 1);
      } else {
        alert("Review Session Complete! Great work exercising active recall.");
        setIsReviewMode(false);
        setCurrentReviewIndex(0);
      }
    }, 300);
  };

  // ==========================================
  // TAB 4: FOCUS SPRINT TIMER STATE & LOGIC
  // ==========================================
  const [timerSeconds, setTimerSeconds] = useState(1500); // 25 minutes
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [metronomeBpm, setMetronomeBpm] = useState(60);
  const [isMetronomeAudioOn, setIsMetronomeAudioOn] = useState(false);
  
  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const metronomeIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);

  // Focus breathing animation cycle index
  const [pulseScale, setPulseScale] = useState(1);

  // Metronome audio pulse generator (oscillator click)
  const playMetronomeClick = () => {
    if (!isMetronomeAudioOn) return;
    try {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      const ctx = audioContextRef.current;
      if (ctx.state === "suspended") {
        ctx.resume();
      }

      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();

      osc.connect(gainNode);
      gainNode.connect(ctx.destination);

      osc.type = "sine";
      osc.frequency.setValueAtTime(200, ctx.currentTime); // Quick low pop
      gainNode.gain.setValueAtTime(0.08, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);

      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.05);
    } catch (e) {
      console.warn("Metronome sound failed:", e);
    }
  };

  // Metronome end chime sound
  const playEndChime = () => {
    try {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      const ctx = audioContextRef.current;
      const now = ctx.currentTime;

      // Play major third sequence
      const frequencies = [523.25, 659.25, 783.99]; // C5, E5, G5
      frequencies.forEach((f, idx) => {
        const osc = ctx.createOscillator();
        const gainNode = ctx.createGain();
        osc.connect(gainNode);
        gainNode.connect(ctx.destination);
        osc.frequency.setValueAtTime(f, now + idx * 0.15);
        gainNode.gain.setValueAtTime(0.1, now + idx * 0.15);
        gainNode.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.15 + 0.4);
        osc.start(now + idx * 0.15);
        osc.stop(now + idx * 0.15 + 0.5);
      });
    } catch (e) {
      console.warn("Chime failed:", e);
    }
  };

  // Timer Countdown Effect
  useEffect(() => {
    if (isTimerRunning) {
      timerIntervalRef.current = setInterval(() => {
        setTimerSeconds((prev) => {
          if (prev <= 1) {
            setIsTimerRunning(false);
            playEndChime();
            // Log sprint completed to local stats
            const currentSprints = parseInt(localStorage.getItem(`rogue_focus_sprints_${userId}`) || "0");
            localStorage.setItem(`rogue_focus_sprints_${userId}`, (currentSprints + 1).toString());
            alert("Sprint Finished! Take a well-deserved 5-minute break.");
            return 1500;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    }

    return () => {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    };
  }, [isTimerRunning]);

  // Metronome Pulse & Audio Beat Effect
  useEffect(() => {
    if (isTimerRunning) {
      const intervalMs = (60 / metronomeBpm) * 1000;
      metronomeIntervalRef.current = setInterval(() => {
        playMetronomeClick();
        // Pulse breathing size trigger
        setPulseScale(1.15);
        setTimeout(() => setPulseScale(1), 150);
      }, intervalMs);
    } else {
      if (metronomeIntervalRef.current) clearInterval(metronomeIntervalRef.current);
    }

    return () => {
      if (metronomeIntervalRef.current) clearInterval(metronomeIntervalRef.current);
    };
  }, [isTimerRunning, metronomeBpm, isMetronomeAudioOn]);

  const formatTimer = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remaining = secs % 60;
    return `${mins.toString().padStart(2, "0")}:${remaining.toString().padStart(2, "0")}`;
  };

  // Clear synthesizers on route shift
  useEffect(() => {
    return () => {
      if (window.speechSynthesis) window.speechSynthesis.cancel();
    };
  }, []);

  return (
    <div className="w-full bg-slate-900 border border-slate-800/80 rounded-3xl p-6 shadow-2xl relative">
      {/* Tab Switcher inside the Cognitive Toolkit */}
      <div className="flex flex-wrap gap-2 mb-8 border-b border-slate-800 pb-4">
        <button
          onClick={() => { stopSpeech(); setActiveSubTab("pathfinder"); }}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm transition-all ${
            activeSubTab === "pathfinder"
              ? "bg-indigo-500 text-white shadow-lg shadow-indigo-500/25"
              : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60"
          }`}
        >
          <Compass className="w-4 h-4" /> Cognitive Pathfinder
        </button>
        <button
          onClick={() => { stopSpeech(); setActiveSubTab("feynman"); }}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm transition-all ${
            activeSubTab === "feynman"
              ? "bg-indigo-500 text-white shadow-lg shadow-indigo-500/25"
              : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60"
          }`}
        >
          <Brain className="w-4 h-4" /> Feynman Simplifier
        </button>
        <button
          onClick={() => { stopSpeech(); setActiveSubTab("recall"); }}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm transition-all ${
            activeSubTab === "recall"
              ? "bg-indigo-500 text-white shadow-lg shadow-indigo-500/25"
              : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60"
          }`}
        >
          <Layers className="w-4 h-4" /> Recall Deck
        </button>
        <button
          onClick={() => { stopSpeech(); setActiveSubTab("focus"); }}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm transition-all ${
            activeSubTab === "focus"
              ? "bg-indigo-500 text-white shadow-lg shadow-indigo-500/25"
              : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60"
          }`}
        >
          <Timer className="w-4 h-4" /> Focus Sprint
        </button>
      </div>

      {/* ==========================================
          TAB 1: COGNITIVE PATHFINDER PANEL
          ========================================== */}
      {activeSubTab === "pathfinder" && (
        <div className="space-y-8 animate-in fade-in duration-300">
          <div className="max-w-2xl">
            <h2 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
              <Compass className="w-5 h-5 text-indigo-400" /> Cognitive Pathfinder & Study Assistant
            </h2>
            <p className="text-slate-400 text-sm leading-relaxed">
              Enter any subject or scientific formula. Find custom tailored search vectors optimized for your specific cognitive learning style, or dynamically compile a local interactive study aid complete with Text-To-Speech audio lecture summaries.
            </p>
          </div>

          {wizardStep === "idle" && (
            <form onSubmit={handleSearchWeb} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end bg-slate-950 p-6 rounded-2xl border border-slate-800/60">
              <div className="md:col-span-2 space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">What subject are you studying?</label>
                <div className="relative">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input
                    type="text"
                    placeholder="e.g. Cellular Mitosis, Neural Networks, Macroeconomics..."
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-slate-900 border border-slate-800 rounded-xl text-slate-200 focus:outline-none focus:border-indigo-500 text-sm"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Your Learning Style</label>
                <select
                  value={learningStyle}
                  onChange={(e: any) => setLearningStyle(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-xl text-slate-200 focus:outline-none focus:border-indigo-500 text-sm"
                >
                  <option value="visual">🎨 Visual (Animations & Maps)</option>
                  <option value="auditory">🔊 Auditory (Podcasts & Speech)</option>
                  <option value="reading">📝 Reading/Writing (Cornell Sheets & Outlines)</option>
                  <option value="kinesthetic">🏃 Kinesthetic (Simulators & Sandboxes)</option>
                </select>
              </div>

              <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <button
                  type="submit"
                  disabled={!subject.trim()}
                  className="py-3 px-6 bg-slate-850 hover:bg-slate-800 disabled:opacity-50 text-indigo-400 border border-slate-800 hover:border-indigo-500/30 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all"
                >
                  Find Best Web Resources <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (subject.trim()) {
                      setWizardStep("questionnaire");
                      setQuestionnaireSubstep(1);
                    }
                  }}
                  disabled={!subject.trim()}
                  className="py-3 px-6 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-md shadow-indigo-600/20"
                >
                  <Sparkles className="w-4 h-4" /> Create Custom Study Guide
                </button>
              </div>
            </form>
          )}

          {/* QUESTIONNAIRE WIZARD STEPPER */}
          {wizardStep === "questionnaire" && (
            <div className="bg-slate-950 border border-indigo-500/25 p-6 md:p-8 rounded-3xl space-y-6 shadow-2xl relative overflow-hidden animate-in zoom-in-95 duration-200">
              <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />
              
              {/* Top Progress bar indicator */}
              <div className="flex items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
                <div>
                  <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest block mb-0.5">Step {questionnaireSubstep} of 2</span>
                  <h3 className="text-base md:text-lg font-bold text-white">Customizing Study Map for <strong className="text-indigo-400">"{subject}"</strong></h3>
                </div>
                <div className="flex gap-1">
                  <div className={`w-6 h-1.5 rounded-full transition-colors ${questionnaireSubstep >= 1 ? "bg-indigo-500" : "bg-slate-800"}`} />
                  <div className={`w-6 h-1.5 rounded-full transition-colors ${questionnaireSubstep >= 2 ? "bg-indigo-500" : "bg-slate-800"}`} />
                </div>
              </div>

              {/* Substep 1: Focus Area selection */}
              {questionnaireSubstep === 1 && (
                <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-200">
                  <p className="text-slate-350 text-xs md:text-sm">What specific sub-topic or focus area should the Pathfinder prioritize?</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {[
                      { area: "Core Principles & Architecture", desc: "Focuses on high-level definitions, structural overview, and main concepts." },
                      { area: "Underlying Dynamics & Mechanics", desc: "Explores variables, mechanics, interactions, and dynamic changes." },
                      { area: "Real-World Practical Applications", desc: "Prioritizes practical situations, use cases, examples, and sandboxes." },
                      { area: "Formula Derivations & Mathematical Proofs", desc: "Prioritizes equations, math proofs, syntax rules, and logical derivation." }
                    ].map((opt) => (
                      <button
                        key={opt.area}
                        type="button"
                        onClick={() => {
                          setFocusArea(opt.area);
                          setQuestionnaireSubstep(2);
                        }}
                        className="p-4 bg-slate-900 border border-slate-800 hover:border-indigo-500 text-left rounded-2xl group transition-all"
                      >
                        <strong className="text-slate-200 text-xs md:text-sm block group-hover:text-indigo-300 font-bold mb-1 transition-colors">{opt.area}</strong>
                        <span className="text-[10px] text-slate-500 leading-normal">{opt.desc}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Substep 2: Knowledge / Familiarity level selection */}
              {questionnaireSubstep === 2 && (
                <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-200">
                  <p className="text-slate-350 text-xs md:text-sm">What is your current familiarity level with this subject?</p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                    {[
                      { level: "Beginner", label: "Beginner", desc: "Start with intuitive analogies, metaphors, and clear core terminology." },
                      { level: "Intermediate", label: "Intermediate", desc: "Focus on connections, operational logic, and standard formulas." },
                      { level: "Advanced", label: "Advanced", desc: "Target edge cases, mathematical optimizations, and speed recall drills." }
                    ].map((opt) => (
                      <button
                        key={opt.level}
                        type="button"
                        onClick={() => {
                          setFamiliarityLevel(opt.level);
                          // Compile study guide
                          setWizardStep("generating");
                          setTimeout(() => {
                            handleGenerateStudyGuide();
                          }, 800);
                        }}
                        className="p-4 bg-slate-900 border border-slate-800 hover:border-indigo-500 text-left rounded-2xl group transition-all flex flex-col justify-between"
                      >
                        <div>
                          <strong className="text-slate-200 text-xs md:text-sm block group-hover:text-indigo-300 font-bold mb-1 transition-colors">{opt.label}</strong>
                          <span className="text-[10px] text-slate-500 leading-normal block mb-4">{opt.desc}</span>
                        </div>
                        <span className="text-[10px] text-indigo-400 font-bold mt-auto group-hover:underline">Select & Synthesize &rarr;</span>
                      </button>
                    ))}
                  </div>
                  <div className="flex justify-between items-center pt-2">
                    <button 
                      type="button" 
                      onClick={() => setQuestionnaireSubstep(1)}
                      className="px-4 py-2 border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-slate-200 text-xs font-bold rounded-lg transition-colors"
                    >
                      &larr; Back
                    </button>
                  </div>
                </div>
              )}

              <button 
                type="button" 
                onClick={() => setWizardStep("idle")}
                className="absolute top-4 right-4 text-xs font-bold text-slate-500 hover:text-slate-300"
              >
                Cancel
              </button>
            </div>
          )}

          {/* GENERATING PLACEHOLDER SPIN */}
          {wizardStep === "generating" && (
            <div className="bg-slate-950 border border-indigo-500/20 p-12 rounded-3xl text-center space-y-4 shadow-2xl flex flex-col items-center justify-center animate-pulse">
              <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
              <h4 className="text-white text-sm font-bold">Synthesizing personalized study parameters...</h4>
              <p className="text-xs text-slate-500">Compiling node architectures, speech brief cues, and simulator variables for {subject}</p>
            </div>
          )}

          {/* Generated Study Guide View */}
          {wizardStep === "complete" && showStudyGuide && guideContent && (
            <div className="border border-indigo-500/25 bg-indigo-950/10 rounded-2xl p-6 md:p-8 space-y-6 shadow-xl relative overflow-hidden animate-in zoom-in-95 duration-200">
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full blur-2xl pointer-events-none" />
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
                <div>
                  <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-indigo-400" /> {guideContent.title}
                  </h3>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <span className="px-2.5 py-1 bg-indigo-500/15 border border-indigo-500/20 text-indigo-300 font-bold uppercase tracking-widest text-[9px] rounded-lg">
                      Style: {learningStyle.toUpperCase()}
                    </span>
                    <span className="px-2.5 py-1 bg-slate-900 border border-slate-850 text-slate-300 font-bold text-[9px] rounded-lg">
                      Level: {familiarityLevel}
                    </span>
                    <span className="px-2.5 py-1 bg-slate-900 border border-slate-850 text-slate-300 font-bold text-[9px] rounded-lg">
                      Focus: {focusArea}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => setWizardStep("idle")}
                    className="px-3.5 py-2 bg-slate-900 hover:bg-slate-850 border border-slate-800 text-slate-400 hover:text-white rounded-lg text-xs font-bold transition-all"
                  >
                    Reset Form
                  </button>

                  {/* Auditory Audio Bar */}
                  {learningStyle === "auditory" && (
                    <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 p-1.5 rounded-xl shrink-0">
                      <button
                        onClick={toggleSpeech}
                        className="p-1.5 bg-indigo-500 hover:bg-indigo-400 text-white rounded-lg transition-colors"
                        title={isSpeaking ? "Pause Audio Summary" : "Play Audio Summary"}
                      >
                        {isSpeaking ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                      </button>
                      <button
                        onClick={stopSpeech}
                        className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white rounded-lg transition-colors"
                        title="Stop Summary"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                      </button>
                      
                      <div className="flex items-center gap-1 text-[10px] font-mono text-slate-400 pr-1">
                        <span>Rate:</span>
                        <select 
                          value={speechRate} 
                          onChange={(e) => setSpeechRate(parseFloat(e.target.value))}
                          className="bg-transparent text-indigo-400 font-bold border-none outline-none cursor-pointer"
                        >
                          <option value="0.75" className="bg-slate-900 text-slate-300">0.75x</option>
                          <option value="1" className="bg-slate-900 text-slate-300">1.0x</option>
                          <option value="1.25" className="bg-slate-900 text-slate-300">1.25x</option>
                          <option value="1.5" className="bg-slate-900 text-slate-300">1.5x</option>
                          <option value="2" className="bg-slate-900 text-slate-300">2.0x</option>
                        </select>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* STUDY GUIDE LAYOUTS BY LEARNING STYLE */}

              {/* 1. VISUAL LEARNER STUDY GUIDE LAYOUT */}
              {learningStyle === "visual" && (
                <div className="space-y-6">
                  {/* Two Column details: description & dynamic SVG node explorer */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {/* Descriptions */}
                    <div className="lg:col-span-5 space-y-4">
                      {guideContent.sections.map((section, idx) => (
                        <div key={idx} className="bg-slate-950/80 border border-slate-850 p-4 rounded-xl relative">
                          <span className="absolute top-3 right-3 text-[10px] font-mono text-slate-600">0{idx+1}</span>
                          <h4 className="font-bold text-slate-200 text-xs uppercase tracking-wider mb-1.5">{section.heading}</h4>
                          <p className="text-slate-400 text-xs md:text-sm leading-relaxed whitespace-pre-line">{section.body}</p>
                        </div>
                      ))}
                    </div>

                    {/* SVG Mind Map Area */}
                    <div className="lg:col-span-7 bg-slate-950 border border-slate-850 p-5 rounded-2xl flex flex-col justify-between space-y-4">
                      <div className="text-center">
                        <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest">Interactive Concept Map</span>
                        <h4 className="text-white text-xs font-bold mt-0.5">Click any node to visual structure connections:</h4>
                      </div>

                      {/* SVG Mind Map Diagram */}
                      <div className="w-full flex justify-center items-center py-4 bg-slate-900/40 rounded-xl">
                        <svg viewBox="0 0 450 180" className="w-full max-w-sm">
                          <defs>
                            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                              <feGaussianBlur stdDeviation="3" result="blur" />
                              <feComposite in="SourceGraphic" in2="blur" operator="over" />
                            </filter>
                          </defs>

                          {/* Connection Lines */}
                          {/* Input to Process */}
                          <line 
                            x1="60" y1="90" x2="200" y2="90" 
                            stroke={activeVisualNode === "input" || activeVisualNode === "processor" ? "#6366f1" : "#1e293b"} 
                            strokeWidth={activeVisualNode === "input" || activeVisualNode === "processor" ? "2.5" : "1.5"} 
                            className="transition-colors duration-300"
                          />
                          {/* Process to Output */}
                          <line 
                            x1="200" y1="90" x2="340" y2="90" 
                            stroke={activeVisualNode === "processor" || activeVisualNode === "output" ? "#10b981" : "#1e293b"} 
                            strokeWidth={activeVisualNode === "processor" || activeVisualNode === "output" ? "2.5" : "1.5"}
                            className="transition-colors duration-300"
                          />
                          {/* Output to Feedback Loop (bottom curve) */}
                          <path 
                            d="M 340 105 A 150 50 0 0 1 60 105" 
                            fill="transparent" 
                            stroke={activeVisualNode === "feedback" ? "#d946ef" : "#1e293b"} 
                            strokeWidth={activeVisualNode === "feedback" ? "2.5" : "1.5"}
                            strokeDasharray="4,4"
                            className="transition-colors duration-300"
                          />

                          {/* Node Group 1: INPUT */}
                          <g className="cursor-pointer" onClick={() => setActiveVisualNode("input")}>
                            <circle 
                              cx="60" cy="90" r="30" 
                              fill="#090d16" 
                              stroke={activeVisualNode === "input" ? "#6366f1" : "#1e293b"} 
                              strokeWidth="2" 
                              filter={activeVisualNode === "input" ? "url(#glow)" : ""}
                              className="transition-all duration-300"
                            />
                            <text x="60" y="93" textAnchor="middle" fill={activeVisualNode === "input" ? "#a5b4fc" : "#475569"} fontSize="8" fontWeight="bold">INPUT</text>
                            <circle cx="60" cy="90" r="4" fill="#6366f1" />
                          </g>

                          {/* Node Group 2: PROCESSOR */}
                          <g className="cursor-pointer" onClick={() => setActiveVisualNode("processor")}>
                            <circle 
                              cx="200" cy="90" r="32" 
                              fill="#090d16" 
                              stroke={activeVisualNode === "processor" ? "#10b981" : "#1e293b"} 
                              strokeWidth="2" 
                              filter={activeVisualNode === "processor" ? "url(#glow)" : ""}
                              className="transition-all duration-300"
                            />
                            <text x="200" y="93" textAnchor="middle" fill={activeVisualNode === "processor" ? "#6ee7b7" : "#475569"} fontSize="8" fontWeight="bold">PROCESSOR</text>
                            <circle cx="200" cy="90" r="4" fill="#10b981" />
                          </g>

                          {/* Node Group 3: OUTPUT */}
                          <g className="cursor-pointer" onClick={() => setActiveVisualNode("output")}>
                            <circle 
                              cx="340" cy="90" r="30" 
                              fill="#090d16" 
                              stroke={activeVisualNode === "output" ? "#fbbf24" : "#1e293b"} 
                              strokeWidth="2" 
                              filter={activeVisualNode === "output" ? "url(#glow)" : ""}
                              className="transition-all duration-300"
                            />
                            <text x="340" y="93" textAnchor="middle" fill={activeVisualNode === "output" ? "#fde047" : "#475569"} fontSize="8" fontWeight="bold">OUTPUT</text>
                            <circle cx="340" cy="90" r="4" fill="#fbbf24" />
                          </g>

                          {/* Node Group 4: FEEDBACK LOOP */}
                          <g className="cursor-pointer" onClick={() => setActiveVisualNode("feedback")}>
                            <rect 
                              x="165" y="145" width="70" height="22" rx="6"
                              fill="#090d16" 
                              stroke={activeVisualNode === "feedback" ? "#d946ef" : "#1e293b"} 
                              strokeWidth="2" 
                              filter={activeVisualNode === "feedback" ? "url(#glow)" : ""}
                              className="transition-all duration-300"
                            />
                            <text x="200" y="158" textAnchor="middle" fill={activeVisualNode === "feedback" ? "#f472b6" : "#475569"} fontSize="7" fontWeight="bold">FEEDBACK LOOP</text>
                          </g>
                        </svg>
                      </div>

                      {/* Explanation box for selected Visual Node */}
                      <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl space-y-1 min-h-[90px] animate-in fade-in zoom-in-95 duration-200">
                        {activeVisualNode === "input" && (
                          <>
                            <strong className="text-indigo-400 text-xs flex items-center gap-1.5 font-bold">🔵 Input Node (Initial State)</strong>
                            <p className="text-slate-400 text-xs leading-normal">
                              Initiates study focus on <strong>"{subject}"</strong>. Represents the raw data inputs, initial theories, or academic facts that launch your comprehension pipeline.
                            </p>
                          </>
                        )}
                        {activeVisualNode === "processor" && (
                          <>
                            <strong className="text-emerald-400 text-xs flex items-center gap-1.5 font-bold">🟢 Processor Node (Conceptual Synthesis)</strong>
                            <p className="text-slate-400 text-xs leading-normal">
                              Applies your specific focus area (<strong>{focusArea}</strong>) to simplify definitions, link relationships, and suppress verbal vocalization.
                            </p>
                          </>
                        )}
                        {activeVisualNode === "output" && (
                          <>
                            <strong className="text-amber-400 text-xs flex items-center gap-1.5 font-bold">🟡 Output Node (Retained Knowledge)</strong>
                            <p className="text-slate-400 text-xs leading-normal">
                              The result phase of compilation. Translates study text into permanent neural maps, graduation recall decks, and active flashcards.
                            </p>
                          </>
                        )}
                        {activeVisualNode === "feedback" && (
                          <>
                            <strong className="text-fuchsia-400 text-xs flex items-center gap-1.5 font-bold">🟣 Feedback Loop (Desirable Difficulty)</strong>
                            <p className="text-slate-400 text-xs leading-normal">
                              Sends memory retrieval output back to input triggers. Exercises active recall, identifying structural gaps in understanding.
                            </p>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* 2. AUDITORY LEARNER STUDY GUIDE LAYOUT */}
              {learningStyle === "auditory" && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {/* Explanations */}
                    <div className="lg:col-span-6 space-y-4">
                      {guideContent.sections.map((section, idx) => (
                        <div key={idx} className="bg-slate-950/80 border border-slate-850 p-4 rounded-xl relative">
                          <span className="absolute top-3 right-3 text-[10px] font-mono text-slate-600">0{idx+1}</span>
                          <h4 className="font-bold text-slate-200 text-xs uppercase tracking-wider mb-1.5">{section.heading}</h4>
                          <p className="text-slate-400 text-xs md:text-sm leading-relaxed">{section.body}</p>
                        </div>
                      ))}
                    </div>

                    {/* Podcast/Speech simulator panel */}
                    <div className="lg:col-span-6 bg-slate-950 border border-slate-850 p-5 rounded-2xl flex flex-col justify-between space-y-6">
                      <div className="text-center">
                        <span className="text-[10px] font-bold text-fuchsia-400 uppercase tracking-widest">Puffin Brief Audio Simulator</span>
                        <h4 className="text-white text-xs font-bold mt-0.5">Listen to Host Discussion & Verbal Drills</h4>
                      </div>

                      {/* Mock Podcast Hosts */}
                      <div className="flex justify-center items-center gap-8 py-4">
                        <div className="text-center space-y-2">
                          <div className="w-14 h-14 rounded-full bg-slate-900 border border-indigo-500/30 flex items-center justify-center text-2xl mx-auto shadow-md">
                            🐧
                          </div>
                          <div>
                            <strong className="text-slate-200 text-xs block font-bold">Rogue Puffin</strong>
                            <span className="text-[9px] text-indigo-400 uppercase font-mono font-bold tracking-wider">Coach</span>
                          </div>
                        </div>

                        <div className="text-center space-y-2">
                          <div className="w-14 h-14 rounded-full bg-slate-900 border border-fuchsia-500/30 flex items-center justify-center text-2xl mx-auto shadow-md">
                            🎓
                          </div>
                          <div>
                            <strong className="text-slate-200 text-xs block font-bold">Dr. H. Puffin</strong>
                            <span className="text-[9px] text-fuchsia-400 uppercase font-mono font-bold tracking-wider">Memory Specialist</span>
                          </div>
                        </div>
                      </div>

                      {/* Glowing pulsing audio visualizer bars */}
                      <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-850 flex flex-col items-center space-y-3">
                        <div className="flex justify-center items-end gap-1.5 h-10">
                          {[3, 6, 8, 5, 7, 4, 6, 3, 5, 8, 4, 7, 3].map((height, i) => (
                            <div 
                              key={i} 
                              style={{ 
                                height: isSpeaking ? `${height * 4 + Math.sin(Date.now() + i) * 6}px` : "6px",
                                animation: isSpeaking ? `pulse 1.2s ease-in-out infinite alternate` : "none",
                                animationDelay: `${i * 0.1}s`
                              }}
                              className="w-1.5 rounded-full bg-gradient-to-t from-indigo-500 via-purple-500 to-fuchsia-500 transition-all duration-300"
                            />
                          ))}
                        </div>
                        <span className="text-[9px] font-mono text-slate-500">
                          {isSpeaking ? "TTS BRIEF ACTIVE: Audio sweep rendering..." : "AUDIO PREPARED: Click Play to start brief summary"}
                        </span>
                      </div>

                      {/* Audio Controls */}
                      <div className="flex items-center justify-center gap-4">
                        <button
                          onClick={toggleSpeech}
                          className="py-3 px-6 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold text-xs flex items-center gap-2 transition-all shadow-md shadow-indigo-600/20"
                        >
                          {isSpeaking ? (
                            <>
                              <Pause className="w-4 h-4" /> Pause Lesson
                            </>
                          ) : (
                            <>
                              <Play className="w-4 h-4 fill-current" /> Listen to Audio Summary
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* 3. READING/WRITING LEARNER LAYOUT */}
              {learningStyle === "reading" && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {/* Left Column: Cornell Questions (Cues) */}
                    <div className="lg:col-span-5 space-y-4">
                      <div className="text-center lg:text-left">
                        <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest">Active Recall Cues</span>
                        <h4 className="text-white text-xs font-bold mt-0.5">Review Retrieval Prompts:</h4>
                      </div>

                      <div className="space-y-3">
                        {guideContent.sections.map((section, idx) => (
                          <div key={idx} className="bg-slate-950 border border-slate-850 p-4 rounded-xl relative group hover:border-amber-500/30 transition-all">
                            <span className="absolute top-3 right-3 text-[10px] font-mono text-slate-600 font-bold">Q{idx+1}</span>
                            <h5 className="font-bold text-amber-300 text-xs uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                              <HelpCircle className="w-3.5 h-3.5" /> Retrieval Prompt
                            </h5>
                            <p className="text-slate-350 text-xs font-bold mb-2">Based on: "{section.heading}"</p>
                            <div className="text-slate-400 text-xs leading-relaxed border-l border-slate-850 pl-3 italic">
                              "{section.body.substring(0, 120)}..."
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Right Column: Cornell Notes Area */}
                    <div className="lg:col-span-7 bg-slate-950 border border-slate-850 p-5 rounded-2xl flex flex-col justify-between space-y-4">
                      <div>
                        <div className="flex justify-between items-center">
                          <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest">Cornell Study Sheet Note Taking</span>
                          <span className="text-[9px] text-emerald-400 font-mono">💾 Autosaved</span>
                        </div>
                        <h4 className="text-white text-xs font-bold mt-0.5">Actively summarize complex principles in your own words:</h4>
                      </div>

                      <textarea
                        value={personalNotes}
                        onChange={(e) => handleNotesChange(e.target.value)}
                        placeholder={`Start writing your synthesized Cornell notes on ${subject} here...\n\n- Summarize main formulas:\n- Document key definitions:\n- Critically review relationships:\n\nWriting by hand is highly effective for visual processing integration.`}
                        className="w-full h-80 bg-slate-900 border border-slate-850 rounded-xl p-4 text-slate-300 text-xs md:text-sm focus:outline-none focus:border-amber-500 resize-none font-sans font-light leading-relaxed"
                      />

                      <div className="bg-slate-900 border border-slate-850 p-3 rounded-lg text-[10px] text-slate-500 leading-normal">
                        <strong>Study Note:</strong> Your typed summaries are saved securely to your local browser cache per subject. Review this summary sheet repeatedly to execute active retrieval.
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* 4. KINESTHETIC LEARNER LAYOUT */}
              {learningStyle === "kinesthetic" && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {/* Explanations & Text instructions */}
                    <div className="lg:col-span-5 space-y-4">
                      {guideContent.sections.map((section, idx) => (
                        <div key={idx} className="bg-slate-950/80 border border-slate-850 p-4 rounded-xl relative">
                          <span className="absolute top-3 right-3 text-[10px] font-mono text-slate-600">0{idx+1}</span>
                          <h4 className="font-bold text-slate-200 text-xs uppercase tracking-wider mb-1.5">{section.heading}</h4>
                          <p className="text-slate-400 text-xs md:text-sm leading-relaxed">{section.body}</p>
                        </div>
                      ))}
                    </div>

                    {/* Interactive Sandbox & Step sorter widgets */}
                    <div className="lg:col-span-7 bg-slate-950 border border-slate-850 p-5 rounded-2xl space-y-6">
                      
                      {/* Section A: Simulator Sandbox variables */}
                      <div className="space-y-4 border-b border-slate-850 pb-5">
                        <div className="text-center lg:text-left">
                          <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest block">Sandbox Simulator Controls</span>
                          <h4 className="text-white text-xs font-bold mt-0.5">Manually adjust variables to study state variance:</h4>
                        </div>

                        {/* Slider controls */}
                        <div className="space-y-3.5">
                          {/* System Load */}
                          <div className="space-y-1">
                            <div className="flex justify-between text-xs text-slate-400 font-bold">
                              <span>System Load Load Coefficient</span>
                              <span className="text-emerald-400">{simLoad}%</span>
                            </div>
                            <input 
                              type="range" min="10" max="100" value={simLoad} 
                              onChange={(e) => setSimLoad(parseInt(e.target.value))} 
                              className="w-full accent-emerald-500 h-1 bg-slate-900 rounded-lg"
                            />
                          </div>

                          {/* Processing pacing speed */}
                          <div className="space-y-1">
                            <div className="flex justify-between text-xs text-slate-400 font-bold">
                              <span>Drill Speed Pacing Rate</span>
                              <span className="text-emerald-400">{simSpeed} WPM</span>
                            </div>
                            <input 
                              type="range" min="200" max="1200" step="50" value={simSpeed} 
                              onChange={(e) => setSimSpeed(parseInt(e.target.value))} 
                              className="w-full accent-emerald-500 h-1 bg-slate-900 rounded-lg"
                            />
                          </div>

                          {/* Complexity Scale */}
                          <div className="space-y-1">
                            <div className="flex justify-between text-xs text-slate-400 font-bold">
                              <span>Conceptual Jargon Complexity</span>
                              <span className="text-emerald-400">Level {simComplexity}/5</span>
                            </div>
                            <input 
                              type="range" min="1" max="5" value={simComplexity} 
                              onChange={(e) => setSimComplexity(parseInt(e.target.value))} 
                              className="w-full accent-emerald-500 h-1 bg-slate-900 rounded-lg"
                            />
                          </div>
                        </div>

                        {/* Computed Status warning widget */}
                        <div className={`p-4 rounded-xl border transition-all text-xs font-bold leading-normal ${
                          simLoad > 80 && simComplexity >= 4
                            ? "bg-rose-500/10 border-rose-500/20 text-rose-400"
                            : simSpeed > 800 && simComplexity >= 3
                            ? "bg-amber-500/10 border-amber-500/20 text-amber-400"
                            : "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
                        }`}>
                          {simLoad > 80 && simComplexity >= 4 ? (
                            <>
                              ⚠️ CRITICAL STATE: Saturated. System load is too high for this complexity grade. Heavy subvocalization likely. Reduce variables to restore memory retention efficiency.
                            </>
                          ) : simSpeed > 800 && simComplexity >= 3 ? (
                            <>
                              ⚡ HYPER-INGESTION FLOW: Cognitive load limits are highly active. Ideal for peripheral visual sweep drills. High attention focus needed.
                            </>
                          ) : (
                            <>
                              🟢 OPTIMIZED COGNITIVE PACE: Active recall paths are clear. Conceptual understanding and speed processing are perfectly balanced.
                            </>
                          )}
                        </div>
                      </div>

                      {/* Section B: Drag & swap sequencing drill */}
                      <div className="space-y-3">
                        <div>
                          <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest block">Execution Sequencing Drill</span>
                          <h4 className="text-white text-xs font-bold mt-0.5">Click two steps sequentially to swap and order the study flow:</h4>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {kinSteps.map((step, idx) => (
                            <button
                              key={step.id}
                              type="button"
                              onClick={() => handleSwapSteps(idx)}
                              className={`p-3 border text-left text-xs font-bold rounded-xl flex items-center justify-between transition-all ${
                                selectedStepIdx === idx
                                  ? "bg-indigo-500/10 border-indigo-500 text-indigo-400"
                                  : "bg-slate-900 border-slate-800 text-slate-350 hover:border-slate-700"
                              }`}
                            >
                              <span>{idx + 1}. {step.text}</span>
                              <span className="text-[9px] text-slate-500 uppercase font-mono font-bold">Step {step.correctOrder + 1}</span>
                            </button>
                          ))}
                        </div>

                        {/* Sequence correct alert banner */}
                        {isKinSequenceCorrect ? (
                          <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 animate-bounce">
                            <Check className="w-4 h-4" /> Sequence Validated! The execution path is correctly ordered.
                          </div>
                        ) : (
                          <div className="text-[10px] text-slate-500 text-center">
                            Tip: Rearrange the steps to sequence from 1 to 4: "Isolate Variables" &rarr; "Apply Operations" &rarr; "Validate Metrics" &rarr; "Recall Loop".
                          </div>
                        )}
                      </div>

                    </div>
                  </div>
                </div>
              )}

              {/* Extracted Interactive Flashcard block */}
              <div className="border-t border-slate-800 pt-6 space-y-4">
                <div className="max-w-xl">
                  <h4 className="font-bold text-white text-sm mb-1">Generate Flashcards from Subject Material</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Paste textbook paragraphs below. The parser extracts key concept assertions to instantly populate your Recall Deck.
                  </p>
                </div>

                <div className="space-y-3">
                  <textarea
                    placeholder="e.g. Mitochondria is the power generator of cellular structures. Photosynthesis refers to how plant cells synthesize starch using light signals."
                    value={rawTextToExtract}
                    onChange={(e) => setRawTextToExtract(e.target.value)}
                    className="w-full h-24 bg-slate-950 border border-slate-800 rounded-xl p-4 text-slate-300 text-xs focus:outline-none focus:border-indigo-500 resize-none font-sans"
                  />
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <button
                      type="button"
                      onClick={handleExtractFlashcards}
                      disabled={!rawTextToExtract.trim()}
                      className="px-4 py-2 bg-slate-800 hover:bg-slate-700 disabled:opacity-50 text-slate-300 border border-slate-700 rounded-lg text-xs font-bold transition-all"
                    >
                      Extract Key Concepts
                    </button>

                    {extractedCards.length > 0 && (
                      <button
                        type="button"
                        onClick={handleImportExtractedCards}
                        className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold transition-all shadow-md shadow-emerald-600/20"
                      >
                        Import {extractedCards.length} Flashcards to Deck
                      </button>
                    )}
                  </div>
                </div>

                {extractedCards.length > 0 && (
                  <div className="bg-slate-950 border border-slate-850 p-4 rounded-xl space-y-2">
                    <h5 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Extracted Deck Preview</h5>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-40 overflow-y-auto pr-2">
                      {extractedCards.map((c, i) => (
                        <div key={i} className="bg-slate-900 p-3 rounded-lg border border-slate-800/80 text-xs">
                          <strong className="text-indigo-400 block mb-1">Q: {c.question}</strong>
                          <span className="text-slate-400">A: {c.answer}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

            </div>
          )}
        </div>
      )}

      {/* ==========================================
          TAB 2: FEYNMAN CONCEPT SIMPLIFIER
          ========================================== */}
      {activeSubTab === "feynman" && (
        <div className="space-y-6 animate-in fade-in duration-300">
          <div className="max-w-2xl">
            <h2 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
              <Brain className="w-5 h-5 text-indigo-400" /> Feynman Concept Simplifier
            </h2>
            <p className="text-slate-400 text-sm leading-relaxed">
              Synthesize learning by rewriting complex ideas simply. The Feynman technique highlights structural knowledge gaps. Enforce a 100-word constraint and test against jargon parameters.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Pane: Complex Source */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Jargon-Heavy Source Material</label>
              <textarea
                placeholder="Paste the textbook notes, equations, or scientific definitions here..."
                value={feynmanSource}
                onChange={(e) => setFeynmanSource(e.target.value)}
                className="w-full flex-1 min-h-60 bg-slate-950 border border-slate-800 rounded-2xl p-4 text-slate-350 text-sm focus:outline-none focus:border-indigo-500 resize-none font-sans"
              />
            </div>

            {/* Right Pane: Simplification Box */}
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Explain it like I am 10 years old</label>
                <span className={`text-xs font-mono font-bold ${isFeynmanOverLimit ? 'text-red-400' : 'text-indigo-400'}`}>
                  {feynmanWordCount} / 100 words
                </span>
              </div>
              <textarea
                placeholder="Rewrite the concept using simple terms, analogies, and straightforward language..."
                value={feynmanExplanation}
                onChange={(e) => setFeynmanExplanation(e.target.value)}
                className="w-full flex-1 min-h-60 bg-slate-950 border border-slate-800 rounded-2xl p-4 text-slate-200 text-sm focus:outline-none focus:border-indigo-500 resize-none font-sans"
              />
            </div>
          </div>

          {/* Real-time Heuristic feedback block */}
          {feynmanExplanation.trim().length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border border-slate-800 bg-slate-950/60 p-5 rounded-2xl">
              
              <div className="space-y-1">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Simplicity Score</span>
                <div className={`text-2xl font-black ${simplicityGrade.color}`}>{simplicityGrade.grade}</div>
                <p className="text-xs text-slate-400">{simplicityGrade.label}</p>
              </div>

              <div className="md:col-span-2 space-y-2 border-t md:border-t-0 md:border-l border-slate-850 pt-3 md:pt-0 md:pl-5">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-widest block mb-1">Jargon & Complexity Scanner</span>
                {detectedJargon.length === 0 ? (
                  <div className="text-emerald-400 text-sm font-bold flex items-center gap-1.5">
                    <Check className="w-4 h-4" /> No complex jargon words detected! Great job.
                  </div>
                ) : (
                  <div className="space-y-1.5">
                    <div className="text-amber-400 text-xs font-bold flex items-center gap-1.5">
                      <AlertTriangle className="w-4 h-4" /> Detected {detectedJargon.length} complex word(s):
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {detectedJargon.map((j, i) => (
                        <span key={i} className="text-xs bg-slate-900 border border-slate-800 px-2 py-1 rounded text-slate-350">
                          <strong className="text-amber-400">{j.word}</strong> &rarr; use <strong className="text-indigo-400">{j.suggestion}</strong>
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

            </div>
          )}
        </div>
      )}

      {/* ==========================================
          TAB 3: ACTIVE RECALL FLASHCARD DECK
          ========================================== */}
      {activeSubTab === "recall" && (
        <div className="space-y-6 animate-in fade-in duration-300">
          
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="max-w-lg">
              <h2 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                <Layers className="w-5 h-5 text-indigo-400" /> Active Recall Deck
              </h2>
              <p className="text-slate-400 text-sm leading-relaxed">
                Retrieve memories deliberately. Creating and self-grading flashcards forces neural strengthening. Harder cards appear first in review mode.
              </p>
            </div>
            
            {!isReviewMode && recallDeck.length > 0 && (
              <button
                onClick={() => { setIsReviewMode(true); setCurrentReviewIndex(0); setIsCardFlipped(false); }}
                className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-sm flex items-center gap-2 transition-all hover:scale-105 shadow-md shadow-indigo-600/20"
              >
                <Play className="w-4 h-4 fill-white" /> Start Spaced Review ({recallDeck.length})
              </button>
            )}
          </div>

          {isReviewMode && reviewQueue[currentReviewIndex] ? (
            /* ACTIVE DECK REVIEW SCENARIO */
            <div className="max-w-xl mx-auto space-y-6">
              
              <div className="flex justify-between items-center text-xs font-mono text-slate-400">
                <span>Card {currentReviewIndex + 1} of {reviewQueue.length}</span>
                <button
                  onClick={() => setIsReviewMode(false)}
                  className="text-slate-500 hover:text-white transition-colors uppercase font-bold tracking-wider"
                >
                  Exit Review
                </button>
              </div>

              {/* 3D Rotating Card Structure */}
              <div 
                onClick={() => setIsCardFlipped(!isCardFlipped)}
                className="w-full h-80 cursor-pointer"
                style={{ perspective: "1000px" }}
              >
                <div 
                  className="relative w-full h-full duration-500 rounded-3xl"
                  style={{
                    transformStyle: "preserve-3d",
                    transform: isCardFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
                    transition: "transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)"
                  }}
                >
                  {/* Card Front: Question */}
                  <div 
                    className="absolute inset-0 w-full h-full bg-slate-950 border border-slate-800 hover:border-indigo-500/30 rounded-3xl p-8 flex flex-col justify-between shadow-2xl"
                    style={{ backfaceVisibility: "hidden" }}
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-bold font-mono tracking-widest text-indigo-400 bg-indigo-950/45 px-2.5 py-1 rounded-full uppercase">
                        {reviewQueue[currentReviewIndex].tags?.[0] || "General"}
                      </span>
                      <span className="text-[10px] font-mono text-slate-600 uppercase">Click Card to Flip</span>
                    </div>

                    <div className="text-center text-lg md:text-xl font-bold text-slate-100 px-4">
                      {reviewQueue[currentReviewIndex].question}
                    </div>

                    <div className="text-center text-xs text-slate-500 font-mono">
                      Recall state: <span className="font-bold text-indigo-300 uppercase">{reviewQueue[currentReviewIndex].ease}</span>
                    </div>
                  </div>

                  {/* Card Back: Answer */}
                  <div 
                    className="absolute inset-0 w-full h-full bg-slate-950 border border-emerald-500/20 rounded-3xl p-8 flex flex-col justify-between shadow-2xl"
                    style={{ 
                      backfaceVisibility: "hidden", 
                      transform: "rotateY(180deg)"
                    }}
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-bold font-mono tracking-widest text-emerald-400 bg-emerald-950/45 px-2.5 py-1 rounded-full uppercase">
                        Answer
                      </span>
                      <span className="text-[10px] font-mono text-slate-600 uppercase">Click Card to Flip</span>
                    </div>

                    <div className="text-center text-base md:text-lg text-slate-200 px-4 leading-relaxed overflow-y-auto max-h-40">
                      {reviewQueue[currentReviewIndex].answer}
                    </div>

                    <div className="w-full text-center text-xs text-slate-500 font-mono">
                      Answer Revealed
                    </div>
                  </div>

                </div>
              </div>

              {/* Rating Actions under Card */}
              <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 text-center space-y-4">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block">How difficult was it to recall?</span>
                <div className="grid grid-cols-3 gap-3">
                  <button
                    onClick={() => handleRateCard("hard")}
                    className="py-3 bg-red-950/30 hover:bg-red-900/30 border border-red-900/30 hover:border-red-500 text-red-300 font-bold rounded-xl text-xs transition-all uppercase"
                  >
                    🔴 Hard
                  </button>
                  <button
                    onClick={() => handleRateCard("medium")}
                    className="py-3 bg-indigo-950/30 hover:bg-indigo-900/30 border border-indigo-900/30 hover:border-indigo-500 text-indigo-300 font-bold rounded-xl text-xs transition-all uppercase"
                  >
                    🟡 Medium
                  </button>
                  <button
                    onClick={() => handleRateCard("easy")}
                    className="py-3 bg-emerald-950/30 hover:bg-emerald-900/30 border border-emerald-900/30 hover:border-emerald-500 text-emerald-300 font-bold rounded-xl text-xs transition-all uppercase"
                  >
                    🟢 Easy
                  </button>
                </div>
              </div>

            </div>
          ) : (
            /* GALLERY SCENARIO (DECK VIEW & CREATION FORM) */
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* Creator Form Sidebar */}
              <div className="lg:col-span-1">
                <form onSubmit={handleAddCard} className="bg-slate-950 border border-slate-850 rounded-2xl p-5 space-y-4 shadow-xl">
                  <h3 className="font-bold text-white text-base mb-2 flex items-center gap-2">
                    <Plus className="w-4 h-4 text-indigo-400" /> Add New Card
                  </h3>
                  
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Question</label>
                    <textarea
                      placeholder="e.g. What is subvocalization?"
                      value={newQuestion}
                      onChange={(e) => setNewQuestion(e.target.value)}
                      required
                      className="w-full h-20 bg-slate-900 border border-slate-800 rounded-xl p-3 text-slate-200 text-sm focus:outline-none focus:border-indigo-500 resize-none font-sans"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Answer</label>
                    <textarea
                      placeholder="e.g. Talking to yourself inside your head while reading."
                      value={newAnswer}
                      onChange={(e) => setNewAnswer(e.target.value)}
                      required
                      className="w-full h-24 bg-slate-900 border border-slate-800 rounded-xl p-3 text-slate-200 text-sm focus:outline-none focus:border-indigo-500 resize-none font-sans"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Tag / Deck Folder</label>
                    <input
                      type="text"
                      placeholder="e.g. Science, Biology (Optional)"
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-slate-200 focus:outline-none focus:border-indigo-500 text-sm"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-sm transition-all"
                  >
                    Add Card
                  </button>
                </form>
              </div>

              {/* Cards Grid List */}
              <div className="lg:col-span-2 space-y-4">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-widest block">Recall Deck Cards ({recallDeck.length})</span>
                
                {recallDeck.length === 0 ? (
                  <div className="bg-slate-950 border border-slate-850 p-8 rounded-2xl text-center text-slate-500">
                    No flashcards in your deck yet. Build cards in the sidebar or extract them in the Pathfinder.
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[60vh] overflow-y-auto pr-2">
                    {recallDeck.map((card) => (
                      <div key={card.id} className="bg-slate-950 border border-slate-850 p-5 rounded-2xl flex flex-col justify-between gap-4 relative group">
                        <button
                          onClick={() => handleDeleteCard(card.id)}
                          className="absolute top-4 right-4 p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-500 hover:text-red-400 hover:border-red-900/30 transition-all opacity-0 group-hover:opacity-100"
                          title="Delete Card"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>

                        <div className="space-y-2">
                          <div className="flex gap-2">
                            <span className="px-2 py-0.5 bg-slate-900 border border-slate-800 rounded text-[9px] font-mono text-slate-400 font-bold uppercase">
                              {card.tags?.[0] || "General"}
                            </span>
                            <span className={`px-2 py-0.5 rounded text-[9px] font-mono font-bold uppercase ${
                              card.ease === "easy" ? "bg-emerald-950/45 text-emerald-400" :
                              card.ease === "medium" ? "bg-indigo-950/45 text-indigo-400" :
                              card.ease === "hard" ? "bg-red-950/45 text-red-400" : "bg-slate-900 text-slate-500"
                            }`}>
                              {card.ease}
                            </span>
                          </div>

                          <h4 className="font-bold text-slate-200 text-sm leading-snug">{card.question}</h4>
                          <p className="text-slate-400 text-xs leading-relaxed line-clamp-3">{card.answer}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

              </div>

            </div>
          )}

        </div>
      )}

      {/* ==========================================
          TAB 4: FOCUS SPRINT TIMER PANEL
          ========================================== */}
      {activeSubTab === "focus" && (
        <div className="space-y-8 animate-in fade-in duration-300">
          
          <div className="max-w-2xl">
            <h2 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
              <Timer className="w-5 h-5 text-indigo-400" /> Focus Sprint Timer
            </h2>
            <p className="text-slate-400 text-sm leading-relaxed">
              Align study focus to specific rhythm pulses. The visual expanding metronome guides visual pacing, reducing cognitive drifting. 
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-slate-950 p-6 md:p-8 rounded-3xl border border-slate-850">
            
            {/* Left Column: Metronome Circle */}
            <div className="flex flex-col items-center justify-center p-4">
              <div 
                className="relative rounded-full flex items-center justify-center border border-slate-800 transition-transform duration-150"
                style={{
                  width: "220px",
                  height: "220px",
                  transform: `scale(${pulseScale})`,
                  boxShadow: isTimerRunning ? "0 0 30px rgba(99, 102, 241, 0.15)" : "none"
                }}
              >
                {/* Metronome Pulse Guide */}
                <div 
                  className={`absolute inset-3 rounded-full border border-indigo-500/25 transition-all duration-300 ${
                    isTimerRunning ? "animate-pulse" : ""
                  }`} 
                />

                <div className="text-center z-10">
                  <div className="text-4xl font-mono font-black text-white">{formatTimer(timerSeconds)}</div>
                  <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold block mt-1">Focus Time</span>
                </div>
              </div>
            </div>

            {/* Right Column: Controls */}
            <div className="space-y-6">
              
              <div className="flex justify-center md:justify-start gap-4">
                <button
                  onClick={() => setIsTimerRunning(!isTimerRunning)}
                  className={`px-6 py-3.5 rounded-xl font-bold text-sm flex items-center gap-2 transition-all ${
                    isTimerRunning
                      ? "bg-amber-600 hover:bg-amber-500 text-white"
                      : "bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/25"
                  }`}
                >
                  {isTimerRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-white" />}
                  {isTimerRunning ? "Pause Sprint" : "Start Sprint"}
                </button>
                <button
                  onClick={() => { setIsTimerRunning(false); setTimerSeconds(1500); }}
                  className="px-5 py-3.5 bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-850 rounded-xl font-bold text-sm transition-all"
                  title="Reset Timer"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>

              {/* Rhythmic metronome setup */}
              <div className="space-y-4 pt-4 border-t border-slate-850">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Rhythmic Metronome Pacing</span>
                  
                  <button
                    onClick={() => setIsMetronomeAudioOn(!isMetronomeAudioOn)}
                    className={`px-3 py-1.5 rounded-lg border text-xs font-bold font-mono transition-all ${
                      isMetronomeAudioOn 
                        ? "bg-indigo-500/10 border-indigo-500/50 text-indigo-400"
                        : "bg-slate-900 border-slate-800 text-slate-500 hover:text-slate-400"
                    }`}
                  >
                    {isMetronomeAudioOn ? "Audio On" : "Audio Muted"}
                  </button>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-xs text-slate-400 font-mono">
                    <span>Tempo Speed</span>
                    <span className="text-indigo-400 font-bold">{metronomeBpm} BPM</span>
                  </div>
                  <input
                    type="range"
                    min="30"
                    max="180"
                    step="5"
                    value={metronomeBpm}
                    onChange={(e) => setMetronomeBpm(parseInt(e.target.value))}
                    className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                  />
                  <div className="flex justify-between text-[10px] text-slate-650 font-mono">
                    <span>30 BPM (Deep Focus)</span>
                    <span>180 BPM (High Speed)</span>
                  </div>
                </div>

                <div className="text-xs text-indigo-400/90 bg-indigo-500/5 border border-indigo-500/10 p-3.5 rounded-xl flex gap-2">
                  <HelpCircle className="w-4 h-4 shrink-0 text-indigo-400 mt-0.5" />
                  <p className="leading-normal">
                    <strong>Pacing Hack:</strong> Keep your eye sweeps matching the expansion scaling of the focus metronome block. This enforces rhythmic input sweeps and suppresses reading regression.
                  </p>
                </div>
              </div>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}
