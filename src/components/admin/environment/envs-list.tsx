import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EnvironmentCard from "./env-card";
import { deleteEnvironment } from "@/app/api/environments";

interface Environment {
  id: string;
  name: string;
  address: string;
  imgSrc?: string;
}

interface EnvsListProps {
  environments: Environment[];
  sectionType?: "pending" | "all";
}

const EnvsList = ({
  environments: initialEnvs,
  sectionType = "all",
}: EnvsListProps) => {
  const [environments, setEnvironments] = useState<Environment[]>(initialEnvs);

  // Update environments when props change
  useEffect(() => {
    setEnvironments(initialEnvs);
  }, [initialEnvs]);

  const handleDeleteEnvironment = async (id: string) => {
    try {
      await deleteEnvironment(id);
      setEnvironments((prev) => prev.filter((env) => env.id !== id));
    } catch (error) {
      console.error("Erreur de suppression:", error);
      throw error; // Let the EnvironmentCard component handle the error
    }
  };

  if (environments.length === 0) {
    return (
      <div className="text-gray-500 my-4">
        {sectionType === "pending"
          ? "Aucun environnement en attente."
          : "Aucun environnement disponible."}
      </div>
    );
  }

  return (
    <div className="flex flex-wrap items-center gap-6 pb-6">
      {environments &&
        environments.map((env) => (
          <EnvironmentCard
            key={env.id}
            id={env.id}
            title={env.name}
            address={env.address}
            imgSrc={env.imgSrc || "/assets/admin/environments/env-map.png"}
            onDelete={handleDeleteEnvironment}
            isPending={sectionType === "pending"}
          />
        ))}
    </div>
  );
};

export default EnvsList;
