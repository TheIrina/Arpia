"use client";

import { useReducer, useRef } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeSlash, ArrowRight, CaretLeft } from "@phosphor-icons/react";
import { GoogleIcon } from "./google-icon";
import { DotLoader } from "@/app/(landing)/components/dots";
import gsap, { useGSAP } from "@/lib/gsap";

const VERTICAL_WIND_FRAMES = [
  [32, 33],
  [26, 27, 31, 34],
  [20, 21, 25, 28, 30, 35],
  [14, 15, 19, 22, 24, 29],
  [8, 9, 13, 16, 18, 23],
  [2, 3, 7, 10, 12, 17],
  [1, 4, 6, 11],
  [0, 5],
  [],
  [],
];

type AuthStep = "METHOD" | "EMAIL" | "PASSWORD";

type AuthState = {
  step: AuthStep;
  email: string;
  password: string;
  showPassword: boolean;
  isLoading: boolean;
};

type AuthAction = Partial<AuthState>;

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  return { ...state, ...action };
};

export function AuthForm() {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const { contextSafe } = useGSAP({ scope: containerRef });

  const handleTourClick = contextSafe(() => {
    gsap.to(".transition-curtain", {
      autoAlpha: 1,
      duration: 0.8,
      ease: "power2.inOut",
      onComplete: () => {
        router.push("/onboarding");
      },
    });
  });

  const [state, dispatch] = useReducer(authReducer, {
    step: "METHOD",
    email: "",
    password: "",
    showPassword: false,
    isLoading: false,
  });

  const checkEmail = async (email: string) => {
    await new Promise((r) => setTimeout(r, 800));
    return email.endsWith("@arpia.com");
  };

  const handleContinue = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!state.email) return;

    dispatch({ isLoading: true });
    const exists = await checkEmail(state.email);
    dispatch({ isLoading: false });

    if (exists) {
      dispatch({ step: "PASSWORD" });
    } else {
      router.push(`/onboarding?email=${encodeURIComponent(state.email)}`);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!state.password) return;
    dispatch({ isLoading: true });
    await new Promise((r) => setTimeout(r, 1500));
    dispatch({ isLoading: false });
    router.push("/home");
  };

  const isEmailStep = state.step === "EMAIL" || state.step === "PASSWORD";

  const headingText =
    state.step === "METHOD"
      ? "Welcome back"
      : state.step === "EMAIL"
        ? "Sign in with email"
        : "Enter your password";

  return (
    <div ref={containerRef} className="w-full h-full flex flex-col items-center">
      {/* Dark glass backdrop for email/password steps — replaces jarring white slide-in */}
      {isEmailStep && (
        <div className="fixed inset-0 bg-zinc-950/60 backdrop-blur-md z-10 animate-in fade-in duration-500" />
      )}

      {/* Dynamic Header with Back Button — glassmorphism style matching navbar */}
      {state.step !== "METHOD" && (
        <header className="absolute top-0 left-0 right-0 p-6 flex items-center justify-between z-20 max-w-7xl mx-auto w-full">
          <button
            onClick={() =>
              dispatch({ step: state.step === "PASSWORD" ? "EMAIL" : "METHOD" })
            }
            className="w-10 h-10 flex items-center justify-center bg-white/10 backdrop-blur-sm border border-white/10 text-white rounded-full hover:bg-white/20 transition-all"
            aria-label="Go back"
          >
            <CaretLeft size={20} weight="bold" />
          </button>
          <div className="w-10" />
        </header>
      )}

      {/* Step Content */}
      <div className="flex-1 flex flex-col items-center justify-center w-full animate-in fade-in slide-in-from-right-4 duration-500 relative z-20">
        {/* DotLoader brand mark — same wind animation as the navbar */}
        <div className="mb-3">
          <DotLoader
            frames={VERTICAL_WIND_FRAMES}
            duration={120}
            activeDotClassName="bg-white"
            inactiveDotClassName="bg-white/20"
            dotSizeClassName="w-1 h-1"
            gapClassName="gap-0.5"
          />
        </div>

        {/* Header Text — consistent white, no switching to dark */}
        <div className="flex flex-col gap-2 text-center mb-12">
          <h1 className="text-lg md:text-xl font-medium tracking-tight text-white">
            {headingText}
          </h1>
        </div>

        {state.step === "EMAIL" && (
          <form
            onSubmit={handleContinue}
            className="flex flex-col items-center gap-12 w-full max-w-4xl px-4"
          >
            <input
              id="auth-email"
              type="email"
              required
              autoComplete="email"
              value={state.email}
              onChange={(e) => dispatch({ email: e.target.value })}
              placeholder="Email address"
              className="w-full bg-transparent py-4 text-4xl md:text-6xl text-white outline-none transition-colors font-medium placeholder:text-white/20 caret-white text-center"
            />

            <button
              type="submit"
              disabled={state.isLoading || !state.email}
              className="w-full max-w-sm flex items-center justify-center gap-2 rounded-full bg-white text-[#1A1A1A] py-3.5 text-sm md:text-base hover:bg-zinc-200 disabled:opacity-30 transition-all font-medium"
            >
              {state.isLoading ? (
                <div className="w-5 h-5 border-2 border-[#1A1A1A]/20 border-t-[#1A1A1A] rounded-full animate-spin" />
              ) : (
                <>
                  Continue
                  <ArrowRight size={18} weight="bold" />
                </>
              )}
            </button>
          </form>
        )}

        {state.step === "PASSWORD" && (
          <form
            onSubmit={handleLogin}
            className="flex flex-col items-center gap-12 w-full max-w-4xl px-4"
          >
            <div className="relative w-full">
              <input
                id="auth-password"
                type={state.showPassword ? "text" : "password"}
                required
                autoComplete="current-password"
                value={state.password}
                onChange={(e) => dispatch({ password: e.target.value })}
                placeholder="Password"
                className="w-full bg-transparent py-4 text-4xl md:text-6xl text-white outline-none transition-colors font-medium placeholder:text-white/20 caret-white text-center"
              />
              <button
                type="button"
                onClick={() => dispatch({ showPassword: !state.showPassword })}
                className="absolute right-0 top-1/2 -translate-y-1/2 text-white/30 hover:text-white transition-colors px-2"
              >
                {state.showPassword ? (
                  <EyeSlash size={32} />
                ) : (
                  <Eye size={32} />
                )}
              </button>
            </div>

            <button
              type="submit"
              disabled={state.isLoading || !state.password}
              className="w-full max-w-sm flex items-center justify-center gap-2 rounded-full bg-white text-[#1A1A1A] py-3.5 text-sm md:text-base hover:bg-zinc-200 disabled:opacity-30 transition-all font-medium"
            >
              {state.isLoading ? (
                <div className="w-5 h-5 border-2 border-[#1A1A1A]/20 border-t-[#1A1A1A] rounded-full animate-spin" />
              ) : (
                <>
                  Sign in
                  <ArrowRight size={18} weight="bold" />
                </>
              )}
            </button>
          </form>
        )}
      </div>

      {/* Method step buttons — matching landing page glassmorphism style */}
      {state.step === "METHOD" && (
        <div className="fixed bottom-0 left-0 right-0 px-4 pb-8 pt-8 bg-gradient-to-t from-black/80 via-black/40 to-transparent lg:relative lg:p-0 lg:bg-none lg:mt-12 w-full flex flex-col items-center animate-in fade-in slide-in-from-bottom-4 duration-500 z-50">
          <div className="flex flex-col gap-3 w-full lg:max-w-sm">
            <button
              onClick={() => {
                /* TODO: Google Auth */
              }}
              className="w-full flex items-center justify-center gap-3 rounded-full border border-black/10 bg-white py-4 text-sm md:text-base font-medium text-[#1A1A1A] hover:bg-zinc-50 transition-all duration-200"
            >
              <GoogleIcon className="w-5 h-5" />
              Continue with Google
            </button>

            <button
              onClick={handleTourClick}
              className="w-full flex items-center justify-center gap-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white py-4 text-sm md:text-base font-medium hover:bg-white/20 transition-all duration-200"
            >
              Take a quick tour
              <ArrowRight size={18} weight="bold" />
            </button>

            <button
              onClick={() => dispatch({ step: "EMAIL" })}
              className="mt-2 text-sm text-white/50 hover:text-white transition-colors"
            >
              Sign in with email
            </button>
          </div>
        </div>
      )}

      {/* Cinematic Transition Curtain */}
      <div className="transition-curtain fixed inset-0 bg-[#0A0A0A] z-[100] opacity-0 invisible pointer-events-none" />
    </div>
  );
}
