"use client"; // Important pour Next.js 13+ en mode app

import { useState, useEffect } from "react";
import { PieChart, Pie, Cell, LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";

const lineData = [
  { mois: "Jan", ventes: 400 },
  { mois: "Fév", ventes: 300 },
  { mois: "Mar", ventes: 500 },
  { mois: "Avr", ventes: 700 },
];

const barData = [
  { produit: "Produit A", ventes: 1200 },
  { produit: "Produit B", ventes: 900 },
  { produit: "Produit C", ventes: 600 },
];

export default function StatsCharts() {
  const [pieData, setPieData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        console.log('Fetching data from API...');
        const response = await fetch('http://localhost:3001/graphics/cercle');
        if (!response.ok) {
          console.error('Failed to fetch data:', response.statusText);
          return;
        }
        const data = await response.json();
        console.log('Data fetched:', data); // Affiche les données reçues de l'API

        // Calculer la somme totale des pannes
        const totalCount = data.reduce((acc, item) => acc + item.count, 0);

        // Préparer les données pour le graphique en secteur avec pourcentage
        const formattedData = data.map(item => ({
          name: item.deviceType,  // Le nom du type sera affiché
          value: item.count,
          percentage: ((item.count / totalCount) * 100).toFixed(2), // Calcul du pourcentage
        }));

        console.log('Formatted data:', formattedData); // Affiche les données formatées pour le graphique
        setPieData(formattedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, []);

  const colors = ["#F7B7C0", "#78C2C3", "#8064E9"];  // Trois couleurs pour trois types

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
      {/* Graphique en secteurs */}
      <div className="col-span-1 bg-white shadow-lg p-4 rounded-b-xl">
        <h3 className="text-lg font-semibold text-center mb-2"> % de Pannes par dispositif</h3>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={70}
              label={(entry) => `${entry.percentage}%`}
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Graphique en lignes */}
      <div className="col-span-1 bg-white shadow-lg p-4 rounded-b-xl">
        <h3 className="text-lg font-semibold text-center mb-2">Évolution des ventes</h3>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={lineData}>
            <XAxis dataKey="mois" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="ventes" stroke="#8884d8" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>

  
    </div>
  );
}
