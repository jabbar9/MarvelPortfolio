import { create } from "zustand";

type Section = "hero" | "skills" | "projects" | "experience" | "about" | "contact";

interface PortfolioState {
  currentSection: Section;
  setCurrentSection: (section: Section) => void;
  isNavOpen: boolean;
  toggleNav: () => void;
  closeNav: () => void;
}

export const usePortfolio = create<PortfolioState>((set) => ({
  currentSection: "hero",
  setCurrentSection: (section) => set({ currentSection: section }),
  isNavOpen: false,
  toggleNav: () => set((state) => ({ isNavOpen: !state.isNavOpen })),
  closeNav: () => set({ isNavOpen: false }),
}));
