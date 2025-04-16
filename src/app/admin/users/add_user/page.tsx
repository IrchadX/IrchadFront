import React from "react";
import { UserForm } from "@/components/admin/users/user_form";
import Title from "@/components/shared/title";

const AddUserPage: React.FC = () => {

  const userTypes = [
    { id: "1", label: "Admin" },
    { id: "2", label: "Commercial" },
    { id: "3", label: "Décideur" },
    { id: "4", label: "Client" },
    { id: "5", label: "Aidant" },
  ];

  return (
    <div className="container mx-auto py-5">
      <Title text="Ajouter un utilisateur" lineLength="55px" />
      <UserForm userTypes={userTypes} />
    </div>
  );
};

export default AddUserPage;
