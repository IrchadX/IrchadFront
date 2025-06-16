"use client";
import React, { useEffect, useRef, useState } from "react";
import "leaflet/dist/leaflet.css";

const Heatmap = () => {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const loadHeatPlugin = () => {
      return new Promise((resolve, reject) => {
        if (window.L?.heatLayer) {
          resolve();
          return;
        }

        const script = document.createElement("script");
        script.src = "https://cdnjs.cloudflare.com/ajax/libs/leaflet.heat/0.2.0/leaflet-heat.js";
        script.async = true;
        script.onload = () => {
          console.log("Plugin heatmap chargé avec succès");
          resolve();
        };
        script.onerror = () => {
          console.error("Erreur lors du chargement du plugin heatmap");
          reject(new Error("Erreur plugin heatmap"));
        };
        document.head.appendChild(script);
      });
    };

    const initMap = async () => {
      try {
        if (!mapRef.current || !isMounted) return;

        const L = (await import("leaflet")).default;

        // Nettoyer carte existante
        if (mapInstanceRef.current) {
          mapInstanceRef.current.remove();
          mapInstanceRef.current = null;
        }

        const map = L.map(mapRef.current).setView([36.75, 3.06], 8); // Alger
        mapInstanceRef.current = map;

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution: "&copy; OpenStreetMap contributors",
          maxZoom: 19,
        }).addTo(map);

        await loadHeatPlugin();

        console.log("Récupération des données...");
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/zone/centers`);

        if (!res.ok) {
          throw new Error(`Erreur HTTP: ${res.status}`);
        }

        const response = await res.json();
        console.log("Réponse complète reçue:", response);

        let centersData = [];

        if (response.success && response.data) {
          centersData = response.data;
        } else if (Array.isArray(response)) {
          centersData = response;
        } else {
          throw new Error("Format de réponse inattendu");
        }

        console.log("Données des centres extraites:", centersData);
        console.log("Nombre de centres:", centersData.length);

        if (!centersData || centersData.length === 0) {
          setError("Aucune donnée de zone disponible");
          return;
        }

        const heatData = centersData
          .filter((p) => p?.latitude && p?.longitude)
          .map((p) => [parseFloat(p.latitude), parseFloat(p.longitude), 1]);

        console.log("Données heatmap préparées:", heatData);
        console.log("Nombre de points pour heatmap:", heatData.length);

        if (window.L?.heatLayer && heatData.length > 0) {
          const heatLayer = window.L.heatLayer(heatData, {
            radius: 25,
            blur: 15,
            maxZoom: 10,
            gradient: {
              0.0: "blue",
              0.2: "cyan",
              0.4: "lime",
              0.6: "yellow",
              0.8: "orange",
              1.0: "red",
            },
          });

          heatLayer.addTo(map);
          console.log("✅ Heatmap ajoutée à la carte avec succès");
        }

        if (isMounted) {
          setIsLoading(false);
        }
      } catch (err) {
        console.error("❌ Erreur lors de l'initialisation:", err);
        if (isMounted) {
          setError(err.message);
          setIsLoading(false);
        }
      }
    };

    const timer = setTimeout(() => {
      initMap();
    }, 100);

    return () => {
      isMounted = false;
      clearTimeout(timer);

      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  return (
    <div className="w-[63%] h-[75vh] border rounded-lg shadow-md relative">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-80 z-10">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-2"></div>
            <p>Chargement de la carte...</p>
          </div>
        </div>
      )}

      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-80 z-10">
          <div className="text-center text-red-600">
            <p>Erreur: {error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Réessayer
            </button>
          </div>
        </div>
      )}

      <div
        id="heatmap"
        ref={mapRef}
        className="w-full h-full rounded-lg"
        style={{ minHeight: "400px" }}
      />
    </div>
  );
};

export default Heatmap;
