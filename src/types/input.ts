interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    icon?: React.ElementType;
    error?: string; 
}

export default InputProps;