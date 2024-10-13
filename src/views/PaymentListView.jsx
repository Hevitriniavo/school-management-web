import { useEffect, useRef, useState } from "react";
import fetchApi from "../services/fetchApi.js";
import { apiUrl } from "../config.js";
import Loading from "../components/Loading.jsx";
import ErrorMessage from "../components/ErrorMessage.jsx";
import PaymentTable from "../components/payments/PaymentTable.jsx";
import {BadgePlus} from "lucide-react";
import Dialog from "../components/Dialog.jsx";
import {useNavigate} from "react-router-dom";

function PaymentListView() {
    const [payments, setPayments] = useState([]);
    const isMounted = useRef(true);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [paymentToDelete, setPaymentToDelete] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (isMounted.current) {
            fetchApi(`${apiUrl}/payments`)
                .then(data => {
                    console.log(data);
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

    const handleCreate = () => {
        navigate("/payments/create")
    };

    const openDialog = (student) => {
        setPaymentToDelete(student);
        setIsDialogOpen(true);
    };

    const handleUpdate = (payment) => {
        navigate(`/payments/edit/${payment.id}`)
    };

    const handleDelete = (paymentId) => {
        setIsLoading(true);
        fetchApi(`${apiUrl}/payments/${paymentId}`, {
            method: "DELETE"
        })
            .then(() => {
                setPayments(payments.filter(p => p.id !== paymentId));
                setIsDialogOpen(false);
                navigate("/payments")
            })
            .catch(() => {
                setIsError(true);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };


    return (
        <>
            {isLoading ? (
                <Loading />
            ) : isError ? (
                <ErrorMessage />
            ) : (
                <div>
                    <h1 className="text-xl font-bold mb-4">Liste des paiements</h1>
                    <button
                        className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 mb-4"
                        onClick={handleCreate}
                    >
                        <BadgePlus />
                    </button>
                    <PaymentTable
                        payments={payments}
                        onUpdate={handleUpdate}
                        onDelete={openDialog}
                    />
                </div>
            )}

            <Dialog
                isOpen={isDialogOpen}
                onCancel={() => setIsDialogOpen(false)}
                onConfirm={() => handleDelete(paymentToDelete?.id)}
                title={`Supprimer le paiment ${paymentToDelete ? paymentToDelete.paymentName : ''}?`}
                content={() => <p>Êtes-vous sûr de vouloir supprimer cet paiment ?</p>}
            />
        </>
    );
}

export default PaymentListView;
