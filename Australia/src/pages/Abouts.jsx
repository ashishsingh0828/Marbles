import Breadcrumb from "../components/Breadcrumb/Breadcrumb";
import AboutUs from "../components/Home/AboutUs";
import WhyChooseUs from "../components/Values/WhyChooseUs";
import OurValues from "../components/Values/OurValues";
import ClientFeedback from "../components/Values/ClientFeedback";
import Faq from "../components/FAQ/Faq";

export default function Abouts() {
  return (
    <div className="ksd-about-page">
      <Breadcrumb
        title="About KSD Homes"
        image="/Image/banner2.jpeg"
        labels={{ about: "About" }}
      />
      <AboutUs learnMoreHref="/contact" />
      <WhyChooseUs />
      <OurValues />
      <ClientFeedback />
      <Faq />
    </div>
  );
}
