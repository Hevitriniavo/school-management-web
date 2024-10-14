import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { apiUrl } from "../config.js";
import fetchApi from "../services/fetchApi.js";
import ErrorMessage from "../components/ErrorMessage.jsx";
import Loading from "../components/Loading.jsx";

const paymentSchema = z.object({
    studentId: z.string(),
    paymentName: z.string(),
    paymentDate: z.string(),
    price: z.number(),
    month: z.string(),
    amount: z.number(),
});

function CreatePaymentWithSelectView() {
    const [students, setStudents] = useState([]);
    const navigate = useNavigate();
    const isMounted = useRef(true);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const {
        register,
        handleSubmit,
        setError,
        formState: { isSubmitting },
    } = useForm({
        resolver: zodResolver(paymentSchema),
    });

    useEffect(() => {
        if (isMounted.current) {
            fetchApi(`${apiUrl}/students`)
                .then(data => {
                    setStudents(data);
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

    const onSubmit = (data) => {
        fetchApi(`${apiUrl}/payments`, {
            method: 'POST',
            body: data,
        })
            .then((res) => {
                console.log(res);
                navigate('/payments');
            })
            .catch((error) => {
                console.error(error);
                setError('Une erreur s\'est produite lors de la création du paiement.');
            });
    };

    return (
        <div className=" mt-10 p-6 bg-white rounded-lg shadow-md">
            {isLoading ? (
                <Loading />
            ) : isError ? (
                <ErrorMessage as={() => <h1>Une erreur est survenue lors de la récupération des étudiants.</h1>} />
            ) : (
                <>
                    <h2 className="text-2xl font-bold text-center mb-6">Créer un Paiement</h2>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="studentSelect" className="block text-sm font-medium text-gray-700 mb-1">
                                    Sélectionnez un Étudiant
                                </label>
                                <select
                                    id="studentSelect"
                                    {...register('studentId')}
                                    className="block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out p-2 bg-white text-gray-700 hover:bg-gray-50"
                                    required
                                >
                                    <option value="" disabled>Sélectionnez un étudiant</option>
                                    {students.map((student) => (
                                        <option key={student.id} value={student.id}>
                                            {student.name} {student.firstName}
                                        </option>
                                    ))}
                                </select>

                            </div>

                            <div>
                                <label htmlFor="paymentName" className="block text-sm font-medium text-gray-700 mb-1">
                                    Nom du Paiement
                                </label>
                                <input
                                    type="text"
                                    id="paymentName"
                                    {...register('paymentName')}
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 p-2"
                                />
                            </div>

                            <div>
                                <label htmlFor="paymentDate" className="block text-sm font-medium text-gray-700 mb-1">
                                    Date du Paiement
                                </label>
                                <input
                                    type="date"
                                    id="paymentDate"
                                    {...register('paymentDate')}
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 p-2"
                                />
                            </div>

                            <div>
                                <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                                    Prix
                                </label>
                                <input
                                    type="number"
                                    id="price"
                                    {...register('price', { valueAsNumber: true })}
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 p-2"
                                />
                            </div>

                            <div>
                                <label htmlFor="month" className="block text-sm font-medium text-gray-700 mb-1">
                                    Mois
                                </label>
                                <input
                                    type="text"
                                    id="month"
                                    {...register('month')}
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 p-2"
                                />
                            </div>

                            <div>
                                <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
                                    Montant
                                </label>
                                <input
                                    type="number"
                                    id="amount"
                                    {...register('amount', { valueAsNumber: true })}
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 p-2"
                                />
                            </div>
                        </div>

                        <div className="flex justify-between">
                            <button
                                type="button"
                                onClick={() => navigate('/payments')}
                                className="ml-4 w-full bg-gray-300 text-black py-2 rounded-md hover:bg-gray-400 transition duration-200"
                            >
                                Annuler
                            </button>

                            <button
                                type="submit"
                                className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition duration-200"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? 'Création...' : 'Créer le Paiement'}
                            </button>
                        </div>
                    </form>
                </>
            )}
        </div>
    );
}

export default CreatePaymentWithSelectView;
