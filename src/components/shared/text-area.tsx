"use client";
import * as React from "react";
import { cn } from "@/lib/utils";

interface InputProps extends React.ComponentProps<"textarea"> {
  icon?: React.ReactNode;
}

const TextArea = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, icon, ...props }, ref) => {
    return (
      <div className="relative ">
        <textarea
          className={cn(
            "flex h-16 w-full bg-main-5 border-[1px] border-black-5  rounded-[6px] px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none  disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
            icon && "pl-10",
            className
          )}
          ref={ref}
          {...props}
        />
        {icon && (
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            {icon}
          </div>
        )}
      </div>
    );
  }
);

TextArea.displayName = "Input";

export { TextArea };
