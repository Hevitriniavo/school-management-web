import PaymentForm from "../components/payments/PaymentForm.jsx";
import {useNavigate, useParams} from "react-router-dom";
import fetchApi from "../services/fetchApi.js";
import {apiUrl} from "../config.js";
import {useState} from "react";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";

function CreatePaymentView() {
    const navigate = useNavigate();
    const {studentId} = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleCreatePayment = (data) => {
        setIsLoading(true);
        setError(null);
        const body = {
            ...data,
            amount: data.price * data.month,
            studentId,
        };

        fetchApi(`${apiUrl}/payments`, {
            method: "POST",
            body,
        })
            .then((res) => {
                console.log(res);
                navigate(`/payments/receipt/${res.id}/${res.studentId}`);
            })
            .catch((e) => {
                console.error(e);
                setError("Une erreur s'est produite lors de la création du paiement.");
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    return (
        isLoading ? (
            <Loading/>
        ) : error ? (
            <ErrorMessage as={() => <h1> {error} </h1>}/>
        ) : (
            <PaymentForm
                onSubmit={handleCreatePayment}
                title="Créer un Paiement"
            />
        )
    );
}

export default CreatePaymentView;
