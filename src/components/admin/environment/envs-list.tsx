import environments from "@/data/environments";
import EnvironmentCard from "./env-card";

const EnvsList = () => {
  return (
    <div className=" flex flex-wrap items-center gap-6 pb-6">
      {environments.map((env) => (
        <EnvironmentCard
          key={env.id}
          id={env.id}
          title={env.title}
          address={env.address}
          imgSrc={env.imgSrc}
        />
      ))}
    </div>
  );
};

export default EnvsList;
