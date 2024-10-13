import {useEffect} from 'react';
import useThemeStore from "../stores/useThemeStore.js";

function useTheme() {
    const isDarkMode = useThemeStore(s => s.isDarkMode);
    const toggleDarkMode = useThemeStore(s => s.toggleDarkMode);
    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [isDarkMode]);

    return {toggleDarkMode, isDarkMode};
}

export default useTheme;
