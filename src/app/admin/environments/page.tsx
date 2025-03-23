"use client";
import EnvsList from "@/components/admin/environment/envs-list";
import ZonesSwiper from "@/components/admin/environment/zone-types-swiper";
import { ButtonSecondary } from "@/components/shared/secondary-button";
import Title from "@/components/shared/title";
import SearchInput from "@/components/shared/search-input";
import FilterButton from "@/components/shared/filter-button";
import { useState } from "react";
import Link from "next/link";

const Page = () => {
  const options = ["Option 1", "Option 2", "Option 3", "Option 4"];
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  // Define filters state
  const [filters, setFilters] = useState({
    sex: [],
    userType: [],
    city: [],
    ageGroup: [],
  });

  // Define filter sections
  const filterSections = [
    {
      label: "Sex",
      key: "sex",
      options: ["Male", "Female"],
    },
    {
      label: "User Type",
      key: "userType",
      options: ["Admin", "User"],
    },
    {
      label: "City",
      key: "city",
      options: ["New York", "Los Angeles"],
    },
    {
      label: "Age Group",
      key: "ageGroup",
      options: ["18-25", "26-35"],
    },
  ];

  // Handle apply
  const handleApply = () => {
    console.log("Filters applied:", filters);
  };

  return (
    <div className="">
      <div className="flex gap-2">
        <SearchInput />
        <FilterButton
          filters={filters}
          setFilters={setFilters}
          onApply={handleApply}
          filterSections={filterSections}
        />
      </div>
      <div className="flex justify-between items-start mt-4">
        <Title text="Environnements" lineLength="100px" />
        <Link href="/admin/environments/create_environment" passHref>
          <ButtonSecondary
            title="Ajouter"
            onClick={() => {
              console.log("Navigating to add environment page");
            }}
          />
        </Link>
      </div>
      <EnvsList />
      <div className="flex justify-between items-center">
        <Title text="Types de Zones" lineLength="60px" />
        <Link href="/admin/environments/create_environment" passHref>
          <ButtonSecondary
            title="Ajouter"
            onClick={() => {
              console.log("Navigating to add environment page");
            }}
          />
        </Link>
      </div>{" "}
      <ZonesSwiper />
    </div>
  );
};

export default Page;
