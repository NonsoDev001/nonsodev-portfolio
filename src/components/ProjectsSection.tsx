import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import FadeIn from './FadeIn'

const projects = [
  {
    num: '01',
    name: 'TaxPaddy',
    category: 'Product · iOS & Android App',
    liveUrl: 'https://www.taxpaddy.com',
    images: {
      col1a: 'https://i.ibb.co/ZvYtQ4s/TAXPADDY-SCREEENSHOTS-1.png',
      col1b: 'https://i.ibb.co/VYT85wCp/IMG-20251215-WA0012-1.jpg',
      col2: 'https://i.ibb.co/TM5tBqjT/IMG-6665.png',
    },
  },
  {
    num: '02',
    name: 'PetNutri AI',
    category: 'Product · iOS Mobile App',
    liveUrl: '#',
    images: {
      col1a: 'https://i.ibb.co/mVryGmwf/Screenshot-2026-04-16-00-10-35-845-com-freetaldev-petnutri-2.jpg',
      col1b: 'https://i.ibb.co/QFz04kD6/Screenshot-2026-04-15-02-06-41-377-com-freetaldev-petnutri-2.jpg',
      col2: 'https://i.ibb.co/mVryGmwf/Screenshot-2026-04-16-00-10-35-845-com-freetaldev-petnutri-2.jpg',
    },
  },
  {
    num: '03',
    name: 'HAP Properties',
    category: 'Client · WhatsApp AI Agent',
    liveUrl: '#',
    images: {
      col1a: 'https://i.ibb.co/ZvYtQ4s/TAXPADDY-SCREEENSHOTS-1.png',
      col1b: 'https://i.ibb.co/VYT85wCp/IMG-20251215-WA0012-1.jpg',
      col2: 'https://i.ibb.co/TM5tBqjT/IMG-6665.png',
    },
  },
]

const totalCards = projects.length

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'end start'],
  })

  const targetScale = 1 - (totalCards - 1 - index) * 0.03
  const scale = useTransform(scrollYProgress, [0, 1], [1, targetScale])
  const borderRadius = 'clamp(20px, 4vw, 50px)'

  return (
    <div
      ref={cardRef}
      className="h-[85vh] flex items-start justify-center"
      style={{ paddingTop: `${index * 28}px` }}
    >
      <motion.div
        className="sticky w-full border-2 p-4 sm:p-6 md:p-8"
        style={{
          top: `${96 + index * 28}px`,
          scale,
          borderColor: '#D7E2EA',
          background: '#0C0C0C',
          borderRadius,
          transformOrigin: 'top center',
        }}
      >
        {/* Top row */}
        <div className="flex items-center justify-between mb-4 sm:mb-6 flex-wrap gap-3">
          <div className="flex items-center gap-3 sm:gap-6">
            <span
              className="font-black leading-none"
              style={{ color: '#D7E2EA', fontSize: 'clamp(1.8rem, 5vw, 70px)', opacity: 0.3 }}
            >
              {project.num}
            </span>
            <div>
              <p
                className="font-light uppercase tracking-widest"
                style={{ color: '#D7E2EA', opacity: 0.5, fontSize: 'clamp(0.6rem, 1.1vw, 0.85rem)' }}
              >
                {project.category}
              </p>
              <p
                className="font-black uppercase leading-tight"
                style={{ color: '#D7E2EA', fontSize: 'clamp(1rem, 3vw, 2.8rem)' }}
              >
                {project.name}
              </p>
            </div>
          </div>
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border-2 font-medium uppercase tracking-widest transition-colors hover:bg-white/10"
            style={{
              borderColor: '#D7E2EA',
              color: '#D7E2EA',
              padding: 'clamp(8px, 1vw, 14px) clamp(16px, 2.5vw, 40px)',
              fontSize: 'clamp(0.65rem, 1.2vw, 0.95rem)',
            }}
          >
            Live Project
          </a>
        </div>

        {/* Image grid */}
        <div
          className="flex gap-3 sm:gap-4"
          style={{ height: 'clamp(220px, 38vw, 540px)' }}
        >
          {/* Left col — 40% — two stacked images */}
          <div className="flex flex-col gap-3 sm:gap-4" style={{ width: '40%' }}>
            <img
              src={project.images.col1a}
              alt={project.name}
              className="w-full object-cover object-top"
              style={{ height: 'clamp(100px, 15vw, 210px)', borderRadius }}
            />
            <img
              src={project.images.col1b}
              alt={project.name}
              className="w-full object-cover object-top flex-1"
              style={{ borderRadius, minHeight: 0 }}
            />
          </div>

          {/* Right col — 60% — one tall image */}
          <div style={{ width: '60%' }}>
            <img
              src={project.images.col2}
              alt={project.name}
              className="w-full h-full object-cover object-top"
              style={{ borderRadius }}
            />
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default function ProjectsSection() {
  return (
    <section
      id="projects"
      className="rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 z-10 relative px-4 sm:px-6 md:px-8 pt-20 pb-32"
      style={{ background: '#0C0C0C' }}
    >
      <FadeIn delay={0} y={40}>
        <h2
          className="hero-heading font-black uppercase leading-none tracking-tight text-center mb-4"
          style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
        >
          Projects
        </h2>
      </FadeIn>

      <div className="flex flex-col">
        {projects.map((project, i) => (
          <ProjectCard key={project.num} project={project} index={i} />
        ))}
      </div>
    </section>
  )
}
