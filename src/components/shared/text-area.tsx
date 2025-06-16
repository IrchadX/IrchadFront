"use client";
import * as React from "react";
import { cn } from "@/lib/utils";

interface TextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  icon?: React.ReactNode;
}

const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ className, icon, ...props }, ref) => {
    return (
      <div className="relative">
        <textarea
          className={cn(
            "flex min-h-[64px] w-full bg-main-5 dark:bg-gray-700 border-[1px] border-black-5 dark:border-gray-600 rounded-[6px] px-3 py-2 text-base shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus:ring-2 focus:ring-main dark:focus:ring-main-400 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm dark:text-white dark:placeholder-gray-400",
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
TextArea.displayName = "TextArea";
export { TextArea };
