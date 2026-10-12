import React from 'react'
import Breadcrumb from '../components/Breadcrumb/Breadcrumb'
import Service from '../components/Services/Service'
import GallerySlider from '../components/GallerSlider/GallerySlider'
import Faq from '../components/FAQ/Faq'

function Services() {
  return (
    <div>
        <Breadcrumb/>
      <Service/>
      <GallerySlider/>
      <Faq/>
    </div>
  )
}

export default Services
