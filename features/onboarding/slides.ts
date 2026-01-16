export type OnboardingSlide = {
  key: string;
  title: string;
  subtitle: string;
  // For now use emoji or simple shapes; later you can swap to images/Lottie
  artwork: string;
};

export const slides: OnboardingSlide[] = [
  {
    key: "focus",
    title: "Learn faster with visuals",
    subtitle: "Short, clear lessons designed for mobile attention.",
    artwork: "🧠",
  },
  {
    key: "gesture",
    title: "Swipe. Tap. Flow.",
    subtitle: "Gestures and transitions that feel premium and natural.",
    artwork: "✨",
  },
  {
    key: "build",
    title: "Build real UI patterns",
    subtitle: "Bottom sheets, maps, time, and micro-interactions.",
    artwork: "🛠️",
  },
];
