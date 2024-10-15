import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useRef, useState} from "react";
import {apiUrl} from "../config.js";
import Loading from "../components/Loading.jsx";
import ErrorMessage from "../components/ErrorMessage.jsx";
import useDocumentTitle from "../hooks/useDocumentTitle.jsx";

function PaymentShowView() {
    const { studentId } = useParams();
    const [studentData, setStudentData] = useState(null);
    const [isError, setIsError] = useState(false);
    const isMounted = useRef(true)
    const navigate = useNavigate();
    useDocumentTitle("Détail de payment ID : " + studentId);
    useEffect(() => {
        if (isMounted.current){
            fetch(`${apiUrl}/payments/student/${studentId}`)
                .then((response) => response.json())
                .then((data) => setStudentData(data))
                .catch(() => setIsError(true));
        }
        return () => {
            isMounted.current
        }
    }, [studentId]);

    if (isError) {
        return <ErrorMessage as={() => <div className="text-red-500">An error occurred while fetching the data.</div>}/>
    }

    if (!studentData) {
        return <Loading />
    }

    return (
        <div className="p-6">
            <div className="mt-6 flex justify-end">
                <button
                    onClick={() => navigate('/students')}
                    className="bg-[#67597a] text-white px-4 py-2 rounded hover:bg-[#67597a] transition-colors duration-300"
                >
                    Voir tous les étudiants
                </button>
            </div>
            <div className="dark:bg-transparent bg-white p-6 mb-6">
                <h2 className="text-2xl dark:text-black font-bold text-gray-800 mb-4">Student Information</h2>
                <div className="grid grid-cols-2 gap-4">
                    <div><strong>ID:</strong> {studentData.id}</div>
                    <div><strong>Name:</strong> {studentData.firstName} {studentData.name}</div>
                    <div><strong>Class:</strong> {studentData.className}</div>
                    <div><strong>Address:</strong> {studentData.address}</div>
                    <div><strong>Gender:</strong> {studentData.gender}</div>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full dark:bg-transparent bg-white">
                    <thead className="bg-[#67597a] dark:bg-black text-white uppercase text-sm leading-normal">
                    <tr>
                        <th className="text-left p-4">Payment ID</th>
                        <th className="text-left p-4">Payment Name</th>
                        <th className="text-left p-4">Payment Date</th>
                        <th className="text-left p-4">Price</th>
                        <th className="text-left p-4">Month</th>
                        <th className="text-left p-4">Amount</th>
                    </tr>
                    </thead>
                    <tbody>
                    {studentData.payments.length > 0 ? (
                        studentData.payments.map((payment) => (
                            <tr key={payment.id} className="border-t">
                                <td className="p-4">{payment.id}</td>
                                <td className="p-4">{payment.paymentName}</td>
                                <td className="p-4">{payment.paymentDate}</td>
                                <td className="p-4">{payment.price}</td>
                                <td className="p-4">{payment.month}</td>
                                <td className="p-4">{payment.amount}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6" className="p-4 text-center text-gray-500">
                                Aucun paiement trouvé
                            </td>
                        </tr>
                    )}
                    </tbody>

                </table>
            </div>
        </div>
    );
}

export default PaymentShowView;
