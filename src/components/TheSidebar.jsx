import {HandCoins, Home, List} from "lucide-react";
import { Link } from "react-router-dom";

function MenuItem({ icon: Icon, label, to }) {
    return (
        <Link to={to} className="flex items-center p-2 hover:bg-gray-200 rounded">
            <Icon className="w-5 h-5 mr-2" />
            <span>{label}</span>
        </Link>
    );
}

const menuItems = [
    { id: 1, label: 'Accueil', icon: Home, to: '/' },
    { id: 2, label: 'Élèves', icon: List, to: '/students' },
    { id: 3, label: 'paiments', icon: HandCoins, to: '/payments' },
];

function TheSidebar() {
    return (
        <div className="shadow-md h-full w-60">
            <div className="p-4 font-semibold text-lg">
                Students
            </div>
            <div className="flex flex-col p-4">
                {menuItems.map((item) => (
                    <MenuItem key={item.id} label={item.label} icon={item.icon} to={item.to}/>
                ))}
            </div>
        </div>
    );
}

export default TheSidebar;
