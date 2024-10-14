import {useForm} from 'react-hook-form';
import {z} from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';

const paymentSchema = z.object({
    id: z.string().min(1, {message: "Le numero du paiement est requis"}),
    paymentName: z.string().min(1, {message: "Le nom du paiement est requis"}),
    paymentDate: z.string().min(1, {message: "La date du paiement est requise"}),
    price: z.number(),
    month: z.number(),
});

function PaymentForm({title, onSubmit, defaultValues}) {
    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm({
        resolver: zodResolver(paymentSchema),
        defaultValues,
    });

    return (
        <form onSubmit={handleSubmit(onSubmit)}
              className="space-y-6 p-6 border border-gray-300 rounded-lg shadow-md bg-white">
            <h2 className="text-lg font-semibold mb-4 text-center">
                {title ? title : defaultValues ? "Mettre à jour le Paiement" : "Créer un Paiement"}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block mb-1 font-medium">Nom du Paiement</label>
                    <input
                        type="text"
                        {...register('paymentName')}
                        className={`border ${errors.paymentName ? 'border-red-500' : 'border-gray-300'} rounded-lg p-2 w-full focus:outline-none focus:ring focus:ring-blue-200`}
                    />
                    {errors.paymentName && <span className="text-red-500 text-sm">{errors.paymentName.message}</span>}
                </div>
                <div>
                    <label className="block mb-1 font-medium">Numéro du Paiement</label>
                    <input
                        type="text"
                        readOnly={!!defaultValues?.id}
                        {...register('id')}
                        className={`border ${errors.id ? 'border-red-500' : 'border-gray-300'} rounded-lg p-2 w-full focus:outline-none focus:ring focus:ring-blue-200`}
                    />
                    {errors.id && <span className="text-red-500 text-sm">{errors.id.message}</span>}
                </div>
                <div>
                    <label className="block mb-1 font-medium">Date du Paiement</label>
                    <input
                        type="date"
                        {...register('paymentDate')}
                        className={`border ${errors.paymentDate ? 'border-red-500' : 'border-gray-300'} rounded-lg p-2 w-full focus:outline-none focus:ring focus:ring-blue-200`}
                    />
                    {errors.paymentDate && <span className="text-red-500 text-sm">{errors.paymentDate.message}</span>}
                </div>
                <div>
                    <label className="block mb-1 font-medium">Prix</label>
                    <input
                        type="number"
                        {...register('price',{valueAsNumber: true})}
                        className={`border ${errors.price ? 'border-red-500' : 'border-gray-300'} rounded-lg p-2 w-full focus:outline-none focus:ring focus:ring-blue-200`}
                    />
                    {errors.price && <span className="text-red-500 text-sm">{errors.price.message}</span>}
                </div>
                <div>
                    <label className="block mb-1 font-medium">Mois</label>
                    <input
                        type="text"
                        {...register('month', {valueAsNumber: true})}
                        className={`border ${errors.month ? 'border-red-500' : 'border-gray-300'} rounded-lg p-2 w-full focus:outline-none focus:ring focus:ring-blue-200`}
                    />
                    {errors.month && <span className="text-red-500 text-sm">{errors.month.message}</span>}
                </div>

            </div>
            <button type="submit"
                    className="bg-blue-500 text-white rounded-lg py-2 px-4 hover:bg-blue-600 transition-colors duration-200">
                {defaultValues ? "Mettre à Jour" : "Payer"}
            </button>
        </form>
    );
}

export default PaymentForm;
