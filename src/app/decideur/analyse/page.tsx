"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Anad from "@/components/decideur/anad";

export default function DashboardPage() {
  const router = useRouter();

 /* useEffect(() => {
    const token = localStorage.getItem("access_token");

    if (!token) {
      router.push("/login");
    }
  }, [router]);*/

  return (
    <div className="container mx-auto">
      <Anad />
    </div>
  );
}
