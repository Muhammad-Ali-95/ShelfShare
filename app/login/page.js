 "use client";
// src/pages/Login.js
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link"; // Import Link for Next.js navigation

export default function Login() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const showError = (msg) => {
    setError(msg);
    setTimeout(() => setError(""), 3000);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      showError("Please enter both email and password.");
      return;
    }

    // --- FRONTEND ONLY CHANGE ---
    // Removed the fetch() call to localhost:8080.
    // We simulate a successful login for the assignment submission.
    
    try {
      // 1. Set Dummy Data so Dashboard doesn't crash
      localStorage.setItem("shelfshare_token", "demo-token-123");
      localStorage.setItem(
        "shelfshare_user",
        JSON.stringify({ name: "Demo User", email: form.email })
      );

      // 2. Alert and Redirect
      alert("Login successful! (Demo Mode: No backend connected)");
      router.push("/dashboard"); 
      
    } catch (err) {
      console.error("Login error:", err);
      showError("Something went wrong.");
    }
  };

  return (
    <main className="min-h-screen bg-green-50 flex flex-col">
      {/* 1. Added Navbar for Assignment Requirement #4 */}
      <nav className="w-full bg-white shadow py-4 px-8 flex justify-between items-center fixed top-0 left-0">
        <h1 className="text-xl font-bold text-green-700">ShelfShare</h1>
        <Link href="/" className="text-gray-600 hover:text-green-700 font-medium">
           Back to Home
        </Link>
      </nav>

      <div className="flex-1 flex items-center justify-center mt-16">
        <div className="bg-white p-8 rounded-lg shadow w-full max-w-md border border-green-100">
          <h1 className="text-2xl font-bold text-green-700 mb-4 text-center">
            Login to ShelfShare
          </h1>

          {error && (
            <div className="bg-red-100 text-red-700 p-2 rounded mb-3 text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
                <label className="block text-sm text-gray-600 mb-1">Email</label>
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-green-600"
                  placeholder="user@example.com"
                />
            </div>
            
            <div>
                <label className="block text-sm text-gray-600 mb-1">Password</label>
                <input
                  name="password"
                  type="password"
                  value={form.password}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-green-600"
                  placeholder="••••••"
                />
            </div>

            <button
              type="submit"
              className="w-full bg-green-700 text-white py-2 rounded hover:bg-green-800 transition font-bold"
            >
              Login
            </button>
          </form>

          <p className="text-sm text-gray-600 mt-4 text-center">
            Don’t have an account?{" "}
            {/* Using Next.js Link instead of a href */}
            <Link href="/signup" className="text-green-700 underline font-medium">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}