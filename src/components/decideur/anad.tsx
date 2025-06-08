import { useState, useEffect } from 'react';
import { AiOutlineFileExcel } from 'react-icons/ai'; 
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts';

export default function SalesChart() {
  const [salesData, setSalesData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('http://localhost:3001/analysis/sales');
        if (!response.ok) throw new Error(`Erreur HTTP: ${response.status}`);
        const data = await response.json();
        setSalesData(data);
        setIsLoading(false);
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleDownloadCSV = () => {
    const link = document.createElement('a');
    link.href = 'http://localhost:3001/analysis/export-monthly-stats';
    link.setAttribute('download', 'stats_mensuelles.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const processedData = salesData.map((item, index) => ({
    ...item,
    monthYear: `${item.month}-${item.year}`,
    index: index,
  }));

  const maxItem = !isLoading && !error
    ? salesData.reduce((max, item) => item.sales > max.sales ? item : max, { sales: 0 })
    : null;

  const minItem = !isLoading && !error
    ? salesData.filter(item => item.sales > 0).reduce((min, item) => item.sales < min.sales ? item : min, { sales: Number.MAX_SAFE_INTEGER })
    : null;

  const totalSales = salesData.reduce((sum, item) => sum + item.sales, 0);
  const averageSales = salesData.length > 0 ? (totalSales / salesData.length).toFixed(2) : 0;

  const firstMonth = salesData[0]?.sales || 0;
  const lastMonth = salesData[salesData.length - 1]?.sales || 0;

const salesByYear = salesData.reduce((acc, item) => {
  if (!acc[item.year]) {
    acc[item.year] = 0;
  }
  acc[item.year] += item.sales;
  return acc;
}, {});
const years = Object.keys(salesByYear).map(Number).sort(); // ex: [2024, 2025]

let evolution = "N/A";
if (years.length >= 2 && salesByYear[years[0]] !== 0) {
  const year1 = years[0];
  const year2 = years[1];
  evolution = (((salesByYear[year2] - salesByYear[year1]) / salesByYear[year1]) * 100).toFixed(2);
}

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-2 border border-gray-200 shadow-md rounded">
          <p className="font-bold">{`${data.month} ${data.year}`}</p>
          <p className="text-blue-600">{`Ventes: ${data.sales}`}</p>
        </div>
      );
    }
    return null;
  };

  if (isLoading) return <div className="w-full bg-white p-6 rounded-lg shadow text-center">Chargement des données...</div>;
  if (error) return <div className="w-full bg-white p-6 rounded-lg shadow text-center text-red-600">Erreur: {error}</div>;

  return (
    <div className="w-full bg-gray-50 p-6 rounded-lg shadow">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800">Évolution des ventes</h2>
<button
  onClick={handleDownloadCSV}
  className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded text-sm transition duration-200"
>
  <AiOutlineFileExcel className="text-xl" />
  Télécharger CSV
</button>

      </div>

      {/* Section analyse */}
      <div className="mb-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-700">
        <div className="bg-gray-100 p-3 rounded">
          <p className="font-semibold text-gray-600">Chiffre d'affaires total</p>
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

      {/* Graphique */}
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={processedData} margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.3} />
            <XAxis 
              dataKey="index"
              type="number"
              domain={[0, processedData.length - 1]}
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 10, fill: '#666' }}
              tickFormatter={(value) => processedData[value]?.month || ''}
              ticks={[0, 3, 6, 9, 12, 15, 18, 21]}
              label={{ 
                value: '2024-2025', 
                position: 'bottom', 
                offset: 0,
                fontSize: 12,
                fill: '#333'
              }}
            />
            <YAxis 
              domain={[0, 'dataMax + 1']}
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#666' }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line 
              type="monotone" 
              dataKey="sales" 
              stroke="#4299e1" 
              strokeWidth={2}
              dot={{ r: 3, fill: '#4299e1', strokeWidth: 0 }}
              activeDot={{ r: 5, stroke: '#4299e1', strokeWidth: 2, fill: 'white' }}
            />
            {maxItem && (
              <ReferenceLine 
                x={processedData.findIndex(item =>
                  item.month === maxItem.month && item.year === maxItem.year
                )}
                stroke="#10B981" 
                strokeDasharray="3 3"
                label={{
                  position: 'top',
                  value: `TOP: ${maxItem.sales}`,
                  fill: '#10B981',
                  fontSize: 12,
                  fontWeight: 'bold'
                }}
              />
            )}
            {minItem && (
              <ReferenceLine 
                x={processedData.findIndex(item =>
                  item.month === minItem.month && item.year === minItem.year
                )}
                stroke="#EF4444" 
                strokeDasharray="3 3"
                label={{
                  position: 'insideBottomRight',
                  value: `BASE: ${minItem.sales}`,
                  fill: '#EF4444',
                  fontSize: 12,
                  fontWeight: 'bold'
                }}
              />
            )}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
