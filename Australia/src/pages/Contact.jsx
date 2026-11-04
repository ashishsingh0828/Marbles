import React from 'react'
import ContactForm from '../components/ContactForm/ContactForm'
import Breadcrumb from '../components/Breadcrumb/Breadcrumb'

function Contact() {
  return (
    <div>
        <Breadcrumb title="Enquire" image="/Image/banner1.jpeg" />
      <ContactForm/>
    </div>
  )
}

export default Contact
