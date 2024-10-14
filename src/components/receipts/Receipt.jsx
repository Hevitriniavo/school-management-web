import  {Fragment} from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

function Receipt({ receipt }) {
    const { payment, student } = receipt;

    const handleDownload = () => {
        const input = document.getElementById('receipt');

        html2canvas(input, { scale: 2 })
            .then((canvas) => {
                const imgData = canvas.toDataURL('image/png');
                const pdf = new jsPDF();
                const imgWidth = 190;
                const pageHeight = pdf.internal.pageSize.height;
                const imgHeight = (canvas.height * imgWidth) / canvas.width;
                let heightLeft = imgHeight;

                let position = 0;

                pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
                heightLeft -= pageHeight;

                while (heightLeft >= 0) {
                    position = heightLeft - imgHeight;
                    pdf.addPage();
                    pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
                    heightLeft -= pageHeight;
                }

                const date = new Date();
                const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
                const fileName = `recu_de_paiement_${student.firstName}_${student.name}_${formattedDate}.pdf`.replace(/\s+/g, '_')
                pdf.save(fileName);
            });
    };

    const handleCancel = () => {
        console.log('Cancel action logic goes here');
    };

    return (
        <Fragment>
            <div id="receipt"
                 className="w-full mx-auto mt-10 p-6 bg-white">
                <h2 className="text-2xl font-bold text-center mb-6 text-indigo-600">Reçu de Paiement</h2>

                <div className="mb-8">
                    <h3 className="text-lg font-semibold mb-4">Informations de l'Étudiant</h3>
                    <table className="min-w-full bg-white border border-gray-300">
                        <tbody>
                        <tr>
                            <td className="py-2 px-4 border-b">ID de l'Étudiant</td>
                            <td className="py-2 px-4 border-b">{student.id}</td>
                        </tr>
                        <tr>
                            <td className="py-2 px-4 border-b">Nom</td>
                            <td className="py-2 px-4 border-b">{student.name}</td>
                        </tr>
                        <tr>
                            <td className="py-2 px-4 border-b">Prénom</td>
                            <td className="py-2 px-4 border-b">{student.firstName}</td>
                        </tr>
                        <tr>
                            <td className="py-2 px-4 border-b">Classe</td>
                            <td className="py-2 px-4 border-b">{student.className}</td>
                        </tr>
                        <tr>
                            <td className="py-2 px-4 border-b">Adresse</td>
                            <td className="py-2 px-4 border-b">{student.address}</td>
                        </tr>
                        <tr>
                            <td className="py-2 px-4 border-b">Genre</td>
                            <td className="py-2 px-4 border-b">{student.gender}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>

                <div className="mb-8">
                    <h3 className="text-lg font-semibold mb-4">Détails du Paiement</h3>
                    <table className="min-w-full bg-white border border-gray-300">
                        <tbody>
                        <tr>
                            <td className="py-2 px-4 border-b">ID du Paiement</td>
                            <td className="py-2 px-4 border-b">{payment.id}</td>
                        </tr>
                        <tr>
                            <td className="py-2 px-4 border-b">Nom du Paiement</td>
                            <td className="py-2 px-4 border-b">{payment.paymentName}</td>
                        </tr>
                        <tr>
                            <td className="py-2 px-4 border-b">Date du Paiement</td>
                            <td className="py-2 px-4 border-b">{new Date(payment.paymentDate).toLocaleDateString()}</td>
                        </tr>
                        <tr>
                            <td className="py-2 px-4 border-b">Prix</td>
                            <td className="py-2 px-4 border-b">{payment.price} Ar</td>
                        </tr>
                        <tr>
                            <td className="py-2 px-4 border-b">Mois</td>
                            <td className="py-2 px-4 border-b">{payment.month}</td>
                        </tr>
                        <tr>
                            <td className="py-2 px-4 border-b">Montant Total</td>
                            <td className="py-2 px-4 border-b">{payment.amount} Ar</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="mt-8 flex justify-between">
                <button
                    onClick={handleDownload}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-500 transition duration-200"
                >
                    Télécharger
                </button>
                <button
                    onClick={handleCancel}
                    className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg shadow hover:bg-gray-200 transition duration-200"
                >
                    Annuler
                </button>
            </div>
        </Fragment>
    );
}

export default Receipt;
