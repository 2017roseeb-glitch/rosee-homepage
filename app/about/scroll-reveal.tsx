"use client";

import { useEffect } from "react";

export default function AboutScrollReveal() {
  useEffect(() => {
    const revealItems = Array.from(document.querySelectorAll<HTMLElement>(".scroll-reveal"));
    const scrollScenes = Array.from(document.querySelectorAll<HTMLElement>(".scroll-scene"));

    const updateScenes = () => {
      const isCompactViewport = window.matchMedia("(max-width: 920px)").matches;
      const sceneShift = isCompactViewport ? 0 : 72;
      const trackTravel = isCompactViewport ? 0 : -34;

      scrollScenes.forEach((scene) => {
        const rect = scene.getBoundingClientRect();
        const travel = window.innerHeight + rect.height;
        const progress = Math.min(1, Math.max(0, (window.innerHeight - rect.top) / travel));
        scene.style.setProperty("--scene-progress", progress.toFixed(4));
        scene.style.setProperty("--scene-shift-x", `${(progress - 0.5) * sceneShift}px`);
        scene.style.setProperty("--scene-shift-y", `${(0.5 - progress) * sceneShift}px`);
        scene.style.setProperty("--scene-track-x", `${progress * trackTravel}%`);
        scene.style.setProperty("--scene-scale", `${isCompactViewport ? 1 : 0.98 + progress * 0.08}`);
      });
    };

    if (!("IntersectionObserver" in window)) {
      revealItems.forEach((item) => item.classList.add("is-visible"));
      updateScenes();
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: "0px 0px -16% 0px",
        threshold: 0.16,
      },
    );

    revealItems.forEach((item) => observer.observe(item));
    updateScenes();
    window.addEventListener("scroll", updateScenes, { passive: true });
    window.addEventListener("resize", updateScenes);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", updateScenes);
      window.removeEventListener("resize", updateScenes);
    };
  }, []);

  return null;
}
