import React from 'react'
import Breadcrumb from '../components/Breadcrumb/Breadcrumb'
import ProjectDetails from '../components/Projects/ProjectDetails'
import GallerySlider from '../components/GallerSlider/GallerySlider'

function ProjectDetail() {
  return (
    <div>
        <Breadcrumb/>
      <ProjectDetails/>
      <GallerySlider/>
    </div>
  )
}

export default ProjectDetail
