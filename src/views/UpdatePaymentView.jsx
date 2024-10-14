import PaymentForm from "../components/payments/PaymentForm.jsx";
import {useEffect, useRef, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import fetchApi from "../services/fetchApi.js";
import {apiUrl} from "../config.js";
import Loading from "../components/Loading.jsx";
import ErrorMessage from "../components/ErrorMessage.jsx";

function UpdatePaymentView() {
    const {paymentId} = useParams();
    const [currentPayment, setPayment] = useState(null);
    const isMounted = useRef(true);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (isMounted.current) {
            fetchApi(`${apiUrl}/payments/${paymentId}`)
                .then(data => {
                    console.log(data);
                    setPayment({
                        ...data,
                        price: data.price.toString(),
                        amount: data.amount.toString(),
                    });
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
    }, [paymentId]);

    const handleSubmit = (data) => {
        const body = {
            ...data,
            id: currentPayment.id,
            amount: data.price * data.month,
            studentId: currentPayment.studentId
        }
        fetchApi(`${apiUrl}/payments`, {
            method: "POST",
            body,
        })
            .then(() => {
                navigate("/payments")
            })
            .catch(() => {
                setIsError(true);
            });
    };

    return (
        isLoading ? (
            <Loading/>
        ) : isError ? (
            <ErrorMessage as={() => <h1>Error occurred while updating payment.</h1>}/>
        ) : (
            <PaymentForm
                onSubmit={handleSubmit}
                defaultValues={currentPayment}
            />
        )
    );
}

export default UpdatePaymentView;
