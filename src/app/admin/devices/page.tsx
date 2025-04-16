/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import Link from "next/link";
import Title from "@/components/shared/title";
import SearchInput from "@/components/shared/search-input";
import { useState } from "react";
import { Button } from "@/components/shared/button";
import { DataTable } from "@/components/shared/data-table";
import { columns } from "@/components/admin/devices/columns";
import {devices} from "@/data/dispositifs";
const Page = () => {
  const options = ["Option 1", "Option 2", "Option 3", "Option 4"];
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
 const handleNewDevice = ()=> {
 };

  return (
    <div>
      <div className="flex justify-between">
        <div className="flex gap-2">
           <SearchInput value={""} onChange={function (event: React.ChangeEvent<HTMLInputElement>): void {
            throw new Error("Function not implemented.");
          } } />
        {/* <FilterButton
          options={options}
          selectedOptions={selectedOptions}
          onSelect={setSelectedOptions}
          placeholder="Filter"
        /> */}
      </div>
      <div className="flex gap-2">
      <Button className="px-8 font-montserrat ">
        Dispositifs
      </Button>
      <Button className="px-8 font-montserrat" >
        <Link href="/admin/devices/add-device">Nouveau</Link>
      
      </Button>
      </div>
        </div>
          <div className="container mx-auto py-10">
                <DataTable columns={columns} data={devices} />
              </div>
    </div>
  );
};

export default Page;
