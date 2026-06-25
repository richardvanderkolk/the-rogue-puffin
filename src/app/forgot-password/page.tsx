"use client";

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Loader2, Mail, CheckCircle } from 'lucide-react';
import { resetPassword } from '../login/actions';
import { useState } from 'react';

export default function ForgotPasswordPage() {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    setEmailSent(email);

    const result = await resetPassword(formData);
    
    if (result && result.error) {
      setError(result.error);
      setLoading(false);
    } else {
      setSuccess(true);
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-sans relative">
      <div className="absolute top-8 left-8">
          <Link href="/login" className="text-slate-500 hover:text-white transition-colors flex items-center gap-2 text-sm font-bold uppercase tracking-widest">
              <ArrowRight className="w-4 h-4 rotate-180" /> Back to Sign In
          </Link>
      </div>
      
      <div className="sm:mx-auto sm:w-full sm:max-w-md z-10">
        <div className="flex justify-center mb-8">
            <Image src="/assets/premium-logo.png" alt="The Rogue Puffin" width={160} height={160} className="w-40 h-40 object-contain drop-shadow-2xl" />
        </div>
        <h2 className="text-center text-3xl font-bold tracking-tight text-white">
          Reset your password
        </h2>
        <p className="mt-2 text-center text-sm text-slate-400">
          Enter the email address associated with your account, and we'll send you a link to reset your password.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md z-10">
        <div className="bg-slate-900/80 backdrop-blur-xl py-8 px-4 shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-slate-800 sm:rounded-3xl sm:px-10">
          
          {success ? (
            <div className="text-center space-y-4 py-4">
              <div className="w-16 h-16 bg-emerald-500/10 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/20">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-white">Reset Link Sent</h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                We've sent a password reset link to <strong className="text-white">{emailSent}</strong>. Please check your inbox and spam folder.
              </p>
              <div className="pt-4">
                <Link href="/login" className="text-purple-400 hover:text-purple-300 font-bold transition-colors">
                  Return to Login
                </Link>
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
                  <label htmlFor="email" className="block text-sm font-medium text-slate-300">
                    Email address
                  </label>
                  <div className="mt-1 relative rounded-xl shadow-sm">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      className="block w-full appearance-none rounded-xl border border-slate-700 bg-black px-4 py-3 text-slate-100 placeholder-slate-500 shadow-sm focus:border-purple-500 focus:outline-none focus:ring-purple-500 sm:text-sm transition-all"
                      placeholder="richard@theroguepuffin.com"
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
                        Send Reset Link <Mail className="w-5 h-5" />
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
