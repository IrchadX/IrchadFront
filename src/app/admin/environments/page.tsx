"use client";
import EnvsList from "@/components/admin/environment/envs-list";
import ZonesSwiper from "@/components/admin/environment/zone-types-swiper";
import { ButtonSecondary } from "@/components/shared/secondary-button";
import Title from "@/components/shared/title";
import SearchInput from "@/components/shared/search-input";
import FilterButton from "@/components/shared/filter-button";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface Environment {
  id: string;
  name: string;
  address: string;
  isPublic: boolean;
  userId: string | null;
  createdAt: string;
  city?: string;
  userType?: "admin" | "regular";
}

interface Filters {
  visibility: string[];
}

const Page = () => {
  const router = useRouter();
  const [searchValue, setSearchValue] = useState("");
  const [allEnvironments, setAllEnvironments] = useState<Environment[]>([]);
  const [filteredEnvironments, setFilteredEnvironments] = useState<
    Environment[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);

  const [filters, setFilters] = useState<Filters>({
    visibility: [],
  });

  // Filter sections configuration
  const filterSections = [
    {
      label: "Visibilité",
      key: "visibility" as const,
      options: ["Public", "Privé"],
    },
  ];

  useEffect(() => {
    const fetchEnvironments = async () => {
      setIsLoading(true);
      try {
        const params = new URLSearchParams();
        filters.visibility.forEach((v) => params.append("visibility", v));
        if (searchValue) params.set("search", searchValue);

        const response = await fetch(
          `${
            process.env.NEXT_PUBLIC_API_URL
          }/environments?${params.toString()}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );

        if (!response.ok) {
          if (response.status === 401) {
            router.push("/auth/login");
            return;
          }
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: Environment[] = await response.json();
        setAllEnvironments(data);
        setFilteredEnvironments(data);
      } catch (error: any) {
        console.error("Error fetching environments:", error);
        if (error.message.includes("401")) {
          router.push("/auth/login");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchEnvironments();
  }, [searchValue, filters]);

  // Apply filters and search
  useEffect(() => {
    let results = [...allEnvironments];

    // Apply search filter
    if (searchValue) {
      results = results.filter(
        (env) =>
          env.name.toLowerCase().includes(searchValue.toLowerCase()) ||
          env.address.toLowerCase().includes(searchValue.toLowerCase())
      );
    }

    // Apply visibility filter
    if (filters.visibility.length > 0) {
      results = results.filter((env) => {
        if (filters.visibility.includes("Public")) return env.isPublic;
        if (filters.visibility.includes("Privé")) return !env.isPublic;
        return true;
      });
    }

    setFilteredEnvironments(results);
  }, [searchValue, filters, allEnvironments]);

  const handleApplyFilters = (newFilters: Filters) => {
    setFilters(newFilters);
  };

  return (
    <div className="">
      {/* Search and Filter Section */}
      <div className="flex gap-2">
        <SearchInput
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <FilterButton
          filters={filters}
          setFilters={setFilters}
          onApply={handleApplyFilters}
          filterSections={filterSections}
        />
      </div>

      {/* Environments Section */}
      <div className="flex justify-between items-start mt-4">
        <Title text="Environnements" lineLength="100px" />
        <Link href="/admin/environments/create_environment" passHref>
          <ButtonSecondary
            disabled={false}
            title="Ajouter"
            onClick={() => console.log("Navigating to add environment page")}
          />
        </Link>
      </div>

      {isLoading ? (
        <div className="text-center py-8">Chargement...</div>
      ) : (
        <EnvsList environments={filteredEnvironments} />
      )}

      {/* Zones Section */}
      <div className="flex justify-between items-center mt-8">
        <Title text="Types de Zones" lineLength="60px" />
        <Link href="/admin/environments/create_zone" passHref>
          <ButtonSecondary
            disabled={false}
            title="Ajouter"
            onClick={() => console.log("Navigating to add zone page")}
          />
        </Link>
      </div>
      <ZonesSwiper />
    </div>
  );
};

export default Page;
