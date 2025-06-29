"use client";
import * as React from "react";
import { cn } from "@/lib/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, icon, ...props }, ref) => {
    return (
      <div className="relative">
        <input
          type={type}
          className={cn(
            "flex h-9 w-full placeholder-gray-600 bg-main-5 dark:bg-gray-700 border-[1px] border-black-5 dark:border-gray-600 rounded-[6px] px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus:ring-2 focus:ring-main dark:focus:ring-main-400 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm dark:text-white dark:placeholder-gray-400",
            icon && "pl-10",
            className
          )}
          ref={ref}
          {...props}
        />
        {icon && (
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-gray-500 dark:text-gray-400">
            {icon}
          </div>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";
export { Input };
