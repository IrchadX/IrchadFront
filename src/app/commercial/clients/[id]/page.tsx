"use client";
import { useParams } from "next/navigation";
import {UserModification} from "@/components/admin/users/user_modification";
import Title from "@/components/shared/title";


export default function UserModificationPage() {
  const { id: userId } = useParams();

  const userTypes = [
    { id: "5", label: "Aidant" },
    { id: "6", label: "Client" },
  ];

  if (!userId) {
    return <div>Invalid user ID</div>;
  }
  return(
    <div className="container mx-auto py-5">
      <Title text="Modifier un client" lineLength="100px" />
      <UserModification userId={Array.isArray(userId) ? userId[0] : userId} userTypes={userTypes} />
    </div>)
   ;
}