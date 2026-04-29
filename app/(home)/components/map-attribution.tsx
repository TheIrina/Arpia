"use client";

import React, { useState } from "react";
import { ExclamationMarkIcon } from "@phosphor-icons/react/dist/ssr/ExclamationMark";
import { XIcon } from "@phosphor-icons/react/dist/ssr/X";

export const MapAttribution = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Background Overlay */}
      {isOpen && (
        <div
          role="button"
          tabIndex={0}
          className="fixed inset-0 bg-black/30 backdrop-blur-lg z-50 animate-in fade-in duration-200 "
          onClick={() => setIsOpen(false)}
          onKeyDown={(e) => {
            if (e.key === "Escape" || e.key === "Enter") setIsOpen(false);
          }}
          aria-label="Close attribution menu"
        />
      )}

      <div className="absolute top-4 right-4 z-60 font-sans flex flex-row items-start gap-4 justify-end">
        {/* Popup Window Menu */}
        {isOpen && (
          <div className="bg-black flex flex-col p-6 rounded-2xl animate-in fade-in slide-in-from-right-4 duration-200 min-w-50">
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
          className={`p-4 md:p-2  flex items-center justify-center rounded-full ${isOpen ? "bg-white text-black " : "bg-black/20 backdrop-blur-xs text-white "}`}
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
