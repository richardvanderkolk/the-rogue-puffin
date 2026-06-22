"use client";

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Loader2, Lock, CheckCircle } from 'lucide-react';
import { supabase } from '@/lib/supabase/client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Listen to auth state to make sure they are in recovery
  useEffect(() => {
    const checkSession = async () => {
      // Supabase parses the hash fragment automatically and logs them in.
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        // If there's no session and no hash, they shouldn't be on this page.
        if (typeof window !== "undefined" && !window.location.hash.includes("access_token")) {
          setError("Your password reset link is invalid or has expired. Please request a new link.");
        }
      }
    };
    checkSession();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    setLoading(true);

    try {
      const { error: updateError } = await supabase.auth.updateUser({
        password: password,
      });

      if (updateError) {
        setError(updateError.message);
      } else {
        setSuccess(true);
        // Clean up hash fragment from URL
        if (typeof window !== "undefined") {
          window.history.replaceState(null, "", window.location.pathname);
        }
        
        // Wait 2 seconds and redirect to dashboard
        setTimeout(() => {
          router.push("/dashboard");
        }, 2000);
      }
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-sans relative">
      <div className="sm:mx-auto sm:w-full sm:max-w-md z-10">
        <div className="flex justify-center mb-8">
            <Image src="/assets/premium-logo.png" alt="The Rogue Puffin" width={160} height={160} className="w-40 h-40 object-contain drop-shadow-2xl" />
        </div>
        <h2 className="text-center text-3xl font-bold tracking-tight text-white">
          Create new password
        </h2>
        <p className="mt-2 text-center text-sm text-slate-400">
          Enter your new password below to update your account.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md z-10">
        <div className="bg-slate-900/80 backdrop-blur-xl py-8 px-4 shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-slate-800 sm:rounded-3xl sm:px-10">
          
          {success ? (
            <div className="text-center space-y-4 py-4">
              <div className="w-16 h-16 bg-emerald-500/10 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/20">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-white">Password Updated</h3>
              <p className="text-sm text-slate-300">
                Your password has been successfully updated. Redirecting you to your dashboard...
              </p>
              <div className="pt-2 flex justify-center">
                <Loader2 className="w-6 h-6 animate-spin text-purple-400" />
              </div>
            </div>
          ) : (
            <>
              {error && (
                <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm leading-relaxed">
                  {error}
                </div>
              )}

              <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-slate-300">
                    New Password
                  </label>
                  <div className="mt-1">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="block w-full appearance-none rounded-xl border border-slate-700 bg-black px-4 py-3 text-slate-100 placeholder-slate-500 shadow-sm focus:border-purple-500 focus:outline-none focus:ring-purple-500 sm:text-sm transition-all"
                      placeholder="At least 6 characters"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-slate-300">
                    Confirm Password
                  </label>
                  <div className="mt-1">
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="block w-full appearance-none rounded-xl border border-slate-700 bg-black px-4 py-3 text-slate-100 placeholder-slate-500 shadow-sm focus:border-purple-500 focus:outline-none focus:ring-purple-500 sm:text-sm transition-all"
                      placeholder="Repeat your password"
                    />
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex w-full justify-center items-center gap-2 rounded-xl border border-transparent bg-white py-4 px-4 text-lg font-bold text-black shadow-sm hover:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-slate-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <Loader2 className="w-5 h-5 animate-spin text-black" />
                    ) : (
                      <>
                        Update Password <Lock className="w-5 h-5" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
      
      {/* Background elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/10 blur-[120px] rounded-full pointer-events-none" />
    </main>
  );
}
