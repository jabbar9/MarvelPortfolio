import { create } from "zustand";

interface AudioState {
  backgroundMusic: HTMLAudioElement | null;
  hitSound: HTMLAudioElement | null;
  successSound: HTMLAudioElement | null;
  isMuted: boolean;
  isPlaying: boolean; // ✅ NEW STATE

  // Setters
  setBackgroundMusic: (music: HTMLAudioElement) => void;
  setHitSound: (sound: HTMLAudioElement) => void;
  setSuccessSound: (sound: HTMLAudioElement) => void;

  // Controls
  toggleMute: () => void;
  playHit: () => void;
  playSuccess: () => void;
  playAll: () => void;
  toggleBackgroundMusic: () => void; // ✅ NEW FUNCTION
}

export const useAudio = create<AudioState>((set, get) => ({
  backgroundMusic: null,
  hitSound: null,
  successSound: null,
  isMuted: true,
  isPlaying: false, // ✅ initially not playing

  setBackgroundMusic: (music) => {
    set({ backgroundMusic: music, isPlaying: !music.paused });
  },
  setHitSound: (sound) => set({ hitSound: sound }),
  setSuccessSound: (sound) => set({ successSound: sound }),

  toggleMute: () => {
    const { isMuted } = get();
    const newMutedState = !isMuted;
    set({ isMuted: newMutedState });
    console.log(`Sound ${newMutedState ? "muted" : "unmuted"}`);
  },

  playHit: () => {
    const { hitSound, isMuted } = get();
    if (hitSound && !isMuted) {
      const soundClone = hitSound.cloneNode() as HTMLAudioElement;
      soundClone.volume = 0.3;
      soundClone
        .play()
        .catch((err) => console.log("Hit sound play prevented:", err));
    }
  },

  playSuccess: () => {
    const { successSound, isMuted } = get();
    if (successSound && !isMuted) {
      successSound.currentTime = 0;
      successSound
        .play()
        .catch((err) => console.log("Success sound play prevented:", err));
    }
  },

  playAll: () => {
    const { backgroundMusic, isMuted } = get();
    if (backgroundMusic && !isMuted) {
      backgroundMusic.play().catch((err) => {
        console.warn("Background music play prevented by browser:", err);
      });
    }
  },

  // ✅ TOGGLE BACKGROUND MUSIC
  toggleBackgroundMusic: () => {
    const { backgroundMusic, isMuted } = get();
    if (!backgroundMusic) return;

    if (!backgroundMusic.paused) {
      backgroundMusic.pause();
      set({ isPlaying: false });
    } else {
      if (!isMuted) {
        backgroundMusic.currentTime = 0; // Optional: restart from beginning
        backgroundMusic
          .play()
          .then(() => {
            set({ isPlaying: true });
          })
          .catch((err) => {
            console.warn("Error playing background music:", err);
          });
      }
    }
  },
}));
