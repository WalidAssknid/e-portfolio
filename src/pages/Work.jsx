import React from 'react'
import Projects from '../sections/Projects'
import Experiences from '../sections/Experiences'
import InterMobility from '../sections/InterMobility'
import SocialEng from '../sections/SocialEng'
import Activities from '../sections/Activities'

const Work = () => {
  return (
    <div className="space-y-8">
      <Projects />
      <Experiences />
      <InterMobility />
      <SocialEng />
      <Activities />
    </div>
  )
}

export default Work
