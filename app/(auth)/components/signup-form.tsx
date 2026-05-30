"use client";

import { useReducer, useRef, useTransition, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeSlash, ArrowRight, CaretLeft, CheckCircle } from "@phosphor-icons/react";
import { DotLoader } from "@/app/(landing)/components/dots";
import gsap, { useGSAP } from "@/lib/gsap";
import { signUp } from "@/lib/auth-client";

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

type SignupStep = "NAME" | "ACCOUNT";

type SignupState = {
  step: SignupStep;
  name: string;
  email: string;
  password: string;
  showPassword: boolean;
  isLoading: boolean;
};

type SignupAction = Partial<SignupState>;

const signupReducer = (state: SignupState, action: SignupAction): SignupState => {
  return { ...state, ...action };
};

export function SignupForm({ initialEmail = "" }: { initialEmail?: string }) {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const { contextSafe } = useGSAP({ scope: containerRef });

  const [state, dispatch] = useReducer(signupReducer, {
    step: "NAME",
    name: "",
    email: initialEmail,
    password: "",
    showPassword: false,
    isLoading: false,
  });

  const [isPending, startTransition] = useTransition();
  const isFormLoading = state.isLoading || isPending;

  useEffect(() => {
    if (initialEmail && state.email !== initialEmail) {
      dispatch({ email: initialEmail });
    }
  }, [initialEmail]);

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (!state.name.trim()) return;
    dispatch({ step: "ACCOUNT" });
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!state.email || !state.password || !state.name) return;

    dispatch({ isLoading: true });

    await signUp.email(
      {
        email: state.email,
        password: state.password,
        name: state.name,
      },
      {
        onSuccess: () => {
          dispatch({ isLoading: false });
          // Redirect directly to the onboarding personalization steps
          router.push("/onboarding");
        },
        onError: (ctx) => {
          dispatch({ isLoading: false });
          alert(ctx.error.message);
        },
      },
    );
  };

  const headingText =
    state.step === "NAME"
      ? "What is your name?"
      : "Create your account";

  const subheadingText =
    state.step === "NAME"
      ? "Start your experience in Arpia."
      : "Save your preferences and start your experience in Roldanillo.";

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

      {/* Dark glass backdrop */}
      <div className="fixed inset-0 bg-zinc-950/60 backdrop-blur-md z-10 animate-in fade-in duration-500" />

      {/* Header with Back Button */}
      <header className="absolute top-0 left-0 right-0 p-6 flex items-center justify-between z-20 max-w-7xl mx-auto w-full">
        <button
          onClick={() => {
            if (state.step === "ACCOUNT") {
              dispatch({ step: "NAME" });
            } else {
              router.push("/login");
            }
          }}
          className="w-10 h-10 flex items-center justify-center bg-white/10 backdrop-blur-sm border border-white/10 text-white rounded-full hover:bg-white/20 transition-all cursor-pointer"
          aria-label="Go back"
        >
          <CaretLeft size={20} weight="bold" />
        </button>
        <div className="w-10" />
      </header>

      {/* Form Content */}
      <div className="flex-1 flex flex-col items-center justify-center w-full animate-in fade-in slide-in-from-right-4 duration-500 relative z-20">
        <div className="flex flex-col gap-2 text-center mb-12">
          <h1 className="text-lg md:text-xl font-medium tracking-tight text-white">
            {headingText}
          </h1>
          <p className="text-sm md:text-base text-white/60 font-light tracking-wide max-w-sm">
            {subheadingText}
          </p>
        </div>

        {state.step === "NAME" && (
          <form
            onSubmit={handleNextStep}
            className="flex flex-col items-center gap-12 w-full max-w-4xl px-4"
          >
            <input
              id="signup-name"
              type="text"
              required
              value={state.name}
              onChange={(e) => dispatch({ name: e.target.value })}
              placeholder="First name"
              className="w-full bg-transparent py-4 text-4xl md:text-6xl text-white outline-none transition-colors font-medium placeholder:text-white/20 caret-white text-center"
              autoFocus
            />

            <button
              type="submit"
              disabled={isFormLoading || !state.name.trim()}
              className="w-full max-w-sm flex items-center justify-center gap-2 rounded-full bg-white text-[#1A1A1A] py-3.5 text-sm md:text-base hover:bg-zinc-200 disabled:opacity-30 transition-all font-medium cursor-pointer"
            >
              Continue
              <ArrowRight size={18} weight="bold" />
            </button>
          </form>
        )}

        {state.step === "ACCOUNT" && (
          <form
            onSubmit={handleSignup}
            className="flex flex-col items-center gap-8 w-full max-w-4xl px-4 animate-in fade-in slide-in-from-right-4 duration-500"
          >
            <div className="flex flex-col items-center gap-12 w-full">
              {/* Email Input */}
              <div className="relative w-full">
                <input
                  id="signup-email"
                  type="email"
                  required
                  autoComplete="email"
                  value={state.email}
                  onChange={(e) => dispatch({ email: e.target.value })}
                  placeholder="Email address"
                  className="w-full bg-transparent py-4 text-4xl md:text-6xl text-white outline-none transition-colors font-medium placeholder:text-white/20 caret-white text-center"
                />
              </div>

              {/* Password Input */}
              <div className="relative w-full">
                <input
                  id="signup-password"
                  type={state.showPassword ? "text" : "password"}
                  required
                  autoComplete="new-password"
                  value={state.password}
                  onChange={(e) => dispatch({ password: e.target.value })}
                  placeholder="Password"
                  minLength={8}
                  className="w-full bg-transparent py-4 text-4xl md:text-6xl text-white outline-none transition-colors font-medium placeholder:text-white/20 caret-white text-center"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => dispatch({ showPassword: !state.showPassword })}
                  className="absolute right-0 top-1/2 -translate-y-1/2 text-white/30 hover:text-white transition-colors px-2 cursor-pointer"
                >
                  {state.showPassword ? (
                    <EyeSlash size={32} />
                  ) : (
                    <Eye size={32} />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isFormLoading || !state.email || state.password.length < 8}
              className="w-full max-w-sm flex items-center justify-center gap-2 rounded-full bg-white text-[#1A1A1A] py-3.5 text-sm md:text-base hover:bg-zinc-200 disabled:opacity-30 transition-all font-medium cursor-pointer"
            >
              {isFormLoading ? (
                <div className="w-5 h-5 border-2 border-[#1A1A1A]/20 border-t-[#1A1A1A] rounded-full animate-spin" />
              ) : (
                <>
                  <CheckCircle size={20} weight="fill" />
                  Finish Registration
                </>
              )}
            </button>
          </form>
        )}
      </div>

      <div className="absolute bottom-6 left-0 right-0 text-center z-20 pointer-events-none">
        <p className="text-xs text-white/50 leading-relaxed pointer-events-auto">
          Already have an account?{" "}
          <button
            onClick={() => router.push("/login")}
            className="hover:text-white underline transition-colors font-medium cursor-pointer"
          >
            Sign in
          </button>
        </p>
      </div>
    </div>
  );
}
