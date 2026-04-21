"use client";

import React, { useState, useEffect } from "react";
import { List } from "@phosphor-icons/react/dist/ssr/List";
import { X } from "@phosphor-icons/react/dist/ssr/X";
import { useLenis } from "./lenis-context";

export const MobileNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { lenisRef } = useLenis();

  // Prevent scrolling when menu is open
  useEffect(() => {
    const lenis = lenisRef.current;
    
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
      if (lenis) {
        lenis.stop();
      }
    } else {
      document.body.classList.remove("overflow-hidden");
      if (lenis) {
        lenis.start();
      }
    }
    return () => {
      document.body.classList.remove("overflow-hidden");
      if (lenis) {
        lenis.start();
      }
    };
  }, [isOpen, lenisRef]);

  const links = [
    { label: "Route", href: "#", hasIcon: true },
    { label: "Instructions", href: "#", hasIcon: false },
    { label: "FAQ", href: "#", hasIcon: true },
    { label: "History", href: "#", hasIcon: false },
    { label: "Contact Us", href: "#", hasIcon: false },
    { label: "Log in", href: "#", hasIcon: false },
    { label: "Register now", href: "#", hasIcon: false },
  ];

  return (
    <>
      {/* Background Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 md:hidden animate-in fade-in duration-200"
          onClick={() => setIsOpen(false)}
        />
      )}

      <div className="fixed bottom-4 right-4 z-[60] md:hidden font-['Helvetica_Neue',Helvetica,Arial,sans-serif] grid gap-4 justify-items-end">
      {/* Popup Window Menu */}
      {isOpen && (
        <div className="bg-white flex flex-col p-6 rounded-2xl animate-in fade-in slide-in-from-bottom-4 duration-200 min-w-[200px] shadow-lg border border-black/5">
          {/* Links aligned to right */}
          <div className="flex flex-col items-end gap-4 w-full text-right">
            {links.map((link, index) => (
              <a
                key={index}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="group flex items-center justify-end gap-3 text-black hover:underline text-lg font-medium tracking-tight w-full"
              >
                {link.hasIcon && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className=""
                  >
                    <path d="M7 17L17 7" />
                    <path d="M7 7h10v10" />
                  </svg>
                )}
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Hamburger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-12 h-12 flex items-center justify-center bg-white text-black rounded-2xl shadow-lg border border-black/5"
        aria-label="Toggle Menu"
      >
        {isOpen ? (
          <X size={24} weight="bold" />
        ) : (
          <List size={24} weight="bold" />
        )}
      </button>
    </div>
    </>
  );
};
