import FadeIn from './FadeIn'

const WHATSAPP_NUMBER = '2348165642323'
const WHATSAPP_MESSAGE = 'Hello Nonso! I found your portfolio and would like to discuss a project.'
const EMAIL = 'nonso@koeta.io'
const LINKEDIN = 'https://linkedin.com/in/nonsodev'

const contacts = [
  {
    label: 'WhatsApp',
    description: 'Chat with me directly — fastest way to reach me',
    action: 'Message Me',
    href: 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(WHATSAPP_MESSAGE),
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
    ),
    color: '#25D366',
  },
  {
    label: 'Email',
    description: 'For detailed project briefs and proposals',
    action: 'Send Email',
    href: 'mailto:' + EMAIL,
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="2"/>
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
      </svg>
    ),
    color: '#B600A8',
  },
  {
    label: 'LinkedIn',
    description: 'Connect professionally and see my full work history',
    action: 'Connect',
    href: LINKEDIN,
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
        <rect x="2" y="9" width="4" height="12"/>
        <circle cx="4" cy="4" r="2"/>
      </svg>
    ),
    color: '#0A66C2',
  },
]

export default function ContactSection() {
  return (
    <section
      id="contact"
      style={{ background: '#0C0C0C', padding: 'clamp(60px, 10vw, 120px) clamp(20px, 6vw, 80px)' }}
    >
      {/* Heading */}
      <FadeIn delay={0} y={40}>
        <h2
          className="hero-heading font-black uppercase leading-none tracking-tight text-center"
          style={{ fontSize: 'clamp(3rem, 12vw, 140px)', marginBottom: 'clamp(16px, 3vw, 32px)' }}
        >
          Contact
        </h2>
      </FadeIn>

      <FadeIn delay={0.1} y={20}>
        <p
          className="text-center font-light uppercase tracking-widest"
          style={{ color: '#D7E2EA', opacity: 0.5, fontSize: 'clamp(0.75rem, 1.5vw, 1rem)', marginBottom: 'clamp(40px, 8vw, 80px)' }}
        >
          Let&apos;s build something incredible together
        </p>
      </FadeIn>

      {/* Contact cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: 'clamp(16px, 3vw, 24px)',
          maxWidth: '1000px',
          margin: '0 auto',
        }}
      >
        {contacts.map((c, i) => (
          <FadeIn key={c.label} delay={i * 0.12} y={30}>
            <div
              style={{
                border: '1px solid rgba(215,226,234,0.15)',
                borderRadius: '24px',
                padding: 'clamp(24px, 4vw, 40px)',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
                background: 'rgba(215,226,234,0.03)',
                transition: 'border-color 0.3s, background 0.3s',
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLDivElement
                el.style.borderColor = c.color
                el.style.background = 'rgba(215,226,234,0.06)'
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLDivElement
                el.style.borderColor = 'rgba(215,226,234,0.15)'
                el.style.background = 'rgba(215,226,234,0.03)'
              }}
            >
              {/* Icon */}
              <div style={{ color: c.color }}>{c.icon}</div>

              {/* Label */}
              <div>
                <p
                  className="font-black uppercase"
                  style={{ color: '#D7E2EA', fontSize: 'clamp(1.2rem, 2.5vw, 1.8rem)', lineHeight: 1 }}
                >
                  {c.label}
                </p>
                <p
                  className="font-light"
                  style={{ color: '#D7E2EA', opacity: 0.5, fontSize: 'clamp(0.75rem, 1.3vw, 0.95rem)', marginTop: '8px', lineHeight: 1.5 }}
                >
                  {c.description}
                </p>
              </div>

              {/* CTA */}
              <a
                href={c.href}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  marginTop: 'auto',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  color: c.color,
                  fontWeight: 600,
                  fontSize: 'clamp(0.8rem, 1.4vw, 1rem)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  textDecoration: 'none',
                  transition: 'opacity 0.2s',
                }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.opacity = '0.7')}
                onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.opacity = '1')}
              >
                {c.action}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </a>
            </div>
          </FadeIn>
        ))}
      </div>

      {/* Footer note */}
      <FadeIn delay={0.4} y={20}>
        <p
          className="text-center font-light"
          style={{ color: '#D7E2EA', opacity: 0.3, fontSize: 'clamp(0.65rem, 1.2vw, 0.85rem)', marginTop: 'clamp(40px, 8vw, 80px)', letterSpacing: '0.1em' }}
        >
          Built by NonsoDev &mdash; Koeta Limited &copy; {new Date().getFullYear()}
        </p>
      </FadeIn>
    </section>
  )
}
