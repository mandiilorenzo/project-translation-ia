import React from 'react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    icon?: React.ElementType;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ label, icon: Icon, className, ...props }, ref) => {
        return (
            <div className={className}>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                    {label}
                </label>
                <div className="relative">
                    {Icon && (
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Icon className="h-5 w-5 text-slate-400" />
                        </div>
                    )}
                    <input
                        ref={ref}
                        className={`
                            block w-full rounded-xl border-0 py-3.5 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-200
                            placeholder:text-slate-400 
                            focus:ring-2 focus:ring-inset focus:ring-[var(--color-brand-500)] 
                            sm:text-sm sm:leading-6 transition-shadow
                            ${Icon ? 'pl-10' : 'pl-4'}
                        `}
                        {...props}
                    />
                </div>
            </div>
        )
    }
)
Input.displayName = 'Input'

export default Input