import { useState } from "react";
import { FaEllipsisV, FaEdit, FaTrashAlt } from "react-icons/fa";
import Link from "next/link";

interface ActionMenuProps {
  entityId: string; // ID of the entity (e.g., userId, saleId)
  basePath: string; // Base path for the edit link (e.g., "/users", "/sales")
  apiEndpoint: string; // Base API endpoint for the entity (e.g., "/users", "/sales")
  onDeleteSuccess?: () => void; // Optional callback after successful deletion
}

export function ActionMenu({
  entityId,
  basePath,
  apiEndpoint,
  onDeleteSuccess,
}: ActionMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  const handleDelete = () => {
    setShowConfirmDialog(true);
  };

  const confirmDelete = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${apiEndpoint}/${entityId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete entity");
      }

      alert("Entity deleted successfully!");
      if (onDeleteSuccess) {
        onDeleteSuccess(); // Call the success callback if provided
      }
    } catch (error) {
      console.error("Error deleting entity:", error);
      alert("Error deleting entity.");
    } finally {
      setShowConfirmDialog(false);
    }
  };

  const cancelDelete = () => {
    setShowConfirmDialog(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-full hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
      >
        <FaEllipsisV className="text-gray-600" />
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10">
          <Link href={`${basePath}/${entityId}`} legacyBehavior>
            <a className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
              <FaEdit className="mr-2" />
              Modifier
            </a>
          </Link>
          <button
            onClick={handleDelete}
            className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            <FaTrashAlt color="red" className="mr-2" />
            Supprimer
          </button>
        </div>
      )}
      {showConfirmDialog && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-sm">
            <p className="text-gray-900 text-lg font-medium text-center">
              Êtes-vous sûr de vouloir supprimer cet élément ?
            </p>
            <div className="mt-6 flex justify-center space-x-4">
              <button
                onClick={confirmDelete}
                className="px-5 py-2 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700 transition"
              >
                Confirmer
              </button>
              <button
                onClick={cancelDelete}
                className="px-5 py-2 bg-gray-300 text-gray-800 font-semibold rounded-md hover:bg-gray-400 transition"
              >
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}