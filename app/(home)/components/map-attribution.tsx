"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { ExclamationMarkIcon } from "@phosphor-icons/react/dist/ssr/ExclamationMark";
import { XIcon } from "@phosphor-icons/react/dist/ssr/X";

export const MapAttribution = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      {/* Background Overlay via Portal to stay behind sidebar (z-20) and nav (z-30/50) */}
      {mounted && isOpen && createPortal(
        <div
          role="button"
          tabIndex={0}
          className="fixed inset-0 bg-zinc-950/30 backdrop-blur-lg z-10 animate-in fade-in duration-200"
          onClick={() => setIsOpen(false)}
          onKeyDown={(e) => {
            if (e.key === "Escape" || e.key === "Enter") setIsOpen(false);
          }}
          aria-label="Close attribution menu"
        />,
        document.body
      )}

      <div className="relative font-sans flex flex-row items-center justify-center">
        {/* Popup Window Menu */}
        {isOpen && (
          <div className="absolute top-full right-0 mt-4 bg-zinc-950 flex flex-col p-6 rounded-2xl animate-in fade-in slide-in-from-top-4 duration-200 min-w-50 z-50">
            <div className="flex flex-col items-end gap-4 w-full text-right">
              <a
                href="https://www.mapbox.com/about/maps/"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsOpen(false)}
                className="group flex items-center justify-end gap-3 text-white hover:underline text-lg font-medium tracking-tight w-full"
              >
                © Mapbox
              </a>
              <a
                href="http://www.openstreetmap.org/copyright"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsOpen(false)}
                className="group flex items-center justify-end gap-3 text-white hover:underline text-lg font-medium tracking-tight w-full"
              >
                © OpenStreetMap
              </a>
              <a
                href="https://www.mapbox.com/map-feedback/"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsOpen(false)}
                className="group flex items-center justify-end gap-3 text-white hover:underline text-lg font-medium tracking-tight w-full"
              >
                Improve this map
              </a>
            </div>
          </div>
        )}

        {/* The Black "i" Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`relative z-50 p-4 md:p-2  flex items-center justify-center rounded-full ${isOpen ? "bg-white text-black " : "bg-zinc-950/20 backdrop-blur-xs text-white "}`}
          aria-label="Mapbox Attribution"
        >
          {isOpen ? (
            <XIcon size={24} weight="light" />
          ) : (
            <ExclamationMarkIcon size={24} />
          )}
        </button>
      </div>
    </>
  );
};
