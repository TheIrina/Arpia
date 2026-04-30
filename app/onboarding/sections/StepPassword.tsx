"use client";

import { useState } from "react";
import {
  Eye,
  EyeSlash,
  CheckCircle,
  EnvelopeSimple,
} from "@phosphor-icons/react";

interface StepProps {
  onFinish: (data: { password: string }) => void;
  isLoading: boolean;
}

export function StepPassword({ onFinish, isLoading }: StepProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length >= 8 && email.includes("@")) {
      onFinish({ password });
    }
  };

  return (
    <div className="flex flex-col items-center gap-12 w-full animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="flex flex-col gap-2 text-center">
        <h1 className="text-lg md:text-xl font-medium tracking-tight text-[#1A1A1A]">
          Create your account
        </h1>
        <p className="text-sm md:text-base text-black/60 font-light tracking-wide max-w-sm">
          Save your preferences and start your experience in Roldanillo.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center gap-8 w-full max-w-4xl"
      >
        <div className="flex flex-col items-center gap-12 w-full">
          {/* Email Input */}
          <div className="relative w-full">
            <input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address"
              className="w-full bg-transparent py-4 text-4xl md:text-6xl text-[#1A1A1A] outline-none transition-colors font-medium placeholder:text-black/10 caret-black text-center"
            />
          </div>

          {/* Password Input */}
          <div className="relative w-full">
            <input
              required
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              minLength={8}
              className="w-full bg-transparent py-4 text-4xl md:text-6xl text-[#1A1A1A] outline-none transition-colors font-medium placeholder:text-black/10 caret-black text-center"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-0 top-1/2 -translate-y-1/2 text-black/20 hover:text-black transition-colors px-2"
            >
              {showPassword ? <EyeSlash size={32} /> : <Eye size={32} />}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading || password.length < 8 || !email.includes("@")}
          className="w-full max-w-sm flex items-center justify-center gap-3 rounded-full bg-[#1A1A1A] text-white py-4 text-sm md:text-base hover:bg-zinc-950 disabled:opacity-30 transition-all font-medium mt-4"
        >
          {isLoading ? (
            <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
          ) : (
            <>
              <CheckCircle size={20} weight="fill" />
              Finish Registration
            </>
          )}
        </button>
      </form>
    </div>
  );
}
