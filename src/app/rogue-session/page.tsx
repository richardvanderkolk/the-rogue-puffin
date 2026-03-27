"use client";

import Link from "next/link";
import { ArrowRight, CheckCircle, Clock, Zap, BookOpen } from "lucide-react";

export default function RogueSessionSalesPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-indigo-500/30">

      {/* Hero Section */}
      <section className="relative px-6 py-24 text-center overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-indigo-600/10 rounded-full blur-[120px] -z-10" />

        <div className="max-w-4xl mx-auto space-y-8">
          <div className="inline-flex items-center rounded-full bg-indigo-500/10 px-4 py-1.5 text-sm font-medium text-indigo-400 border border-indigo-500/20">
            The Rogue Session
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-slate-400 leading-tight">
            Read Faster in<br /> 30 Minutes.
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
            A guided interactive experience to break your reading speed plateau, improve focus, and unlock your brain's natural processing power.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
            <button
              onClick={async (e) => {
                const btn = e.currentTarget;
                const originalText = btn.innerHTML;
                btn.innerHTML = "Processing...";
                btn.disabled = true;
                try {
                  const res = await fetch('/api/checkout', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ productMode: 'rogue-session' })
                  });
                  const data = await res.json();
                  if (data.url) window.location.href = data.url;
                  else {
                    alert("Checkout failed: " + data.error);
                    btn.innerHTML = originalText;
                    btn.disabled = false;
                  }
                } catch (err) {
                  alert("Error initiating checkout");
                  btn.innerHTML = originalText;
                  btn.disabled = false;
                }
              }}
              className="px-8 py-4 bg-white text-black rounded-full font-bold text-lg hover:bg-slate-200 transition-all flex items-center gap-2 shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:scale-105"
            >
              Start Session Now ($5) <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* What You Get */}
      <section className="py-20 px-6 bg-slate-900/30 border-y border-slate-900">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="space-y-4">
              <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-emerald-500" />
              </div>
              <h3 className="text-xl font-bold text-white">Immediate Speed Increase</h3>
              <p className="text-slate-400 leading-relaxed">
                Most users see a 50-150% increase in reading speed within the first session by removing "subvocalization".
              </p>
            </div>
            <div className="space-y-4">
              <div className="w-12 h-12 bg-indigo-500/10 rounded-xl flex items-center justify-center mb-4">
                <BookOpen className="w-6 h-6 text-indigo-500" />
              </div>
              <h3 className="text-xl font-bold text-white">Better Comprehension</h3>
              <p className="text-slate-400 leading-relaxed">
                Reading slowly allows your mind to wander. Reading at the speed of thought demands total focus and retention.
              </p>
            </div>
            <div className="space-y-4">
              <div className="w-12 h-12 bg-amber-500/10 rounded-xl flex items-center justify-center mb-4">
                <Clock className="w-6 h-6 text-amber-500" />
              </div>
              <h3 className="text-xl font-bold text-white">Just 30 Minutes</h3>
              <p className="text-slate-400 leading-relaxed">
                No fluff. No long lectures. Just a practical, interactive drill that forces your brain to adapt instantly.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The "Why" - Anti-Hype */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <h2 className="text-3xl font-bold">This isn't magic. It's biology.</h2>
          <p className="text-lg text-slate-400 leading-relaxed">
            You were taught to read by saying words aloud. This limits your reading speed to your speaking speed (approx 150-200 WPM).
            <br /><br />
            However, your brain can process visual information thousands of times faster.
            <br /><br />
            The Rogue Session is a <strong>neurological drill</strong> designed to decouple your visual processing from your auditory processing, allowing you to read at the speed of sight.
          </p>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 px-6 border-t border-slate-900 bg-black">
        <div className="max-w-4xl mx-auto text-center">
          <div className="p-8 rounded-3xl border border-slate-800 bg-slate-900/20 relative overflow-hidden">
            <div className="relative z-10">
              <h2 className="text-4xl font-bold mb-6">Ready to upgrade your reading?</h2>
              <button
                onClick={async (e) => {
                  const btn = e.currentTarget;
                  const originalText = btn.innerHTML;
                  btn.innerHTML = "Processing...";
                  btn.disabled = true;
                  try {
                    const res = await fetch('/api/checkout', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({ productMode: 'rogue-session' })
                    });
                    const data = await res.json();
                    if (data.url) window.location.href = data.url;
                    else {
                      alert("Checkout failed: " + data.error);
                      btn.innerHTML = originalText;
                      btn.disabled = false;
                    }
                  } catch (err) {
                    alert("Error initiating checkout");
                    btn.innerHTML = originalText;
                    btn.disabled = false;
                  }
                }}
                className="inline-flex px-10 py-5 bg-white text-black rounded-full font-bold text-xl hover:bg-slate-200 transition-all items-center gap-3"
              >
                Start the Rogue Reading Session ($5) <ArrowRight className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
