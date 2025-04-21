"use client";
import React, { useEffect, useRef, useState } from "react";
import "leaflet/dist/leaflet.css";

const Heatmap = () => {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const initMap = async () => {
      if (mapInstanceRef.current || !mapRef.current) return;
      setIsLoading(true);

      const L = await import("leaflet");

      const map = L.map(mapRef.current).setView([32.4667, 2.8667], 5.5);
      mapInstanceRef.current = map;

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap contributors",
        maxZoom: 19,
      }).addTo(map);

      await loadHeatPlugin();

      const res = await fetch('http://localhost:3001/zones/centers');
      const data = await res.json();

      const heatData = data
        .filter(p => p?.latitude && p?.longitude)
        .map(p => [p.latitude, p.longitude, 1]);

      if (window.L?.heatLayer && heatData.length) {
        window.L.heatLayer(heatData, {
          radius: 25,
          blur: 15,
          maxZoom: 10,
          gradient: {
            0.4: 'blue',
            0.6: 'cyan',
            0.7: 'lime',
            0.8: 'yellow',
            1.0: 'red'
          }
        }).addTo(map);
      }

      if (isMounted) setIsLoading(false);
    };

    const loadHeatPlugin = () => {
      if (window.L?.heatLayer) return;
      return new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.src = "https://cdnjs.cloudflare.com/ajax/libs/leaflet.heat/0.2.0/leaflet-heat.js";
        script.async = true;
        script.onload = resolve;
        script.onerror = () => reject(new Error("Erreur plugin heatmap"));
        document.head.appendChild(script);
      });
    };

    initMap();

    return () => {
      isMounted = false;
      mapInstanceRef.current?.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  return (
    <div className="w-[63%] h-[80vh] border rounded-lg shadow-md relative">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-80 z-10">
          <p>Chargement de la carte...</p>
        </div>
      )}
      <div ref={mapRef} className="w-full h-full rounded-lg" />
    </div>
  );
};

export default Heatmap;
