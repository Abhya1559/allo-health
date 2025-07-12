"use client";
import Features from "@/components/Features";
import Hero from "@/components/Hero";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col space-y-7 gap-10 items-center justify-center p-6 sm:p-20 pb-20 font-[family-name:var(--font-geist-sans)]">
      <Hero />
      <Features />
    </div>
  );
}
