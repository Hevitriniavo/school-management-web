import {Fragment} from "react";
import {motion} from "framer-motion";
import {X} from "lucide-react";

function Modal({isOpen, onClose, title, children}) {
    if (!isOpen) return null;

    return (
        <Fragment>
            <motion.div
                initial={{opacity: 0}}
                animate={{opacity: 0.5}}
                exit={{opacity: 0}}
                className="fixed inset-0 bg-black bg-opacity-50 z-40"
                onClick={onClose}
            />

            <motion.div
                initial={{opacity: 0, scale: 0.9}}
                animate={{opacity: 1, scale: 1}}
                exit={{opacity: 0, scale: 0.9}}
                transition={{duration: 0.3}}
                className="fixed inset-0 z-50 flex items-center justify-center"
            >
                <div className="bg-white rounded-lg shadow-lg p-6 max-w-[600px] w-full relative">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-bold text-center mx-6">{title}</h2>
                        <button onClick={onClose}>
                            <X className="w-6 h-6 text-[#67597a] hover:text-gray-900"/>
                        </button>
                    </div>

                    <div className="mb-4">
                        {children}
                    </div>
                </div>
            </motion.div>
        </Fragment>
    );
}

export default Modal;
