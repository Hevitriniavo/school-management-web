import {Outlet} from "react-router-dom";
import {useState} from "react";
import {motion} from "framer-motion";
import TheSidebar from "../TheSidebar.jsx";
import TheNavigation from "../TheNavigation.jsx";

function MainLayout() {
    const [open, setOpen] = useState(true);

    const sidebarVariants = {
        open: {
            x: 0,
            opacity: 1,
            transition: {type: "spring", stiffness: 40}
        },
        closed: {
            x: "-100%",
            opacity: 0,
            transition: {type: "spring", stiffness: 40}
        },
    };


    return (
        <div className="dark:bg-[#11232a] flex h-screen bg-white dark:text-white text-black">
            {open && (
                <motion.div
                    className="w-60 shadow-md bg-gray-100 dark:bg-gray-800"
                    variants={sidebarVariants}
                    animate={open ? "open" : "closed"}
                    initial="closed"
                >
                    <TheSidebar/>
                </motion.div>
            )}

            <motion.div
                className={`flex-grow flex flex-col transition-all duration-300`}
            >
                <div className="shadow-sm">
                    <TheNavigation onToggleSidebar={() => setOpen(o => !o)}/>
                </div>

                <div className="flex-grow p-4 overflow-y-auto">
                    <Outlet/>
                </div>
            </motion.div>
        </div>
    );
}

export default MainLayout;
