import About from "../components/About/About";
import Service from "../components/Services/Service";
import ClientFeedback from "../components/Values/ClientFeedback";
import Project from "../components/Projects/Project";
import Faq from "../components/FAQ/Faq";
import { Hero, ExperienceStrip } from "../components/KsdHome/HomeSections";

export default function Home() {
  return (
    <div className="ksd-home-page">
      <Hero />
      <ExperienceStrip />
      <About />
      <Service limit={6} />
      <ClientFeedback />
      <Project variant="home" />
      <Faq />
    </div>
  );
}
