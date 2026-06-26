import { useEffect, useState } from 'react'
import FadeIn from './FadeIn'
import Magnet from './Magnet'
import ContactButton from './ContactButton'

const roles = ['AI Agents', 'Automation', 'Mobile Apps', 'WhatsApp Bots']
const navLinks = ['About', 'Services', 'Projects', 'Contact']

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
      style={{ overflowX: 'clip', background: '#0C0C0C', minHeight: '100svh', display: 'flex', flexDirection: 'column' }}
    >
      <FadeIn delay={0} y={-20}>
        <nav style={{ display: 'flex', justifyContent: 'space-between', padding: '16px 20px 0' }}>
          {navLinks.map((link) => (
            <a
              key={link}
              href={'#' + link.toLowerCase()}
              style={{
                color: '#D7E2EA',
                fontWeight: 500,
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                fontSize: 'clamp(0.65rem, 2.5vw, 1.2rem)',
                textDecoration: 'none',
                transition: 'opacity 0.2s',
              }}
            >
              {link}
            </a>
          ))}
        </nav>
      </FadeIn>

      <div className="flex md:hidden flex-col items-center flex-1 pb-6">
        <FadeIn delay={0.15} y={40}>
          <h1
            className="hero-heading font-black uppercase tracking-tight leading-none text-center"
            style={{ fontSize: 'clamp(3.5rem, 18vw, 6rem)', marginTop: '12px' }}
          >
            NonsoDev
          </h1>
        </FadeIn>

        <FadeIn delay={0.4} y={30}>
          <img
            src="https://i.ibb.co/wZ65w8Lg/20dcd5d5573a678b562c19b9fceb7b29-removebg-preview.png"
            alt="NonsoDev 3D Avatar"
            style={{ width: 'clamp(200px, 65vw, 320px)', display: 'block', margin: '0 auto' }}
            className="object-contain select-none pointer-events-none"
            draggable={false}
          />
        </FadeIn>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', width: '100%', padding: '0 20px', marginTop: 'auto' }}>
          <FadeIn delay={0.5} y={20}>
            <div style={{ color: '#D7E2EA', fontSize: 'clamp(0.6rem, 3.5vw, 0.9rem)', textTransform: 'uppercase', letterSpacing: '0.05em', lineHeight: 1.4, maxWidth: '55%', fontWeight: 300 }}>
              <span>building </span>
              <span style={{ color: '#B600A8', fontWeight: 700 }}>
                {displayed}
                <span>|</span>
              </span>
              <span> for businesses worldwide</span>
            </div>
          </FadeIn>
          <FadeIn delay={0.6} y={20}>
            <ContactButton />
          </FadeIn>
        </div>
      </div>

      <div className="hidden md:flex flex-col flex-1 relative">
        <div style={{ overflow: 'hidden' }}>
          <FadeIn delay={0.15} y={40}>
            <h1
              className="hero-heading font-black uppercase tracking-tight leading-none w-full"
              style={{ fontSize: 'clamp(5rem, 11vw, 13vw)', paddingLeft: '2vw', whiteSpace: 'nowrap', marginTop: '-8px' }}
            >
              NonsoDev
            </h1>
          </FadeIn>
        </div>

        <div
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -42%)',
            zIndex: 10,
          }}
        >
          <FadeIn delay={0.6} y={30}>
            <Magnet padding={100} strength={3}>
              <img
                src="https://i.ibb.co/wZ65w8Lg/20dcd5d5573a678b562c19b9fceb7b29-removebg-preview.png"
                alt="NonsoDev 3D Avatar"
                style={{ width: 'clamp(280px, 30vw, 500px)' }}
                className="object-contain select-none pointer-events-none"
                draggable={false}
              />
            </Magnet>
          </FadeIn>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: 'auto', padding: '0 40px 32px' }}>
          <FadeIn delay={0.35} y={20}>
            <div style={{ color: '#D7E2EA', fontSize: 'clamp(0.75rem, 1.4vw, 1.4rem)', textTransform: 'uppercase', letterSpacing: '0.08em', lineHeight: 1.4, maxWidth: 'clamp(160px, 22vw, 280px)', fontWeight: 300 }}>
              <span>building </span>
              <span style={{ color: '#B600A8', fontWeight: 700 }}>
                {displayed}
                <span>|</span>
              </span>
              <span> for businesses worldwide</span>
            </div>
          </FadeIn>
          <FadeIn delay={0.5} y={20}>
            <ContactButton />
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
