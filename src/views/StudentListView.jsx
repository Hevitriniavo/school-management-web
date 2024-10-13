import {useEffect, useRef, useState} from "react";
import fetchApi from "../services/fetchApi.js";
import {apiUrl} from "../config.js";
import Loading from "../components/Loading.jsx";
import ErrorMessage from "../components/ErrorMessage.jsx";
import Dialog from "../components/Dialog.jsx";
import StudentTable from "../components/students/StudentTable.jsx";
import Modal from "../components/Modal.jsx";
import StudentForm from "../components/students/StudentForm.jsx";
import {useNavigate} from "react-router-dom";

function StudentListView() {
    const [students, setStudents] = useState([]);
    const isMounted = useRef(true);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [studentToDelete, setStudentToDelete] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingStudent, setEditingStudent] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (isMounted.current) {
            fetchApi(`${apiUrl}/students`)
                .then(data => {
                    setStudents(data);
                })
                .catch(() => {
                    setIsError(true);
                })
                .finally(() => {
                    setIsLoading(false);
                });
        }

        return () => {
            isMounted.current = false;
        };
    }, []);

    const handleDelete = (studentId) => {
        setIsLoading(true);
        fetchApi(`${apiUrl}/students/${studentId}`, {
            method: "DELETE"
        })
            .then(() => {
                setStudents(students.filter(student => student.id !== studentId));
                setIsDialogOpen(false);
            })
            .catch(() => {
                setIsError(true);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    const openDialog = (student) => {
        setStudentToDelete(student);
        setIsDialogOpen(true);
    };

    const handleAddPayment = (student) =>  {
        navigate(`/payments/create/${student.id}`)
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
        console.log(data)
        const body = editingStudent ? {
            id: editingStudent.id,
            ...data
        } : data

        fetchApi(`${apiUrl}/students`, {
            method: "POST",
            body
        })
            .then(updatedStudent => {
                if (editingStudent) {
                    setStudents(students.map(s => (s.id === updatedStudent.id ? updatedStudent : s)));
                } else {
                    setStudents([...students, updatedStudent]);
                }
                setIsModalOpen(false);
            })
            .catch(() => {
                setIsError(true);
            });
    };

    return (
        <>
            {isLoading ? (
                <Loading/>
            ) : isError ? (
                <ErrorMessage/>
            ) : (
                <div>
                    <h1 className="text-xl font-bold mb-4">Liste des étudiants</h1>
                    <button
                        className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 mb-4"
                        onClick={handleCreate}
                    >
                        Créer un étudiant
                    </button>
                    <StudentTable
                        students={students}
                        onUpdate={handleUpdate}
                        onDelete={openDialog}
                        onAddPayment= {handleAddPayment}
                    />
                </div>
            )}
            <Dialog
                isOpen={isDialogOpen}
                onCancel={() => setIsDialogOpen(false)}
                onConfirm={() => handleDelete(studentToDelete?.id)}
                title={`Supprimer l'étudiant ${studentToDelete ? studentToDelete.name : ''}?`}
                content={() => <p>Êtes-vous sûr de vouloir supprimer cet étudiant ?</p>}
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
