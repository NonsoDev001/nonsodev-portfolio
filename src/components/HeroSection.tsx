import { useEffect, useState } from 'react'
import FadeIn from './FadeIn'
import Magnet from './Magnet'
import ContactButton from './ContactButton'

const roles = ['AI Agents', 'Automation', 'Mobile Apps', 'WhatsApp Bots']

export default function HeroSection() {
  const [roleIndex, setRoleIndex] = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const current = roles[roleIndex]
    let timeout: ReturnType<typeof setTimeout>

    if (!deleting && displayed.length < current.length) {
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 80)
    } else if (!deleting && displayed.length === current.length) {
      timeout = setTimeout(() => setDeleting(true), 2000)
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 45)
    } else if (deleting && displayed.length === 0) {
      setDeleting(false)
      setRoleIndex((prev) => (prev + 1) % roles.length)
    }

    return () => clearTimeout(timeout)
  }, [displayed, deleting, roleIndex])

  return (
    <section
      className="h-screen flex flex-col relative"
      style={{ overflowX: 'clip', background: '#0C0C0C' }}
    >
      {/* Navbar */}
      <FadeIn delay={0} y={-20}>
        <nav className="flex justify-between px-4 sm:px-6 md:px-10 pt-4 sm:pt-6 md:pt-8">
          {['About', 'Services', 'Projects', 'Contact'].map((link) => (
            
              key={link}
              href={`#${link.toLowerCase()}`}
              className="text-[0.65rem] sm:text-sm md:text-lg lg:text-[1.4rem] font-medium uppercase tracking-wider transition-opacity duration-200 hover:opacity-70"
              style={{ color: '#D7E2EA' }}
            >
              {link}
            </a>
          ))}
        </nav>
      </FadeIn>

      {/* Hero Heading — reduced font size */}
      <div className="overflow-hidden">
        <FadeIn delay={0.15} y={40}>
          <h1
            className="hero-heading font-black uppercase tracking-tight leading-none w-full"
            style={{
              fontSize: 'clamp(3rem, 12vw, 13vw)',
              paddingLeft: '2vw',
              whiteSpace: 'nowrap',
            }}
          >
            NonsoDev
          </h1>
        </FadeIn>
      </div>

      {/* Centered 3D Face */}
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -40%)',
          zIndex: 10,
        }}
      >
        <FadeIn delay={0.6} y={30}>
          <Magnet padding={100} strength={3}>
            <img
              src="https://i.ibb.co/wZ65w8Lg/20dcd5d5573a678b562c19b9fceb7b29-removebg-preview.png"
              alt="NonsoDev 3D Avatar"
              style={{ width: 'clamp(180px, 28vw, 460px)' }}
              className="object-contain select-none pointer-events-none"
              draggable={false}
            />
          </Magnet>
        </FadeIn>
      </div>

      {/* Bottom bar */}
      <div className="flex justify-between items-end mt-auto pb-4 sm:pb-6 md:pb-10 px-4 sm:px-6 md:px-10">
        {/* Left text */}
        <FadeIn delay={0.35} y={20}>
          <p
            className="font-light uppercase tracking-wide leading-snug"
            style={{
              color: '#D7E2EA',
              fontSize: 'clamp(0.6rem, 1.8vw, 1.5rem)',
              maxWidth: 'clamp(140px, 25vw, 300px)',
            }}
          >
            building{' '}
            <span className="font-bold" style={{ color: '#B600A8' }}>
              {displayed}
              <span className="animate-pulse">|</span>
            </span>{' '}
            for businesses worldwide
          </p>
        </FadeIn>

        {/* Contact button */}
        <FadeIn delay={0.5} y={20}>
          <ContactButton />
        </FadeIn>
      </div>
    </section>
  )
}
