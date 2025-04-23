import { API_URL } from "@/config/api";

 export async function deleteEnvironment (id: string) {
    try {
      const response = await fetch(`${API_URL}/environments/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", 
      });

      if (!response.ok) {
        throw new Error("Échec de la suppression");
      }
    } catch (error) {
      console.error("Erreur de suppression:", error);
    }
  };