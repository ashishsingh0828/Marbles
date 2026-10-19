import React from "react";
import KsdHero from "../components/KsdHome/KsdHero";
import KsdStory from "../components/KsdHome/KsdStory";
import KsdInteriorServices from "../components/KsdHome/KsdInteriorServices";
import GallerySlider from "../components/GallerSlider/GallerySlider";
import WhyChooseUs from "../components/Values/WhyChooseUs";
import Faq from "../components/FAQ/Faq";

export default function Home() {
  return (
    <div className="ksd-home-page">
      <KsdHero />
      <KsdStory />
      <KsdInteriorServices />
      <GallerySlider />
      <WhyChooseUs />
      <Faq />
    </div>
  );
}
