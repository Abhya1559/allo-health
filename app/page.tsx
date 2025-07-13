"use client";
import Features from "@/components/Features";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen font-[family-name:var(--font-geist-sans)]">
      <main className="mt-20 flex-grow flex flex-col max-w-[1320px] mx-auto items-center space-y-24">
        <Hero />
        <Features />
      </main>
      <Footer />
    </div>
  );
}
