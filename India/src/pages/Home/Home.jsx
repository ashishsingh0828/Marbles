import React from "react";
import Hero from "../../components/Home/Hero";
import AboutUs from "../../components/Home/AboutUs";
import OurServices from "../../components/Home/OurServices";
import VideoIntro from "../../components/Home/VideoIntro";
import OurGallery from "../../components/Values/OurGallery";
import Faq from "../../components/FAQ/Faq";
import { IMG } from "../../data/images";

export default function Home() {
  return (
    <div className="home-page">
      <Hero />
      <AboutUs
        images={{ top: IMG.aboutCrema, bottom: IMG.aboutViola, tall: IMG.aboutStatuario }}
      />
      <OurServices />
      <VideoIntro />
      <OurGallery bgImage={IMG.aboutThasos} />
      <Faq />
    </div>
  );
}
