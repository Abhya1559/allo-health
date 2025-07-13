"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <div className="mt-10 mx-auto px-4">
      <div className="flex flex-col-reverse md:flex-row justify-between items-center gap-16 md:gap-36">
        {/* Text Section */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex-1 space-y-4 text-left"
        >
          <span className="inline-block bg-amber-100 text-gray-800 text-sm font-medium px-3 py-1 rounded-full">
            India&apos;s #1 sexual health provider
          </span>
          <div className="text-left">
            <h1 className="text-xl tracking-tighter md:text-5xl font-bold text-gray-900">
              Reception Management System for{" "}
              <span className="text-purple-700">Allo Healthcare</span>
            </h1>
          </div>
          <p className="text-gray-600 text-pretty">
            Hospitals have complex security and operational needs. Hospital
            premises serve hundreds and thousands of patients and their visitors
            every day. Managing these visitors and patients at the reception
            area with the paper-based system is tedious and nonsecure. The
            reception management is one way to manage these visitors in the
            reception area. With technological advancement, reception management
            systems enable a contactless visitor check-in experience by
            replacing paper logbooks. This hospital reception software makes
            managing visitor check-ins easy and secure for Hospitals.
          </p>

          <Link href="/login">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-4 bg-purple-600 text-white px-6 py-2 rounded-full hover:bg-purple-700 cursor-pointer transition"
            >
              Get Started
            </motion.button>
          </Link>
        </motion.div>

        {/* Image Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
          className="w-full md:w-auto"
        >
          <Image
            className="rounded-xl w-full h-auto shadow-lg"
            src="/img.jpg"
            alt="Hero Image"
            width={600}
            height={600}
            priority
          />
        </motion.div>
      </div>
    </div>
  );
}
