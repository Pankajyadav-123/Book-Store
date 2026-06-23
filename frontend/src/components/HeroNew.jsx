import React from 'react'
import { Link } from 'react-router-dom'
import { assets } from '../assets/assets.js'

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-[#f7f3ec] py-10">
      <div className="absolute left-0 top-0 h-40 w-40 rounded-full bg-amber-100/80 blur-3xl" />
      <div className="absolute right-0 top-16 h-56 w-56 rounded-full bg-emerald-100/80 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6">
        <header className="flex items-center justify-between py-6">
          <span className="text-2xl font-serif font-semibold tracking-[0.35em] text-stone-900">BOOKSAW</span>
          <nav className="hidden items-center gap-8 text-sm uppercase tracking-[0.32em] text-stone-600 md:flex">
            <Link to="/" className="text-stone-900">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/collection">Pages</Link>
            <Link to="/shop">Shop</Link>
            <Link to="/articles">Articles</Link>
            <Link to="/contact">Contact</Link>
          </nav>
          <button className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-stone-300 bg-white text-stone-700 shadow-sm md:hidden">
            <span className="text-xl">≡</span>
          </button>
        </header>

        <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div className="space-y-8">
            <div className="max-w-xl space-y-6">
              <h1 className="text-4xl font-semibold leading-tight tracking-tight text-stone-900 sm:text-5xl lg:text-6xl">
                Life Of The Wild
              </h1>
              <p className="text-base leading-8 text-stone-600 sm:text-lg">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <Link
                to="/collection"
                className="inline-flex items-center justify-center rounded-full bg-stone-900 px-8 py-3 text-sm font-semibold text-white transition hover:bg-stone-700"
              >
                Read More
              </Link>
              <Link
                to="/book-detail"
                className="inline-flex items-center justify-center rounded-full border border-stone-300 bg-white px-8 py-3 text-sm font-semibold text-stone-900 transition hover:bg-stone-50"
              >
                Explore Now
              </Link>
            </div>

            <div className="flex items-center gap-4">
              <button className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-stone-300 bg-white text-stone-900 shadow-sm transition hover:bg-stone-100">
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>
              <button className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-stone-300 bg-white text-stone-900 shadow-sm transition hover:bg-stone-100">
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
            </div>

            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-stone-900" />
              <span className="h-2 w-2 rounded-full bg-stone-400" />
              <span className="h-2 w-2 rounded-full bg-stone-400" />
            </div>
          </div>

          <div className="relative mx-auto max-w-xl">
            <div className="relative overflow-hidden rounded-[2rem] border border-stone-200 bg-white shadow-[0_40px_120px_-70px_rgba(15,23,42,0.35)]">
              <img src={assets.hero} alt="Life Of The Wild" className="h-[560px] w-full object-cover object-center" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero;
