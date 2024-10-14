import {Trash2, X} from "lucide-react";
import {motion} from "framer-motion";

function Dialog({isOpen, onCancel, onConfirm, title = "", cancelText = "", confirmText = "", content: CustomMessage}) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <motion.div
                initial={{scale: 0.8, opacity: 0}}
                animate={{scale: 1, opacity: 1}}
                exit={{scale: 0.8, opacity: 0}}
                className="bg-white rounded-lg shadow-lg p-6 w-1/3 relative"
            >
                <button
                    onClick={onCancel}
                    className="absolute top-2 right-2 text-[#67597a] hover:text-gray-600"
                >
                    <X size={24}/>
                </button>
                <h2 className="text-xl text-center font-bold text-gray-800 mb-4">{title}</h2>

                {CustomMessage ? (
                    <CustomMessage/>
                ) : (
                    <p className="text-center text-gray-600">Êtes-vous sûr de vouloir supprimer cet élément ?</p>
                )}

                <div className="flex justify-between mt-6 space-x-2">
                    <button
                        className="flex items-center justify-center px-6 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 focus:outline-none"
                        onClick={onCancel}
                    >
                        <X size={18}/>
                        {cancelText !== "" ? cancelText : ""}
                    </button>
                    <button
                        className="flex items-center justify-center px-6 py-2 bg-red-600 text-white rounded hover:bg-red-700 focus:outline-none"
                        onClick={onConfirm}
                    >
                        <Trash2 size={14} />
                        {confirmText !== "" ? confirmText : ""}
                    </button>
                </div>
            </motion.div>
        </div>
    );
}

export default Dialog;
