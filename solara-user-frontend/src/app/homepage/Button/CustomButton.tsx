import { ButtonHTMLAttributes, FC } from 'react';
import { cn } from '@/utils/cn';

interface CustomButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
}

const CustomButton: FC<CustomButtonProps> = ({ 
  className,
  children = 'Học ngay',
  ...props 
}) => {
  return (
    <button
      className={cn(
        "relative w-40 h-14 bg-yellow-300 shadow-lg rounded-lg border border-white",
        "hover:bg-yellow-400 transition-colors duration-200",
        "focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        className
      )}
      {...props}
    >
      <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[15px] font-bold text-green-900 font-sans">
        {children}
      </span>
    </button>
  );
};

export default CustomButton;