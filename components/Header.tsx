"use client";
import Link from "next/link";
import { useState } from "react";
import { headerData } from "@/app/constants";
import { Button } from "./ui/button";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-white z-50 fixed top-0 w-full shadow-md">
      <div className="flex items-center justify-between px-6 py-4">
        <h1 className="text-2xl font-bold text-purple-600">Allo Health</h1>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-5">
          {headerData.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-gray-700 font-semibold hover:text-purple-600 transition"
            >
              {item.title}
            </Link>
          ))}
        </nav>

        {/* Desktop Buttons */}
        <div className="hidden md:flex gap-3 items-center">
          <Link href="/login">
            <Button
              variant={"link"}
              className="text-md font-medium cursor-pointer hover:text-purple-900"
            >
              Login
            </Button>
          </Link>
          <Link href="/register">
            <Button className="rounded-xl cursor-pointer bg-purple-600 hover:bg-purple-700">
              Sign up
            </Button>
          </Link>
        </div>

        {/* Hamburger Icon */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} aria-label="Toggle Menu">
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden px-6 pb-4">
          <nav className="flex flex-col gap-4 mb-4">
            {headerData.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-gray-700 font-semibold hover:text-purple-600 transition"
                onClick={() => setIsOpen(false)}
              >
                {item.title}
              </Link>
            ))}
          </nav>
          <div className="flex flex-col gap-2">
            <Button
              variant={"link"}
              className="text-md font-medium cursor-pointer hover:text-purple-900"
              onClick={() => setIsOpen(false)}
            >
              Login
            </Button>
            <Button className="rounded-xl cursor-pointer bg-purple-600 hover:bg-purple-700">
              Sign up
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
