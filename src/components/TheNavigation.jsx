import ThemeToggle from "./theme/ThemeToggle.jsx";
import {AlignJustify} from "lucide-react";

function TheNavigation({onToggleSidebar}) {
    return (
        <nav className="shadow-md p-4 flex items-center justify-between">
            <div className="flex items-center">
                <AlignJustify className="w-6 h-6 mr-2" onClick={onToggleSidebar}/>
                <h1>Deshboard</h1>
            </div>
            <ThemeToggle/>
        </nav>
    );
}

export default TheNavigation;
