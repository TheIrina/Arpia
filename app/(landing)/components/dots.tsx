"use client";

import { ComponentProps, useCallback, useEffect, useRef } from "react";

type DotLoaderProps = {
  frames: number[][];
  activeDotClassName?: string;
  inactiveDotClassName?: string;
  dotSizeClassName?: string;
  gapClassName?: string;
  isPlaying?: boolean;
  duration?: number;
  repeatCount?: number;
  onComplete?: () => void;
} & ComponentProps<"div">;

export const DotLoader = ({
  frames,
  isPlaying = true,
  duration = 100,
  activeDotClassName = "bg-white",
  inactiveDotClassName = "bg-white/20",
  dotSizeClassName = "h-1.5 w-1.5",
  gapClassName = "gap-0.5",
  className,
  repeatCount = -1,
  onComplete,
  ...props
}: DotLoaderProps) => {
  const gridRef = useRef<HTMLDivElement>(null);
  const currentIndex = useRef(0);
  const repeats = useRef(0);
  const interval = useRef<NodeJS.Timeout>(null);

  const applyFrameToDots = useCallback(
    (dots: HTMLDivElement[], frameIndex: number) => {
      const frame = frames[frameIndex];
      if (!frame) return;

      dots.forEach((dot, index) => {
        const isActive = frame.includes(index);
        dot.className =
          `${dotSizeClassName} rounded-sm ${isActive ? activeDotClassName : inactiveDotClassName}`.trim();
      });
    },
    [frames, activeDotClassName, inactiveDotClassName, dotSizeClassName],
  );

  useEffect(() => {
    currentIndex.current = 0;
    repeats.current = 0;
  }, [frames]);

  useEffect(() => {
    if (isPlaying) {
      if (currentIndex.current >= frames.length) {
        currentIndex.current = 0;
      }
      const dotElements = gridRef.current?.children;
      if (!dotElements) return;
      const dots = Array.from(dotElements) as HTMLDivElement[];

      // Apply first frame immediately
      applyFrameToDots(dots, currentIndex.current);

      interval.current = setInterval(() => {
        currentIndex.current = (currentIndex.current + 1) % frames.length;
        applyFrameToDots(dots, currentIndex.current);

        if (currentIndex.current === frames.length - 1) {
          if (repeatCount !== -1 && repeats.current + 1 >= repeatCount) {
            clearInterval(interval.current!);
            onComplete?.();
          }
          repeats.current++;
        }
      }, duration);
    } else {
      if (interval.current) clearInterval(interval.current);
    }

    return () => {
      if (interval.current) clearInterval(interval.current);
    };
  }, [frames, isPlaying, applyFrameToDots, duration, repeatCount, onComplete]);

  return (
    <div
      {...props}
      ref={gridRef}
      className={`grid w-fit grid-cols-6 ${gapClassName} ${className || ""}`.trim()}
    >
      {Array.from({ length: 36 }).map((_, i) => (
        <div
          key={i}
          className={`${dotSizeClassName} rounded-sm ${inactiveDotClassName}`.trim()}
        />
      ))}
    </div>
  );
};
