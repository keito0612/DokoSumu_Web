import React from 'react';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  type: 'success' | 'error';
  message: string;
};

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, type, message }) => {
  if (!isOpen) return null;

  const icon =
    type === 'success' ? (
      <div className="bg-green-100 rounded-full p-4">
        <svg
          className="w-8 h-8 text-green-600"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </div>
    ) : (
      <div className="bg-red-100 rounded-full p-4">
        <svg
          className="w-8 h-8 text-red-600"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v2m0 4h.01M10.29 3.86l-7.39 12.78A1 1 0 003.42 18h17.16a1 1 0 00.87-1.36l-7.39-12.78a1 1 0 00-1.74 0z"
          />
        </svg>
      </div>
    );

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg p-6 shadow-lg text-center max-w-sm w-full"
        onClick={(e) => e.stopPropagation()}
      >
        {icon}
        <p className="mt-4 text-lg">{message}</p>
        <button
          className="mt-6 px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          onClick={onClose}
        >
          閉じる
        </button>
      </div>
    </div>
  );
};

export default Modal;