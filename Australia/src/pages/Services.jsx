import Breadcrumb from "../components/Breadcrumb/Breadcrumb";
import KsdInteriorServices from "../components/KsdHome/KsdInteriorServices";
import Service from "../components/Services/Service";

export default function Services() {
  return (
    <div>
      <Breadcrumb title="Services" image="/Image/banner2.jpeg" />
      <KsdInteriorServices />
      <Service />
    </div>
  );
}
