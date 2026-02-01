import React, { useState } from "react";
import { Close } from "@mui/icons-material";
import { MaterialSymbolsArrowBackIosRounded } from "./icons/MaterialSymbolsArrowBackIosRounded";

interface SheetModalProps {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  showBackButton?: boolean;
  backButtonOnClick: () => void;
  headerContent?: React.ReactNode;
}

const SheetModal: React.FC<SheetModalProps> = ({ title, isOpen, onClose, children, showBackButton = true, backButtonOnClick, headerContent }) => {
  const [isExpanded, setIsExpanded] = useState(false); // モーダルの拡張状態を管理
  const [startY, setStartY] = useState<number | null>(null); // ドラッグの開始位置を管理

  const handleMouseDown = (event: React.MouseEvent) => {
    setStartY(event.clientY); // マウスの開始位置を記録
  };

  const handleMouseMove = (event: MouseEvent) => {
    if (startY !== null) {
      const distance = startY - event.clientY; // ドラッグの移動距離を計算
      if (distance > 100) {
        // 100px以上移動したら拡張
        setIsExpanded(true);
        document.removeEventListener("mousemove", handleMouseMove); // イベントを解除
      }
    }
  };

  const handleMouseUp = () => {
    setStartY(null);
    document.removeEventListener("mousemove", handleMouseMove);
  };

  const handleMouseDownWrapper = (event: React.MouseEvent) => {
    handleMouseDown(event);
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp, { once: true });
  };

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300 ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className={`fixed bg-white rounded-t-2xl shadow-lg transform transition-transform duration-300
        w-full md:w-[750px]  max-h-screen overflow-y-auto
        ${isOpen ? "translate-y-0 md:translate-x-0" : "translate-y-full md:translate-x-full"}
        ${isExpanded
            ? "h-[90%] sm:h-[90%]"
            : "h-[90%] sm:h-[90%]"
          }
        md:h-[85%] top-20 lg:top-24 md:bottom-auto md:right-4 sm:bottom-0`}
        onMouseDown={handleMouseDownWrapper}
      >
        <div className="z-30 bg-white top-0 sticky">
          <div className="p-4 border-b flex justify-between items-center relative">
            {/* Back Button */}
            {showBackButton && (
              <button
                className="text-gray-500 hover:text-black absolute left-4"
                onClick={backButtonOnClick}
                aria-label="Back"
              >
                <MaterialSymbolsArrowBackIosRounded className="w-6 h-6" />
              </button>
            )}
            {/* Title */}
            <h2 className="text-lg font-bold text-black text-center absolute left-1/2 transform -translate-x-1/2">{title}</h2>
            {/* Close Button */}
            <button
              className="text-gray-500 hover:text-black absolute right-4"
              onClick={onClose}
              aria-label="Close Modal"
            >
              <Close style={{ fontSize: 30, color: 'black' }} className="h-6 w-6" />
            </button>
          </div>
          {headerContent}
        </div>
        <div className="">{children}</div>
      </div>
    </>
  );
};

export default SheetModal;
