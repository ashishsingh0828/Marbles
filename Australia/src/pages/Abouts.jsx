import Breadcrumb from "../components/Breadcrumb/Breadcrumb";
import About from "../components/About/About";
import WhyChooseUs from "../components/Values/WhyChooseUs";
import OurValues from "../components/Values/OurValues";
import OurBenefits from "../components/Values/OurBenefits";
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
      <About />
      <WhyChooseUs />
      <OurValues />
      <OurBenefits videoUrl="" />
      <ClientFeedback />
      <Faq />
    </div>
  );
}
