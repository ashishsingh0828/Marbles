import React from "react";
import PageBanner from "../../components/Breadcrumb/Breadcrumb";
import About from "../../components/About/About";
import OurValues from "../../components/Values/OurValues";
import OurGallery from "../../components/Values/OurGallery";
import WhyChooseUs from "../../components/Values/WhyChooseUs";
import ClientFeedback from "../../components/Values/ClientFeedback";
import OurBenefits from "../../components/Values/OurBenefits";
import Faq from "../../components/FAQ/Faq";

export default function Abouts() {
  return (
    <div className="abouts-page">
      <PageBanner
        title="About Our Marble Legacy"
        crumbs={[{ label: "Home", to: "/" }, { label: "About Us" }]}
      />
      <About />
      <OurValues />
      <OurGallery />
      <WhyChooseUs />
      <ClientFeedback />
      <OurBenefits />
      <Faq />
    </div>
  );
}
