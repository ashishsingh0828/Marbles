import React from "react";
import KsdHero from "../components/KsdHome/KsdHero";
import KsdJourney from "../components/KsdHome/KsdJourney";
import Project from "../components/Projects/Project";
import WhyChooseUs from "../components/Values/WhyChooseUs";

export default function Home() {
  return (
    <div className="ksd-home-page">
      <KsdHero />
      <KsdJourney />
      <Project variant="home" />
      <WhyChooseUs />
    </div>
  );
}
