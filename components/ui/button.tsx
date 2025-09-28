import * as React from "react"
import { cn } from "../../lib/utils"

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'secondary' | 'ghost' | 'destructive'
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", disabled, ...props }, ref) => {
    const baseClasses = "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-950 disabled:pointer-events-none disabled:opacity-50"
    
    const variants = {
      default: "bg-white text-black hover:bg-gray-200 h-10 px-4 py-2",
      secondary: "bg-gray-800 text-white hover:bg-gray-700 border border-gray-700 h-10 px-4 py-2",
      ghost: "hover:bg-gray-800 hover:text-white h-10 px-4 py-2",
      destructive: "bg-red-600 text-white hover:bg-red-700 h-10 px-4 py-2"
    }

    return (
      <button
        className={cn(baseClasses, variants[variant], className)}
        ref={ref}
        disabled={disabled}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button }
