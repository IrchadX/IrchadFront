import React from "react";
import { UserForm } from "@/components/admin/users/user_form";
import Title from "@/components/shared/title";

const AddClientPage: React.FC = () => {

  const userTypes = [
    { id: "client", label: "Client" },
    { id: "aidant", label: "Aidant" },
  ];

  return (
    <div className="container mx-auto py-5">
      <Title text="Ajouter un client" lineLength="55px" />
      <UserForm userTypes={userTypes} />
    </div>
  );
};

export default AddClientPage;
