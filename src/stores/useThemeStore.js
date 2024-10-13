import {create} from "zustand";
import {createJSONStorage, persist} from "zustand/middleware";

const useThemeStore = create(
    persist(
        (set) => ({
            isDarkMode: false,
            toggleDarkMode: () => set((state) => ({isDarkMode: !state.isDarkMode})),
        }),
        {
            name: "theme",
            storage: createJSONStorage(() => localStorage),
        }
    )
);

export default useThemeStore;
