"use client";
import EnvsList from "@/components/admin/environment/envs-list";
import ZonesSwiper from "@/components/admin/environment/zone-types-swiper";
import { ButtonSecondary } from "@/components/shared/secondary-button";
import Title from "@/components/shared/title";
import SearchInput from "@/components/shared/search-input";
import FilterButton from "@/components/shared/filter-button";
import { useState } from "react";

const Page = () => {
  const options = ["Option 1", "Option 2", "Option 3", "Option 4"];
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  return (
    <div>
      <div className="flex gap-2">
        <SearchInput />
        <FilterButton
          options={options}
          selectedOptions={selectedOptions}
          onSelect={setSelectedOptions}
          placeholder="Filter"
        />
      </div>
      <div className="flex justify-between items-start">
        <Title text="Environnements" lineLength="100px" />
        <ButtonSecondary
          title="Ajouter"
          onClick={() => {
            console.log("adding env");
          }}
        />
      </div>
      <EnvsList />
      <div className="flex justify-between items-center">
        <Title text="Types de Zones" lineLength="60px" />
        <ButtonSecondary
          title="Ajouter"
          onClick={() => {
            console.log("adding zone");
          }}
        />
      </div>{" "}
      <ZonesSwiper />
    </div>
  );
};

export default Page;
