import React from "react";
import Breadcrumb from "../components/Breadcrumb/Breadcrumb";
import Service from "../components/Services/Service";

function Services() {
  return (
    <div>
      <Breadcrumb title="Services" image="/images/ksd-stone-09.jpg" />
      <Service />
    </div>
  );
}

export default Services;
