import {createBrowserRouter} from "react-router-dom";
import MainLayout from "../components/layouts/MainLayout.jsx";
import HomeView from "../views/HomeView.jsx";
import NotFoundView from "../views/NotFoundView.jsx";
import StudentListView from "../views/StudentListView.jsx";
import PaymentListView from "../views/PaymentListView.jsx";
import CreatePaymentView from "../views/CreatePaymentView.jsx";
import UpdatePaymentView from "../views/UpdatePaymentView.jsx";
import CreatePaymentWithSelectView from "../views/CreatePaymentWithSelectView.jsx";
import ReceiptView from "../views/ReceiptView.jsx";
import PaymentShowView from "../views/PaymentShowView.jsx";

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
            },
            {
                path: "payments",
                element: <PaymentListView/>
            },
            {
                path: "payments/create",
                element: <CreatePaymentWithSelectView/>
            },
            {
                path: "payments/create/:studentId",
                element: <CreatePaymentView/>
            },
            {
                path: "payments/edit/:paymentId",
                element: <UpdatePaymentView/>
            },
            {
                path: "payments/receipt/:paymentId/:studentId",
                element: <ReceiptView/>
            },
            {
                path: "payments/show/:studentId",
                element: <PaymentShowView />
            }
        ]
    },
    {
        path: "/*",
        element: <NotFoundView/>
    }
]);


export default router;