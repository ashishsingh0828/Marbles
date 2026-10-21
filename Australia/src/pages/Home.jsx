import AboutUs from "../components/Home/AboutUs";
import OurServices from "../components/Home/OurServices";
import ClientFeedback from "../components/Values/ClientFeedback";
import Project from "../components/Projects/Project";
import Faq from "../components/FAQ/Faq";
import { Hero, ExperienceStrip } from "../components/KsdHome/HomeSections";

export default function Home() {
  return (
    <div className="ksd-home-page">
      <Hero />
      <ExperienceStrip />
      <AboutUs />
      <OurServices />
      <ClientFeedback />
      <Project variant="home" />
      <Faq />
    </div>
  );
}
