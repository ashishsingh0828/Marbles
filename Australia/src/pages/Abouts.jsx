import Breadcrumb from "../components/Breadcrumb/Breadcrumb";
import KsdStory from "../components/KsdHome/KsdStory";
import KsdInteriorServices from "../components/KsdHome/KsdInteriorServices";
import WhyChooseUs from "../components/Values/WhyChooseUs";
import OurValues from "../components/Values/OurValues";
import ClientFeedback from "../components/Values/ClientFeedback";
import Faq from "../components/FAQ/Faq";
import { IMG } from "../data/images";

export default function Abouts() {
  return (
    <div className="ksd-about-page">
      <Breadcrumb
        title="About KSD Homes"
        image={IMG.hero}
        labels={{ about: "About" }}
      />
      <KsdStory />
      <KsdInteriorServices />
      <WhyChooseUs />
      <OurValues />
      <ClientFeedback />
      <Faq />
    </div>
  );
}
