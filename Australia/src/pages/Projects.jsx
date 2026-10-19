import React from "react";
import Breadcrumb from "../components/Breadcrumb/Breadcrumb";
import Project from "../components/Projects/Project";

function Projects() {
  return (
    <div>
      <Breadcrumb title="Our Collection" image="/images/ksd-stone-07.jpg" labels={{ projects: "Projects" }} />
      <Project />
    </div>
  );
}

export default Projects;
