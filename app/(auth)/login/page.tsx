"use client";

import { useState } from "react";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // TODO: integrate with auth backend
    await new Promise((r) => setTimeout(r, 1500));
    setIsLoading(false);
  };

  return (
    <>
      {/* Header */}
      <div className="mb-10 text-center lg:text-left">
        <h1 className="text-3xl font-medium tracking-tight text-[#1A1A1A] mb-3">
          BIENVENIDO
        </h1>
        <p className="text-sm text-[#5f666d] font-medium">
          Inicia sesión en tu cuenta de Arpia para continuar
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        {/* Email */}
        <div className="flex flex-col gap-2">
          <label
            htmlFor="login-email"
            className="text-xs font-semibold text-[#86868B] uppercase tracking-wider"
          >
            Email
          </label>
          <input
            id="login-email"
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="pilot@arpia.com"
            className="w-full rounded-xl border border-black/10 bg-[#FDFDFD] px-4 py-3 text-sm text-[#1A1A1A] placeholder:text-black/25 outline-none focus:border-black/30 focus:bg-white transition-all duration-200"
          />
        </div>

        {/* Password */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <label
              htmlFor="login-password"
              className="text-xs font-semibold text-[#86868B] uppercase tracking-wider"
            >
              Contraseña
            </label>
            <Link
              href="#"
              className="text-xs font-medium text-[#86868B] hover:text-[#1A1A1A] transition-colors duration-200"
            >
              ¿Olvidaste tu contraseña?
            </Link>
          </div>
          <div className="relative">
            <input
              id="login-password"
              type={showPassword ? "text" : "password"}
              required
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full rounded-xl border border-black/10 bg-[#FDFDFD] px-4 py-3 pr-12 text-sm text-[#1A1A1A] placeholder:text-black/25 outline-none focus:border-black/30 focus:bg-white transition-all duration-200"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-black/25 hover:text-[#1A1A1A] transition-colors duration-200"
              aria-label={
                showPassword ? "Ocultar contraseña" : "Mostrar contraseña"
              }
            >
              {showPassword ? (
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M3.98 8.223A10.477 10.477 0 001.934 12c1.292 4.338 5.31 7.5 10.066 7.5.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                  />
                </svg>
              ) : (
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isLoading}
          className="mt-4 w-full rounded-full bg-[#1A1A1A] text-white font-medium py-3.5 text-sm hover:bg-black disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
          ) : (
            "Iniciar sesión"
          )}
        </button>
      </form>

      {/* Divider */}
      <div className="relative my-8">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-black/5" />
        </div>
        <div className="relative flex justify-center text-xs">
          <span className="bg-white px-4 text-[#86868B] uppercase tracking-widest font-semibold">
            o
          </span>
        </div>
      </div>

      {/* Social Login */}
      <button
        type="button"
        className="w-full flex items-center justify-center gap-3 rounded-xl border border-black/10 bg-[#FDFDFD] px-4 py-3 text-sm font-medium text-[#1A1A1A] hover:bg-gray-50 transition-colors duration-200"
      >
        <svg className="w-5 h-5" viewBox="0 0 24 24">
          <path
            fill="#4285F4"
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
          />
          <path
            fill="#34A853"
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          />
          <path
            fill="#FBBC05"
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
          />
          <path
            fill="#EA4335"
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
          />
        </svg>
        Continuar con Google
      </button>

      {/* Sign up link */}
      <p className="mt-8 text-center text-sm text-[#5f666d] font-medium">
        ¿No tienes una cuenta?{" "}
        <Link
          href="/signup"
          className="text-[#1A1A1A] hover:text-black transition-colors duration-200 underline underline-offset-4 decoration-black/20 hover:decoration-black/50"
        >
          Crear una
        </Link>
      </p>
    </>
  );
}
