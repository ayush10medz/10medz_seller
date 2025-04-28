import React from "react";

const Modal = ({ onClose, children }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-[90%] md:w-[50%] shadow-lg">
                {children}
                <div className="flex justify-end mt-4">
                    <button
                        className="px-4 py-2 bg-red-500 text-white rounded-lg"
                        onClick={onClose}
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
