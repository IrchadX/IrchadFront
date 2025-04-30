"use client"; 
import { useState, useEffect } from "react";
import {
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function StatsCharts() {
  const [pieData, setPieData] = useState([]);
  const [lineData, setLineData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {

        const pieRes = await fetch("http://localhost:3001/graphics/cercle");
        if (!pieRes.ok) throw new Error("Échec de la récupération des données Pie");
        const pieRaw = await pieRes.json();

        const totalCount = pieRaw.reduce((acc, item) => acc + item.count, 0);
        const formattedPie = pieRaw.map((item) => ({
          name: item.deviceType,
          value: item.count,
          percentage: ((item.count / totalCount) * 100).toFixed(2),
        }));
        setPieData(formattedPie);

        const salesRes = await fetch("http://localhost:3001/graphics/courbe");
        if (!salesRes.ok) throw new Error("Échec de la récupération des données Line");
        const salesData = await salesRes.json();

        const formattedLine = salesData.map((item) => ({
          mois: item.month,
          ventes: item.sales,
        }));
        setLineData(formattedLine);
      } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
      }
    }

    fetchData();
  }, []);

  const colors = [
    "#F7B7C0", 
    "#78C2C3", 
    "#8064E9", 
    "#FAD02E", 
    "#D4A5A5", 
    "#F4A300", 
    "#7A9E9F", 
    "#D9BF77", 
    "#9C7B4F", 
    "#A1C4E8",
  ];
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
      {/* Secteurs */}
      <div className="col-span-1 bg-white shadow-lg p-4 rounded-b-xl">
        <h3 className="text-lg font-semibold text-center mb-2">
          % de Pannes par dispositif
        </h3>
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
                <Cell
                  key={`cell-${index}`}
                  fill={colors[index % colors.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Courbe*/}
      <div className="col-span-1 bg-white shadow-lg p-4 rounded-b-xl">
        <h3 className="text-lg font-semibold text-center mb-2">
          Évolution des ventes
        </h3>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={lineData}>
            <XAxis dataKey="mois" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="ventes"
              stroke="#8884d8"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
