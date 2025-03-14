import { useState } from "react";
import { FaEllipsisV, FaEdit, FaTrashAlt } from "react-icons/fa";
import Link from "next/link";

interface ActionMenuProps {
  userId: string;
}

export function ActionMenu({ userId }: ActionMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  const handleDelete = () => {
    setShowConfirmDialog(true);
  };

  const confirmDelete = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${userId}`, {
        method: "DELETE",
      });
  
      if (!response.ok) {
        throw new Error("Failed to delete user");
      }
      setShowConfirmDialog(false);
    } catch (error) {
      console.error("Error deleting user:", error);
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
          <Link href={`/admin/users/${userId}`} legacyBehavior>
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
        <div className="fixed inset-0 flex items-center justify-center z-20 bg-black bg-opacity-10">
          <div className="bg-white p-6 rounded-md shadow-lg">
            <p className="text-gray-800">Êtes-vous sûr de vouloir supprimer cet utilisateur ?</p>
            <div className="mt-4 flex justify-end space-x-2">
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Confirmer
              </button>
              <button
                onClick={cancelDelete}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
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