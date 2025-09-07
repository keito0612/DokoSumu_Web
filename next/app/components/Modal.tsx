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
        return 'bg-green-500 hover:bg-green-400';
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
    'rounded font-bold w-24 h-10 text-base sm:w-28 sm:h-12 sm:text-lg md:w-32 md:h-12 md:text-xl';

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
        <p className="mt-4 text-black font-bold text-base sm:text-xl">{title}</p>
        <p className="mt-2 text-black text-sm sm:text-lg">{message}</p>

        {(type === 'Warning' || type === 'Normal') && onConfirm ? (
          <div className="mt-6 flex justify-center gap-28">
            <button
              className={`${baseBtn} ${getColor()}`}
              onClick={async () => {
                await onConfirm();
                onClose();
              }}
            >
              {confirmLabel}
            </button>
            <button
              className={`${baseBtn} bg-green-400 hover:bg-green-300`}
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
