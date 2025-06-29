"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

const Metrics = () => {
  const [inactiveDevicesCount, setInactiveDevicesCount] = useState(0);
  const [avgMaintenanceTime, setAvgMaintenanceTime] = useState<number | null>(null);
  const [chiffre_affaire, setChiffre_affaire] = useState(0);
  const [Disponibilite, setDisponibilite] = useState(0);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/statistics/inactive-device-count`)
      .then((res) => res.json())
      .then((data) => setInactiveDevicesCount(data.totalInactiveDevices))
      .catch((err) => console.error("Erreur :", err));

      fetch(`${process.env.NEXT_PUBLIC_API_URL}/statistics/disponibilite`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Revenu API:", data); // <= ajoute ce log
        setDisponibilite(data.Disponibilite);
      })
      .catch((err) => console.error("Erreur :", err));
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/statistics/revenue`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Revenu API:", data); // <= ajoute ce log
        setChiffre_affaire(data.chiffre_affaire);
      })
      .catch((err) => console.error("Erreur :", err));
    

      fetch(`${process.env.NEXT_PUBLIC_API_URL}/statistics/disponibilite`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Revenu API:", data); // <= ajoute ce log
        setDisponibilite(data.Disponibilite);
      })
      .catch((err) => console.error("Erreur :", err));
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/statistics/revenue`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Revenu API:", data); // <= ajoute ce log
        setChiffre_affaire(data.chiffre_affaire);
      })
      .catch((err) => console.error("Erreur :", err));
    

    fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/statistics/average-intervention-duration`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log("Réponse API avg maintenance:", data);
        setAvgMaintenanceTime(data.avgDuration);
      })
      .catch((err) => console.error("Erreur avg maintenance:", err));
  }, []);

  const metrics = [
    {
      title: "Dispositifs bloqués",
      value: inactiveDevicesCount,
      textColor: "text-blue-500",
      icon: "/assets/UserIIcon.png",
    },
    {
      title: "Chiffre d'Affaires",
      value: `${chiffre_affaire} DA` ,
      textColor: "text-yellow-500",
      icon: "/assets/MoneyIcon.png",
    },
    {
      title: "Taux de Disponibilité",
      value: `${Disponibilite} %` ,
      textColor: "text-pink-500",
      icon: "/assets/AffaireIcon.png",
    },
    {
      title: "Temps moyen de maintenance",
      value:
        avgMaintenanceTime !== null
          ? `${avgMaintenanceTime} Heures`
          : "Chargement...",
      textColor: "text-cyan-500",
      icon: "/assets/MaintenanceIcon.png",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 p-3">
      {metrics.map((metric, index) => (
        <div
          key={index}
          className="bg-white shadow-md rounded-lg p-5 flex items-center hover:scale-95 transition-transform hover:shadow-lg">
          <div className="flex-shrink-0 mr-3">
            <Image
              src={metric.icon}
              alt={metric.title}
              width={40}
              height={40}
            />
          </div>
          <div className="flex flex-col text-left leading-snug">
            <p className="text-gray-500 text-sm">{metric.title}</p>
            <p className={` ${metric.textColor} pt-2`}>{metric.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Metrics;
