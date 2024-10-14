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
    id: z.string(),
    paymentName: z.string(),
    paymentDate: z.string(),
    price: z.number(),
    month: z.number(),
});

const inputFields = [
    { label: "Sélectionnez un Étudiant", type: "select", id: "studentId", options: [], placeholder: "Sélectionnez un étudiant", required: true },
    { label: "Nom du Paiement", type: "text", id: "paymentName", placeholder: "Entrez le nom du paiement" },
    { label: "Numéro du Paiement", type: "text", id: "id", placeholder: "Entrez le numéro du paiement" },
    { label: "Date du Paiement", type: "date", id: "paymentDate", placeholder: "" },
    { label: "Prix", type: "number", id: "price", placeholder: "Entrez le prix" },
    { label: "Mois", type: "number", id: "month", placeholder: "Entrez le mois" },
];

function CreatePaymentWithSelectView() {
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
                    inputFields[0].options = data.map(student => ({
                        value: student.id,
                        label: `${student.name} ${student.firstName}`,
                    }));
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
            body: {
                ...data,
                amount: data.price * data.month
            },
        })
            .then((res) => {
                console.log(res);
                navigate(`/payments/receipt/${res.id}/${res.studentId}`);
            })
            .catch((error) => {
                console.error(error);
                setError('Une erreur s\'est produite lors de la création du paiement.');
            });
    };

    return (
        <div className="mt-10 p-6 bg-white rounded-lg shadow-md">
            {isLoading ? (
                <Loading />
            ) : isError ? (
                <ErrorMessage as={() => <h1>Une erreur est survenue lors de la récupération des étudiants.</h1>} />
            ) : (
                <>
                    <h2 className="text-2xl font-bold text-center mb-6">Créer un Paiement</h2>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {inputFields.map((field, index) => (
                                <div key={index}>
                                    <label htmlFor={field.id} className="block text-sm font-medium text-gray-700 mb-1">
                                        {field.label}
                                    </label>
                                    {field.type === 'select' ? (
                                        <select
                                            id={field.id}
                                            {...register(field.id)}
                                            className="block w-full border border-gray-300 rounded-md shadow-sm p-2 bg-white text-gray-700 transition duration-150 ease-in-out focus:ring focus:ring-indigo-400 focus:border-indigo-500 hover:bg-gray-50"
                                            required={field.required}
                                        >
                                            <option value="" disabled>{field.placeholder}</option>
                                            {field.options.map(option => (
                                                <option key={option.value} value={option.value}>
                                                    {option.label}
                                                </option>
                                            ))}
                                        </select>
                                    ) : (
                                        <input
                                            type={field.type}
                                            id={field.id}
                                            {...register(field.id)}
                                            className="mt-1 block w-full border-none outline-none rounded-md shadow-sm p-2 transition duration-150 ease-in-out focus:ring focus:ring-indigo-400 bg-white text-gray-700 hover:bg-gray-50"
                                            placeholder={field.placeholder}
                                        />
                                    )}
                                </div>
                            ))}
                            <button
                                type="button"
                                onClick={() => navigate('/payments')}
                                className="mt-4 block w-full bg-gray-300 text-black py-2 rounded-md hover:bg-gray-400 transition duration-200"
                            >
                                Annuler
                            </button>

                            <button
                                type="submit"
                                className="mt-4 block w-full bg-[#67597a] text-white py-2 rounded-md hover:opacity-50 transition duration-200"
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
