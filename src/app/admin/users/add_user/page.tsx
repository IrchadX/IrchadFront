import React from "react";
import {UserForm} from "@/components/admin/users/user_form";
import Title from "@/components/shared/title";

const AddUserPage: React.FC = () => {
  return (
    <div className="container mx-auto py-10">
      <Title text="Profil" lineLength="55px" />
      <UserForm/>
    </div>
  );
};

export default AddUserPage;