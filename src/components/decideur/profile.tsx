"use client";

import { useEffect, useState } from "react";
import { User, Bell, Shield, Globe, HelpCircle } from "lucide-react";
import axios from "axios";

export default function Parametres() {
  const [activeTab, setActiveTab] = useState("compte");
  const [user, setUser] = useState({
    id: "", // Ajoute l'id ici
    firstName: "",
    familyName: "",
    email: "",
    phoneNumber: "",
    role: "",
  });

  const [formData, setFormData] = useState({
    firstName: "",
    familyName: "",
    email: "",
    phoneNumber: "",
  });

  const [isPopupVisible, setPopupVisible] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [popupType, setPopupType] = useState("success"); // success | error

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setFormData({
        firstName: parsedUser.firstName || "",
        familyName: parsedUser.familyName || "",
        email: parsedUser.email || "",
        phoneNumber: parsedUser.phoneNumber || "",
      });
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      const response = await axios.put(
        `https://apigateway-production-b99d.up.railway.app/api/v1/web/profile/update/${user.id}`,
        formData
      );

      // Mise à jour du localStorage
      const updatedUser = { ...user, ...formData };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setUser(updatedUser);

      // Afficher la popup de succès
      setPopupMessage("Profil mis à jour avec succès !");
      setPopupType("success");
      setPopupVisible(true);

      // Masquer la popup après 3 secondes
      setTimeout(() => setPopupVisible(false), 3000);
    } catch (error) {
      console.error(error);
      // Afficher la popup d'erreur
      setPopupMessage("Erreur lors de la mise à jour du profil");
      setPopupType("error");
      setPopupVisible(true);

      // Masquer la popup après 3 secondes
      setTimeout(() => setPopupVisible(false), 3000);
    }
  };

  return (
    <div className="bg-white p-2 rounded-lg shadow">
      {/* Profil utilisateur */}
      <div className="flex items-center pb-6 border-b border-gray-200">
        <div>
          <h3 className="text-xl font-semibold">
            {user.firstName} {user.familyName}
          </h3>
          <p className="text-gray-500">{user.email}</p>
        </div>
      </div>

      {/* Formulaire */}
      <div className="flex mt-6">
        <div className="w-3/4 bg-white rounded-lg">
          {activeTab === "compte" && (
            <div>
              <h3 className="text-lg font-semibold mb-4">
                Paramètres du compte
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nom
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Prénom
                  </label>
                  <input
                    type="text"
                    name="familyName"
                    value={formData.familyName}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Téléphone
                  </label>
                  <input
                    type="text"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>

                <button
                  onClick={handleSave}
                  className="mt-4 bg-teal-600 text-white px-4 py-2 rounded-md hover:bg-teal-700">
                  Enregistrer les modifications
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Popup de notification petite et discrète */}
      {isPopupVisible && (
        <div
          className={`fixed bottom-4 left-1/2 transform -translate-x-1/2 p-3 rounded-lg shadow-md w-80 text-center ${
            popupType === "success" ? "bg-green-500" : "bg-red-500"
          } text-white`}>
          <div>{popupMessage}</div>
        </div>
      )}
    </div>
  );
}
