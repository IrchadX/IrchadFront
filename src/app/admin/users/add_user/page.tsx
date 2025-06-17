import React from "react";
import { UserForm } from "@/components/admin/users/user_form";
import Title from "@/components/shared/title";

const AddUserPage: React.FC = () => {

  const userTypes = [
    { id: 13, label: "Admin" },
    { id: 14, label: "Malvoyant" },
    { id: 15, label: "Maintenancier" },
    { id: 16, label: "Aidant" },
    { id: 17, label: "Décideur" },
    { id: 18, label: "Commercial" },
  ];

  return (
    <div className="container mx-auto py-5">
      <Title text="Ajouter un utilisateur" lineLength="55px" />
      <UserForm userTypes={userTypes} />
    </div>
  );
};

export default AddUserPage;
