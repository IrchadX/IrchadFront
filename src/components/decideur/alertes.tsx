"use client";
import React, { useState, useEffect } from "react";
import { format } from 'date-fns';

const Alerts = () => {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const response = await fetch("http://localhost:5000/statistics/all-alerts");
        const data = await response.json(); 
        setAlerts(data.alerts || []);
      } catch (error) {
        console.error("Erreur lors du chargement des alertes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAlerts();
  }, []);

  const totalPages = Math.ceil(alerts.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentAlerts = alerts.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <div className="w-1/2 bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-3 border-b">
        <h2 className="text-lg font-medium text-gray-700">Analyse des Alertes par zone</h2>
      </div>

      {loading ? (
        <p className="p-4 text-center">Chargement des alertes...</p>
      ) : (
        <>
          <div className="grid grid-cols-3 text-sm font-medium text-gray-600 px-4 py-3 border-b">
            <div>Type d'alerte</div>
            <div>Zone concernée</div>
            <div className="pl-11">Niveau / Statut</div>
          </div>

          <div className="divide-y divide-gray-200">
            {currentAlerts.map((alert, index) => {
              const levelClass = alert.level === "Critique" ? "text-red-600" : alert.level === "Modéré" ? "text-yellow-600" : "text-green-600";
              return (
                <div key={index} className="grid grid-cols-3 px-4 py-3 text-sm">
                  <div>
                    <div className="font-medium text-gray-800">{alert.type}</div>
                  </div>
                  <div>
                    <div className="font-medium text-gray-800">{alert.zone}</div>
                    <div className="text-gray-500 text-xs"> {format(new Date(alert.date), 'PPpp')}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium text-gray-800">{alert.status}</div>
                    <div className={`text-xs ${levelClass}`}>{alert.level}</div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex justify-between items-center px-4 py-3 border-t">
            <div className="text-sm text-gray-500">
              {indexOfFirstItem + 1} - {Math.min(indexOfLastItem, alerts.length)} de {alerts.length}
            </div>
            <div className="flex space-x-1">
              <button
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
                className={`p-1 rounded ${currentPage === 1 ? "text-gray-400" : "text-gray-600 hover:bg-gray-100"}`}
              >
                ◀
              </button>
              {[...Array(totalPages).keys()].map((num) => (
                <button
                  key={num + 1}
                  onClick={() => paginate(num + 1)}
                  className={`w-8 h-8 ${currentPage === num + 1 ? "bg-blue-500 text-white" : "text-gray-600 hover:bg-gray-100"} rounded`}
                >
                  {num + 1}
                </button>
              ))}
              <button
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`p-1 rounded ${currentPage === totalPages ? "text-gray-400" : "text-gray-600 hover:bg-gray-100"}`}
              >
                ▶
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Alerts;