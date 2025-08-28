"use client";
import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-emerald-600">
          LocalGuide
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex space-x-6 font-medium text-gray-700">
          <Link href="/tours" className="hover:text-emerald-600">
            Tours
          </Link>
          <Link href="/guides" className="hover:text-emerald-600">
            Guides
          </Link>
          <Link href="/about" className="hover:text-emerald-600">
            About
          </Link>
          <Link href="/contact" className="hover:text-emerald-600">
            Contact
          </Link>
        </nav>

        {/* CTA */}
        <div className="hidden md:block">
          <Link
            href="/login"
            className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
          >
            Login
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-gray-700"
          onClick={() => setIsOpen(!isOpen)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow px-6 py-4 space-y-3">
          <Link href="/tours" className="block hover:text-emerald-600">
            Tours
          </Link>
          <Link href="/guides" className="block hover:text-emerald-600">
            Guides
          </Link>
          <Link href="/about" className="block hover:text-emerald-600">
            About
          </Link>
          <Link href="/contact" className="block hover:text-emerald-600">
            Contact
          </Link>
          <Link
            href="/login"
            className="block px-4 py-2 bg-emerald-600 text-white rounded-lg text-center"
          >
            Login
          </Link>
        </div>
      )}
    </header>
  );
}
