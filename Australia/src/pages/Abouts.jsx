import React from "react";
import Breadcrumb from "../components/Breadcrumb/Breadcrumb";
import About from "../components/About/About";
import OurValues from "../components/Values/OurValues";
import VideoIntro from "../components/Home/VideoIntro";
import OurGallery from "../components/Values/OurGallery";
import Faq from "../components/FAQ/Faq";

export default function Abouts() {
  return (
    <div className="about-page-australia">
      <Breadcrumb
        title="About KSD Homes"
        image="/images/ksd-stone-02.jpg"
        labels={{ about: "About KSD Homes" }}
      />
      <About />
      <OurValues />
      <VideoIntro />
      <OurGallery />
      <Faq />
    </div>
  );
}
