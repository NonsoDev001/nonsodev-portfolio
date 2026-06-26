import { useEffect, useState } from 'react'
import FadeIn from './FadeIn'
import Magnet from './Magnet'

const roles = ['AI Agents', 'Automation', 'Mobile Apps', 'WhatsApp Bots']
const navLinks = ['About', 'Services', 'Projects', 'Contact']

const WHATSAPP_NUMBER = '2348165642323'
const WHATSAPP_MESSAGE = 'Hello Nonso! I found your portfolio and would like to discuss a project.'

function WhatsAppButton() {
  const url = 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(WHATSAPP_MESSAGE)
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '10px',
        background: 'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
        boxShadow: '0px 4px 4px rgba(181,1,167,0.25), inset 4px 4px 12px #7721B1',
        outline: '2px solid white',
        outlineOffset: '-3px',
        borderRadius: '9999px',
        padding: '12px 24px',
        color: 'white',
        fontWeight: 500,
        textTransform: 'uppercase',
        letterSpacing: '0.12em',
        fontSize: 'clamp(0.65rem, 1.5vw, 0.95rem)',
        textDecoration: 'none',
        whiteSpace: 'nowrap',
      }}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
      WhatsApp Me
    </a>
  )
}

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
    <section style={{ overflowX: 'clip', background: '#0C0C0C', minHeight: '100svh', display: 'flex', flexDirection: 'column' }}>

      {/* ── NAVBAR ── */}
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

      {/* ══════════════════════════════════
          MOBILE LAYOUT (hidden on md+)
      ══════════════════════════════════ */}
      <div className="flex md:hidden flex-col items-center flex-1" style={{ padding: '0 20px 24px' }}>

        {/* Name */}
        <FadeIn delay={0.15} y={40}>
          <h1
            className="hero-heading font-black uppercase tracking-tight leading-none text-center w-full"
            style={{ fontSize: 'clamp(3rem, 17vw, 5rem)', marginTop: '8px' }}
          >
            NonsoDev
          </h1>
        </FadeIn>

        {/* Face */}
        <FadeIn delay={0.35} y={30}>
          <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
            <img
              src="https://i.ibb.co/wZ65w8Lg/20dcd5d5573a678b562c19b9fceb7b29-removebg-preview.png"
              alt="NonsoDev 3D Avatar"
              style={{ width: 'clamp(180px, 58vw, 260px)', display: 'block' }}
              className="object-contain select-none pointer-events-none"
              draggable={false}
            />
          </div>
        </FadeIn>

        {/* Typing text — RIGHT BELOW FACE */}
        <FadeIn delay={0.5} y={20}>
          <div
            style={{
              color: '#D7E2EA',
              fontSize: 'clamp(1rem, 5vw, 1.4rem)',
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              lineHeight: 1.5,
              fontWeight: 300,
              textAlign: 'center',
              marginTop: '12px',
            }}
          >
            <span>Building </span>
            <span style={{ color: '#B600A8', fontWeight: 700 }}>
              {displayed}
              <span>|</span>
            </span>
            <br />
            <span>for businesses worldwide</span>
          </div>
        </FadeIn>

        {/* WhatsApp button — pushed to bottom */}
        <div style={{ marginTop: 'auto', paddingTop: '32px' }}>
          <FadeIn delay={0.65} y={20}>
            <WhatsAppButton />
          </FadeIn>
        </div>
      </div>

      {/* ══════════════════════════════════
          DESKTOP LAYOUT (hidden below md)
      ══════════════════════════════════ */}
      <div className="hidden md:flex flex-col flex-1 relative">

        {/* Name */}
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

        {/* Face centered */}
        <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -42%)', zIndex: 10 }}>
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

        {/* Bottom bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: 'auto', padding: '0 40px 32px' }}>
          <FadeIn delay={0.35} y={20}>
            <div style={{ color: '#D7E2EA', fontSize: 'clamp(0.75rem, 1.4vw, 1.4rem)', textTransform: 'uppercase', letterSpacing: '0.08em', lineHeight: 1.4, maxWidth: 'clamp(160px, 22vw, 280px)', fontWeight: 300 }}>
              <span>Building </span>
              <span style={{ color: '#B600A8', fontWeight: 700 }}>
                {displayed}
                <span>|</span>
              </span>
              <span> for businesses worldwide</span>
            </div>
          </FadeIn>
          <FadeIn delay={0.5} y={20}>
            <WhatsAppButton />
          </FadeIn>
        </div>
      </div>

    </section>
  )
}
