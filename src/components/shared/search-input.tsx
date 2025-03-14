"use client";
import { Input } from "./input";
import { IoSearch } from "react-icons/io5";

interface SearchInputProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ value, onChange }) => {
  return (
    <Input
      type="text"
      placeholder="Rechercher..."
      value={value}
      onChange={onChange} 
      icon={<IoSearch />}
    />
  );
};

export default SearchInput;
