"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";

interface LogoutButtonProps {
  onLogout?: () => void;
}

export default function LogoutButton(props: LogoutButtonProps) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/auth/logout", { method: "POST" });
      if (res.ok) {
        router.push("/login");
        props.onLogout?.();
      }
    } catch (error) {
      console.error("Logout failed", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleLogout}
      disabled={loading}
      className="flex items-center gap-2 bg-gradient-to-r cursor-pointer from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-semibold px-5 py-2 rounded-full shadow-md transition-all duration-300 ease-in-out disabled:opacity-50"
    >
      {loading ? (
        <span className="animate-spin border-2 border-white border-t-transparent rounded-full w-4 h-4"></span>
      ) : (
        <LogOut size={18} />
      )}
      <span>{loading ? "Logging out..." : "Logout"}</span>
    </button>
  );
}
