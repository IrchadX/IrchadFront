"use client"
// Composant simplifié des paramètres
import { useState } from 'react';
import { User, Bell, Shield, Globe, HelpCircle } from 'lucide-react';

export default function Parametres() {
  const [activeTab, setActiveTab] = useState('compte');
  
  // Données utilisateur fictives
  const user = {
    name: 'BENKHELIFA Bouchra',
    email: 'lb_benkhelifa@esi.dz',
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      {/* Profil utilisateur */}
      <div className="flex items-center pb-6 border-b border-gray-200">

        <div>
          <h3 className="text-xl font-semibold">{user.name}</h3>
        </div>
        <button className="ml-auto bg-teal-100 text-teal-700 px-4 py-2 rounded-md hover:bg-teal-200">
          Modifier le profil
        </button>
      </div>

      {/* Contenu des paramètres */}
      <div className="flex mt-6">
       

        {/* Formulaire de paramètres de compte */}
        <div className="w-3/4 bg-white rounded-lg">
          {activeTab === 'compte' && (
            <div>
              <h3 className="text-lg font-semibold mb-4">Paramètres du compte</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nom d'utilisateur</label>
                  <input 
                    type="text" 
                    defaultValue={user.name}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input 
                    type="email" 
                    defaultValue={user.email}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
              
                <button className="mt-4 bg-teal-600 text-white px-4 py-2 rounded-md hover:bg-teal-700">
                  Enregistrer les modifications
                </button>
              </div>
            </div>
          )}
          
        </div>
      </div>
    </div>
  );
}