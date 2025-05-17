import { ResultType } from '@/types';
import React from 'react';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  type: ResultType;
  title: string;
  message: string;
};

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, type, message, title }) => {
  if (!isOpen) return null;

  const icon =
    type === 'Success' ? (
      <div className="bg-green-100 rounded-full flex items-center justify-center w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24">
        <svg
          className="text-green-600 w-14 h-14 md:w-14 md:h-16 lg:w-16 lg:h-16"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          viewBox="0 0 24 24"
        >
          <path xmlns="http://www.w3.org/2000/svg" strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </div>
    ) : (
      <div className="bg-red-200 rounded-full flex items-center justify-center w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24">
        <svg
          className=" text-red-600 w-14 h-14 md:w-12 md:h-14 lg:w-16 lg:h-16"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <path
            xmlns="http://www.w3.org/2000/svg"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v2m0 4h.01M10.29 3.86l-7.39 12.78A1 1 0 003.42 18h17.16a1 1 0 00.87-1.36l-7.39-12.78a1 1 0 00-1.74 0z"
          />
        </svg>
      </div>
    );

  const colorButtonClasses =
    type === 'Success'
      ? 'bg-green-500 hover:bg-green-400'
      : 'bg-red-500 hover:bg-red-400';

  return (
    <div
      className="fixed inset-0  flex items-center justify-center bg-black bg-opacity-50 z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg p-6 shadow-lg text-center 
             w-11/12 sm:w-96 md:w-[500px] lg:w-[600px]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className='flex justify-center items-center'>
          {icon}
        </div>
        <p className="mt-4 text-center text-black font-bold text-base sm:text-xl md:text-xl">{title}</p>
        <p className="mt-2 text-black text-sm sm:text-lg md:text-lg">{message}</p>
        <button
          className={`mt-6 w-24 h-12 text-base sm:w-28 sm:h-14 sm:text-lg md:w-32 md:h-16 md:text-xl px-4 py-2 rounded font-bold ${colorButtonClasses}`}
          onClick={onClose}
        >
          閉じる
        </button>
      </div>
    </div>
  );
};

export default Modal;