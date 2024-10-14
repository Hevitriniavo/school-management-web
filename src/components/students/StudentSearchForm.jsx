import { useForm } from "react-hook-form";

function StudentSearchForm({ onSearch }) {
    const { register, handleSubmit, reset } = useForm({
        defaultValues: {
            id: "",
            name: "",
            firstName: "",
            className: "",
            address: "",
            gender: ""
        }
    });

    const onSubmit = (data) => {
        console.log("Searching with parameters:", data);
        onSearch(data);
        reset();
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex space-x-2 mb-2">
            {["id","name", "firstName", "className", "address"].map((field) => (
                <input
                    key={field}
                    type="text"
                    {...register(field)}
                    placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                    className="border border-gray-300 w-12 rounded-md p-2 flex-grow focus:outline-none focus:border-[#67597a] transition-colors duration-200"
                />
            ))}
            <select
                {...register("gender")}
                className="border border-gray-300 rounded-md p-2 flex-grow focus:outline-none focus:border-[#67597a] transition-colors duration-200"
            >
                <option value="">Genre</option>
                <option value="MALE">Homme</option>
                <option value="FEMALE">Femme</option>
                <option value="OTHER">Autre</option>
            </select>
            <button
                type="submit"
                className="px-4 py-2 bg-[#67597a] text-white rounded-md hover:bg-[#5c4a67] transition-colors duration-200"
            >
                Rechercher
            </button>
        </form>
    );
}

export default StudentSearchForm;
