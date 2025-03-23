import Heatmap from "@/components/decideur/heatmap";
import Alerts from "@/components/decideur/alertes";


export default function Zones() {
  return (
<div className="container mx-auto flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-6 p-6">

      <Alerts />
      <Heatmap />
    </div>
  );
}
