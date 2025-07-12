"use client";
import Features from "@/components/Features";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";

export default function Home() {
  return (
    <div className="mt-10 flex flex-col min-h-screen px-6 sm:px-20 pt-10 pb-0 font-[family-name:var(--font-geist-sans)]">
      <main className="flex-grow flex flex-col items-center space-y-24">
        <Hero />
        <Features />
      </main>
      <Footer />
    </div>
  );
}
