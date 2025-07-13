"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { headerData } from "@/app/constants";
import { Menu, X } from "lucide-react";
import LogoutButton from "@/app/(Auth)/logout/page";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch("/api/auth/verify");
        const data = await res.json();
        setIsAuthenticated(!!data.user);
      } catch (error) {
        console.log(error);
        setIsAuthenticated(false);
      }
    }
    checkAuth();
  }, []);

  return (
    <header className="bg-white z-50 fixed top-0 w-full shadow-md">
      <div className="flex items-center justify-between px-6 py-4">
        <Link href="/">
          <h1 className="text-2xl font-bold text-purple-600">Allo Health</h1>
        </Link>

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
          {isAuthenticated ? (
            <LogoutButton onLogout={() => setIsAuthenticated(false)} />
          ) : (
            <>
              <Link href="/login">
                <Button
                  variant="link"
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
            </>
          )}
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
            {isAuthenticated ? (
              <Link href="/logout">
                <Button
                  className="bg-red-500 hover:bg-red-600 text-white"
                  onClick={() => setIsOpen(false)}
                >
                  Logout
                </Button>
              </Link>
            ) : (
              <>
                <Link href="/login">
                  <Button
                    variant="link"
                    className="text-md font-medium cursor-pointer hover:text-purple-900"
                    onClick={() => setIsOpen(false)}
                  >
                    Login
                  </Button>
                </Link>
                <Link href="/register">
                  <Button
                    className="rounded-xl cursor-pointer bg-purple-600 hover:bg-purple-700"
                    onClick={() => setIsOpen(false)}
                  >
                    Sign up
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
