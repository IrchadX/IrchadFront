"use client";
import { useParams } from "next/navigation";
import {UserModification} from "@/components/admin/users/user_modification";
import Title from "@/components/shared/title";


export default function UserModificationPage() {
  const { id: userId } = useParams();

  const userTypes = [
    { id: "2", label: "Admin" },
    { id: "3", label: "Commercial" },
    { id: "4", label: "Décideur" },
    { id: "5", label: "Client" },
    { id: "6", label: "Aidant" },
  ];

  if (!userId) {
    return <div>Invalid user ID</div>;
  }
  return(
    <div className="container mx-auto py-5">
      <Title text="Modifier un utilisateur" lineLength="100px" />
      <UserModification userId={Array.isArray(userId) ? userId[0] : userId} userTypes={userTypes} />
    </div>)
   ;
}