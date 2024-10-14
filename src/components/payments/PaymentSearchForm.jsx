import { useForm } from "react-hook-form";

const INITIAL_SEARCH_PARAMS = {
    paymentName: "",
    startDate: "",
    endDate: "",
    minPrice: "",
    maxPrice: "",
    month: "",
};

const formFields = [
    { name: "paymentName", type: "text", placeholder: "Nom du paiement" },
    { name: "id", type: "text", placeholder: "Numéro du paiement" },
    { name: "startDate", type: "date", placeholder: "Date de début" },
    { name: "endDate", type: "date", placeholder: "Date de fin" },
    { name: "minPrice", type: "number", placeholder: "Prix minimum" },
    { name: "maxPrice", type: "number", placeholder: "Prix maximum" },
    { name: "month", type: "number", placeholder: "Mois (1-12)" },
];

function PaymentSearchForm({ onSearch }) {
    const { register, handleSubmit, reset } = useForm({
        defaultValues: INITIAL_SEARCH_PARAMS,
    });

    const onSubmit = (data) => {
        onSearch(data);
        reset();
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="mb-4">
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {formFields.map((field) => (
                    <input
                        key={field.name}
                        type={field.type}
                        placeholder={field.placeholder}
                        {...register(field.name)}
                        className="border border-gray-300 rounded-md p-2 focus:outline-none focus:border-[#67597a] transition-colors duration-200"
                    />
                ))}
                <button
                    type="submit"
                    className="bg-[#67597a] text-white rounded-md hover:bg-[#5c4a67] transition-colors duration-200"
                >
                    Rechercher
                </button>
            </div>

        </form>
    );
}

export default PaymentSearchForm;
