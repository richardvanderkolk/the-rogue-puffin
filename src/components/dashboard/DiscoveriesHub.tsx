"use client";

import React, { useState, useEffect } from "react";
import { 
  Share2, 
  Plus, 
  Search, 
  ExternalLink, 
  ThumbsUp, 
  Sparkles,
  Filter,
  Check,
  User,
  AlertCircle
} from "lucide-react";
import { supabase } from "@/lib/supabase/client";

interface Discovery {
  id: string;
  title: string;
  subject: string;
  description: string;
  resource_url?: string;
  author_name: string;
  author_style: string;
  created_at: string;
}

interface Rating {
  discovery_id: string;
  user_id: string;
  voter_style: string;
  rating: "helpful" | "unhelpful";
}

interface DiscoveriesHubProps {
  userId: string;
  userStyle: string;
  userName: string;
}

export default function DiscoveriesHub({ userId, userStyle = "visual", userName = "Student" }: DiscoveriesHubProps) {
  const [discoveries, setDiscoveries] = useState<Discovery[]>([]);
  const [ratings, setRatings] = useState<Rating[]>([]);
  const [loading, setLoading] = useState(true);

  // Filter & Sort state
  const [authorFilter, setAuthorFilter] = useState<string>("all");
  const [sortByStyle, setSortByStyle] = useState<string>("all");

  // Form State
  const [title, setTitle] = useState("");
  const [subjectField, setSubjectField] = useState("");
  const [description, setDescription] = useState("");
  const [resourceUrl, setResourceUrl] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showExplanation, setShowExplanation] = useState(true);

  // Database detection state
  const [usingDb, setUsingDb] = useState(true);

  // 1. Pre-seeded fallback data
  const seedDiscoveries: Discovery[] = [
    {
      id: "seed-1",
      title: "3Blue1Brown Neural Networks Animation Guide",
      subject: "Neural Networks",
      description: "An incredible visual breakdown of deep neural networks. It visualizes layers, weights, and biases as colored nodes and glowing connections. Absolute gold for visual learning!",
      resource_url: "https://www.youtube.com/watch?v=aircAruvnKk",
      author_name: "Alex Vance",
      author_style: "visual",
      created_at: new Date(Date.now() - 3600000 * 24 * 3).toISOString() // 3 days ago
    },
    {
      id: "seed-2",
      title: "Audio-Pacing Audiobook Hack for Kindle",
      subject: "Speed Reading",
      description: "Activate text-to-speech (TTS) on your Kindle app and set it to 1.5x. Scan the words visually while listening to the audio sweep. My reading compression doubled instantly!",
      resource_url: "https://support.amazon.com/gp/help/customer/display.html?nodeId=GDE5226XT9P8895E",
      author_name: "Sarah Chen",
      author_style: "auditory",
      created_at: new Date(Date.now() - 3600000 * 12).toISOString() // 12 hours ago
    },
    {
      id: "seed-3",
      title: "Cornell Outline Grid for Read/Write Compilers",
      subject: "Cornell Notes",
      description: "If you are a Reading/Writing archetype, Cornell notes are highly effective. I created a standard table format linking definitions to core cues. Here is the wiki guide on the layout structure.",
      resource_url: "https://en.wikipedia.org/wiki/Cornell_Notes",
      author_name: "Marcus Aurelius",
      author_style: "reading",
      created_at: new Date(Date.now() - 3600000 * 48).toISOString() // 2 days ago
    },
    {
      id: "seed-4",
      title: "Interactive PhET Physics Light Wave Simulator",
      subject: "Wave Physics",
      description: "A digital sandbox where you physically pull sliders to adjust frequency wave paths and watch the beams refract in real time. Perfect hands-on physics drill!",
      resource_url: "https://phet.colorado.edu/en/simulations/bending-light",
      author_name: "Emily Watson",
      author_style: "kinesthetic",
      created_at: new Date(Date.now() - 3600000 * 4).toISOString() // 4 hours ago
    }
  ];

  const seedRatings: Rating[] = [
    // Seed 1 (NN guide) gets visual votes
    { discovery_id: "seed-1", user_id: "user-v1", voter_style: "visual", rating: "helpful" },
    { discovery_id: "seed-1", user_id: "user-v2", voter_style: "visual", rating: "helpful" },
    { discovery_id: "seed-1", user_id: "user-v3", voter_style: "visual", rating: "helpful" },
    { discovery_id: "seed-1", user_id: "user-k1", voter_style: "kinesthetic", rating: "helpful" },
    { discovery_id: "seed-1", user_id: "user-a1", voter_style: "auditory", rating: "helpful" },
    
    // Seed 2 (audio hack) gets auditory votes
    { discovery_id: "seed-2", user_id: "user-a2", voter_style: "auditory", rating: "helpful" },
    { discovery_id: "seed-2", user_id: "user-a3", voter_style: "auditory", rating: "helpful" },
    { discovery_id: "seed-2", user_id: "user-a4", voter_style: "auditory", rating: "helpful" },
    { discovery_id: "seed-2", user_id: "user-v4", voter_style: "visual", rating: "helpful" },
    
    // Seed 3 (Cornell notes) gets reading votes
    { discovery_id: "seed-3", user_id: "user-r1", voter_style: "reading", rating: "helpful" },
    { discovery_id: "seed-3", user_id: "user-r2", voter_style: "reading", rating: "helpful" },
    { discovery_id: "seed-3", user_id: "user-k2", voter_style: "kinesthetic", rating: "helpful" },

    // Seed 4 (PhET simulator) gets kinesthetic votes
    { discovery_id: "seed-4", user_id: "user-k3", voter_style: "kinesthetic", rating: "helpful" },
    { discovery_id: "seed-4", user_id: "user-k4", voter_style: "kinesthetic", rating: "helpful" },
    { discovery_id: "seed-4", user_id: "user-v5", voter_style: "visual", rating: "helpful" },
    { discovery_id: "seed-4", user_id: "user-v6", voter_style: "visual", rating: "helpful" }
  ];

  // Fetch discoveries and ratings
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Try fetching from Supabase database
        const { data: discoveriesData, error: discError } = await supabase
          .from("discoveries")
          .select("*")
          .order("created_at", { ascending: false });

        const { data: ratingsData, error: ratError } = await supabase
          .from("discovery_ratings")
          .select("*");

        if (discError || ratError) {
          // If relation does not exist, trigger fallback
          if (discError?.code === "PGRST116" || discError?.message?.includes("relation") || ratError?.message?.includes("relation")) {
            console.warn("Discoveries tables not found in Supabase. Using localStorage/Mock database.");
            setUsingDb(false);
            loadLocalStorageData();
          } else {
            throw new Error(discError?.message || ratError?.message);
          }
        } else {
          setDiscoveries(discoveriesData || []);
          setRatings(ratingsData || []);
          setUsingDb(true);
        }
      } catch (err) {
        console.error("Database fetch failed, falling back:", err);
        setUsingDb(false);
        loadLocalStorageData();
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Load from LocalStorage fallback
  const loadLocalStorageData = () => {
    const localDiscs = localStorage.getItem("rogue_discoveries");
    const localRats = localStorage.getItem("rogue_discovery_ratings");

    if (localDiscs) {
      setDiscoveries(JSON.parse(localDiscs));
    } else {
      setDiscoveries(seedDiscoveries);
      localStorage.setItem("rogue_discoveries", JSON.stringify(seedDiscoveries));
    }

    if (localRats) {
      setRatings(JSON.parse(localRats));
    } else {
      setRatings(seedRatings);
      localStorage.setItem("rogue_discovery_ratings", JSON.stringify(seedRatings));
    }
  };

  // Submit Discovery
  const handlePublish = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Count words in subjectField
    const wordCount = subjectField.trim().split(/\s+/).filter(w => w.length > 0).length;
    if (!title.trim() || !description.trim() || !subjectField.trim() || wordCount > 3 || subjectField.length > 25) {
      return;
    }

    setIsSubmitting(true);

    const newDiscovery = {
      title: title.trim(),
      subject: subjectField.trim(),
      description: description.trim(),
      resource_url: resourceUrl.trim() || undefined,
      author_name: userName || "Genius Puffin",
      author_style: userStyle || "visual",
      created_at: new Date().toISOString()
    };

    try {
      if (usingDb) {
        const { data, error } = await supabase
          .from("discoveries")
          .insert({
            user_id: userId,
            ...newDiscovery
          })
          .select()
          .single();

        if (error) throw error;
        setDiscoveries(prev => [data, ...prev]);
      } else {
        // LocalStorage fallback
        const customDiscovery: Discovery = {
          id: `disc-custom-${Date.now()}`,
          ...newDiscovery
        };

        const updatedDiscs = [customDiscovery, ...discoveries];
        setDiscoveries(updatedDiscs);
        localStorage.setItem("rogue_discoveries", JSON.stringify(updatedDiscs));
      }

      // Reset form
      setTitle("");
      setSubjectField("");
      setDescription("");
      setResourceUrl("");
    } catch (err) {
      console.error("Failed to share discovery:", err);
      alert("Error saving your post to database. Falling back to local screen storage.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle helpful ratings toggle
  const handleToggleVote = async (discoveryId: string) => {
    // Check if voter already has a rating on this post
    const existingIndex = ratings.findIndex(
      r => r.discovery_id === discoveryId && r.user_id === userId
    );

    let updatedRatings = [...ratings];

    try {
      if (existingIndex !== -1) {
        // Toggle/Remove vote
        if (usingDb) {
          const { error } = await supabase
            .from("discovery_ratings")
            .delete()
            .eq("discovery_id", discoveryId)
            .eq("user_id", userId);
          if (error) throw error;
        }
        updatedRatings.splice(existingIndex, 1);
      } else {
        // Add Helpful vote
        const newRating: Rating = {
          discovery_id: discoveryId,
          user_id: userId,
          voter_style: userStyle,
          rating: "helpful"
        };

        if (usingDb) {
          const { error } = await supabase
            .from("discovery_ratings")
            .insert(newRating);
          if (error) throw error;
        }
        updatedRatings.push(newRating);
      }

      setRatings(updatedRatings);
      if (!usingDb) {
        localStorage.setItem("rogue_discovery_ratings", JSON.stringify(updatedRatings));
      }
    } catch (err) {
      console.error("Failed to toggle vote:", err);
    }
  };

  // Count upvotes segmented by voter style for a discovery
  const getUpvoteBreakdown = (discoveryId: string) => {
    const postRatings = ratings.filter(r => r.discovery_id === discoveryId && r.rating === "helpful");
    
    return {
      visual: postRatings.filter(r => r.voter_style === "visual").length,
      auditory: postRatings.filter(r => r.voter_style === "auditory").length,
      reading: postRatings.filter(r => r.voter_style === "reading").length,
      kinesthetic: postRatings.filter(r => r.voter_style === "kinesthetic").length,
      total: postRatings.length
    };
  };

  // Process filters and sorting rules
  const getFilteredFeed = () => {
    let feed = [...discoveries];

    // Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      feed = feed.filter(d => 
        (d.subject && d.subject.toLowerCase().includes(q)) ||
        d.title.toLowerCase().includes(q) ||
        d.description.toLowerCase().includes(q)
      );
    }

    // 1. Apply Author Style filter
    if (authorFilter !== "all") {
      feed = feed.filter(d => d.author_style === authorFilter);
    }

    // 2. Sort by segmented learning style rating
    if (sortByStyle !== "all") {
      feed.sort((a, b) => {
        const votesA = ratings.filter(
          r => r.discovery_id === a.id && r.rating === "helpful" && r.voter_style === sortByStyle
        ).length;
        const votesB = ratings.filter(
          r => r.discovery_id === b.id && r.rating === "helpful" && r.voter_style === sortByStyle
        ).length;

        // Sort descending
        return votesB - votesA;
      });
    }

    return feed;
  };

  const filteredFeed = getFilteredFeed();

  // Helper formatting for learning style labels
  const styleBadges: Record<string, { label: string; bg: string; text: string; icon: string }> = {
    visual: { label: "Visual", bg: "bg-cyan-500/10 border-cyan-500/20", text: "text-cyan-400", icon: "🎨" },
    auditory: { label: "Auditory", bg: "bg-fuchsia-500/10 border-fuchsia-500/20", text: "text-fuchsia-400", icon: "🔊" },
    reading: { label: "Reading/Writing", bg: "bg-amber-500/10 border-amber-500/20", text: "text-amber-400", icon: "📝" },
    kinesthetic: { label: "Kinesthetic", bg: "bg-emerald-500/10 border-emerald-500/20", text: "text-emerald-400", icon: "🏃" }
  };

  const subjectWordCount = subjectField.trim().split(/\s+/).filter(w => w.length > 0).length;
  const isSubjectValid = subjectField.trim().length > 0 && subjectWordCount <= 3 && subjectField.length <= 25;

  return (
    <div className="w-full space-y-8 animate-in fade-in duration-300">
      
      {/* Fallback DB notice */}
      {!usingDb && (
        <div className="bg-amber-500/10 border border-amber-500/20 p-4 rounded-xl flex gap-3 text-xs text-amber-400">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
          <div>
            <strong>Developer Note:</strong> Supabase `discoveries` table was not detected. The portal is currently running in a zero-delay **Offline Simulation** saving and upvoting records securely in your browser cache. Run [supabase_discoveries_table.sql](file:///Users/richard/projects/the-rogue-puffin/supabase_discoveries_table.sql) in your Supabase SQL editor to connect the real database feed!
          </div>
        </div>
      )}

      {/* Onboarding Explanation Header */}
      {showExplanation && (
        <div className="bg-slate-900 border border-indigo-500/15 rounded-3xl p-6 relative overflow-hidden shadow-xl animate-in slide-in-from-top duration-300">
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />
          <div className="flex justify-between items-start gap-4">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-1.5 text-xs text-indigo-400 font-extrabold tracking-widest uppercase">
                <Sparkles className="w-3.5 h-3.5" /> How the Learning Community Works
              </div>
              <h2 className="text-lg md:text-xl font-black text-white">Share, Discover, and Segment Insights</h2>
              <p className="text-slate-400 text-xs md:text-sm leading-relaxed max-w-3xl">
                This is a collective repository where puffins upload highly effective web resources (videos, outlines, simulations) categorized by <strong>Subject</strong>. 
                Each vote you cast compiles into a segmented <strong>Learning Style Matrix</strong>. This segment matrix updates dynamically based on the voters' learning style archetypes (Visual 🎨, Auditory 🔊, Reading 📝, Kinesthetic 🏃), helping you instantly find study materials matched to how your brain works.
              </p>
            </div>
            <button 
              onClick={() => setShowExplanation(false)}
              className="text-xs font-bold text-slate-500 hover:text-slate-300 px-3 py-1 bg-slate-950 border border-slate-800 rounded-lg transition-colors"
            >
              Dismiss Info
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Share discovery form */}
        <div className="lg:col-span-1">
          <form onSubmit={handlePublish} className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-5 shadow-xl sticky top-28">
            <h3 className="text-base md:text-lg font-bold text-white flex items-center gap-2">
              <Share2 className="w-4 h-4 text-indigo-400" /> Share a Study Finding
            </h3>
            <p className="text-slate-400 text-xs leading-normal">
              Found a YouTube video, simulation lab, or pacing technique that matches your learning style? Post it to help other puffins!
            </p>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Title / Resource Name</label>
              <input
                type="text"
                placeholder="e.g. Cellular Mitosis 3D Stage Simulation"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 focus:outline-none focus:border-indigo-500 text-xs"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider flex justify-between">
                <span>Subject / Academic Topic</span>
                <span className={`text-[10px] font-mono font-bold ${isSubjectValid ? "text-emerald-400" : subjectField ? "text-rose-400 animate-pulse" : "text-slate-500"}`}>
                  {subjectWordCount}/3 words {subjectField.length > 0 && `(${subjectField.length}/25 chars)`}
                </span>
              </label>
              <input
                type="text"
                placeholder="e.g. Cellular Biology (max 3 words)"
                value={subjectField}
                onChange={(e) => setSubjectField(e.target.value)}
                required
                maxLength={25}
                className={`w-full px-3.5 py-2.5 bg-slate-950 border rounded-xl text-slate-200 focus:outline-none focus:border-indigo-500 text-xs transition-all ${
                  subjectField && !isSubjectValid ? "border-rose-500/50 focus:border-rose-500 bg-rose-500/5" : "border-slate-800"
                }`}
              />
              <p className="text-[10px] text-slate-500 leading-normal">
                Keep the subject concise (1-3 words) to serve as a clean categorization tag.
              </p>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Web Resource Link (Optional)</label>
              <input
                type="url"
                placeholder="https://..."
                value={resourceUrl}
                onChange={(e) => setResourceUrl(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 focus:outline-none focus:border-indigo-500 text-xs"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Discovery Notes / Why it helps</label>
              <textarea
                placeholder="Briefly explain how this study resource helps, or outline a custom memory trick you created..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                className="w-full h-28 bg-slate-950 border border-slate-800 rounded-xl p-3.5 text-slate-250 text-xs focus:outline-none focus:border-indigo-500 resize-none font-sans"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting || !title.trim() || !description.trim() || !isSubjectValid}
              className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 transition-all shadow-lg shadow-indigo-600/20"
            >
              <Plus className="w-4 h-4" /> Publish to Feed
            </button>
          </form>
        </div>

        {/* Right Columns: Discoveries timeline Feed */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Curation Filters, Searching & Sorting Bar */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-4 shadow-md">
            
            {/* Real-time search bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type="text"
                placeholder="Search discoveries by subject, title, or keyword..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 focus:outline-none focus:border-indigo-500 text-xs"
              />
            </div>

            {/* Popular subjects directory */}
            <div className="space-y-1.5 pt-1">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block">Browse Popular Subjects:</span>
              <div className="flex flex-wrap gap-1.5">
                {["Neural Networks", "Speed Reading", "Cornell Notes", "Wave Physics", "Macroeconomics", "Organic Chemistry", "Biology"].map((subj) => (
                  <button
                    key={subj}
                    type="button"
                    onClick={() => setSearchQuery(subj)}
                    className={`px-2.5 py-1 text-[10px] font-bold font-mono tracking-wide rounded-lg border transition-all ${
                      searchQuery.toLowerCase() === subj.toLowerCase()
                        ? "bg-indigo-500/20 border-indigo-500 text-indigo-400"
                        : "bg-slate-950 border-slate-850 text-slate-400 hover:border-slate-700 hover:text-slate-350"
                    }`}
                  >
                    #{subj}
                  </button>
                ))}
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="px-2.5 py-1 text-[10px] font-bold font-mono tracking-wide rounded-lg border border-rose-500/30 bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 transition-all"
                  >
                    Clear Filter [x]
                  </button>
                )}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-1 border-t border-slate-800/60">
              {/* Filter by author style */}
              <div className="flex items-center gap-2.5">
                <Filter className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                <span className="text-[10px] font-bold text-slate-400 uppercase">Creator:</span>
                <select
                  value={authorFilter}
                  onChange={(e) => setAuthorFilter(e.target.value)}
                  className="bg-slate-950 border border-slate-800 rounded-lg py-1 px-2.5 text-[11px] text-slate-350 focus:outline-none focus:border-indigo-500 font-bold"
                >
                  <option value="all">All Styles</option>
                  <option value="visual">🎨 Visual</option>
                  <option value="auditory">🔊 Auditory</option>
                  <option value="reading">📝 Reading/Writing</option>
                  <option value="kinesthetic">🏃 Kinesthetic</option>
                </select>
              </div>

              {/* Sort by helpful ratings segmented by style */}
              <div className="flex items-center gap-2.5">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Rank by helpful for:</span>
                <select
                  value={sortByStyle}
                  onChange={(e) => setSortByStyle(e.target.value)}
                  className="bg-slate-950 border border-slate-800 rounded-lg py-1 px-2.5 text-[11px] text-slate-350 focus:outline-none focus:border-indigo-500 font-bold"
                >
                  <option value="all">Newest Shared</option>
                  <option value="visual">🎨 Visual Learners</option>
                  <option value="auditory">🔊 Auditory Learners</option>
                  <option value="reading">📝 Reading Learners</option>
                  <option value="kinesthetic">🏃 Kinesthetic Learners</option>
                </select>
              </div>
            </div>

          </div>

          {/* Timeline discoveries cards */}
          {loading ? (
            <div className="space-y-4">
              <div className="bg-slate-900 border border-slate-850 p-6 rounded-3xl animate-pulse flex flex-col gap-3">
                <div className="w-1/3 h-4 bg-slate-800 rounded" />
                <div className="w-full h-12 bg-slate-850 rounded" />
                <div className="w-1/4 h-3 bg-slate-800 rounded" />
              </div>
              <div className="bg-slate-900 border border-slate-850 p-6 rounded-3xl animate-pulse flex flex-col gap-3">
                <div className="w-1/4 h-4 bg-slate-800 rounded" />
                <div className="w-full h-12 bg-slate-850 rounded" />
                <div className="w-1/3 h-3 bg-slate-800 rounded" />
              </div>
            </div>
          ) : filteredFeed.length === 0 ? (
            <div className="bg-slate-900 border border-slate-800/80 p-12 rounded-3xl text-center text-slate-500 text-sm">
              No study discoveries match your filters or search keywords. Be the first to share one!
            </div>
          ) : (
            <div className="space-y-6">
              {filteredFeed.map((disc) => {
                const upvotes = getUpvoteBreakdown(disc.id);
                const hasVoted = ratings.some(
                  r => r.discovery_id === disc.id && r.user_id === userId && r.rating === "helpful"
                );

                const badge = styleBadges[disc.author_style] || { label: "General", bg: "bg-slate-800 border-slate-700", text: "text-slate-400", icon: "📖" };

                return (
                  <div key={disc.id} className="bg-slate-900 border border-slate-800 hover:border-slate-700/85 p-6 rounded-3xl space-y-4 shadow-xl transition-all relative overflow-hidden">
                    {/* Top details */}
                    <div className="flex items-center justify-between gap-3 flex-wrap">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-750 flex items-center justify-center text-slate-400">
                          <User className="w-4 h-4" />
                        </div>
                        <div>
                          <strong className="text-slate-200 text-sm font-bold block leading-none">{disc.author_name}</strong>
                          <span className="text-[10px] text-slate-500 mt-1 block">
                            Shared on {new Date(disc.created_at).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        {disc.subject && (
                          <span className="px-2.5 py-1 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-[10px] font-bold font-mono tracking-wider uppercase rounded-lg">
                            🏷️ {disc.subject}
                          </span>
                        )}
                        <span className={`px-2.5 py-1 rounded-lg border text-[10px] font-bold font-mono tracking-widest uppercase flex items-center gap-1.5 ${badge.bg} ${badge.text}`}>
                          {badge.icon} {badge.label}
                        </span>
                      </div>
                    </div>

                    {/* Mid description */}
                    <div className="space-y-2">
                      <h4 className="text-white text-base md:text-lg font-bold font-heading">{disc.title}</h4>
                      <p className="text-slate-350 text-sm leading-relaxed whitespace-pre-line">{disc.description}</p>
                      
                      {disc.resource_url && (
                        <a 
                          href={disc.resource_url} 
                          target="_blank" 
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs text-indigo-400 hover:text-indigo-300 font-bold underline underline-offset-4 mt-2"
                        >
                          Open Attached Resource <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>

                    {/* Bottom Helper rating matrix */}
                    <div className="border-t border-slate-800/80 pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      
                      <div className="space-y-2">
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block">Helped Learning Styles:</span>
                        
                        <div className="flex flex-wrap gap-2">
                          <span className="px-2.5 py-1 bg-slate-950 border border-slate-800 text-xs rounded-lg text-cyan-400 font-mono font-bold">
                            🎨 Visual: <strong className="text-white">{upvotes.visual}</strong>
                          </span>
                          <span className="px-2.5 py-1 bg-slate-950 border border-slate-800 text-xs rounded-lg text-fuchsia-400 font-mono font-bold">
                            🔊 Auditory: <strong className="text-white">{upvotes.auditory}</strong>
                          </span>
                          <span className="px-2.5 py-1 bg-slate-950 border border-slate-800 text-xs rounded-lg text-amber-400 font-mono font-bold">
                            📝 Reading: <strong className="text-white">{upvotes.reading}</strong>
                          </span>
                          <span className="px-2.5 py-1 bg-slate-950 border border-slate-800 text-xs rounded-lg text-emerald-400 font-mono font-bold">
                            🏃 Kinesthetic: <strong className="text-white">{upvotes.kinesthetic}</strong>
                          </span>
                        </div>
                      </div>

                      {/* Vote trigger */}
                      <button
                        onClick={() => handleToggleVote(disc.id)}
                        className={`self-end py-2 px-4 rounded-xl border text-xs font-bold transition-all flex items-center gap-2 ${
                          hasVoted
                            ? "bg-indigo-500/10 border-indigo-500 text-indigo-400 shadow shadow-indigo-500/10"
                            : "bg-slate-950 border-slate-800 text-slate-400 hover:border-indigo-500 hover:text-white"
                        }`}
                      >
                        {hasVoted ? <Check className="w-3.5 h-3.5" /> : <ThumbsUp className="w-3.5 h-3.5" />}
                        Helped my {userStyle.toUpperCase()} study!
                      </button>

                    </div>

                  </div>
                );
              })}
            </div>
          )}

        </div>

      </div>

    </div>
  );
}
