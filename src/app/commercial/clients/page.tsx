"use client";
import { Client, columns } from "@/components/commercial/clients/columns"
import { DataTable } from "@/components/shared/data-table"
import {clients} from "@/data/clients"
import SearchInput from "@/components/shared/search-input";
import FilterButton from "@/components/shared/filter-button";
import { useState, useEffect } from "react";
import { ButtonSecondary } from "@/components/shared/secondary-button";

async function getData(): Promise<Client[]> {
  return clients
}

export default function Page () {

  const [data, setData] = useState<Client[]>([]);
  const options = ["Option 1", "Option 2", "Option 3", "Option 4"];
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  useEffect(() => {
    async function fetchData() {
      const result = await getData();
      setData(result);
    }
    fetchData();
  }, []);

  return (
    <div>
      <div className="flex flex-row justify-between items-center container mx-auto">
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
          <ButtonSecondary
            title="Ajouter"
            onClick={() => {
              console.log("adding client");
            }}
          />
        </div>
      </div>
      <div className="container mx-auto py-10">
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  );
};
