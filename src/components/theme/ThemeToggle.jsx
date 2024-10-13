import {Moon, Sun} from 'lucide-react';
import useTheme from "../../hooks/useTheme.jsx";

const ThemeToggle = () => {
    const {toggleDarkMode, isDarkMode} = useTheme();
    return (
        <button
            onClick={toggleDarkMode}
            className="p-2 rounded focus:outline-none"
        >{isDarkMode ? (<Sun className="w-6 h-6"/>) : <Moon className="w-6 h-6"/>}
        </button>
    );
};

export default ThemeToggle;
