"use client";

import React, { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const Heatmap = () => {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);

  useEffect(() => {
    const loadHeatPlugin = async () => {
      if (!L || L.heatLayer) return;

      const script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet.heat/0.2.0/leaflet-heat.js';
      script.async = true;

      await new Promise((resolve, reject) => {
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
      });
    };

    const initMap = async () => {
      if (mapInstanceRef.current || !mapRef.current) return;

      await loadHeatPlugin();

      const map = L.map(mapRef.current).setView([32.4667, 2.8667],5.5); // Centré sur Alger et un peu plus bas
      mapInstanceRef.current = map;

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors',
        maxZoom: 19
      }).addTo(map);

      const heatData = [
        // Alger
        [36.7538, 3.0588, 1],
        [36.7539, 3.0589, 0.95],
        [36.7540, 3.0590, 0.92],
        [36.7541, 3.0591, 0.94],
        [36.7542, 3.0592, 0.9],
        [36.7543, 3.0593, 0.87],
        [36.7544, 3.0594, 0.85],
        [36.7545, 3.0595, 0.88],
        [36.7546, 3.0596, 0.89],
        [36.7547, 3.0597, 0.91],
        [36.7548, 3.0598, 0.93],
        [36.7549, 3.0599, 0.95],
        [36.7550, 3.0600, 1],
        [36.7551, 3.0601, 0.97],
        [36.7552, 3.0602, 0.96],
      
        // Autres points
        [36.7538, 3.0588, 0.8],
        [35.6976, 0.6337, 0.7],
        [27.9654, 4.7910, 1],
        [32.4902, 3.6738, 0.8],
        [26.3351, 2.6298, 0.9],
        [28.0339, 1.6596, 0.7]
      ];
      

      if (L.heatLayer) {
        L.heatLayer(heatData, {
          radius: 40,
          blur: 30,
          maxZoom: 10,
          gradient: {
            0.1: "#2c7bb6",  // bleu profond
            0.3: "#abd9e9",  // bleu clair
            0.5: "#ffffbf",  // jaune doux
            0.7: "#fdae61",  // orange
            0.9: "#d7191c",  // rouge intense
            1.0: "#800026"   // ro
          }
        }).addTo(map);
      }
    };

    initMap();
  }, []);

  return (
    <div className="w-[63%] h-[80vh]">
      <div ref={mapRef} className="w-full h-full"></div>
    </div>
  );
};  
export default Heatmap;
