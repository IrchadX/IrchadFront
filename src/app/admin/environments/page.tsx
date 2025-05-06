"use client";
import EnvsList from "@/components/admin/environment/envs-list";
import ZonesSwiper from "@/components/admin/environment/zone-types-swiper";
import PoiCategoriesSwiper from "@/components/admin/environment/poi-categories-swiper";
import { ButtonSecondary } from "@/components/shared/secondary-button";
import Title from "@/components/shared/title";
import SearchInput from "@/components/shared/search-input";
import FilterButton from "@/components/shared/filter-button";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AddZoneTypeModal } from "@/components/admin/environment/add-zone-type";
import { AddPoiCategoryModal } from "@/components/admin/environment/add-poi-category";

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
  const [pendingEnvironments, setPendingEnvironments] = useState<Environment[]>(
    []
  );
  const [filteredAllEnvironments, setFilteredAllEnvironments] = useState<
    Environment[]
  >([]);
  const [filteredPendingEnvironments, setFilteredPendingEnvironments] =
    useState<Environment[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [filters, setFilters] = useState<Filters>({
    visibility: [],
  });

  const [isZoneModalOpen, setZoneModalOpen] = useState(false);
  const [isPoiModalOpen, setPoiModalOpen] = useState(false);

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
        // Fetch params for both requests
        const params = new URLSearchParams();
        filters.visibility.forEach((v) => params.append("visibility", v));
        if (searchValue) params.set("search", searchValue);

        // Fetch all environments
        const allResponse = await fetch(
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

        // Fetch pending environments (without delimiters)
        const pendingResponse = await fetch(
          `${
            process.env.NEXT_PUBLIC_API_URL
          }/environments/pending?${params.toString()}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );

        if (!allResponse.ok || !pendingResponse.ok) {
          if (allResponse.status === 401 || pendingResponse.status === 401) {
            router.push("/auth/login");
            return;
          }
          throw new Error(
            `HTTP error! status: ${allResponse.status} or ${pendingResponse.status}`
          );
        }

        const allData: Environment[] = await allResponse.json();
        const pendingData: Environment[] = await pendingResponse.json();

        setAllEnvironments(allData);
        setPendingEnvironments(pendingData);
        setFilteredAllEnvironments(allData);
        setFilteredPendingEnvironments(pendingData);
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
  }, [searchValue, filters, router]);

  // Apply filters and search
  useEffect(() => {
    // Filter all environments
    let allResults = [...allEnvironments];
    // Filter pending environments
    let pendingResults = [...pendingEnvironments];

    // Apply search filter to both
    if (searchValue) {
      const searchLower = searchValue.toLowerCase();
      allResults = allResults.filter(
        (env) =>
          env.name.toLowerCase().includes(searchLower) ||
          env.address.toLowerCase().includes(searchLower)
      );
      pendingResults = pendingResults.filter(
        (env) =>
          env.name.toLowerCase().includes(searchLower) ||
          env.address.toLowerCase().includes(searchLower)
      );
    }

    // Apply visibility filter to both
    if (filters.visibility.length > 0) {
      const filterFn = (env: Environment) => {
        if (
          filters.visibility.includes("Public") &&
          filters.visibility.includes("Privé")
        ) {
          return true;
        }
        if (filters.visibility.includes("Public")) return env.isPublic;
        if (filters.visibility.includes("Privé")) return !env.isPublic;
        return true;
      };

      allResults = allResults.filter(filterFn);
      pendingResults = pendingResults.filter(filterFn);
    }

    setFilteredAllEnvironments(allResults);
    setFilteredPendingEnvironments(pendingResults);
  }, [searchValue, filters, allEnvironments, pendingEnvironments]);

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

      {/* Pending Environments Section */}
      <div className="flex justify-between items-start mt-4">
        <Title text="Environnements en attente" lineLength="150px" />
        <Link href="/admin/environments/create_environment" passHref>
          <ButtonSecondary
            disabled={false}
            title="Ajouter"
            onClick={() => console.log("Navigating to add environment page")}
          />
        </Link>
      </div>

      {isLoading ? (
        <div className="text-center py-4">Chargement...</div>
      ) : (
        <EnvsList
          environments={filteredPendingEnvironments}
          sectionType="pending"
        />
      )}

      {/* All Environments Section */}
      <div className="flex justify-between items-start mt-8">
        <Title text="Tous les environnements" lineLength="150px" />
      </div>

      {isLoading ? (
        <div className="text-center py-4">Chargement...</div>
      ) : (
        <EnvsList environments={filteredAllEnvironments} sectionType="all" />
      )}

      {/* Zones Section */}
      <div className="flex justify-between items-center mt-8">
        <Title text="Types de Zones" lineLength="60px" />
        <>
          <ButtonSecondary
            title="Ajouter"
            onClick={() => setZoneModalOpen(true)}
            disabled={false}
          />
          <AddZoneTypeModal
            isOpen={isZoneModalOpen}
            onClose={() => setZoneModalOpen(false)}
            onSave={(data) => {}}
          />
        </>
      </div>
      <ZonesSwiper />

      {/* POI Categories Section */}
      <div className="flex justify-between items-center mt-8">
        <Title text="Catégories de POI" lineLength="80px" />
        <>
          <ButtonSecondary
            title="Ajouter"
            onClick={() => setPoiModalOpen(true)}
            disabled={false}
          />
          <AddPoiCategoryModal
            isOpen={isPoiModalOpen}
            onClose={() => setPoiModalOpen(false)}
            onSave={(data) => {}}
          />
        </>
      </div>
      <PoiCategoriesSwiper />
    </div>
  );
};

export default Page;
