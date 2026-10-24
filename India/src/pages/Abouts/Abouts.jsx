import React from "react";
import PageBanner from "../../components/Breadcrumb/Breadcrumb";
import About from "../../components/About/About";
import OurValues from "../../components/Values/OurValues";
import OurGallery from "../../components/Values/OurGallery";
import WhyChooseUs from "../../components/Values/WhyChooseUs";
import OurBenefits from "../../components/Values/OurBenefits";
import Faq from "../../components/FAQ/Faq";
import { IMG } from "../../data/images";

export default function Abouts() {
  return (
    <div className="abouts-page">
      <PageBanner
        title="About IE Marbles"
        breadcrumbs={[{ label: "Home", path: "/" }, { label: "About Us" }]}
        bgImage={IMG.hero2}
      />
      <About />
      <OurValues />
      <OurGallery bgImage={IMG.hero3} />
      <WhyChooseUs />
      <OurBenefits bgImage={IMG.hero4} videoUrl="https://www.youtube.com/watch?v=aqz-KE-bpKQ" />
      <Faq />
    </div>
  );
}
