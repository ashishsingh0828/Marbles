import KsdStory from "../components/KsdHome/KsdStory";
import KsdInteriorServices from "../components/KsdHome/KsdInteriorServices";
import ClientFeedback from "../components/Values/ClientFeedback";
import Project from "../components/Projects/Project";
import Faq from "../components/FAQ/Faq";
import { Hero, ExperienceStrip } from "../components/KsdHome/HomeSections";

export default function Home() {
  return (
    <div className="ksd-home-page">
      <Hero />
      <ExperienceStrip />
      <KsdStory />
      <KsdInteriorServices />
      <ClientFeedback />
      <Project variant="home" />
      <Faq />
    </div>
  );
}
