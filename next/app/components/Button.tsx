import React from 'react';

interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
  variant?: 'primary' | 'secondary' | 'ghost';
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  children,
  className = '',
  variant = 'primary',
  disabled = false
}) => {
  const baseStyles = 'font-semibold rounded-lg transition-all duration-200 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

  const variantStyles = {
    primary: 'bg-green-500 text-white hover:bg-green-600 focus:ring-green-500 shadow-sm hover:shadow-md',
    secondary: 'bg-white text-green-600 border-2 border-green-500 hover:bg-green-50 focus:ring-green-500',
    ghost: 'bg-transparent text-green-600 hover:bg-green-50 focus:ring-green-500',
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
    >
      {children}
    </button>
  );
};


export default Button;
