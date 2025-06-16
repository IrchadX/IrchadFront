"use client";
import React, { useEffect, useRef, useState } from "react";
import "leaflet/dist/leaflet.css";

const Heatmap = () => {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const loadHeatPlugin = () => {
      if (window.L?.heatLayer) return;
      return new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.src =
          "https://cdnjs.cloudflare.com/ajax/libs/leaflet.heat/0.2.0/leaflet-heat.js";
        script.async = true;
        script.onload = resolve;
        script.onerror = () => reject(new Error("Erreur plugin heatmap"));
        document.head.appendChild(script);
        console.log("Leaflet disponible :", window.L);
        console.log("heatLayer dispo :", window.L?.heatLayer);
      });
    };

    const initMap = async () => {
      if (!mapRef.current) return;

      const L = await import("leaflet");

      // 💥 Réinitialiser le conteneur si déjà initialisé
      if (L.DomUtil.get(mapRef.current.id)) {
        L.DomUtil.get(mapRef.current.id).innerHTML = "";
      }

      if (mapInstanceRef.current) return;

      const map = L.map(mapRef.current).setView([32.4667, 2.8667], 5.5);
      mapInstanceRef.current = map;

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap contributors",
        maxZoom: 19,
      }).addTo(map);

      await loadHeatPlugin();

      const res = await fetch(
        "https://apigateway-production-b99d.up.railway.app/api/v1/web/zones/centers"
      );
      const data = await res.json();

      const heatData = data
        .filter((p) => p?.latitude && p?.longitude)
        .map((p) => [p.latitude, p.longitude, 1]);

      if (window.L?.heatLayer && heatData.length) {
        window.L.heatLayer(heatData, {
          radius: 25,
          blur: 15,
          maxZoom: 10,
          gradient: {
            0.4: "red",
            0.6: "yellow",
            0.7: "lime",
            0.8: "green",
            1.0: "blue",
          },
        }).addTo(map);
      }

      if (isMounted) setIsLoading(false);
    };

    initMap();

    return () => {
      isMounted = false;

      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }

      if (mapRef.current?._leaflet_id) {
        mapRef.current._leaflet_id = null;
      }
    };
  }, []);

  return (
    <div className="w-[63%] h-[75vh] border rounded-lg shadow-md relative">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-80 z-10">
          <p>Chargement de la carte...</p>
        </div>
      )}
      <div id="heatmap" ref={mapRef} className="w-full h-full rounded-lg" />
    </div>
  );
};

export default Heatmap;
