import React from "react";
import Breadcrumb from "../components/Breadcrumb/Breadcrumb";
import Project from "../components/Projects/Project";

function Projects() {
  return (
    <div>
      <Breadcrumb title="Our Collection" image="/Image/banner1.jpeg" labels={{ projects: "Projects" }} />
      <Project />
    </div>
  );
}

export default Projects;
