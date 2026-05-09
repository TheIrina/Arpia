"use client";

import { ArrowRight } from "@phosphor-icons/react";

interface StepProps {
  onNext: (data: { name: string }) => void;
  value: string;
}

export function StepName({ onNext, value }: StepProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const nameVal = formData.get("name") as string;
    if (nameVal.trim()) onNext({ name: nameVal });
  };

  return (
    <div className="flex flex-col items-center gap-12 w-full animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="flex flex-col gap-2 text-center">
        <h1 className="text-lg md:text-xl font-medium tracking-tight text-[#1A1A1A]">
          What is your name?
        </h1>
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center gap-12 w-full"
      >
        <input
          required
          name="name"
          defaultValue={value}
          type="text"
          placeholder="First name"
          className="w-full bg-transparent py-4 text-4xl md:text-6xl text-[#1A1A1A] outline-none transition-colors font-medium placeholder:text-black/10 caret-black text-center"
        />

        <div className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-white via-white to-transparent lg:relative lg:p-0 lg:bg-none lg:mt-12">
          <button
            type="submit"
            className="w-full lg:w-fit lg:px-12 flex items-center justify-center gap-2 rounded-full bg-[#1A1A1A] text-white py-4 text-sm md:text-base hover:bg-zinc-950 transition-all font-medium shadow-xl lg:shadow-none"
          >
            Continue
            <ArrowRight size={18} weight="bold" />
          </button>
        </div>
      </form>
    </div>
  );
}
