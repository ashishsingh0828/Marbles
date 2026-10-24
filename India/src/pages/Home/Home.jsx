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
      <VideoIntro image={IMG.hero1} videoUrl="https://www.youtube.com/watch?v=aqz-KE-bpKQ" />
      <OurGallery bgImage={IMG.hero3} />
      <Faq />
    </div>
  );
}
