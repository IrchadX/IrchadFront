"use client";
import Settings from  "@/components/decideur/profile";
import { useRouter } from "next/navigation";
import { useEffect } from "react";


export default function profile() {
   const router = useRouter();
  
   /* useEffect(() => {
      const token = localStorage.getItem("access_token");
  
      if (!token) {
        router.push("/login");
      }
    }, [router]);
  */
    return (
      <div className="container mx-auto">
        <Settings />
      </div>
    );
  }
  