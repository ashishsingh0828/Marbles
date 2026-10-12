import React from "react";
import Hero from "../components/Home/Hero";
import AboutUs from "../components/Home/AboutUs";
import OurBenefits from "../components/Values/OurBenefits";
import OurServices from "../components/Home/OurServices";
import GallerySlider from "../components/GallerSlider/GallerySlider";
import WhyChooseUs from "../components/Values/WhyChooseUs";
import ClientFeedback from "../components/Values/ClientFeedback";
import ContactForm from "../components/ContactForm/ContactForm";

export default function Home() {
  return (
    <div className="home-page-australia">
      <Hero />
      <AboutUs />
      <OurBenefits />
      <OurServices />
      <GallerySlider />
      <WhyChooseUs />
      <ClientFeedback />
      <ContactForm />
    </div>
  );
}
