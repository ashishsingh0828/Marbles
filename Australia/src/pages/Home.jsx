import {
  Hero,
  ExperienceStrip,
  OurStory,
  SketchToFurnishing,
  FeaturedProjects,
  TeamPreview,
  Newsletter,
} from "../components/KsdHome/HomeSections";

export default function Home() {
  return (
    <div className="ksd-home-page">
      <Hero />
      <ExperienceStrip />
      <OurStory />
      <SketchToFurnishing />
      <FeaturedProjects />
      <TeamPreview />
      <Newsletter />
    </div>
  );
}
