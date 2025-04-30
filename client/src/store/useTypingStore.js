import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useTypingStore = create(
  persist(
    (set, get) => ({
      typed: "",
      started: false,
      finished: false,
      startTime: null,
      text: "",
      wpm: 0,
      userName: "Untitled",

      setUser: (userName) => set({ userName }),
      setText: (text) => set({ text }),
      startTest: () =>
        set({
          started: true,
          typed: "",
          finished: false,
          startTime: null,
          wpm: 0,
        }),
      setTyped: (typed) => set({ typed }),
      setFinished: (finished) => set({ finished }),
      setStartTime: (time) => set({ startTime: time }),
      setWPM: (value) => set({ wpm: value }),

      resetTest: () =>
        set({
          typed: "",
          started: false,
          finished: false,
          startTime: null,
          text: "",
          wpm: 0,
        }),

      handleKeyPress: (key) => {
        const { typed, text, started, finished, startTime } = get();
        if (!started || finished) return;
        if (!startTime && key.length === 1) set({ startTime: Date.now() });
        if (key === "Backspace") {
          set({ typed: typed.slice(0, -1) });
        } else if (key.length === 1) {
          const newTyped = typed + key;
          set({ typed: newTyped });
          if (newTyped === text) {
            // compute WPM
            const elapsedMin = (Date.now() - get().startTime) / 1000 / 60;
            const wpm = Math.round(newTyped.length / 5 / elapsedMin);
            set({ finished: true, wpm });
          }
        }
      },
    }),
    {
      name: "typing-store",
      partialize: (state) => ({ userName: state.userName }),
    }
  )
);
