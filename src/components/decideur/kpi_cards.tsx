"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

const KpiCards = () => {
  const [stats, setStats] = useState({
    users: 0,
    devices: 0,
    alerts: 0,
  });

  useEffect(() => {
    Promise.all([
      fetch("http://localhost:3001/statistics/users-count").then((res) => res.json()),
      fetch("http://localhost:3001/statistics/device-count").then((res) => res.json()),
      fetch("http://localhost:3001/statistics/alerts-count").then((res) => res.json()),
    ])
      .then(([usersData, devicesData, alertsData]) => {
        setStats({
          users: usersData.totalUsers || 0,
          devices: devicesData.totalDevice || 0,
          alerts: alertsData.totalAlerts || 0,
        });
      })
      .catch((err) => console.error("Erreur de chargement des statistiques :", err));
  }, []);

  const kpis = [
    { title: "Utilisateurs actifs", value: stats.users, trend: "8.5% Up", icon: "/assets/UserIcon.png", trendColor: "text-green-500" },
    { title: "Dispositifs vendus ce mois", value: stats.devices, trend: "1.3% Up", icon: "/assets/DeviceIcon.png", trendColor: "text-green-500" },
    { title: "Alertes signalées ce mois", value: stats.alerts, trend: "4.3% Down", icon: "/assets/CourbeIcon.png", trendColor: "text-red-500" },
    { title: "Taux de détection", value: "0.8", trend: "2% Up", icon: "/assets/TimeIcon.png", trendColor: "text-green-500" },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 p-4">
      {kpis.map(({ title, value, trend, icon, trendColor }, index) => (
        <div key={index} className="bg-white shadow-lg rounded-xl p-4 flex items-center justify-between hover:scale-95 hover:shadow-xl">
          <div className="flex flex-col text-left space-y-1">
            <h3 className="text-gray-500">{title}</h3>
            <p className="text-xl font-bold">{value}</p>
            <p className={`text-sm ${trendColor}`}>{trend}</p>
          </div>
          <Image src={icon} alt={title} width={50} height={50} className="self-start mt-2" />
        </div>
      ))}
    </div>
  );
};

export default KpiCards;
