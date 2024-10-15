import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';

const paymentSchema = z.object({
    id: z.string().min(1, { message: "Le numéro du paiement est requis" }),
    paymentName: z.string().min(1, { message: "Le nom du paiement est requis" }),
    paymentDate: z.string().min(1, { message: "La date du paiement est requise" }),
    price: z.number(),
    month: z.number(),
});

const formFields = (isReadOnlyId) => [
    { label: 'Nom du Paiement', name: 'paymentName', type: 'text', placeholder: 'Entrez le nom du paiement' },
    { label: 'Numéro du Paiement', name: 'id', type: 'text', placeholder: 'Entrez le numéro du paiement', readOnly: isReadOnlyId },
    { label: 'Date du Paiement', name: 'paymentDate', type: 'date', placeholder: 'Sélectionnez la date du paiement' },
    { label: 'Prix', name: 'price', type: 'number', placeholder: 'Entrez le prix' },
    { label: 'Mois', name: 'month', type: 'number', placeholder: 'Entrez le mois' },
];

function PaymentForm({ title, onSubmit, defaultValues }) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(paymentSchema),
        defaultValues,
    });

    const navigate = useNavigate();

    const handleCancel = () => {
        navigate('/payments');
    };

    const isReadOnlyId = !!defaultValues?.id;

    return (
        <form onSubmit={handleSubmit(onSubmit)}
              className="space-y-6 dark:bg-[#0F2027] dark:border-none p-6 border border-gray-300 rounded-lg shadow-md bg-white">
            <h2 className="font-bold text-xl mb-4 text-center">
                {title ? title : defaultValues ? "Mettre à jour le Paiement" : "Créer un Paiement"}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {formFields(isReadOnlyId).map(({ label, name, type, placeholder, readOnly }) => (
                    <div key={name}>
                        <label className="block mb-1 font-medium">{label}</label>
                        <input
                            type={type}
                            readOnly={readOnly}
                            {...register(name, {
                                valueAsNumber: name === "price" || name ==="month"
                            })}
                            placeholder={placeholder}
                            className={`border ${errors[name] ? 'border-red-500' : 'border-gray-300'} rounded-lg p-2 w-full focus:outline-none dark:text-black dark:bg-transparent dark:border-none focus:ring focus:ring-blue-200`}
                        />
                        {errors[name] && <span className="text-red-500 text-sm">{errors[name].message}</span>}
                    </div>
                ))}
            </div>

            <div className="flex justify-between">
                <button type="submit"
                        className="bg-blue-500 text-white rounded-lg py-2 px-4 hover:bg-blue-600 transition-colors duration-200">
                    {defaultValues ? "Mettre à Jour" : "Payer"}
                </button>

                <button type="button" onClick={handleCancel}
                        className="bg-gray-500 text-white rounded-lg py-2 px-4 hover:bg-gray-600 transition-colors duration-200">
                    Annuler
                </button>
            </div>
        </form>
    );
}

export default PaymentForm;
