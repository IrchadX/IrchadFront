"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

const KpiCards = () => {
  const [stats, setStats] = useState({
    users: 0,
    devices: 0,
    alerts: 0,
    technicalPercentage: 0,
  });

  useEffect(() => {
    Promise.all([
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/statistics/users-count`, {
        credentials: "include",
      }).then((res) => res.json()),
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/statistics/device-count`, {
        credentials: "include",
      }).then((res) => res.json()),
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/statistics/alerts-count`, {
        credentials: "include",
      }).then((res) => res.json()),
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/statistics/interventions`, {
        credentials: "include",
      }).then((res) => res.json()),
    ])
      .then(([usersData, devicesData, alertsData, techInterventionData]) => {
        setStats({
          users: usersData.totalUsers || 0,
          devices: devicesData.totalDevice || 0,
          alerts: alertsData.totalAlerts || 0,
          technicalPercentage: techInterventionData.percentage || 0,
        });
      })
      .catch((err) =>
        console.error("Erreur de chargement des statistiques :", err)
      );
  }, []);

  const kpis = [
    { title: "Utilisateurs actifs", value: stats.users, trend: "8.5% Up", icon: "/assets/UserIcon.png", trendColor: "text-green-500" },
    { title: "Dispositifs vendus ", value: stats.devices, trend: "1.3% Up", icon: "/assets/DeviceIcon.png", trendColor: "text-green-500" },
    { title: "Alertes signalées", value: stats.alerts, trend: "4.3% Down", icon: "/assets/CourbeIcon.png", trendColor: "text-red-500" },
    { title: "% Interventions techniques", value: `${stats.technicalPercentage}%`, trend: "2% Up", icon: "/assets/TimeIcon.png", trendColor: "text-green-500" },
  ];

  return (
    <div className="grid grid-cols-1 my-2 sm:grid-cols-2 md:grid-cols-4 gap-4 p-4">
      {kpis.map(({ title, value, trend, icon, trendColor }, index) => (
        <div
          key={index}
          className="bg-white shadow-md rounded-xl p-4 flex items-center justify-between hover:scale-95 hover:shadow-lg">
          <div className="flex flex-col text-left space-y-1">
            <h3 className="text-gray-500">{title}</h3>
            <p className="text-xl font-bold">{value}</p>
          </div>
          <Image
            src={icon}
            alt={title}
            width={50}
            height={50}
            className="self-start mt-2"
          />
        </div>
      ))}
    </div>
  );
};

export default KpiCards;
