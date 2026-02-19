"use client"

import { supabase } from "@/lib/supabaseClient"
import { useState } from "react"

export default function Home() {
  const [loading, setLoading] = useState(false)

  const login = async () => {
    setLoading(true)
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${location.origin}/dashboard`,
      },
    })
    setLoading(false)
  }

  return (
    <main className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900 px-6">
      {/* Login Card */}
      <div className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl rounded-3xl p-10 text-center">
        {/* Heading */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">Welcome Back</h1>
          <p className="mt-2 text-sm text-white/70">
            Continue securely with Google
          </p>
        </div>

        {/* Google Button */}
        <button
          onClick={login}
          disabled={loading}
          className=" cursor-pointer w-full flex items-center justify-center gap-3 bg-white text-gray-800 font-medium py-3 rounded-xl shadow-md transition transform hover:scale-105 hover:shadow-xl active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {loading ? (
            "Redirecting..."
          ) : (
            <>
              <svg className="w-5 h-5" viewBox="0 0 48 48">
                <path
                  fill="#FFC107"
                  d="M43.611 20.083H42V20H24v8h11.303C33.568 32.657 29.195 36 24 36c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.843 1.154 7.965 3.035l5.657-5.657C33.727 6.053 29.127 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"
                />
              </svg>
              Sign in with Google
            </>
          )}
        </button>

        {/* Footer */}
        <p className="mt-8 text-xs text-white/50">
          Secure authentication powered by Supabase
        </p>

        {/* Developer Credit */}
        <p className="mt-4 text-xs text-white/40 tracking-wide">
          Developed by{" "}
          <span className="text-white font-medium">Parthib Sarkar</span>
        </p>
      </div>
    </main>
  )
}
