"use client";

import { ArrowRight } from "@phosphor-icons/react";
import { ReactNode } from "react";

interface StepActionProps {
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit";
  loading?: boolean;
  children?: ReactNode;
  className?: string;
}

export function StepAction({
  onClick,
  disabled = false,
  type = "button",
  loading = false,
  children = "Continue",
  className = "",
}: StepActionProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-white via-white to-transparent lg:relative lg:p-0 lg:bg-none lg:mt-12">
      <button
        type={type}
        onClick={onClick}
        disabled={disabled || loading}
        className={`w-full lg:w-fit lg:px-12 flex items-center justify-center gap-2 rounded-full bg-[#1A1A1A] text-white py-4 text-sm md:text-base hover:bg-zinc-950 transition-all disabled:opacity-20 disabled:cursor-not-allowed font-medium shadow-xl lg:shadow-none ${className}`}
      >
        {loading ? (
          <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
        ) : (
          <>
            {children}
            <ArrowRight size={18} weight="bold" />
          </>
        )}
      </button>
    </div>
  );
}
