import {useEffect, useState} from "react";
import fetchApi from "../services/fetchApi.js";
import {apiUrl} from "../config.js";
import ErrorMessage from "../components/ErrorMessage.jsx";
import Dialog from "../components/Dialog.jsx";
import StudentTable from "../components/students/StudentTable.jsx";
import Modal from "../components/Modal.jsx";
import StudentForm from "../components/students/StudentForm.jsx";
import {useNavigate} from "react-router-dom";
import Pagination from "../components/Pagination.jsx";
import StudentSearchForm from "../components/students/StudentSearchForm.jsx";
import useDocumentTitle from "../hooks/useDocumentTitle.jsx";

const PAGE_SIZES = [4, 6, 8, 10, 12, 14, 20, 30];
const INITIAL_SEARCH_PARAMS = {
    name: "",
    firstName: "",
    className: "",
    address: "",
    gender: "",
};

function StudentListView() {
    const [students, setStudents] = useState([]);
    const [isError, setIsError] = useState(false);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [studentToDelete, setStudentToDelete] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingStudent, setEditingStudent] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(PAGE_SIZES[1]);
    const [totalPage, setTotalPage] = useState(0);
    useDocumentTitle("Tableau des étudiants");
    const [searchParams, setSearchParams] = useState(INITIAL_SEARCH_PARAMS);

    const navigate = useNavigate();

    const buildSearchQuery = () => {
        const params = new URLSearchParams({
            size: pageSize,
            page: currentPage,
            ...Object.fromEntries(Object.entries(searchParams).filter((v) => v[1]))
        });

        return `${apiUrl}/students/paginate?${params.toString()}`;
    };

    useEffect(() => {
        const query = buildSearchQuery();
        fetchApi(query)
            .then((data) => {
                setTotalPage(data?.pageInfo?.totalPages || 0);
                setStudents(data.items || []);
            })
            .catch(() => setIsError(true));
    }, [searchParams, pageSize, currentPage]);

    const handleDelete = (studentId) => {
        fetchApi(`${apiUrl}/students/${studentId}`, {method: "DELETE"})
            .then(() => {
                setStudents(students.filter((student) => student.id !== studentId));
                setIsDialogOpen(false);
            })
            .catch(() => setIsError(true))
    };

    const openDialog = (student) => {
        setStudentToDelete(student);
        setIsDialogOpen(true);
    };

    const handleSearch = data => {
        setSearchParams(data)
    }

    const handleAddPayment = (student) => {
        navigate(`/payments/create/${student.id}`);
    };

    const handleUpdate = (student) => {
        setEditingStudent(student);
        setIsModalOpen(true);
    };

    const handleCreate = () => {
        setEditingStudent(null);
        setIsModalOpen(true);
    };

    const handleFormSubmit = (data) => {
        const body = editingStudent ? {id: editingStudent.id, ...data} : data;

        fetchApi(`${apiUrl}/students`, {
            method: "POST",
            body,
        })
            .then((updatedStudent) => {
                setStudents((prev) =>
                    editingStudent
                        ? prev.map((s) => (s.id === updatedStudent.id ? updatedStudent : s))
                        : [...prev, updatedStudent]
                );
                setIsModalOpen(false);
            })
            .catch(() => setIsError(true));
    };


    const handleSizeChange = (size) => {
        setPageSize(size);
        setCurrentPage(1);
    };

    return (
        <>
            {isError ? (
                <ErrorMessage/>
            ) : (
                <div>
                    <h1 className="text-xl font-bold mb-4 text-center">Liste des étudiants</h1>
                    <button
                        className="px-4  py-2 bg-[#85baa1] text-black rounded-md hover:bg-green-300 mb-4"
                        onClick={handleCreate}
                    >
                        Créer un étudiant
                    </button>

                    <StudentSearchForm
                        onSearch={handleSearch}
                    />
                    <StudentTable
                        students={students}
                        onUpdate={handleUpdate}
                        onDelete={openDialog}
                        onAddPayment={handleAddPayment}
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
                onConfirm={() => handleDelete(studentToDelete?.id)}
                title={`Supprimer l'étudiant ${studentToDelete ? studentToDelete.name : ''}?`}
                content={() => <p className="text-center">Êtes-vous sûr de vouloir supprimer cet étudiant ?</p>}
            />
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={editingStudent ? "Modifier l'étudiant" : "Créer un étudiant"}
            >
                <StudentForm
                    student={editingStudent}
                    onSubmit={handleFormSubmit}
                />
            </Modal>
        </>
    );
}

export default StudentListView;
