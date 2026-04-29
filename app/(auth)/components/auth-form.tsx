"use client";

import { useReducer } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeSlash, GoogleLogo, ArrowLeft } from "@phosphor-icons/react";

type AuthStep = "EMAIL" | "PASSWORD";

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
  const [state, dispatch] = useReducer(authReducer, {
    step: "EMAIL",
    email: "",
    password: "",
    showPassword: false,
    isLoading: false,
  });

  // Mock function to simulate email check
  const checkEmail = async (email: string) => {
    await new Promise((r) => setTimeout(r, 800));
    // Simulate: email exists if it ends with '@arpia.com'
    // Otherwise, it's a new user
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
    // TODO: integrate with better-auth
    await new Promise((r) => setTimeout(r, 1500));
    dispatch({ isLoading: false });
    router.push("/home");
  };

  return (
    <div className="w-full flex flex-col gap-6 py-8">
      {/* Header */}
      <div className="flex flex-col gap-1 text-center lg:text-left">
        <h1 className="text-xl md:text-2xl font-normal tracking-tight text-[#1A1A1A] uppercase">
          {state.step === "EMAIL" ? "BIENVENIDO" : "INGRESA TU CONTRASEÑA"}
        </h1>
        <p className="text-[10px] md:text-xs text-[#5f666d] font-normal">
          {state.step === "EMAIL"
            ? "Inicia sesión o crea una cuenta para continuar"
            : `Continuando como ${state.email}`}
        </p>
      </div>

      {state.step === "EMAIL" ? (
        /* Step 1: Email */
        <form onSubmit={handleContinue} className="flex flex-col gap-3.5">
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="auth-email"
              className="text-[10px] md:text-xs font-normal text-[#86868B] uppercase tracking-wider"
            >
              Email
            </label>
            <input
              id="auth-email"
              type="email"
              required
              autoComplete="email"
              value={state.email}
              onChange={(e) => dispatch({ email: e.target.value })}
              placeholder="pilot@arpia.com"
              className="w-full rounded-full border border-black/10 bg-[#FDFDFD] px-4 py-2.5 text-xs md:text-sm text-[#1A1A1A] placeholder:text-black/25 outline-none focus:border-black/30 focus:bg-white transition-all duration-200 font-normal"
            />
          </div>

          <button
            type="submit"
            disabled={state.isLoading || !state.email}
            className="mt-2 w-full rounded-full bg-[#1A1A1A] text-white font-normal py-2.5 text-xs md:text-sm hover:bg-zinc-950 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2"
          >
            {state.isLoading ? (
              <div className="w-3.5 h-3.5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
            ) : (
              "Continuar"
            )}
          </button>
        </form>
      ) : (
        /* Step 2: Password */
        <form onSubmit={handleLogin} className="flex flex-col gap-3.5">
          <button
            type="button"
            onClick={() => dispatch({ step: "EMAIL" })}
            className="flex items-center gap-1.5 text-[10px] md:text-xs font-normal text-[#86868B] hover:text-[#1A1A1A] transition-colors duration-200 self-start mb-1"
          >
            <ArrowLeft size={14} />
            Cambiar email
          </button>

          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <label
                htmlFor="auth-password"
                className="text-[10px] md:text-xs font-normal text-[#86868B] uppercase tracking-wider"
              >
                Contraseña
              </label>
            </div>
            <div className="relative">
              <input
                id="auth-password"
                type={state.showPassword ? "text" : "password"}
                required
                autoComplete="current-password"
                value={state.password}
                onChange={(e) => dispatch({ password: e.target.value })}
                placeholder="••••••••"
                className="w-full rounded-full border border-black/10 bg-[#FDFDFD] px-4 py-2.5 pr-11 text-xs md:text-sm text-[#1A1A1A] placeholder:text-black/25 outline-none focus:border-black/30 focus:bg-white transition-all duration-200 font-normal"
              />
              <button
                type="button"
                onClick={() => dispatch({ showPassword: !state.showPassword })}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-black/25 hover:text-[#1A1A1A] transition-colors duration-200"
              >
                {state.showPassword ? (
                  <EyeSlash size={18} weight="light" />
                ) : (
                  <Eye size={18} weight="light" />
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={state.isLoading || !state.password}
            className="mt-2 w-full rounded-full bg-[#1A1A1A] text-white font-normal py-2.5 text-xs md:text-sm hover:bg-zinc-950 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2"
          >
            {state.isLoading ? (
              <div className="w-3.5 h-3.5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
            ) : (
              "Iniciar sesión"
            )}
          </button>
        </form>
      )}

      {/* Divider */}
      <div className="relative flex items-center justify-center">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-black/5" />
        </div>
        <span className="relative bg-white px-3 text-[10px] md:text-xs text-[#86868B] uppercase tracking-widest font-normal">
          o
        </span>
      </div>

      {/* Footer Actions */}
      <div className="flex flex-col gap-5">
        <button
          type="button"
          className="w-full flex items-center justify-center gap-2.5 rounded-full border border-black/10 bg-[#FDFDFD] px-4 py-2.5 text-xs md:text-sm font-normal text-[#1A1A1A] hover:bg-gray-50 transition-colors duration-200"
        >
          <GoogleLogo size={20} weight="bold" />
          Continuar con Google
        </button>
      </div>
    </div>
  );
}
