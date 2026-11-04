import React from 'react'
import Breadcrumb from '../components/Breadcrumb/Breadcrumb'
import Blog from '../components/Blogs/Blog'

function Blogs() {
  return (
    <div>
        <Breadcrumb title="Journal" image="/Image/banner2.jpeg" />
        <Blog/>
    </div>
  )
}

export default Blogs
