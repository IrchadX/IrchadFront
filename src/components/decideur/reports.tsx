"use client";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { CalendarIcon, DownloadIcon, ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import axios from 'axios';
import Image from "next/image"; // Assurez-vous d'importer Image de next/image pour les projets Next.js



const Reports = () => {
  
const handleDownload = async (reportId) => {
  try {
    const selectedYear = selectedDates[reportId - 1]?.getFullYear() || new Date().getFullYear();
    
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/reports/pdf?year=${selectedYear}`, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("Erreur lors du téléchargement");
    }

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `rapport_${selectedYear}.pdf`; // Dynamique selon l'année sélectionnée
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Erreur téléchargement:", error);
  }
};
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedDates, setSelectedDates] = useState(
    Array(10).fill(new Date())
  );
  const [selectedObjective, setSelectedObjective] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Données des rapports
  const reports = [
    {
      id: 1,
      title: "Analyse des dispositifs",
      category: "Sécurité",
      objective: "Amélioration",
      icon: "/assets/securite.png",
      iconBgColor: "bg-cyan-100",
    },
    {
      id: 2,
      title: "Performance commerciale",
      category: "Business",
      objective: "Startégie",
      icon: "/assets/moneyy.png",
      iconBgColor: "bg-pink-100",
    },
    {
      id: 3,
      title: "Utilisation du système",
      category: "Performance",
      objective: "Suivie",
      icon: "/assets/strategey.png",
      iconBgColor: "bg-yellow-100",
    },
  ];

  const allReports = [...Array(3)].map((_, index) =>
    index < 3
      ? reports[index]
      : {
          id: index + 1,
          title: `Rapport ${index + 1}`,
          category: ["Sécurité", "Performance", "Business"][index % 3],
          objective: ["Amélioration", "Suivi", "Stratégie"][index % 3],
          icon: [
            "/assets/securite.png",
            "/assets/moneyy.png",
            "/assets/strategey.png",
          ][index % 3],
          iconBgColor: ["bg-cyan-100", "bg-pink-100", "bg-yellow-100"][
            index % 3
          ],
        }
  );

  // Filtre par Objectifs
  const filteredReports = selectedObjective
    ? allReports.filter((report) => report.objective === selectedObjective)
    : allReports;

  const reportsPerPage = 3;
  const totalPages = Math.ceil(filteredReports.length / reportsPerPage);
  const indexOfLastReport = currentPage * reportsPerPage;
  const indexOfFirstReport = indexOfLastReport - reportsPerPage;
  const currentReports = filteredReports.slice(
    indexOfFirstReport,
    indexOfLastReport
  );

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white rounded-lg shadow">
    
      <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
        {/* Table Header */}
        <div className="grid grid-cols-[2fr_1fr_1fr_0.5fr] gap-4 border-b border-gray-200 pb-3 mb-2 text-sm text-gray-600">
          <div className="font-medium pl-6">Rapport</div>
          <div className="font-medium">Catégorie</div>
          <div className="font-medium">Filtre par Date</div>
          <div className="font-medium text-center">Télécharger</div>
        </div>

        {/* Reports List with uniform background */}
        <div className="space-y-2">
          {currentReports.map((report) => (
            <div
              key={report.id}
              className="grid grid-cols-[2fr_1fr_1fr_0.5fr] gap-4 items-center py-3 rounded-md bg-gray-50 hover:bg-blue-50 transition-colors border border-transparent hover:border-blue-100">
              <div className="flex items-center gap-3 pl-6">
                <div
                  className={`${report.iconBgColor} w-10 h-10 rounded-lg flex items-center justify-center shadow-sm`}>
                  <Image
                    src={report.icon}
                    alt={report.category}
                    width={32}
                    height={32}
                  />
                </div>
                <span className="text-gray-800 font-medium">
                  {report.title}
                </span>
              </div>
              <div className="text-gray-700">{report.category}</div>

              {/* Sélection de date dynamique */}
              <div className="relative flex items-center">
                <CalendarIcon
                  size={16}
                  className="absolute left-3 text-gray-500"
                />
                <DatePicker
                  selected={selectedDates[report.id - 1]}
                  onChange={(date) => {
                    const newDates = [...selectedDates];
                    newDates[report.id - 1] = date;
                    setSelectedDates(newDates);
                  }}
                  showYearPicker
                  dateFormat="yyyy"
                  locale="fr"
                  className="bg-transparent border-b border-gray-400 text-gray-700 text-sm 
                             pl-9 py-1 focus:outline-none focus:border-blue-500 
                             hover:border-gray-600 transition-all w-24"
                />
              </div>

              {/* Bouton Télécharger */}
              <div className="text-center">
              <button 
  onClick={() => {
    handleDownload(report.id);
  }}
  className="text-red-500 hover:text-red-600 transition-colors p-2 rounded-full hover:bg-red-50"
>
  <DownloadIcon size={20} />
</button>
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-gray-200 mt-3">
          <div className="text-sm text-gray-500">
            {indexOfFirstReport + 1}-
            {Math.min(indexOfLastReport, filteredReports.length)} de{" "}
            {filteredReports.length}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`w-8 h-8 flex items-center justify-center rounded-md border ${
                currentPage === 1
                  ? "text-gray-300 cursor-not-allowed bg-gray-50"
                  : "text-gray-700 hover:bg-gray-100"
              }`}>
              <ChevronLeftIcon size={16} />
            </button>
            <span className="text-sm font-medium">
              {currentPage} / {totalPages}
            </span>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`w-8 h-8 flex items-center justify-center rounded-md border ${
                currentPage === totalPages
                  ? "text-gray-300 cursor-not-allowed bg-gray-50"
                  : "text-gray-700 hover:bg-gray-100"
              }`}>
              <ChevronRightIcon size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
