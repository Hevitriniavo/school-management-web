import {useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";

const studentSchema = z.object({
    name: z.string().min(2, "Le nom doit avoir au moins 2 caractères"),
    firstName: z.string().min(2, "Le prénom doit avoir au moins 2 caractères"),
    className: z.string().min(1, "La classe est requise"),
    address: z.string().min(5, "L'adresse doit avoir au moins 5 caractères"),
    gender: z.enum(["MALE", "FEMALE", "OTHER"], "Le genre est requis")
});

function StudentForm({student, onSubmit}) {
    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm({
        resolver: zodResolver(studentSchema),
        defaultValues: student || {name: "", firstName: "", className: "", address: "", gender: "MALE"}
    });

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-white p-6">
            <div className="grid grid-cols-2 gap-6">
                <div>
                    <label className="block text-gray-700">Nom</label>
                    <input
                        type="text"
                        {...register("name")}
                        placeholder="Nom"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                    {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                </div>

                <div>
                    <label className="block text-gray-700">Prénom</label>
                    <input
                        type="text"
                        placeholder="Prénom"
                        {...register("firstName")}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                    {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName.message}</p>}
                </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
                <div>
                    <label className="block text-gray-700">Classe</label>
                    <input
                        type="text"
                        placeholder="Classe"
                        {...register("className")}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                    {errors.className && <p className="text-red-500 text-sm">{errors.className.message}</p>}
                </div>

                <div>
                    <label className="block text-gray-700">Adresse</label>
                    <input
                        type="text"
                        placeholder="Adresse"
                        {...register("address")}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                    {errors.address && <p className="text-red-500 text-sm">{errors.address.message}</p>}
                </div>
            </div>

            <div>
                <label className="block text-gray-700">Genre</label>
                <select
                    {...register("gender")}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                >
                    <option value="MALE">Masculin</option>
                    <option value="FEMALE">Féminin</option>
                    <option value="OTHER">Autre</option>
                </select>
                {errors.gender && <p className="text-red-500 text-sm">{errors.gender.message}</p>}
            </div>

            <div className="flex justify-end">
                <button
                    type="submit"
                    className="px-4 py-2 bg-[#67597a] text-white rounded-md transform transition-transform duration-200 hover:scale-105"
                >
                    {student ? "Mettre à jour" : "Créer"}
                </button>

            </div>
        </form>
    );
}

export default StudentForm;
