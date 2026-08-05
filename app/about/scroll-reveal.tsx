"use client";

import { useEffect } from "react";

export default function AboutScrollReveal() {
  useEffect(() => {
    const revealItems = Array.from(document.querySelectorAll<HTMLElement>(".scroll-reveal"));
    const scrollScenes = Array.from(document.querySelectorAll<HTMLElement>(".scroll-scene"));

    const updateScenes = () => {
      scrollScenes.forEach((scene) => {
        const rect = scene.getBoundingClientRect();
        const travel = window.innerHeight + rect.height;
        const progress = Math.min(1, Math.max(0, (window.innerHeight - rect.top) / travel));
        scene.style.setProperty("--scene-progress", progress.toFixed(4));
        scene.style.setProperty("--scene-shift-x", `${(progress - 0.5) * 72}px`);
        scene.style.setProperty("--scene-shift-y", `${(0.5 - progress) * 72}px`);
        scene.style.setProperty("--scene-track-x", `${progress * -34}%`);
        scene.style.setProperty("--scene-scale", `${0.96 + progress * 0.08}`);
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
