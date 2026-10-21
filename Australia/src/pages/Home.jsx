import AboutUs from "../components/Home/AboutUs";
import OurServices from "../components/Home/OurServices";
import ClientFeedback from "../components/Values/ClientFeedback";
import Project from "../components/Projects/Project";
import VideoIntro from "../components/Home/VideoIntro";
import { Hero, ExperienceStrip, Newsletter } from "../components/KsdHome/HomeSections";

export default function Home() {
  return (
    <div className="ksd-home-page">
      <Hero />
      <ExperienceStrip />
      <AboutUs />
      <OurServices />
      <ClientFeedback />
      <Project variant="home" />
      <VideoIntro />
      <Newsletter />
    </div>
  );
}
