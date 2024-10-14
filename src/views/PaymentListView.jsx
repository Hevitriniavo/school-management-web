import {useEffect, useState} from "react";
import fetchApi from "../services/fetchApi.js";
import {apiUrl} from "../config.js";
import ErrorMessage from "../components/ErrorMessage.jsx";
import PaymentTable from "../components/payments/PaymentTable.jsx";
import Dialog from "../components/Dialog.jsx";
import {useNavigate} from "react-router-dom";
import Pagination from "../components/Pagination.jsx";
import PaymentSearchForm from "../components/payments/PaymentSearchForm.jsx";

const PAGE_SIZES = [4, 6, 8, 10, 12, 14, 20, 30];

 const INITIAL_SEARCH_PARAMS = {
    paymentName: "",
    startDate: "",
    endDate: "",
    minPrice: "",
    maxPrice: "",
    month: "",
};

function PaymentListView() {
    const [payments, setPayments] = useState([]);
    const [isError, setIsError] = useState(false);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [paymentToDelete, setPaymentToDelete] = useState(null);
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useState(INITIAL_SEARCH_PARAMS);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
    const [totalPage, setTotalPage] = useState(0);

    const buildSearchQuery = () => {
        const params = new URLSearchParams({
            size: pageSize,
            page: currentPage,
            ...Object.fromEntries(Object.entries(searchParams).filter((v) => v[1]))
        });

        return `${apiUrl}/payments/paginate?${params.toString()}`;
    };

    useEffect(() => {
        const query = buildSearchQuery();
        fetchApi(query)
            .then(data => {
                setTotalPage(data?.pageInfo?.totalPages || 0);
                setPayments(data?.items || []);
            })
            .catch(() => {
                setIsError(true);
            })

    }, [searchParams, pageSize, currentPage]);

    const handleCreate = () => {
        navigate("/payments/create")
    };

    const openDialog = (student) => {
        setPaymentToDelete(student);
        setIsDialogOpen(true);
    };

    const handleUpdate = (payment) => {
        navigate(`/payments/edit/${payment.id}`)
    };

    const handleDelete = (paymentId) => {
        fetchApi(`${apiUrl}/payments/${paymentId}`, {
            method: "DELETE"
        })
            .then(() => {
                setPayments(payments.filter(p => p.id !== paymentId));
                setIsDialogOpen(false);
                navigate("/payments")
            })
            .catch(() => {
                setIsError(true);
            })
    };


    const handleSizeChange = (size) => {
        setPageSize(size);
        setCurrentPage(1);
    };


    const handleSearch = data => {
        setSearchParams(data)
    }

    return (
        <>
            {isError ? (
                <ErrorMessage/>
            ) : (
                <div>
                    <h1 className="text-xl font-bold mb-4">Liste des paiements</h1>
                    <button
                        className="px-4 py-2 bg-[#85baa1] text-black rounded-md hover:bg-green-300 mb-4"
                        onClick={handleCreate}
                    >
                        Ajouter un paiment
                    </button>

                    <PaymentSearchForm
                        onSearch={handleSearch}
                    />
                    <PaymentTable
                        payments={payments}
                        onUpdate={handleUpdate}
                        onDelete={openDialog}
                    />

                    <Pagination
                        currentPage={currentPage}
                        totalPage={totalPage}
                        onChangePage={(page) => setCurrentPage(page)}
                        onChangeSize={handleSizeChange}
                        sizes={PAGE_SIZES}
                    />
                </div>
            )}

            <Dialog
                isOpen={isDialogOpen}
                onCancel={() => setIsDialogOpen(false)}
                onConfirm={() => handleDelete(paymentToDelete?.id)}
                title={`Supprimer le paiment ${paymentToDelete ? paymentToDelete.paymentName : ''}?`}
                content={() => <p>Êtes-vous sûr de vouloir supprimer cet paiment ?</p>}
            />
        </>
    );
}

export default PaymentListView;
