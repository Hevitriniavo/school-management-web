import {createBrowserRouter} from "react-router-dom";
import MainLayout from "../components/layouts/MainLayout.jsx";
import HomeView from "../views/HomeView.jsx";
import NotFoundView from "../views/NotFoundView.jsx";
import StudentListView from "../views/StudentListView.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout/>,
        children: [
            {
                path: "",
                element: <HomeView/>
            },
            {
                path: "students",
                element: <StudentListView/>
            }
        ]
    },
    {
        path: "/*",
        element: <NotFoundView/>
    }
]);


export default router;