import React from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { useRouter } from 'next/navigation';

interface PageHeaderProps {
  title: string;
  showBackButton?: boolean;
  className?: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  showBackButton = true,
  className = '',
}) => {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <div className={`sm:flex items-center gap-4 mb-6 mt-3 hidden ${className}`}>
      {showBackButton && (
        <button
          onClick={handleBack}
          className="p-2 hover:bg-gray-200 rounded-full transition"
          aria-label="戻る"
        >
          <FiArrowLeft className="text-2xl text-gray-700" />
        </button>
      )}
      <h1 className="text-3xl font-bold text-black">{title}</h1>
    </div>
  );
};

export default PageHeader;