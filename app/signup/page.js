 "use client";
// src/pages/Signup.js
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link"; 

export default function Signup() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const showError = (msg) => {
    setError(msg);
    setTimeout(() => setError(""), 3000);
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    // 1. Client-side Validation
    if (!form.name || !form.email || !form.password) {
      showError("Please fill in all fields.");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(form.email)) {
      showError("Enter a valid email address.");
      return;
    }
    if (form.password.length < 6) {
      showError("Password must be at least 6 characters long.");
      return;
    }

    // 2. FRONTEND ONLY: Removed fetch to localhost
    // We simulate a successful signup so the user can proceed to Login.
    try {
      // Optional: Log data to console so you can see it works
      console.log("Signup Data (Demo):", form);

      alert("Account created successfully! (Demo Mode)");
      router.push("/login"); // Redirect to Login page

    } catch {
      showError("Something went wrong.");
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-green-50">
      <div className="bg-white p-8 rounded-lg shadow w-full max-w-md border border-green-100">
        <h1 className="text-2xl font-bold text-green-700 mb-4 text-center">
          Sign up to ShelfShare
        </h1>

        {error && (
          <div className="bg-red-100 text-red-700 p-2 rounded mb-3 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-600 mb-1">Full Name</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-green-600"
              placeholder="Full Name"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">Email</label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-green-600"
              placeholder="Email"
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
              placeholder="Password"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-700 text-white py-2 rounded hover:bg-green-800 transition font-bold"
          >
            Sign up
          </button>
        </form>

        <p className="text-sm text-gray-600 mt-4 text-center">
          Already have an account?{" "}
          <Link href="/login" className="text-green-700 underline font-medium">
            Login here
          </Link>
        </p>
      </div>
    </main>
  );
}