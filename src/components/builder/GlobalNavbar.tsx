"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <header className="w-full border-b border-gray-200 bg-white">
      <div className="max-w-7xl mx-auto h-18 px-4 flex items-center justify-between">
        
        {/* Left: Project Name */}
        <Link
          href="/"
          className="text-lg font-semibold text-gray-900 tracking-tight"
        >
          AI AppBuilder
        </Link>

        {/* Right: CTA */}
        <Link
          href="/sign-up"
          className="
            px-4 h-9 flex items-center rounded-md
            bg-gray-900 text-white text-sm font-medium
            hover:bg-gray-800
            transition
          "
        >
          Start Building
        </Link>

      </div>
    </header>
  );
}