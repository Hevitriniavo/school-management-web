import {useEffect, useRef, useState} from "react";
import fetchApi from "../services/fetchApi.js";
import {apiUrl} from "../config.js";
import Loading from "../components/Loading.jsx";
import ErrorMessage from "../components/ErrorMessage.jsx";
import PaymentChart from "../components/charts/PaymentChart.jsx";
import useDocumentTitle from "../hooks/useDocumentTitle.jsx";

function HomeView() {
    const [pay, setPayments] = useState([]);
    const isMounted = useRef(true);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    useDocumentTitle("Gestion de l'écollage ");

    useEffect(() => {
        if (isMounted.current) {
            fetchApi(`${apiUrl}/statistics/total-payments-by-class`)
                .then((data) => {
                    setPayments(data);
                })
                .catch(() => {
                    setIsError(true);
                })
                .finally(() => {
                    setIsLoading(false);
                });
        }

        return () => {
            isMounted.current = false;
        };
    }, []);

    return (
        <>
            {isLoading ? (
                <Loading/>
            ) : isError ? (
                <ErrorMessage/>
            ) : (
                <div>
                    <PaymentChart data={pay}/>
                </div>
            )}
        </>
    );
}

export default HomeView;
