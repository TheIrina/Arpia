"use client";

import { useReducer, useRef, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeSlash, ArrowRight, CaretLeft, Envelope } from "@phosphor-icons/react";
import { GoogleIcon } from "./google-icon";
import { DotLoader } from "@/app/(landing)/components/dots";
import gsap, { useGSAP } from "@/lib/gsap";
import { checkEmailExists } from "../actions";
import { signIn } from "@/lib/auth-client";

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

  const [isPending, startTransition] = useTransition();
  const isFormLoading = state.isLoading || isPending;

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();
    if (!state.email) return;

    dispatch({ isLoading: true });
    startTransition(async () => {
      try {
        const exists = await checkEmailExists(state.email);
        if (exists) {
          dispatch({ step: "PASSWORD", isLoading: false });
        } else {
          dispatch({ isLoading: false });
          router.push(`/signup?email=${encodeURIComponent(state.email)}`);
        }
      } catch (error) {
        console.error("Failed to check email:", error);
        dispatch({ isLoading: false });
      }
    });
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!state.password) return;

    dispatch({ isLoading: true });

    await signIn.email(
      {
        email: state.email,
        password: state.password,
      },
      {
        onSuccess: () => {
          dispatch({ isLoading: false });
          router.push("/home");
        },
        onError: (ctx) => {
          dispatch({ isLoading: false });
          alert(ctx.error.message); // Can be replaced with a toast notification later
        },
      },
    );
  };

  const isEmailStep = state.step === "EMAIL" || state.step === "PASSWORD";

  const headingText =
    state.step === "METHOD"
      ? "Track smarter. Plan calmer."
      : state.step === "EMAIL"
        ? "Sign in with email"
        : "Enter your password";

  return (
    <div
      ref={containerRef}
      className="w-full h-full flex flex-col items-center"
    >
      {/* Absolute Logo Header at the top of the screen */}
      <div className="fixed top-4 md:top-8 lg:top-12 left-0 right-0 flex justify-center z-30 pointer-events-none">
        <button
          onClick={() => router.push("/")}
          className="pointer-events-auto cursor-pointer hover:opacity-75 active:scale-95 transition-all duration-200"
          aria-label="Go to landing page"
        >
          <DotLoader
            frames={VERTICAL_WIND_FRAMES}
            duration={120}
            activeDotClassName="bg-white"
            inactiveDotClassName="bg-white/20"
            dotSizeClassName="w-1 h-1"
            gapClassName="gap-0.5"
          />
        </button>
      </div>

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
        {/* Header Text — consistent white, no switching to dark */}
        {state.step !== "METHOD" && (
          <div className="flex flex-col gap-2 text-center mb-12">
            <h1 className="text-lg md:text-xl font-medium tracking-tight text-white">
              {headingText}
            </h1>
          </div>
        )}

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
              disabled={isFormLoading || !state.email}
              className="w-full max-w-sm flex items-center justify-center gap-2 rounded-full bg-white text-[#1A1A1A] py-3.5 text-sm md:text-base hover:bg-zinc-200 disabled:opacity-30 transition-all font-medium"
            >
              {isFormLoading ? (
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
              disabled={isFormLoading || !state.password}
              className="w-full max-w-sm flex items-center justify-center gap-2 rounded-full bg-white text-[#1A1A1A] py-3.5 text-sm md:text-base hover:bg-zinc-200 disabled:opacity-30 transition-all font-medium"
            >
              {isFormLoading ? (
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
        <div className="fixed bottom-0 left-0 right-0 px-4 pb-8 pt-8 md:px-8 lg:relative lg:p-0 lg:bg-none lg:mt-12 w-full flex flex-col items-center lg:grid lg:grid-cols-12 lg:gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500 z-50">
          <div className="flex flex-col gap-2 md:gap-3 lg:gap-4 w-full lg:col-span-10 lg:col-start-2">
            <h2 className="text-4xl md:text-6xl font-normal tracking-tighter text-white text-center mb-8 max-w-lg md:max-w-3xl mx-auto leading-[1.1] animate-in fade-in slide-in-from-bottom-2 duration-700">
              Track smarter. <br className="hidden sm:inline" />Plan calmer.
            </h2>

            <button
              onClick={() => router.push("/signup")}
              className="w-full flex items-center justify-center gap-2 rounded-full bg-white text-[#1A1A1A] py-4 text-sm md:text-base font-medium hover:bg-white/90 active:scale-[0.99] transition-all duration-200"
            >
              Sign up
            </button>

            <div className="flex items-center my-1 w-full">
              <div className="flex-1 h-px bg-white/10" />
              <span className="px-3 text-xs font-mono text-white/30 uppercase tracking-widest">or</span>
              <div className="flex-1 h-px bg-white/10" />
            </div>

            <div className="grid grid-cols-2 gap-2 md:gap-3 lg:gap-4 w-full">
              <button
                onClick={async () => {
                  dispatch({ isLoading: true });
                  await signIn.social({
                    provider: "google",
                    callbackURL: "/home",
                  });
                }}
                disabled={state.isLoading}
                className="w-full flex items-center justify-center gap-2 font-medium border border-white/30 rounded-full hover:bg-white hover:text-black transition-colors bg-black/10 backdrop-blur-sm py-4 text-sm md:text-base text-white disabled:opacity-50"
              >
                <GoogleIcon className="w-5 h-5 flex-shrink-0" />
                <span className="truncate hidden sm:inline">Continue with Google</span>
              </button>

              <button
                onClick={() => dispatch({ step: "EMAIL" })}
                className="w-full flex items-center justify-center gap-2 font-medium border border-white/30 rounded-full hover:bg-white hover:text-black transition-colors bg-black/10 backdrop-blur-sm py-4 text-sm md:text-base text-white"
              >
                <Envelope size={20} className="flex-shrink-0" />
                <span className="truncate hidden sm:inline">Login with email</span>
              </button>
            </div>

            <button
              onClick={handleTourClick}
              className="w-full flex items-center justify-center gap-2 font-medium border border-white/30 rounded-full hover:bg-white hover:text-black transition-colors bg-black/10 backdrop-blur-sm py-4 text-sm md:text-base text-white"
            >
              Take a quick tour
              <ArrowRight size={18} weight="bold" />
            </button>

            <p className="mt-4 text-xs text-white/50 text-center leading-relaxed">
              By using Arpia you agree to Arpia's{" "}
              <a href="/privacy" className="hover:text-white underline transition-colors">privacy policy</a> &{" "}
              <a href="/terms" className="hover:text-white underline transition-colors">terms of service</a>
            </p>
          </div>
        </div>
      )}

      {/* Cinematic Transition Curtain */}
      <div className="transition-curtain fixed inset-0 bg-[#0A0A0A] z-[100] opacity-0 invisible pointer-events-none" />
    </div>
  );
}
