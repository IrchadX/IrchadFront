import React from "react";
import {ClientForm} from "@/components/commercial/clients/client-form";
import Title from "@/components/shared/title";

const AddClientPage: React.FC = () => {
  return (
    <div className="container mx-auto py-10">
      <Title text="Profil" lineLength="55px" />
      <ClientForm />
    </div>
  );
};

export default AddClientPage;