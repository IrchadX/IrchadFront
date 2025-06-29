// Page.tsx with enhanced debugging
"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Sale, columns } from "@/components/commercial/sales/columns";
import { DataTable } from "@/components/shared/data-table";
import SearchInput from "@/components/shared/search-input";
import FilterButton, { Filters } from "@/components/shared/filter-button";
import { fetchSalesData } from "@/app/api/sales";
import LoadingSpinner from "@/components/shared/loading";

const filterSections: {
  label: string;
  key: keyof Filters;
  options: string[];
}[] = [
  {
    label: "Type",
    key: "userType",
    options: ["option1", "option2"],
  },
  {
    label: "Ville",
    key: "city",
    options: [
      "Adrar",
      "Chlef",
      "Laghouat",
      "Oum El Bouaghi",
      "Batna",
      "Béjaïa",
      "Biskra",
      "Béchar",
      "Blida",
      "Bouira",
      "Tamanrasset",
      "Tébessa",
      "Tlemcen",
      "Tiaret",
      "Tizi Ouzou",
      "Algiers",
      "Djelfa",
      "Jijel",
      "Sétif",
      "Saïda",
      "Skikda",
      "Sidi Bel Abbès",
      "Annaba",
      "Guelma",
      "Constantine",
      "Médéa",
      "Mostaganem",
      "M'Sila",
      "Mascara",
      "Ouargla",
      "Oran",
      "El Bayadh",
      "Illizi",
      "Bordj Bou Arréridj",
      "Boumerdès",
      "El Tarf",
      "Tindouf",
      "Tissemsilt",
      "El Oued",
      "Khenchela",
      "Souk Ahras",
      "Tipaza",
      "Mila",
      "Aïn Defla",
      "Naâma",
      "Aïn Témouchent",
      "Ghardaïa",
      "Relizane",
      "Timimoun",
      "Bordj Badji Mokhtar",
      "Ouled Djellal",
      "Béni Abbès",
      "In Salah",
      "In Guezzam",
      "Touggourt",
      "Djanet",
      "El M'Ghair",
      "El Menia",
    ],
  },
];

export default function Page() {
  const [data, setData] = useState<Sale[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [debugInfo, setDebugInfo] = useState<any>(null);

  // Initialize filters with empty arrays for each category
  const [filters, setFilters] = useState<Filters>({
    sex: [],
    userType: [],
    city: [],
    ageGroup: [],
    visibility: [],
  });

  // Direct 1:1 mapping to match exactly what backend expects
  const convertFiltersForApi = () => {
    const apiFilters: Record<string, string> = {};

    // Map each filter key directly as expected by your backend
    if (filters.sex.length > 0) apiFilters.sex = filters.sex[0];
    if (filters.city.length > 0) apiFilters.city = filters.city[0];
    if (filters.ageGroup.length > 0) apiFilters.ageGroup = filters.ageGroup[0];
    if (filters.userType.length > 0) apiFilters.userType = filters.userType[0];

    return apiFilters;
  };

  const fetchData = async () => {
    setLoading(true);
    setDebugInfo(null);

    try {
      const apiFilters = convertFiltersForApi();

      // Store debug info
      const debugObj: {
        requestTime: string;
        searchTerm: string;
        requestFilters: Record<string, string>;
        selectedFilters: {
          sex: string[];
          userType: string[];
          city: string[];
          ageGroup: string[];
        };
        responseReceived?: boolean;
        resultCount?: number;
      } = {
        requestTime: new Date().toISOString(),
        searchTerm,
        requestFilters: apiFilters,
        selectedFilters: { ...filters },
      };

      console.log("API Request Debug:", debugObj);

      const result = await fetchSalesData(searchTerm, apiFilters);

      // Update debug info with response
      debugObj.responseReceived = true;
      debugObj.resultCount = result.length;
      setDebugInfo(debugObj);

      setData(result);
    } catch (error) {
      console.error("Error fetching data:", error);

      setDebugInfo({
        error: true,
        errorMessage: error instanceof Error ? error.message : "Unknown error",
        requestFilters: convertFiltersForApi(),
        selectedFilters: { ...filters },
      });
    } finally {
      setLoading(false);
    }
  };

  // Apply filters when user clicks Apply
  const handleApplyFilters = () => {
    fetchData();
  };

  // Fetch initial data on load or when search term changes
  useEffect(() => {
    fetchData();
  }, [searchTerm]);

  return (
    <div className="w-full">
      <div className="flex flex-row justify-between items-center container mx-auto w-full">
        <div className="flex gap-2">
          <SearchInput
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FilterButton
            filters={filters}
            setFilters={setFilters}
            onApply={handleApplyFilters}
            filterSections={filterSections}
          />
        </div>
      </div>

      <div className="container mx-auto py-10">
        {loading ? (
          <LoadingSpinner />
        ) : (
          <DataTable columns={columns} data={data} />
        )}
      </div>
    </div>
  );
}
