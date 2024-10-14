import {BadgePlus, Pencil, Trash} from "lucide-react";

function StudentTable({students, onUpdate, onAddPayment, onDelete}) {
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300 shadow-lg">
                <thead>
                <tr className="bg-[#67597a] text-white uppercase text-sm leading-normal">
                    <th className="py-3 px-6 text-left">ID</th>
                    <th className="py-3 px-6 text-left">Nom</th>
                    <th className="py-3 px-6 text-left">Prénom</th>
                    <th className="py-3 px-6 text-left">Classe</th>
                    <th className="py-3 px-6 text-left">Adresse</th>
                    <th className="py-3 px-6 text-left">Genre</th>
                    <th className="py-3 px-6 text-center">Actions</th>
                </tr>
                </thead>
                <tbody className="text-gray-600 text-sm font-light">
                {students.length === 0 ? (
                    <tr>
                        <td colSpan={6} className="py-3 px-6 text-center text-gray-500">
                            Aucun étudiant disponible.
                        </td>
                    </tr>
                ) : (
                    students.map((student) => (
                        <tr key={student.id} className="border-b border-gray-300 hover:bg-gray-100">
                            <td className="py-3 px-6 text-left">{student.id}</td>
                            <td className="py-3 px-6 text-left">{student.name}</td>
                            <td className="py-3 px-6 text-left">{student.firstName}</td>
                            <td className="py-3 px-6 text-left">{student.className}</td>
                            <td className="py-3 px-6 text-left">{student.address}</td>
                            <td className="py-3 px-6 text-left">{student.gender}</td>
                            <td className="py-3 px-6 flex justify-center space-x-2">
                                <button
                                    className="text-blue-500 hover:text-blue-700 transition-colors duration-300"
                                    onClick={() => onUpdate(student)}
                                    aria-label="Modifier"
                                >
                                    <Pencil className="w-5 h-5"/>
                                </button>
                                <button
                                    className="text-green-500 hover:text-green-700 transition-colors duration-300"
                                    onClick={() => onAddPayment(student)}
                                    aria-label="add"
                                >
                                    <BadgePlus className="w-5 h-5"/>
                                </button>

                                <button
                                    className="text-red-500 hover:text-red-700 transition-colors duration-300"
                                    onClick={() => onDelete(student)}
                                    aria-label="Supprimer"
                                >
                                    <Trash className="w-5 h-5"/>
                                </button>
                            </td>
                        </tr>
                    ))
                )}
                </tbody>
            </table>
        </div>
    );
}

export default StudentTable;
