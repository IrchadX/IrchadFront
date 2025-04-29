"use client";
import * as React from "react";
import { IoFilter } from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";

interface FilterSection {
  label: string;
  key: keyof Filters;
  options: string[];
}

export interface Filters {
  visibility: string[];
  sex: string[];
  userType: string[];
  city: string[];
  ageGroup: string[];
}

interface FilterButtonProps {
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
  onApply: (newFilters: Filters) => void;
  filterSections: FilterSection[];
}

const FilterButton = ({
  filters = {
    visibility: [],
    sex: [],
    userType: [],
    city: [],
    ageGroup: [],
  },
  setFilters,
  onApply,
  filterSections,
}: FilterButtonProps) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleOptionClick = (sectionKey: keyof Filters, option: string) => {
    setFilters((prev) => ({
      ...prev,
      [sectionKey]: prev[sectionKey].includes(option)
        ? prev[sectionKey].filter((item) => item !== option)
        : [...prev[sectionKey], option],
    }));
  };

  // Count total active filters
  const activeFilterCount = Object.values(filters).reduce(
    (count, filterValues) => count + filterValues.length,
    0
  );

  const clearFilters = () => {
    setFilters({
      visibility: [],
      sex: [],
      userType: [],
      city: [],
      ageGroup: [],
    });
  };

  return (
    <div className="relative">
      {/* Filter Button */}
      <button
        type="button"
        onClick={toggleDropdown}
        className={`flex gap-2 h-full items-center bg-main-5 border border-black-5 rounded px-4 py-1 text-base shadow-sm transition focus:outline-none ${
          activeFilterCount > 0 ? "bg-main-10" : ""
        }`}>
        <IoFilter />
        {activeFilterCount > 0 ? `Filtres (${activeFilterCount})` : "Filtrer"}
      </button>

      {/* Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute z-10 mt-2 w-[250px] bg-white border border-black-5 rounded shadow-lg">
            {filterSections.map(({ label, key, options }) => (
              <div
                key={key}
                className="p-2 border-b border-black-5 last:border-b-0">
                <h3 className="font-semibold text-sm mb-1">{label}</h3>
                <div className="max-h-40 overflow-y-auto">
                  {options.map((option) => (
                    <div
                      key={option}
                      className={`cursor-pointer p-1 rounded text-sm hover:bg-gray-100 ${
                        filters[key].includes(option) ? "bg-black-5" : ""
                      }`}
                      onClick={() => handleOptionClick(key, option)}>
                      <div className="flex items-center">
                        <div
                          className={`w-4 h-4 border border-gray-400 rounded-sm mr-2 flex items-center justify-center ${
                            filters[key].includes(option)
                              ? "bg-main border-blue-500"
                              : ""
                          }`}>
                          {filters[key].includes(option) && (
                            <svg
                              width="10"
                              height="10"
                              viewBox="0 0 10 10"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg">
                              <path
                                d="M8.5 2.5L3.5 7.5L1.5 5.5"
                                stroke="white"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          )}
                        </div>
                        {option}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            <div className="p-2 flex gap-2">
              <button
                className="flex-1 bg-main/10 text-gray-800 rounded px-3 py-1 text-sm hover:bg-gray-300"
                onClick={clearFilters}>
                Clear
              </button>
              <button
                className="flex-1 bg-main text-white rounded px-3 py-1 text-sm hover:bg-blue-600"
                onClick={() => {
                  setIsOpen(false);
                  onApply(filters);
                }}>
                Apply
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FilterButton;
