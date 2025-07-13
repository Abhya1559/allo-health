"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import "./glitter.css";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();
      if (res.ok) {
        setSuccess("Registration successful! Redirecting to login...");
        setTimeout(() => router.push("/login"), 1500);
      } else {
        setError(data.error || "Registration failed");
      }
    } catch (err) {
      console.log(err);
      setError("Server error during registration");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full grid grid-cols-1 md:grid-cols-2 font-sans">
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="flex items-center justify-center px-8 py-16 bg-white"
      >
        <section className="w-full max-w-md space-y-8">
          <div className="space-y-1 text-center">
            <h1 className="text-4xl font-extrabold text-gray-800">
              Create Account
            </h1>
            <p className="text-sm text-gray-500">
              Start your journey to better health.
            </p>
          </div>
          {error && (
            <div className="bg-red-100 text-red-700 p-2 rounded text-sm">
              {error}
            </div>
          )}
          {success && (
            <div className="bg-green-100 text-green-700 p-2 rounded text-sm">
              {success}
            </div>
          )}
          <form onSubmit={handleRegister} className="space-y-5 text-gray-700">
            <input
              type="text"
              placeholder="Full Name"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-purple-600 cursor-pointer hover:bg-purple-700 text-white py-3 rounded-lg text-lg font-semibold shadow-md transition"
            >
              {loading ? "Registering..." : "Register"}
            </button>
          </form>
          <p className="text-sm text-center text-gray-500">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-purple-600 cursor-pointer hover:underline hover:text-purple-700"
            >
              Sign in
            </Link>
          </p>
        </section>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="relative overflow-hidden flex items-center justify-center bg-gradient-to-br from-purple-500 to-purple-700 text-white px-8 py-16"
      >
        <div className="absolute inset-0 hospital-bg-glow z-0" />

        <div className="relative z-10 text-center space-y-6 max-w-lg">
          <h1 className="text-4xl font-extrabold leading-snug tracking-wide">
            <span className="inline-block animate-pulse text-pink-300">❤️</span>{" "}
            Allo care + Portal
          </h1>
          <p className="text-lg font-medium text-gray-200">
            Where <span className="text-emerald-400">healing</span> meets{" "}
            <span className="text-blue-300">technology</span>. Join a smarter
            care journey.
          </p>

          <div className="mt-8 flex justify-center">
            <div className="w-1 h-24 bg-white/30 rounded-full relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-full bg-emerald-400 animate-pulseBar" />
            </div>
          </div>

          <div className="mt-6 text-sm opacity-70">
            Trusted by 50+ hospitals & 2M+ patients
          </div>
        </div>
      </motion.div>
    </div>
  );
}
