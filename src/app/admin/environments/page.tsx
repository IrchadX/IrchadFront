import EnvsList from "@/components/admin/environment/envs-list";
import ZonesSwiper from "@/components/admin/environment/zone-types-swiper";
import Title from "@/components/shared/title";

const page = () => {
  return (
    <div>
      <Title text="Environnements" lineLength="100px" />
      <EnvsList />
      <Title text="Types de Zones" lineLength="60px" />
      <ZonesSwiper />
    </div>
  );
};

export default page;
