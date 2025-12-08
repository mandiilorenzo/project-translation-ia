import React from 'react'
import InputProps from '@/types/input'

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ label, icon: Icon, error, className = '', ...props }, ref) => {
        return (
            <div className={`w-full ${className}`}>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                    {label}
                </label>
                <div className="relative">
                    {Icon && (
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Icon
                                className={`h-5 w-5 transition-colors ${error ? 'text-red-400' : 'text-slate-400'
                                    }`}
                            />
                        </div>
                    )}
                    <input
                        ref={ref}
                        className={`
                            block w-full rounded-lg border-0 py-3 text-slate-900 shadow-sm ring-1 ring-inset
                            placeholder:text-slate-400 
                            focus:ring-2 focus:ring-inset 
                            sm:text-sm sm:leading-6 transition-all duration-200
                            ${Icon ? 'pl-10' : 'pl-4'}
                            ${error
                                ? 'ring-red-300 focus:ring-red-500 bg-red-50/50'
                                : 'ring-slate-200 focus:ring-teal-600 hover:ring-slate-300'
                            }
                        `}
                        {...props}
                    />
                </div>
                {error && (
                    <p className="mt-1.5 text-xs text-red-500 font-medium animate-pulse">
                        {error}
                    </p>
                )}
            </div>
        )
    }
)
Input.displayName = 'Input'

export default Input;