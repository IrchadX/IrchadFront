"use client";
import { Input } from "./input";
import { IoSearch } from "react-icons/io5";
import { useState } from "react";
const SearchInput = () => {
  const [value, setValue] = useState("");

  return (
    <Input
      type="text"
      placeholder="Rechercher..."
      value={value}
      onChange={(e) => setValue(e.target.value)}
      icon={
        <IoSearch />
      }
    />
  );
};

export default SearchInput;
