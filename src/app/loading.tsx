"use client";

import { useEffect } from "react";
import { ClipLoader } from "react-spinners";

export default function Loading() {
  useEffect(() => {
    console.log("laoding");
  }, []);
  return (
    <div className="flex items-center justify-center h-screen">
      <ClipLoader size={50} color="#3B82F6" />
    </div>
  );
}
