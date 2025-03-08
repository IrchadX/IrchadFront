import Image from "next/image";

interface EnvironmentCardProps {
  title: string;
  address: string;
  id: string;
  imgSrc: string;
}

const EnvironmentCard: React.FC<EnvironmentCardProps> = ({
  title,
  address,
  id,
  imgSrc,
}) => {
  return (
    <div
      key={id}
      className="lg:w-[250px] xl:w-[320px] p-3 border-[1px] border-black-10 bg-main-5 rounded-lg shadow-sm hover:shadow-md transition-shadow flex flex-col items-center justify-center">
      <div className="flex w-full">
        <h3 className="font-bold w-[80%] text-start text-md xl:text-lg  text-black">
          {title}
        </h3>
        <div className="w-[10%]">
          <Image
            src="/assets/shared/delete.png"
            width={23}
            height={23}
            alt="delete"
          />
        </div>
        <div className="w-[10%] flex items-end justify-end">
          <Image
            src="/assets/shared/open-arrow.svg"
            width={30}
            height={30}
            alt="open arrow"
            className="scale-150"
          />
        </div>
      </div>
      <p className="w-full text-start text-sm text-black-30">{address}</p>
      <Image
        src={imgSrc}
        width={320}
        height={100}
        alt="env image"
        className="pt-2"
      />
    </div>
  );
};

export default EnvironmentCard;
