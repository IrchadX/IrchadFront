import Image from "next/image";

const KpiCards = () => {
  const kpis = [
    {
      title: "Utilisateurs actifs",
      value: "40,689",
      trend: "8.5% Up from yesterday",
      icon: "/assets/UserIcon.png",
      useImage: true,
      trendColor: "text-green-500",
    },
    {
      title: "Dispositifs vendus",
      value: "10,293",
      trend: "1.3% Up from past week",
      icon: "/assets/DeviceIcon.png",
      useImage: true,
      trendColor: "text-green-500",
    },
    {
      title: "Réclamations signalées",
      value: "60",
      trend: "4.3% Down from yesterday",
      icon: "/assets/CourbeIcon.png",
      useImage: true,
      trendColor: "text-red-500",
    },
    {
      title: "Taux de détection d'obstacles",
      value: "0.8",
      trend: "2% Up from yesterday",
      icon: "/assets/TimeIcon.png",
      useImage: true,
      trendColor: "text-green-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 p-4">
      {kpis.map((kpi, index) => (
        <div
          key={index}
          className="bg-white shadow-lg rounded-xl p-4 flex items-center justify-between 
         hover:scale-95 hover:shadow-xl animate-fadeIn"
        >
          <div className="flex flex-col text-left space-y-1 leading-relaxed">
            <h3 className="text-gray-500">{kpi.title}</h3>
            <p className="text-xl font-bold">{kpi.value}</p>
            <p className={`text-sm ${kpi.trendColor}`}>{kpi.trend}</p>
          </div>

          <div className="flex-shrink-0 self-start mt-[10px] ">
            {kpi.useImage ? (
              <Image src={kpi.icon} alt={kpi.title} width={50} height={50} />
            ) : (
              <span className="text-xl">{kpi.icon}</span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default KpiCards;
