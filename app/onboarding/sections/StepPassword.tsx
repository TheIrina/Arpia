"use client";

import { useState } from "react";
import {
  Eye,
  EyeSlash,
  CheckCircle,
  EnvelopeSimple,
} from "@phosphor-icons/react";
import { StepAction } from "../components/StepAction";

interface StepProps {
  onFinish: (data: { email: string; password: string }) => void;
  isLoading: boolean;
  initialEmail?: string;
}

export function StepPassword({ onFinish, isLoading, initialEmail = "" }: StepProps) {
  const [email, setEmail] = useState(initialEmail);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length >= 8 && email.includes("@")) {
      onFinish({ email, password });
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

        <StepAction
          type="submit"
          loading={isLoading}
          disabled={password.length < 8 || !email.includes("@")}
        >
          <CheckCircle size={20} weight="fill" />
          Finish Registration
        </StepAction>
      </form>
    </div>
  );
}
