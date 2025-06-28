'use client';
import React from 'react';
import { ResultType } from '@/types';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
  type: ResultType;
  onConfirm?: () => void;         // confirm 用
  confirmLabel?: string;          // confirm 用
  cancelLabel?: string;           // confirm 用
};

const ICON_SIZE = 'w-14 h-14 md:w-16 md:h-16';

export default function Modal({
  isOpen,
  onClose,
  title,
  message,
  type,
  onConfirm,
  confirmLabel = 'OK',
  cancelLabel = 'キャンセル',
}: ModalProps) {
  if (!isOpen) return null;

  const getIcon = () => {
    switch (type) {
      case 'Success':
        return (
          <div className="bg-green-100 rounded-full flex items-center justify-center w-16 h-16">
            <svg className={`${ICON_SIZE} text-green-600`} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
        );
      case 'Error':
        return (
          <div className="bg-red-100 rounded-full flex items-center justify-center w-16 h-16">
            <svg className={`${ICON_SIZE} text-red-600`} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M18 6L6 18M6 6l12 12" />
            </svg>
          </div>
        );
      case 'Warning':
        return (
          <div className="bg-gray-100 rounded-full flex items-center justify-center w-16 h-16">
            <svg className={`${ICON_SIZE} text-gray-600`} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 12h4M12 10v4m0 6a10 10 0 100-20 10 10 0 000 20z" />
            </svg>
          </div>
        );
      default:
        return null;
    }
  };

  const getColor = () => {
    switch (type) {
      case 'Success':
        return 'bg-green-500 hover:bg-green-400';
      case 'Error':
        return 'bg-red-500 hover:bg-red-400';
      case 'Warning':
        return 'bg-gray-600 hover:bg-gray-500';
      default:
        return 'bg-blue-500 hover:bg-blue-400';
    }
  };

  const baseBtn =
    'rounded font-bold w-24 h-12 text-base sm:w-28 sm:h-14 sm:text-lg md:w-32 md:h-16 md:text-xl';

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg p-6 shadow-lg text-center w-11/12 sm:w-96 md:w-[500px] lg:w-[600px]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-center items-center">{getIcon()}</div>
        <p className="mt-4 font-bold text-base sm:text-xl">{title}</p>
        <p className="mt-2 text-sm sm:text-lg">{message}</p>

        {type === 'Warning' && onConfirm ? (
          <div className="mt-6 flex justify-center gap-4">
            <button
              className={`${baseBtn} ${getColor()}`}
              onClick={() => {
                onConfirm();
                onClose();
              }}
            >
              {confirmLabel}
            </button>
            <button
              className={`${baseBtn} bg-gray-400 hover:bg-gray-300`}
              onClick={onClose}
            >
              {cancelLabel}
            </button>
          </div>
        ) : (
          <button className={`mt-6 ${baseBtn} ${getColor()}`} onClick={onClose}>
            閉じる
          </button>
        )}
      </div>
    </div>
  );
}
