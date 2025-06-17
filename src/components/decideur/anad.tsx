import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { AiOutlineFileExcel } from "react-icons/ai"; // ✅ Import manquant

export default function Courbe() {
  const [salesData, setSalesData] = useState([]);
  const [predictionData, setPredictionData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // ✅ Défini

  useEffect(() => {
    const fetchSales = async () => {
      try {
        const res = await fetch(
          "https://apigateway-production-b99d.up.railway.app/api/v1/web/analysis/sales"
        );
        if (!res.ok) throw new Error(`Erreur HTTP: ${res.status}`);
        const data = await res.json();
        setSalesData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchSales();
  }, []);

  useEffect(() => {
    const fetchPredictions = async () => {
      try {
        const res = await fetch(
          "https://apigateway-production-b99d.up.railway.app/api/v1/web/analysis/predict"
        );
        if (!res.ok) throw new Error(`Erreur HTTP: ${res.status}`);
        const data = await res.json();
        setPredictionData(data);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchPredictions();
  }, []);

  const salesFormatted = salesData.map((item) => ({
    monthYear: `${item.month} ${item.year}`,
    realSales: item.sales,
    predictedSales: null,
    ...item,
  }));

  const predictionFormatted = predictionData.map((item) => ({
    monthYear: item.mois,
    realSales: null,
    predictedSales: item.ventes_prevues,
  }));

  const combinedData = [...salesFormatted, ...predictionFormatted];

  const handleDownloadCSV = () => {
    const link = document.createElement("a");
    link.href =
      "https://apigateway-production-b99d.up.railway.app/api/v1/web/analysis/export-monthly-stats";
    link.setAttribute("download", "stats_mensuelles.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const maxItem =
    !isLoading && !error
      ? salesData.reduce((max, item) => (item.sales > max.sales ? item : max), {
          sales: 0,
        })
      : null;

  const minItem =
    !isLoading && !error
      ? salesData
          .filter((item) => item.sales > 0)
          .reduce((min, item) => (item.sales < min.sales ? item : min), {
            sales: Number.MAX_SAFE_INTEGER,
          })
      : null;

  const totalSales = salesData.reduce((sum, item) => sum + item.sales, 0);
  const averageSales =
    salesData.length > 0 ? (totalSales / salesData.length).toFixed(2) : 0;

  const salesByYear = salesData.reduce((acc, item) => {
    if (!acc[item.year]) acc[item.year] = 0;
    acc[item.year] += item.sales;
    return acc;
  }, {});

  const years = Object.keys(salesByYear).map(Number).sort();
  let evolution = "N/A";
  if (years.length >= 2 && salesByYear[years[0]] !== 0) {
    const year1 = years[0];
    const year2 = years[1];
    evolution = (
      ((salesByYear[year2] - salesByYear[year1]) / salesByYear[year1]) *
      100
    ).toFixed(2);
  }

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-2 border border-gray-200 shadow-md rounded">
          <p className="font-bold">{`${data.monthYear}`}</p>
          {data.realSales && (
            <p className="text-blue-600">Ventes: {data.realSales}</p>
          )}
          {data.predictedSales && (
            <p className="text-red-600">Prévision: {data.predictedSales}</p>
          )}
        </div>
      );
    }
    return null;
  };

  if (isLoading)
    return (
      <div className="w-full bg-white p-6 rounded-lg shadow text-center">
        Chargement des données...
      </div>
    );

  if (error)
    return (
      <div className="w-full bg-white p-6 rounded-lg shadow text-center text-red-600">
        Erreur: {error}
      </div>
    );

  return (
    <div className="w-full bg-gray-50 p-6 rounded-lg shadow">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800">
          Évolution des ventes
        </h2>
        <button
          onClick={handleDownloadCSV}
          className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded text-sm transition duration-200">
          <AiOutlineFileExcel className="text-xl" />
          Télécharger CSV
        </button>
      </div>

      <div className="mb-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-700">
        <div className="bg-gray-100 p-3 rounded">
          <p className="font-semibold text-gray-600">
            Chiffre d'affaires total
          </p>
          <p className="text-blue-600 font-bold">{totalSales} unités</p>
        </div>
        <div className="bg-gray-100 p-3 rounded">
          <p className="font-semibold text-gray-600">Vente max</p>
          <p className="text-green-600 font-bold">
            {maxItem?.sales} ({maxItem?.month} {maxItem?.year})
          </p>
        </div>
        <div className="bg-gray-100 p-3 rounded">
          <p className="font-semibold text-gray-600">Vente min</p>
          <p className="text-red-600 font-bold">
            {minItem?.sales} ({minItem?.month} {minItem?.year})
          </p>
        </div>
        <div className="bg-gray-100 p-3 rounded">
          <p className="font-semibold text-gray-600">Évolution</p>
          <p className="font-bold">{evolution}%</p>
        </div>
      </div>

      <div className="w-full h-[300px] p-4">
        <h2 className="text-xl font-bold mb-4 text-center text-gray-700">
          Évolution des ventes et prévisions
        </h2>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={combinedData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="monthYear"
              type="category"
              tick={{ fontSize: 12 }}
            />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip content={<CustomTooltip />} />{" "}
            {/* ✅ Utilisation du tooltip custom */}
            <Legend />
            <Line
              type="monotone"
              dataKey="realSales"
              stroke="#8884d8"
              name="Ventes réelles"
              strokeWidth={2}
              dot={true}
            />
            <Line
              type="monotone"
              dataKey="predictedSales"
              stroke="#ff0000"
              name="Prévisions"
              strokeDasharray="4 4"
              strokeWidth={2}
              dot={{ stroke: "#ff0000", strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
