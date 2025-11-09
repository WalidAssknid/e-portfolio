import React from 'react'
import Projects from '../sections/Projects'
import Experiences from '../sections/Experiences'
import InterMobility from '../sections/InterMobility'
import SocialEng from '../sections/SocialEng'
import Activities from '../sections/Activities'
import EngCourses from '../components/EngCourses'

const Work = () => {
  return (
    <div className="space-y-8">
      <Projects />
      <Experiences />
      <InterMobility />
      <SocialEng />
      <Activities />
      <EngCourses />
    </div>
  )
}

export default Work
