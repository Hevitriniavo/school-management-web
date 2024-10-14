import {useParams} from "react-router-dom";
import {useEffect, useRef, useState} from "react";
import fetchApi from "../services/fetchApi.js";
import {apiUrl} from "../config.js";
import ErrorMessage from "../components/ErrorMessage.jsx";
import Loading from "../components/Loading.jsx";
import Receipt from "../components/receipts/Receipt.jsx";

function ReceiptView() {
    const {paymentId, studentId} = useParams();
    const [receipt, setReceipt] = useState(null);
    const [isError, setIsError] = useState(false);
    const isMounted = useRef(true)

    useEffect(() => {
         if (isMounted.current){
             const query = `${apiUrl}/receipts/student/${studentId}/payment/${paymentId}`;
             fetchApi(query)
                 .then((data) => {
                     setReceipt(data);
                 })
                 .catch(() => setIsError(true));
         }
         return () => {
             isMounted.current = false
         }
    }, [paymentId, studentId]);


    return (
        <>
            {isError ? (
                <ErrorMessage/>
            ) : <>
                {receipt ? (
                    <Receipt receipt={receipt} />
                ) : (
                    <Loading />
                )}
            </>}

        </>
    );
}

export default ReceiptView;