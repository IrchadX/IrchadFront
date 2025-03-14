import React from "react";
import { UserForm } from "@/components/admin/users/user_form";
import Title from "@/components/shared/title";

const AddUserPage: React.FC = () => {
  return (
    <div className="container mx-auto py-5">
      <Title text="Ajouter un utilsateur" lineLength="55px" />
      <UserForm />
    </div>
  );
};

export default AddUserPage;
