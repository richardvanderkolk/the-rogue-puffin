import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { signup } from '@/app/login/actions'

export default function SignupPage() {
  return (
    <main className="min-h-screen bg-slate-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-sans relative">
      <div className="absolute top-8 left-8">
          <Link href="/" className="text-slate-500 hover:text-white transition-colors flex items-center gap-2 text-sm font-bold uppercase tracking-widest">
              <ArrowRight className="w-4 h-4 rotate-180" /> Back to Home
          </Link>
      </div>
      
      <div className="sm:mx-auto sm:w-full sm:max-w-md z-10">
        <div className="flex justify-center mb-8">
            <img src="/assets/premium-logo.png" alt="The Rogue Puffin" className="w-40 h-40 object-contain drop-shadow-2xl" />
        </div>
        <h2 className="text-center text-3xl font-bold tracking-tight text-white">
          Join the Bootcamp
        </h2>
        <p className="mt-2 text-center text-sm text-slate-400">
          Already have an account?{' '}
          <Link href="/login" className="font-medium text-purple-400 hover:text-purple-300 transition-colors">
            Sign in here
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md z-10">
        <div className="bg-slate-900/80 backdrop-blur-xl py-8 px-4 shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-slate-800 sm:rounded-3xl sm:px-10">
          <form className="space-y-6" action={async (formData) => {
              "use server";
              await signup(formData);
          }}>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-slate-300">
                First Name
              </label>
              <div className="mt-1">
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="block w-full appearance-none rounded-xl border border-slate-700 bg-black px-4 py-3 text-slate-100 placeholder-slate-500 shadow-sm focus:border-purple-500 focus:outline-none focus:ring-purple-500 sm:text-sm transition-all"
                  placeholder="e.g. Richard"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-300">
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full appearance-none rounded-xl border border-slate-700 bg-black px-4 py-3 text-slate-100 placeholder-slate-500 shadow-sm focus:border-purple-500 focus:outline-none focus:ring-purple-500 sm:text-sm transition-all"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-slate-300">
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  className="block w-full appearance-none rounded-xl border border-slate-700 bg-black px-4 py-3 text-slate-100 placeholder-slate-500 shadow-sm focus:border-purple-500 focus:outline-none focus:ring-purple-500 sm:text-sm transition-all"
                  placeholder="Create a strong password"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center items-center gap-2 rounded-xl border border-transparent bg-white py-4 px-4 text-lg font-bold text-black shadow-sm hover:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-slate-900 transition-colors"
              >
                Create Account <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </form>
        </div>
      </div>
      
      {/* Background elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/10 blur-[120px] rounded-full pointer-events-none" />
    </main>
  )
}
