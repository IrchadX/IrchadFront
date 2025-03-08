"use client";
import EnvsList from "@/components/admin/environment/envs-list";
import ZonesSwiper from "@/components/admin/environment/zone-types-swiper";
import { ButtonSecondary } from "@/components/shared/secondary-button";
import Title from "@/components/shared/title";

const page = () => {
  return (
    <div>
      <div className="flex justify-between items-start">
        <Title text="Environnements" lineLength="100px" />
        <ButtonSecondary
          title="Ajouter"
          onClick={() => {
            console.log("adding env");
          }}
        />
      </div>
      <EnvsList />
      <div className="flex justify-between items-center">
        <Title text="Types de Zones" lineLength="60px" />
        <ButtonSecondary
          title="Ajouter"
          onClick={() => {
            console.log("adding zone");
          }}
        />
      </div>{" "}
      <ZonesSwiper />
    </div>
  );
};

export default page;
