'use client';

import { Loader2 } from 'lucide-react';
import ButtonProps from '@/types/button';

const Button = ({
    children,
    variant = 'primary',
    size = 'md',
    isLoading = false,
    className = '',
    disabled,
    ...props
}: ButtonProps) => {

    const baseStyle = "inline-flex items-center justify-center font-semibold transition-all duration-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98] cursor-pointer";

    const variants = {
        primary: "bg-teal-600 text-white hover:bg-teal-700 hover:shadow-lg hover:shadow-teal-600/20 focus:ring-teal-500 border border-transparent",
        secondary: "bg-white text-slate-700 hover:bg-slate-50 hover:text-teal-600 border border-slate-200 shadow-sm focus:ring-slate-200",
        outline: "bg-transparent text-slate-600 hover:text-teal-600 border border-slate-200 hover:border-teal-200 hover:bg-teal-50/50 focus:ring-teal-500",
        ghost: "bg-transparent text-slate-600 hover:text-teal-600 hover:bg-slate-100 border border-transparent"
    };

    const sizes = {
        sm: "px-4 py-2 text-sm",
        md: "px-6 py-3 text-sm",
        lg: "px-8 py-4 text-base",
    };

    return (
        <button
            className={`
        ${baseStyle} 
        ${variants[variant]} 
        ${sizes[size]} 
        ${className}
      `}
            disabled={disabled || isLoading}
            {...props}
        >
            {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
            {children}
        </button>
    );
};

export default Button;