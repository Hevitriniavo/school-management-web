import { Pencil, Trash } from "lucide-react";

function PaymentTable({ payments, onUpdate, onDelete }) {
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300 shadow-lg">
                <thead>
                <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                    <th className="py-3 px-6 text-left">ID</th>
                    <th className="py-3 px-6 text-left">Nom de Paiement</th>
                    <th className="py-3 px-6 text-left">Date de Paiement</th>
                    <th className="py-3 px-6 text-left">Prix</th>
                    <th className="py-3 px-6 text-left">Mois</th>
                    <th className="py-3 px-6 text-center">Actions</th>
                </tr>
                </thead>
                <tbody className="text-gray-600 text-sm font-light">
                {payments.length === 0 ? (
                    <tr>
                        <td colSpan={6} className="py-3 px-6 text-center text-gray-500">
                            Aucun paiement disponible.
                        </td>
                    </tr>
                ) : (
                    payments.map((payment) => (
                        <tr key={payment.id} className="border-b border-gray-300 hover:bg-gray-100">
                            <td className="py-3 px-6 text-left">{payment.id}</td>
                            <td className="py-3 px-6 text-left">{payment.paymentName}</td>
                            <td className="py-3 px-6 text-left">{payment.paymentDate}</td>
                            <td className="py-3 px-6 text-left">{payment.price.toLocaleString()} Ar</td>
                            <td className="py-3 px-6 text-left">{payment.month}</td>
                            <td className="py-3 px-6 flex justify-center space-x-2">
                                <button
                                    className="text-blue-500 hover:text-blue-700 transition-colors duration-300"
                                    onClick={() => onUpdate(payment)}
                                    aria-label="Modifier"
                                >
                                    <Pencil className="w-5 h-5" />
                                </button>
                                <button
                                    className="text-red-500 hover:text-red-700 transition-colors duration-300"
                                    onClick={() => onDelete(payment)}
                                    aria-label="Supprimer"
                                >
                                    <Trash className="w-5 h-5" />
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

export default PaymentTable;
