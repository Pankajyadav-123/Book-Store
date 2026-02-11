import React from 'react'
import Hero from '../components/Hero.jsx'
import LatesCollection from '../components/LatestColection.jsx'
import BestSeller from '../components/Bestseller.jsx'
import OurPolicy from '../components/ourPolicy.jsx'

export default function Home() {
  return (
    <>
      <Hero />
      <LatesCollection />
      <BestSeller />
      <OurPolicy />
    </>
  )
}
