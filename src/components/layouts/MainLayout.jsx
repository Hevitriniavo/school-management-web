import { Outlet } from "react-router-dom";
import TheSidebar from "../TheSidebar.jsx";
import TheNavigation from "../TheNavigation.jsx";

function MainLayout() {
    return (
        <div className="dark:bg-green-400 flex h-screen bg-gray-100">
            <div className="w-60 shadow-md">
                <TheSidebar />
            </div>
            <div className="flex-grow flex flex-col">
                <div className="shadow-sm">
                    <TheNavigation />
                </div>
                <div className="flex-grow p-4 overflow-y-auto">
                    <Outlet />
                </div>
            </div>
        </div>
    );
}

export default MainLayout;
