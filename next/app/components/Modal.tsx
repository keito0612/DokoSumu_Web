'use client';
import React from 'react';
import { ResultType } from '@/types';
import { MaterialSymbolsLightWarningRounded } from './icons/MaterialSymbolsLightWarningRounded';
import { SystemUiconsWarningCircle } from './icons/SystemUiconsWarningCircle';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
  type: ResultType;
  onConfirm?: () => void | Promise<void>;         // confirm 用
  confirmLabel?: string;          // confirm 用
  cancelLabel?: string;           // confirm 用
};

const ICON_SIZE = 'w-24 h-24 md:w-28 md:h-28';

export default function Modal({
  isOpen,
  onClose,
  title,
  message,
  type,
  onConfirm,
  confirmLabel = 'はい',
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
          <div className=" rounded-full flex items-center justify-center w-16 h-16">
            <MaterialSymbolsLightWarningRounded className={`${ICON_SIZE} text-red-500`} />
          </div>
        );
      case 'Warning':
        return (
          <div className="bg-100 rounded-full flex items-center justify-center w-16 h-16">
            <SystemUiconsWarningCircle className={`${ICON_SIZE} text-red-500`} />
          </div>
        );
      default:
        return null;
    }
  };

  const getColor = () => {
    switch (type) {
      case 'Success':
        return 'bg-green-500 hover:bg-green-500';
      case 'Error':
        return 'bg-red-500 hover:bg-red-400';
      case 'Warning':
        return 'bg-red-600 hover:bg-red-500';
      case 'Normal':
        return 'bg-green-600 hover:bg-green-500';
      default:
        return 'bg-blue-500 hover:bg-blue-400';
    }
  };

  const baseBtn =
    'rounded-xl font-semibold px-6 py-3 text-sm sm:text-base transition-all duration-200 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-offset-2';

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50 animate-fade-in"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl p-8 shadow-modal text-center w-11/12 sm:w-96 md:w-[450px] animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-center items-center mb-4">{getIcon()}</div>
        <h3 className="text-gray-900 font-bold text-lg sm:text-xl">{title}</h3>
        {message && (
          <p className="mt-2 text-gray-600 text-sm sm:text-base leading-relaxed">{message}</p>
        )}

        {(type === 'Warning' || type === 'Normal') && onConfirm ? (
          <div className="mt-8 flex justify-center gap-4">
            <button
              className={`${baseBtn} ${getColor()} text-white focus:ring-green-500`}
              onClick={async () => {
                await onConfirm();
                onClose();
              }}
            >
              {confirmLabel}
            </button>
            <button
              className={`${baseBtn} bg-gray-100 hover:bg-gray-200 text-gray-700 focus:ring-gray-400`}
              onClick={onClose}
            >
              {cancelLabel}
            </button>
          </div>
        ) : (
          <button className={`mt-8 text-white ${baseBtn} ${getColor()} focus:ring-green-500`} onClick={onClose}>
            閉じる
          </button>
        )}
      </div>
    </div>
  );
}
