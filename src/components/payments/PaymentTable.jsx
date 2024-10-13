import { Pencil, Trash} from "lucide-react";

function PaymentTable({ payments, onUpdate, onDelete }) {
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200">
                <thead>
                <tr className="bg-gray-100 border-b">
                    <th className="py-2 px-4 text-left text-gray-600">ID</th>
                    <th className="py-2 px-4 text-left text-gray-600">Nom de Paiement</th>
                    <th className="py-2 px-4 text-left text-gray-600">Date de Paiement</th>
                    <th className="py-2 px-4 text-left text-gray-600">Prix</th>
                    <th className="py-2 px-4 text-left text-gray-600">Mois</th>
                    <th className="py-2 px-4 text-left text-gray-600">Actions</th>
                </tr>
                </thead>
                <tbody>
                {payments.map((payment) => (
                    <tr key={payment.id} className="border-b hover:bg-gray-50">
                        <td className="py-2 px-4">{payment.id}</td>
                        <td className="py-2 px-4">{payment.paymentName}</td>
                        <td className="py-2 px-4">{payment.paymentDate}</td>
                        <td className="py-2 px-4">{payment.price.toLocaleString()} Ar</td>
                        <td className="py-2 px-4">{payment.month}</td>
                        <td className="py-3 px-6 flex justify-center space-x-2">
                            <button
                                className="text-blue-500 hover:text-blue-700 transition-colors duration-300"
                                onClick={() => onUpdate(payment)}
                                aria-label="Modifier"
                            >
                                <Pencil className="w-5 h-5"/>
                            </button>

                            <button
                                className="text-red-500 hover:text-red-700 transition-colors duration-300"
                                onClick={() => onDelete(payment)}
                                aria-label="Supprimer"
                            >
                                <Trash className="w-5 h-5"/>
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default PaymentTable;
