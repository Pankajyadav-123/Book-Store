import React from 'react'
import { Link } from 'react-router-dom'
import { assets } from '../assets/assets.js'

const Hero = () => {
  return (
    <section className="relative w-full overflow-hidden bg-white py-16">
      <div className="absolute left-[-50px] top-0 h-52 w-52 rounded-full bg-emerald-100/50 blur-3xl" />
      <div className="absolute right-[-60px] top-24 h-72 w-72 rounded-full bg-stone-100/70 blur-3xl" />

      <div className="relative mx-auto w-full px-4 sm:px-6 lg:px-10">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="space-y-8 lg:pr-10">
            <span className="inline-flex rounded-full bg-white px-4 py-2 text-sm font-semibold text-emerald-800 shadow-sm">
              Curated Book Selection
            </span>

            <div className="max-w-2xl space-y-6">
              <h1 className="text-4xl font-semibold tracking-tight text-stone-950 sm:text-5xl lg:text-6xl">
                One outstanding book. One simple story.
              </h1>
              <p className="text-base leading-8 text-stone-700 sm:text-lg">
                Browse a hand-picked collection presented with calm, clarity, and an elegant reading experience.
              </p>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <Link
                to="/collection"
                className="inline-flex items-center justify-center rounded-full bg-emerald-600 px-8 py-3 text-sm font-semibold text-white transition hover:bg-stone-700"
              >
                Browse Collection
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center rounded-full border border-stone-300 bg-white px-8 py-3 text-sm font-semibold text-stone-900 transition hover:bg-stone-100"
              >
                Contact Us
              </Link>
            </div>
          </div>

          <div className="flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[680px] overflow-hidden rounded-[2rem] bg-white border border-stone-200 shadow-sm">
              <img
                src={assets.hero}
                alt="Featured book"
                className="w-full object-contain object-center py-8 px-4 sm:px-6"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero;
