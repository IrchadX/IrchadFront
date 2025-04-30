"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/components/layout/decideursidebar";
function ClientSideRootLayout({ children }: { children: React.ReactNode }) {
  const [userRole, setUserRole] = useState<string>(""); // Default to empty string

  useEffect(() => {
    // Get user data from session storage
    const userData = sessionStorage.getItem("userData");
    if (userData) {
      try {
        const parsedData = JSON.parse(userData);
        setUserRole(parsedData.role || "");
      } catch (error) {
        console.error("Error parsing user data from session storage:", error);
      }
    }
  }, []);

  return (
    <>
      {userRole && <Sidebar userRole={userRole} />} 
      {children}
    </>
  );
}
export default ClientSideRootLayout;