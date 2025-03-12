"use client";
import * as React from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface FilterButtonProps {
  options: string[];
  selectedOptions: string[];
  onSelect: (selectedOptions: string[]) => void;
  placeholder?: string;
  className?: string;
}

const FilterButton = ({
  options,
  selectedOptions,
  onSelect,
  placeholder = "Filter...",
  className,
}: FilterButtonProps) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option: string) => {
    const isSelected = selectedOptions.includes(option);
    const updatedOptions = isSelected
      ? selectedOptions.filter((item) => item !== option)
      : [...selectedOptions, option];
    onSelect(updatedOptions);
  };

  return (
    <div className={cn("relative", className)}>
      {/* Filter Button */}
      <button
        type="button"
        onClick={toggleDropdown}
        className={cn(
          "flex gap-2 h-full text-neutral-600 items-center w-full bg-main-5 border-[1px] border-black-5 rounded-[6px] px-4 py-1 text-base shadow-sm transition-colors focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          selectedOptions.length > 0 && "bg-main-10"
        )}>
        <Image
          src="/assets/shared/filter.png"
          width={15}
          height={15}
          alt="filter icon"
        />
        {selectedOptions.length > 0
          ? `${selectedOptions.length} selected`
          : placeholder}
      </button>

      {/* Dropdown with Options */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="md:text-sm absolute z-10 mt-2 w-full bg-white border-[1px] border-black-5 rounded-[6px] shadow-lg">
            {options.map((option, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.05 }}
                className={cn(
                  "p-2 cursor-pointer hover:bg-gray-100",
                  selectedOptions.includes(option) && "bg-black-5"
                )}
                onClick={() => handleOptionClick(option)}>
                {option}
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FilterButton;
