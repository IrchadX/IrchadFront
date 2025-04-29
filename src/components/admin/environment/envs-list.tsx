import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EnvironmentCard from "./env-card";

interface Environment {
  id: string;
  name: string;
  address: string;
  imgSrc?: string;
}

interface EnvsListProps {
  environments: Environment[];
}

const EnvsList = ({ environments: initialEnvs }: EnvsListProps) => {
  const [environments, setEnvironments] = useState<Environment[]>(initialEnvs);

  const handleDeleteEnvironment = async (id: string) => {
    try {
      const response = await fetch(`http://localhost:5000/environments/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Échec de la suppression");
      }

      setEnvironments((prev) => prev.filter((env) => env.id !== id));
      toast.success("Environnement supprimé avec succès !");
    } catch (error) {
      console.error("Erreur de suppression:", error);
      toast.error(
        error instanceof Error
          ? `Erreur: ${error.message}`
          : "Une erreur inconnue est survenue"
      );
    }
  };

  if (environments.length === 0) {
    return <div className="text-gray-500">Aucun environnement disponible.</div>;
  }

  return (
    <div className="flex flex-wrap items-center gap-6 pb-6">
      {environments &&
        environments.map((env) => (
          <EnvironmentCard
            onDelete={handleDeleteEnvironment}
            key={env.id}
            id={env.id}
            title={env.name}
            address={env.address}
            imgSrc={env.imgSrc || ""}
          />
        ))}
    </div>
  );
};

export default EnvsList;
