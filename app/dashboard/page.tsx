"use client"

import { useEffect, useState, useCallback } from "react"
import { supabase } from "@/lib/supabaseClient"
import { User } from "@supabase/supabase-js"
import { Bookmark } from "@/types/bookmark"

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null)
  const [title, setTitle] = useState("")
  const [url, setUrl] = useState("")
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([])
  const [error, setError] = useState("")

  // ✅ Get user
  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser()
      if (!data.user) window.location.href = "/"
      else setUser(data.user)
    }
    getUser()
  }, [])

  // ✅ Fetch bookmarks
  const fetchBookmarks = useCallback(async () => {
    const { data } = await supabase
      .from("bookmarks")
      .select("*")
      .order("created_at", { ascending: false })

    if (data) setBookmarks(data)
  }, [])

  useEffect(() => {
    if (user) fetchBookmarks()
  }, [user, fetchBookmarks])

  // ✅ Add bookmark
  const addBookmark = async () => {
    if (!title.trim() || !url.trim()) {
      setError("Both title and URL are required")
      return
    }

    setError("")

    const formattedUrl = url.startsWith("http") ? url : `https://${url}`

    const { error } = await supabase.from("bookmarks").insert({
      title,
      url: formattedUrl,
      user_id: user?.id,
    })

    if (!error) {
      setTitle("")
      setUrl("")
      fetchBookmarks()
    }
  }

  // ✅ Delete bookmark with popup
  const deleteBookmark = async (id: string) => {
    const confirmDelete = confirm(
      "Are you sure you want to delete this bookmark?"
    )
    if (!confirmDelete) return

    await supabase.from("bookmarks").delete().eq("id", id)
    fetchBookmarks()
  }

  // ✅ Logout
  const logout = async () => {
    await supabase.auth.signOut()
    window.location.href = "/"
  }

  // ✅ Get favicon dynamically
  const getIcon = (link: string) => {
    try {
      const domain = new URL(link).hostname

      if (domain.includes("github.com"))
        return "https://github.githubassets.com/favicons/favicon.png"

      if (domain.includes("google.com"))
        return "https://www.google.com/favicon.ico"

      return `${new URL(link).origin}/favicon.ico`
    } catch {
      return null
    }
  }

  if (!user) return null

  return (
    <div className="min-h-screen px-6 py-10 bg-gradient-to-br from-white to-gray-100">
      {/* Header */}
      <div className="flex justify-between items-center max-w-5xl mx-auto mb-10">
        <div>
          <h1 className="text-4xl font-semibold text-gray-800">My Bookmarks</h1>
          <p className="text-gray-500">
            {" "}
            Hello there, {user.user_metadata?.full_name || user.email}
          </p>
        </div>

        <button
          onClick={logout}
          className="cursor-pointer px-6 py-2 rounded-full bg-red-500 text-white font-medium hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>

      {/* Add Bookmark */}
      <div className="max-w-5xl mx-auto backdrop-blur-xl bg-white/60 border border-white/40 shadow-xl rounded-3xl p-8 mb-10">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">
          Add Bookmark
        </h2>

        <div className="space-y-4">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            className={`w-full px-4 py-3 rounded-xl bg-white/70 border ${
              error && !title ? "border-red-400" : "border-gray-200"
            } text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-400`}
          />

          <input
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://example.com"
            className={`w-full px-4 py-3 rounded-xl bg-white/70 border ${
              error && !url ? "border-red-400" : "border-gray-200"
            } text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-400`}
          />

          {error && <p className="text-red-500 text-sm font-medium">{error}</p>}

          <button
            onClick={addBookmark}
            className="cursor-pointer w-full py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-medium shadow-md hover:scale-[1.02] transition"
          >
            Save Bookmark
          </button>
        </div>
      </div>

      {/* Bookmark Grid */}
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6">
        {bookmarks.map((b) => (
          <div
            key={b.id}
            className="backdrop-blur-xl bg-white/70 border border-white/40 rounded-2xl p-5 shadow-md hover:shadow-xl transition"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3">
                <img
                  src={getIcon(b.url) || "/globe.svg"}
                  alt="icon"
                  className="w-6 h-6"
                  onError={(e) => {
                    e.currentTarget.src = "/globe.svg"
                  }}
                />

                <div>
                  <p className="font-semibold text-gray-800 text-lg">
                    {b.title}
                  </p>

                  <a
                    href={b.url}
                    target="_blank"
                    className="text-indigo-600 text-sm break-all hover:underline"
                  >
                    {b.url}
                  </a>
                </div>
              </div>

              <button
                onClick={() => deleteBookmark(b.id)}
                className="text-red-500 text-sm hover:text-red-600 font-medium cursor-pointer"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
