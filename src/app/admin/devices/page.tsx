/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import EnvsList from "@/components/admin/environment/envs-list";
import ZonesSwiper from "@/components/admin/environment/zone-types-swiper";
import { ButtonSecondary } from "@/components/shared/secondary-button";
import Title from "@/components/shared/title";
import SearchInput from "@/components/shared/search-input";
import FilterButton from "@/components/shared/filter-button";
import { useState } from "react";
import { Button } from "@/components/shared/button";

const Page = () => {
  const options = ["Option 1", "Option 2", "Option 3", "Option 4"];
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
 const handleNewDevice = ()=> {
 };
 
  return (
    <div>
      <div className="flex justify-between">
        <div className="flex gap-2">
           <SearchInput />
        <FilterButton
          options={options}
          selectedOptions={selectedOptions}
          onSelect={setSelectedOptions}
          placeholder="Filter"
        />
      </div>
      <div className="flex gap-2">
      <Button className="px-8 font-montserrat ">
        Dispositifs
      </Button>
      <Button className="px-8 font-montserrat" >
        Nouveau
      </Button>
      </div>
        </div>
    </div>
  );
};

export default Page;
