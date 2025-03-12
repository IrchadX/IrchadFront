"use client";

import React, { useState } from "react";
import Image from "next/image";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { DownloadIcon, ChevronLeftIcon, ChevronRightIcon, CalendarIcon } from "lucide-react";

const Reports = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedDates, setSelectedDates] = useState(Array(10).fill(new Date())); // Gestion des dates individuelles

  const reports = [
    { id: 1, title: "Optimiser les interventions", category: "Sécurité", icon: "/assets/securite.png", iconBgColor: "bg-cyan-100" },
    { id: 2, title: "Évaluation des Performances", category: "Performance", icon: "/assets/moneyy.png", iconBgColor: "bg-pink-100" },
    { id: 3, title: "Classement des Zones Stratégiques", category: "Business", icon: "/assets/strategey.png", iconBgColor: "bg-yellow-100" }
  ];

  const allReports = [...Array(10)].map((_, index) => (
    index < 3 ? reports[index] : {
      id: index + 1,
      title: `Rapport ${index + 1}`,
      category: ["Sécurité", "Performance", "Business"][index % 3],
      icon: ["/assets/securite.png", "/assets/moneyy.png", "/assets/strategey.png"][index % 3],
      iconBgColor: ["bg-cyan-100", "bg-pink-100", "bg-yellow-100"][index % 3]
    }
  ));

  const reportsPerPage = 3;
  const totalPages = Math.ceil(allReports.length / reportsPerPage);
  const indexOfLastReport = currentPage * reportsPerPage;
  const indexOfFirstReport = indexOfLastReport - reportsPerPage;
  const currentReports = allReports.slice(indexOfFirstReport, indexOfLastReport);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white rounded-lg shadow">
      {/* Titre */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-semibold text-gray-800">Rapports proposés</h1>
        <button className="border px-4 py-2 rounded-md text-gray-700 text-sm hover:bg-gray-100">Report</button>
      </div>

      {/* Table Header */}
      <div className="grid grid-cols-[2fr_1fr_1fr_0.5fr] gap-4 border-b pb-2 text-sm text-gray-600">
        <div className="font-medium pl-6">Rapport</div>
        <div className="font-medium">Catégorie</div>
        <div className="font-medium">Filtre par Date</div>
        <div className="font-medium text-center">Télécharger</div>
      </div>

      {/* Reports List */}
      <div className="space-y-3 mt-3">
        {currentReports.map((report, index) => (
          <div key={report.id} className="grid grid-cols-[2fr_1fr_1fr_0.5fr] gap-4 items-center py-2 hover:bg-gray-50 rounded-lg">
            <div className="flex items-center gap-3 pl-6">
              <div className={`${report.iconBgColor} w-10 h-10 rounded-lg flex items-center justify-center`}>
                <Image src={report.icon} alt={report.category} width={32} height={32} />
              </div>
              <span className="text-gray-800">{report.title}</span>
            </div>
            <div className="text-gray-700">{report.category}</div>

            {/* Sélection de date dynamique */}
            <div className="relative flex items-center">
              <CalendarIcon size={16} className="absolute left-3 text-gray-500" />
              <DatePicker
  selected={selectedDates[report.id - 1]}
  onChange={(date) => {
    const newDates = [...selectedDates];
    newDates[report.id - 1] = date;
    setSelectedDates(newDates);
  }}
  className="bg-transparent border-b border-gray-400 text-gray-700 text-sm 
             pl-9 py-1 focus:outline-none focus:border-blue-500 
             hover:border-gray-600 transition-all w-32"
/>

            </div>

            {/* Bouton Télécharger */}
            <div className="text-center">
              <button className="text-red-500"><DownloadIcon size={20} /></button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between pt-4 border-t mt-3">
        <div className="text-sm text-gray-500">
          {indexOfFirstReport + 1}-{Math.min(indexOfLastReport, allReports.length)} de {allReports.length}
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} className={`w-8 h-8 flex items-center justify-center rounded-md border ${currentPage === 1 ? "text-gray-300" : "text-gray-700"}`}>
            <ChevronLeftIcon size={16} />
          </button>
          <span className="text-sm">{currentPage} / {totalPages}</span>
          <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} className={`w-8 h-8 flex items-center justify-center rounded-md border ${currentPage === totalPages ? "text-gray-300" : "text-gray-700"}`}>
            <ChevronRightIcon size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Reports;
