import FadeIn from './FadeIn'

const services = [
  {
    num: '01',
    name: 'AI Agents',
    desc: 'Custom-built AI agents that automate conversations, qualify leads, and handle operations — on WhatsApp, web, or any platform your business runs on.',
  },
  {
    num: '02',
    name: 'WhatsApp Automation',
    desc: 'End-to-end WhatsApp Business API integrations with smart persona-driven bots, voice notes, Google Sheets logging, and full conversation flows.',
  },
  {
    num: '03',
    name: 'Mobile Apps',
    desc: 'React Native / Expo mobile apps for iOS and Android — from concept to App Store submission, with Supabase backend and real-time features built in.',
  },
  {
    num: '04',
    name: 'Web Development',
    desc: 'Fast, modern Next.js and React web apps deployed on Vercel — clean UI, great UX, and scalable architecture tailored to your business needs.',
  },
  {
    num: '05',
    name: 'Automation & APIs',
    desc: 'Connect your tools, automate workflows, and integrate third-party APIs — Paystack, ElevenLabs, OpenAI, Google Sheets, and more — into one seamless system.',
  },
]

export default function ServicesSection() {
  return (
    <section
      id="services"
      className="bg-white rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32"
    >
      <FadeIn delay={0} y={40}>
        <h2
          className="font-black uppercase text-center mb-16 sm:mb-20 md:mb-28"
          style={{ color: '#0C0C0C', fontSize: 'clamp(3rem, 12vw, 160px)' }}
        >
          Services
        </h2>
      </FadeIn>

      <div className="max-w-5xl mx-auto">
        {services.map((s, i) => (
          <FadeIn key={s.num} delay={i * 0.1} y={30}>
            <div
              className="flex items-start gap-4 sm:gap-8 py-8 sm:py-10 md:py-12"
              style={{
                borderTop: i === 0 ? '1px solid rgba(12,12,12,0.15)' : undefined,
                borderBottom: '1px solid rgba(12,12,12,0.15)',
              }}
            >
              <span
                className="font-black leading-none flex-shrink-0"
                style={{ color: '#0C0C0C', fontSize: 'clamp(3rem, 10vw, 140px)' }}
              >
                {s.num}
              </span>
              <div className="flex flex-col justify-center pt-2 sm:pt-4">
                <span
                  className="font-medium uppercase"
                  style={{ color: '#0C0C0C', fontSize: 'clamp(1rem, 2.2vw, 2.1rem)' }}
                >
                  {s.name}
                </span>
                <span
                  className="font-light leading-relaxed max-w-2xl mt-1"
                  style={{
                    color: '#0C0C0C',
                    opacity: 0.6,
                    fontSize: 'clamp(0.85rem, 1.6vw, 1.25rem)',
                  }}
                >
                  {s.desc}
                </span>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  )
}
