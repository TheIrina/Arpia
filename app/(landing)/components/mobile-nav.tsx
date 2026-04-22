"use client";

import React, { useState, useEffect } from "react";
import { ListIcon } from "@phosphor-icons/react/dist/ssr/List";
import { XIcon } from "@phosphor-icons/react/dist/ssr/X";
import { ArrowUpRightIcon } from "@phosphor-icons/react/dist/ssr/ArrowUpRight";
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
    { label: "Route", href: "/route", hasIcon: true },
    { label: "Instructions", href: "/instructions", hasIcon: false },
    { label: "FAQ", href: "/faq", hasIcon: true },
    { label: "History", href: "/history", hasIcon: false },
    { label: "Contact Us", href: "/contact", hasIcon: false },
    { label: "Log in", href: "/login", hasIcon: false },
    { label: "Register now", href: "/register", hasIcon: false },
  ];

  return (
    <>
      {/* Background Overlay */}
      {isOpen && (
        <div
          role="button"
          tabIndex={0}
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 md:hidden animate-in fade-in duration-200"
          onClick={() => setIsOpen(false)}
          onKeyDown={(e) => {
            if (e.key === "Escape" || e.key === "Enter") setIsOpen(false);
          }}
          aria-label="Close menu"
        />
      )}

      <div className="fixed bottom-4 right-4 z-60 md:hidden font-['Helvetica_Neue',Helvetica,Arial,sans-serif] grid gap-4 justify-items-end">
        {/* Popup Window Menu */}
        {isOpen && (
          <div className="bg-black flex flex-col p-6 rounded-2xl animate-in fade-in slide-in-from-bottom-4 duration-200 min-w-50">
            {/* Links aligned to right */}
            <div className="flex flex-col items-end gap-4 w-full text-right">
              {links.map((link, index) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="group flex items-center justify-end gap-3 text-white hover:underline text-lg font-medium tracking-tight w-full"
                >
                  {link.hasIcon && <ArrowUpRightIcon size={18} />}
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Hamburger Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`w-12 h-12 flex items-center justify-center text-black rounded-2xl ${isOpen ? "bg-white" : "bg-white/30 backdrop-blur-xs"}`}
          aria-label="Toggle Menu"
        >
          {isOpen ? <XIcon size={24} /> : <ListIcon size={24} />}
        </button>
      </div>
    </>
  );
};
