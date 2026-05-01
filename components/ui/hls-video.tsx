"use client";

import React, { useEffect, useRef } from "react";
import Hls from "hls.js";

interface HlsVideoProps extends React.VideoHTMLAttributes<HTMLVideoElement> {
  src: string;
}

export function HlsVideo({ src, ...props }: HlsVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let hls: Hls | null = null;

    if (Hls.isSupported()) {
      hls = new Hls({
        capLevelToPlayerSize: true,
      });
      hls.loadSource(src);
      hls.attachMedia(video);
      
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        if (props.autoPlay) {
          video.play().catch((e) => console.log("HLS Video autoplay prevented:", e));
        }
      });
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      // Native support for HLS (Safari)
      video.src = src;
      video.addEventListener("loadedmetadata", () => {
        if (props.autoPlay) {
          video.play().catch((e) => console.log("Native Video autoplay prevented:", e));
        }
      });
    }

    return () => {
      if (hls) {
        hls.destroy();
      }
    };
  }, [src, props.autoPlay]);

  return <video ref={videoRef} {...props} />;
}
