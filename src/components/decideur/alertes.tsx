"use client"
import React, { useState } from 'react';

const Alerts = () => {
  const allAlerts = Array(10).fill().map((_, idx) => {
    const baseAlerts = [
      { type: 'Intrusion', zone: 'Cuisine', status: 'En cours', level: 'Modéré', time: '14:35', date: '24 Apr 2021' },
      { type: 'Anomalie badge', zone: 'Entrée', status: 'Résolu', level: 'Critique', time: '14:35', date: '24 Apr 2021' },
      { type: 'Incendie', zone: 'Centre commercial', status: 'En cours', level: 'Faible', time: '14:35', date: '24 Apr 2021' },
      { type: 'Connexion', zone: 'Marché', status: 'En cours', level: 'Critique', time: '14:35', date: '24 Apr 2021' },
      { type: 'Bruit suspect', zone: 'Ecole', status: 'En cours', level: 'Faible', time: '14:35', date: '24 Apr 2021' }
    ];
    return baseAlerts[idx % 5];
  });

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(allAlerts.length / itemsPerPage);
  
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentAlerts = allAlerts.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const getPageNumbers = () => {
    const pageNumbers = [];
        pageNumbers.push(
      <button 
        key={1} 
        onClick={() => paginate(1)}
        className={`w-8 h-8 flex items-center justify-center ${currentPage === 1 ? 'bg-blue-500 text-white' : 'text-gray-600 hover:bg-gray-100'} rounded`}
      >
        1
      </button>
    );

    if (totalPages > 5) {
      if (currentPage > 3) {
        pageNumbers.push(<button key="ellipsis1" className="px-2 text-gray-600">...</button>);
      }

      const startPage = Math.max(2, currentPage - 1);
      const endPage = Math.min(totalPages - 1, currentPage + 1);

      for (let i = startPage; i <= endPage; i++) {
        if (i !== 1 && i !== totalPages) {
          pageNumbers.push(
            <button 
              key={i} 
              onClick={() => paginate(i)}
              className={`w-8 h-8 flex items-center justify-center ${currentPage === i ? 'bg-blue-500 text-white' : 'text-gray-600 hover:bg-gray-100'} rounded`}
            >
              {i}
            </button>
          );
        }
      }

      if (currentPage < totalPages - 2) {
        pageNumbers.push(<button key="ellipsis2" className="px-2 text-gray-600">...</button>);
      }
    } else {
      for (let i = 2; i < totalPages; i++) {
        pageNumbers.push(
          <button 
            key={i} 
            onClick={() => paginate(i)}
            className={`w-8 h-8 flex items-center justify-center ${currentPage === i ? 'bg-blue-500 text-white' : 'text-gray-600 hover:bg-gray-100'} rounded`}
          >
            {i}
          </button>
        );
      }
    }

    if (totalPages > 1) {
      pageNumbers.push(
        <button 
          key={totalPages} 
          onClick={() => paginate(totalPages)}
          className={`w-8 h-8 flex items-center justify-center ${currentPage === totalPages ? 'bg-blue-500 text-white' : 'text-gray-600 hover:bg-gray-100'} rounded`}
        >
          {totalPages}
        </button>
      );
    }

    return pageNumbers;
  };

  const getLevelColor = (level) => {
    switch (level) {
      case 'Critique': return 'text-red-600';
      case 'Modéré': return 'text-green-600';
      case 'Faible': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="w-1/2 bg-white rounded-lg shadow-md overflow-hidden">
      {/* En-tête */}
      <div className="flex justify-between items-center p-4 border-b">
        <h2 className="text-lg font-medium text-gray-700">Analyse des Alertes par zone</h2>
        <button className="text-gray-500">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="1" />
            <circle cx="12" cy="5" r="1" />
            <circle cx="12" cy="19" r="1" />
          </svg>
        </button>
      </div>

      {/* En-tête du tableau */}
      <div className="grid grid-cols-3 text-sm font-medium text-gray-600 px-4 py-3 border-b">
        <div>Type d'alerte</div>
        <div>Zone concernée</div>
        <div className='pl-12'>Niveau / Statut</div>
      </div>

      {/* Données du tableau */}
      <div className="divide-y divide-gray-200">
        {currentAlerts.map((alert, index) => (
          <div key={index} className="grid grid-cols-3 px-4 py-3 text-sm">
            <div>
              <div className="font-medium text-gray-800">{alert.type}</div>
              <div className="text-gray-500 text-xs">{alert.time}</div>
            </div>
            <div>
              <div className="font-medium text-gray-800">{alert.zone}</div>
              <div className="text-gray-500 text-xs">{alert.date}</div>
            </div>
            <div className="text-right">
              <div className="font-medium text-gray-800">{alert.status}</div>
              <div className={`text-xs ${getLevelColor(alert.level)}`}>{alert.level}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center px-4 py-3 border-t">
        <div className="text-sm text-gray-500">
          {indexOfFirstItem + 1} - {Math.min(indexOfLastItem, allAlerts.length)} de {allAlerts.length}
        </div>
        <div className="flex space-x-1">
          <button 
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className={`p-1 rounded ${currentPage === 1 ? 'text-gray-400' : 'text-gray-600 hover:bg-gray-100'}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          
          {getPageNumbers()}
          
          <button 
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`p-1 rounded ${currentPage === totalPages ? 'text-gray-400' : 'text-gray-600 hover:bg-gray-100'}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Alerts;