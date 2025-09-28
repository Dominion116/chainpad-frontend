import * as React from "react"
import { cn } from "@/lib/utils"

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'secondary' | 'ghost' | 'destructive'
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", disabled, ...props }, ref) => {
    const baseClasses = "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
    
    const variants = {
      default: "bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2",
      secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80 h-10 px-4 py-2",
      ghost: "hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2",
      destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90 h-10 px-4 py-2"
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
