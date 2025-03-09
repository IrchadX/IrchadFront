"use client";
import { Input } from "./input";
import Image from "next/image";
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
        <Image
          src="/assets/shared/search.png"
          width={15}
          height={15}
          alt="search icon"
        />
      }
    />
  );
};

export default SearchInput;
