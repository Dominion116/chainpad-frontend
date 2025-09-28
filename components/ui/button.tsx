import * as React from "react"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'secondary' | 'ghost' | 'destructive'
  size?: 'default' | 'sm' | 'lg'
}

export function Button({ 
  className = "", 
  variant = "default", 
  size = "default",
  disabled, 
  children,
  ...props 
}: ButtonProps) {
  const baseClasses = "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-950 disabled:pointer-events-none disabled:opacity-50"
  
  const variants = {
    default: "bg-white text-black hover:bg-gray-200",
    secondary: "bg-gray-800 text-white hover:bg-gray-700 border border-gray-700",
    ghost: "hover:bg-gray-800 hover:text-white",
    destructive: "bg-red-600 text-white hover:bg-red-700"
  }

  const sizes = {
    default: "h-10 px-4 py-2",
    sm: "h-8 px-3 py-1",
    lg: "h-12 px-6 py-3"
  }

  return (
    <button
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  )
}
