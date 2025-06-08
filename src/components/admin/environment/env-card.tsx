import Image from "next/image";
import Link from "next/link";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface EnvironmentCardProps {
  title: string;
  address: string;
  id: string;
  imgSrc: string;
  onDelete: (id: string) => Promise<void>;
  isPending?: boolean;
}

const EnvironmentCard: React.FC<EnvironmentCardProps> = ({
  title,
  address,
  id,
  imgSrc,
  onDelete,
  isPending = false,
}) => {
  const handleDelete = async () => {
    try {
      if (confirm("Êtes-vous sûr de vouloir supprimer cet environnement ?")) {
        await onDelete(id);
        toast.success("Environnement supprimé avec succès !");
      }
    } catch (error) {
      toast.error("Erreur lors de la suppression de l'environnement");
      console.error("Delete error:", error);
    }
  };

  return (
    <div
      key={id}
      className={`lg:w-[230px] xl:w-[300px] 2xl:w-[280px] p-3 border-[1px] ${
        isPending ? "border-orange-400 border-2" : "border-black-10"
      } bg-main-5 rounded-lg shadow-sm hover:shadow-md transition-shadow flex flex-col items-center justify-center`}>
      <div className="flex w-full items-center justify-center">
        <h3 className="font-bold w-[90%] text-start text-md xl:text-md text-black h-[50px]">
          {title}
        </h3>
        <div className="w-[10%] cursor-pointer" onClick={handleDelete}>
          <Image
            src="/assets/shared/delete.png"
            width={15}
            height={15}
            alt="delete"
          />
        </div>
        <div className="w-[10%] flex items-end justify-end">
          <Link href={`/admin/environments/${id}?pending=${isPending}`}>
            <Image
              src="/assets/shared/open-arrow.svg"
              width={20}
              height={20}
              alt="open arrow"
              className="scale-150"
            />
          </Link>
        </div>
      </div>
      <p className="w-full text-start text-sm text-black-30">{address}</p>

      {isPending && (
        <div className="w-full mt-1">
          <span className="bg-orange-100 text-orange-800 text-xs font-medium py-0.5 px-2 rounded">
            En attente de délimitation
          </span>
        </div>
      )}

      <Image
        src="/assets/admin/environments/env-map.png"
        width={320}
        height={100}
        alt="env image"
        className="pt-2"
      />
    </div>
  );
};

export default EnvironmentCard;
