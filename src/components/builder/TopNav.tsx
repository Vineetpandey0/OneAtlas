"use client";

import { Bell, ChevronDown, PanelLeftClose, PanelLeftOpen } from "lucide-react";
import { useSidebar } from "@/components/ui/sidebar";

export default function TopNav() {
  const { toggleSidebar, open } = useSidebar();

  return (
    <header className="fixed top-0 left-0 right-0 h-14 bg-white border-b border-gray-200 z-50 flex items-center px-3 gap-3">

      {/* Sidebar toggle */}
      <button
        onClick={toggleSidebar}
        className="p-1.5 rounded-md text-gray-500 hover:bg-gray-100 hover:text-gray-800 transition-colors"
        aria-label="Toggle sidebar"
      >
        {open ? (
          <PanelLeftClose className="w-5 h-5" />
        ) : (
          <PanelLeftOpen className="w-5 h-5" />
        )}
      </button>

      {/* Logo */}
      <div className="flex items-center gap-2">
        <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-orange-400 to-orange-500 flex items-center justify-center shadow-sm">
          <span className="text-white font-bold text-xs">AB</span>
        </div>
      </div>

      {/* Workspace selector */}
      <button className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg hover:bg-gray-100 transition-colors max-w-[180px]">
        <span className="text-sm font-medium text-gray-800 truncate">Vineet&apos;s Workspace</span>
        <ChevronDown className="w-3.5 h-3.5 text-gray-500 shrink-0" />
      </button>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Notifications */}
      <button className="relative p-1.5 rounded-md text-gray-500 hover:bg-gray-100 hover:text-gray-800 transition-colors">
        <Bell className="w-5 h-5" />
        <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-orange-400 ring-2 ring-white" />
      </button>

      {/* Avatar */}
      <button className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white font-semibold text-sm shadow-sm hover:shadow-md transition-shadow">
        V
      </button>
    </header>
  );
}