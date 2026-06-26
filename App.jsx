import { useState, useEffect, useRef } from "react";

const PORTRAIT_URL = "https://i.ibb.co/wZ65w8Lg/20dcd5d5573a678b562c19b9fceb7b29-removebg-preview.png";

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Kanit:wght@300;400;500;600;700;800;900&display=swap');
.nd-root * { box-sizing: border-box; }
.nd-root { font-family: 'Kanit', sans-serif; background: #0C0C0C; color: white; overflow-x: clip; }
.hero-grad { background: linear-gradient(180deg, #646973 0%, #BBCCD7 100%); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; }
.nav-a { color: #D7E2EA; text-decoration: none; text-transform: uppercase; letter-spacing: 0.12em; font-weight: 500; transition: opacity 0.2s; font-size: clamp(0.7rem, 1.1vw, 1.05rem); }
.nav-a:hover { opacity: 0.55; }
.cta-btn { background: linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%); box-shadow: 0 4px 4px rgba(181,1,167,.25), inset 4px 4px 12px #7721B1; outline: 2px solid white; outline-offset: -3px; border-radius: 9999px; color: white; font-weight: 500; text-transform: uppercase; letter-spacing: 0.15em; border: none; cursor: pointer; font-family: 'Kanit', sans-serif; transition: opacity .2s, transform .2s; text-decoration: none; display: inline-block; white-space: nowrap; }
.cta-btn:hover { opacity: .85; transform: scale(1.03); }
.live-btn { border-radius: 9999px; border: 2px solid #D7E2EA; color: #D7E2EA; background: transparent; text-transform: uppercase; letter-spacing: .15em; font-family: 'Kanit', sans-serif; font-weight: 500; cursor: pointer; text-decoration: none; display: inline-block; transition: background .2s; white-space: nowrap; }
.live-btn:hover { background: rgba(215,226,234,.1); }
.svc-row { border-top: 1px solid rgba(12,12,12,0.18); padding: clamp(1.5rem,2.5vw,3rem) 0; display: flex; align-items: flex-start; gap: clamp(1rem, 3vw, 3rem); }
.svc-row:last-child { border-bottom: 1px solid rgba(12,12,12,0.18); }
.proj-card { border-radius: clamp(28px, 4vw, 60px); border: 2px solid #D7E2EA; background: #0C0C0C; position: sticky; transform-origin: top center; }
.stat-pill { background: rgba(215,226,234,0.06); border: 1px solid rgba(215,226,234,0.15); border-radius: 9999px; padding: 0.5rem 1.25rem; font-size: clamp(0.7rem, 1vw, 0.9rem); color: rgba(215,226,234,0.65); letter-spacing: 0.05em; display: flex; align-items: center; gap: 0.5rem; }
@keyframes floatY { 0%,100% { transform: translateY(0px); } 50% { transform: translateY(-16px); } }
@keyframes floatYrev { 0%,100% { transform: translateY(0px); } 50% { transform: translateY(-12px); } }
@keyframes glowPulse { 0%,100% { opacity: 0.4; transform: scale(1); } 50% { opacity: 0.8; transform: scale(1.08); } }
.float-a { animation: floatY 5.5s ease-in-out infinite; }
.float-b { animation: floatY 7s ease-in-out infinite; }
.float-c { animation: floatYrev 6s ease-in-out infinite; }
.float-d { animation: floatY 6.5s ease-in-out infinite reverse; }
`;

function StyleInjector() {
  useEffect(() => {
    if (document.getElementById('nd-css')) return;
    const el = document.createElement('style');
    el.id = 'nd-css';
    el.textContent = CSS;
    document.head.appendChild(el);
  }, []);
  return null;
}

function useReveal({ delay = 0, y = 30, x = 0 } = {}) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.opacity = '0';
    el.style.transform = `translate(${x}px,${y}px)`;
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          el.style.transition = `opacity 0.85s cubic-bezier(.25,.1,.25,1) ${delay}s, transform 0.85s cubic-bezier(.25,.1,.25,1) ${delay}s`;
          el.style.opacity = '1';
          el.style.transform = 'translate(0,0)';
        }, 0);
        io.disconnect();
      }
    }, { threshold: 0.05, rootMargin: '80px' });
    io.observe(el);
    return () => io.disconnect();
  }, [delay, x, y]);
  return ref;
}

function useEntrance(delayMs = 0, { y = 30, x = 0 } = {}) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.opacity = '0';
    el.style.transform = `translate(${x}px,${y}px)`;
    setTimeout(() => {
      el.style.transition = 'opacity 0.85s ease, transform 0.85s ease';
      el.style.opacity = '1';
      el.style.transform = 'translate(0,0)';
    }, delayMs);
  }, []);
  return ref;
}

function Magnet({ children, padding = 150, strength = 3 }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onMove = (e) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < rect.width / 2 + padding) {
        el.style.transform = `translate3d(${dx / strength}px, ${dy / strength}px, 0)`;
        el.style.transition = 'transform 0.3s ease-out';
      } else {
        el.style.transform = 'translate3d(0,0,0)';
        el.style.transition = 'transform 0.6s ease-in-out';
      }
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, [padding, strength]);
  return <div ref={ref} style={{ willChange: 'transform', display: 'inline-block' }}>{children}</div>;
}

const MARQUEE_IMGS = [
  'https://motionsites.ai/assets/hero-space-voyage-preview-eECLH3Yc.gif',
  'https://motionsites.ai/assets/hero-codenest-preview-Cgppc2qV.gif',
  'https://motionsites.ai/assets/hero-vex-ventures-preview-BczMFIiw.gif',
  'https://motionsites.ai/assets/hero-stellar-ai-v2-preview-DjvxjG3C.gif',
  'https://motionsites.ai/assets/hero-asme-preview-B_nGDnTP.gif',
  'https://motionsites.ai/assets/hero-transform-data-preview-Cx5OU29N.gif',
  'https://motionsites.ai/assets/hero-vitara-preview-Cjz2QYyU.gif',
  'https://motionsites.ai/assets/hero-terra-preview-BFjrCr7T.gif',
  'https://motionsites.ai/assets/hero-skyelite-preview-DHaZIgUv.gif',
  'https://motionsites.ai/assets/hero-aethera-preview-DknSlcTa.gif',
  'https://motionsites.ai/assets/hero-designpro-preview-D8c5_een.gif',
  'https://motionsites.ai/assets/hero-stellar-ai-preview-D3HL6bw1.gif',
  'https://motionsites.ai/assets/hero-xportfolio-preview-D4A8maiC.gif',
  'https://motionsites.ai/assets/hero-orbit-web3-preview-BXt4OttD.gif',
  'https://motionsites.ai/assets/hero-nexora-preview-cx5HmUgo.gif',
  'https://motionsites.ai/assets/hero-evr-ventures-preview-DZxeVFEX.gif',
  'https://motionsites.ai/assets/hero-planet-orbit-preview-DWAP8Z1P.gif',
  'https://motionsites.ai/assets/hero-new-era-preview-CocuDUm9.gif',
  'https://motionsites.ai/assets/hero-wealth-preview-B70idl_u.gif',
  'https://motionsites.ai/assets/hero-luminex-preview-CxOP7ce6.gif',
  'https://motionsites.ai/assets/hero-celestia-preview-0yO3jXO8.gif',
];

const SERVICES = [
  { n: '01', name: 'Vibe Coding', desc: 'Building production-ready websites and apps using AI-assisted development — delivering in days what traditional developers take weeks to build.' },
  { n: '02', name: 'AI Automation', desc: 'Smart agents that handle customer enquiries, qualify leads, respond 24/7, and feed data automatically into your CRM or Google Sheets.' },
  { n: '03', name: 'WhatsApp AI Agents', desc: 'Conversational WhatsApp bots powered by Claude that respond instantly, take bookings, qualify leads, and cut no-shows by over 80%.' },
  { n: '04', name: 'Mobile App Development', desc: 'Custom iOS and Android apps built to solve real business problems — from tax management and pet care to logistics and bookings.' },
  { n: '05', name: 'Web Experiences', desc: 'Cinematic, animated websites with virtual tours, 360° walkthroughs, AI chat bubbles and everything that makes a business impossible to ignore.' },
];

const PROJECTS = [
  { n: '01', category: 'Real Estate · AI Agent · Virtual Tour', name: 'HAP Properties', url: 'https://hap-properties.vercel.app', desc: 'Luxury real estate website with 360° virtual tour, AI-powered WhatsApp lead agent and Google Sheets auto-capture.', imgs: ['https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=900&q=85','https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=900&q=85','https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=900&q=85'] },
  { n: '02', category: 'Restaurant · WhatsApp Cloud API', name: 'Zuma Kitchen & Grill', url: '#', desc: 'Cinematic dark restaurant website with WhatsApp Cloud API ordering — customers reserve and order directly via WhatsApp.', imgs: ['https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=900&q=85','https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=900&q=85','https://images.unsplash.com/photo-1544025162-d76694265947?w=900&q=85'] },
  { n: '03', category: 'Fintech · Mobile App', name: 'TaxPaddy', url: '#', desc: 'Smart tax management app helping Nigerian individuals and SMEs calculate, track and file taxes with clarity.', imgs: ['https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=900&q=85','https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=900&q=85','https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=900&q=85'] },
  { n: '04', category: 'Pet Care · Mobile App', name: 'Petkira', url: '#', desc: 'Pet health and care app connecting owners with vets, tracking health records and managing appointments.', imgs: ['https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=900&q=85','https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=900&q=85','https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=900&q=85'] },
];

function HeroSection() {
  const navRef  = useEntrance(0,   { y: -20 });
  const h1Ref   = useEntrance(150, { y: 40 });
  const leftRef = useEntrance(350, { y: 20 });
  const btnRef  = useEntrance(500, { y: 20 });
  const portRef = useEntrance(650, { y: 30 });
  return (
    <section style={{ height:'100svh', minHeight:580, display:'flex', flexDirection:'column', background:'#0C0C0C', position:'relative', overflow:'hidden' }} id="home">
      <nav ref={navRef} style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'clamp(1rem,3vw,2rem) clamp(1.5rem,5vw,3.5rem)', zIndex:20, position:'relative' }}>
        <a href="#about"    className="nav-a">About</a>
        <a href="#services" className="nav-a">Services</a>
        <div style={{ fontSize:'clamp(1rem,2vw,1.5rem)', fontWeight:900, color:'#D7E2EA', letterSpacing:'0.12em' }}>NONSODEV</div>
        <a href="#projects" className="nav-a">Projects</a>
        <a href="https://wa.me/2348165642323" target="_blank" rel="noreferrer" className="nav-a">Contact</a>
      </nav>
      <div style={{ overflow:'hidden', zIndex:5, position:'relative' }}>
        <h1 ref={h1Ref} className="hero-grad" style={{ fontSize:'clamp(11vw,15.5vw,17vw)', fontWeight:900, textTransform:'uppercase', letterSpacing:'-0.02em', lineHeight:1, whiteSpace:'nowrap', textAlign:'center', padding:'0 0.5rem' }}>
          Hi, i&apos;m nonso
        </h1>
      </div>
      <div ref={portRef} style={{ position:'absolute', left:'50%', transform:'translateX(-50%)', bottom:0, zIndex:10, width:'clamp(240px,34vw,500px)', pointerEvents:'none' }}>
        <div style={{ position:'absolute', bottom:'10%', left:'50%', transform:'translateX(-50%)', width:'80%', height:'50%', background:'radial-gradient(ellipse, rgba(182,0,168,0.3) 0%, transparent 70%)', animation:'glowPulse 3s ease-in-out infinite', pointerEvents:'none', zIndex:0 }} />
        <Magnet padding={150} strength={3}>
          <img src={PORTRAIT_URL} alt="Nonso" style={{ width:'100%', display:'block', objectFit:'contain', objectPosition:'bottom', maxHeight:'clamp(300px,50vh,560px)', position:'relative', zIndex:1 }} />
        </Magnet>
      </div>
      <div style={{ marginTop:'auto', display:'flex', justifyContent:'space-between', alignItems:'flex-end', padding:'clamp(0.75rem,2vw,1.5rem) clamp(1.5rem,5vw,3.5rem)', paddingBottom:'clamp(1.5rem,3vw,2.5rem)', zIndex:20, position:'relative' }}>
        <p ref={leftRef} style={{ color:'#D7E2EA', fontWeight:300, textTransform:'uppercase', letterSpacing:'0.06em', lineHeight:1.4, fontSize:'clamp(0.62rem,1vw,0.95rem)', maxWidth:'clamp(120px,17vw,240px)' }}>
          a cto &amp; vibe coder driven by building things that actually work
        </p>
        <div ref={btnRef}>
          <a href="https://wa.me/2348165642323" target="_blank" rel="noreferrer" className="cta-btn" style={{ padding:'clamp(10px,1.5vw,16px) clamp(22px,3.5vw,48px)', fontSize:'clamp(0.62rem,0.9vw,0.82rem)' }}>Contact Me</a>
        </div>
      </div>
    </section>
  );
}

function MarqueeSection() {
  const sRef=useRef(null), r1Ref=useRef(null), r2Ref=useRef(null);
  const row1=[...MARQUEE_IMGS.slice(0,11),...MARQUEE_IMGS.slice(0,11),...MARQUEE_IMGS.slice(0,11)];
  const row2=[...MARQUEE_IMGS.slice(11),...MARQUEE_IMGS.slice(11),...MARQUEE_IMGS.slice(11)];
  useEffect(()=>{
    const fn=()=>{ if(!sRef.current)return; const offset=(-sRef.current.getBoundingClientRect().top+window.innerHeight)*0.3; if(r1Ref.current)r1Ref.current.style.transform=`translateX(${offset-200}px)`; if(r2Ref.current)r2Ref.current.style.transform=`translateX(${-(offset-200)}px)`; };
    window.addEventListener('scroll',fn,{passive:true}); fn(); return()=>window.removeEventListener('scroll',fn);
  },[]);
  const imgS={width:'clamp(240px,28vw,420px)',height:'clamp(155px,18vw,270px)',borderRadius:16,objectFit:'cover',flexShrink:0};
  return(
    <section ref={sRef} style={{background:'#0C0C0C',paddingTop:'clamp(5rem,9vw,10rem)',paddingBottom:'2.5rem',overflow:'hidden'}}>
      <div style={{display:'flex',flexDirection:'column',gap:12}}>
        <div style={{overflow:'hidden'}}><div ref={r1Ref} style={{display:'flex',gap:12,willChange:'transform'}}>{row1.map((src,i)=><img key={i} src={src} alt="" loading="lazy" style={imgS}/>)}</div></div>
        <div style={{overflow:'hidden'}}><div ref={r2Ref} style={{display:'flex',gap:12,willChange:'transform'}}>{row2.map((src,i)=><img key={i} src={src} alt="" loading="lazy" style={imgS}/>)}</div></div>
      </div>
    </section>
  );
}

function AboutSection() {
  const h2Ref=useReveal({delay:0,y:40}), txtRef=useReveal({delay:0.15,y:25}), statsRef=useReveal({delay:0.25,y:20}), btnRef=useReveal({delay:0.35,y:20});
  const tlRef=useReveal({delay:0.1,x:-80,y:0}), blRef=useReveal({delay:0.25,x:-80,y:0}), trRef=useReveal({delay:0.15,x:80,y:0}), brRef=useReveal({delay:0.3,x:80,y:0});
  return(
    <section id="about" style={{minHeight:'100vh',display:'flex',alignItems:'center',justifyContent:'center',position:'relative',padding:'clamp(5rem,8vw,8rem) clamp(1.5rem,5vw,4rem)'}}>
      <img ref={tlRef} src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/moon_icon.11395d36.png" alt="" className="float-a" style={{position:'absolute',top:'4%',left:'clamp(0.5rem,3vw,4rem)',width:'clamp(70px,13vw,210px)',pointerEvents:'none',zIndex:0}}/>
      <img ref={blRef} src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/p59_1.4659672e.png" alt="" className="float-b" style={{position:'absolute',bottom:'8%',left:'clamp(1rem,7vw,8rem)',width:'clamp(60px,11vw,180px)',pointerEvents:'none',zIndex:0}}/>
      <img ref={trRef} src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/lego_icon-1.703bb594.png" alt="" className="float-c" style={{position:'absolute',top:'4%',right:'clamp(0.5rem,3vw,4rem)',width:'clamp(70px,13vw,210px)',pointerEvents:'none',zIndex:0}}/>
      <img ref={brRef} src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/Group_134-1.2e04f3ce.png" alt="" className="float-d" style={{position:'absolute',bottom:'8%',right:'clamp(1rem,7vw,8rem)',width:'clamp(80px,13vw,220px)',pointerEvents:'none',zIndex:0}}/>
      <div style={{textAlign:'center',display:'flex',flexDirection:'column',alignItems:'center',gap:'clamp(1.5rem,3.5vw,3.5rem)',maxWidth:660,zIndex:1,position:'relative'}}>
        <h2 ref={h2Ref} className="hero-grad" style={{fontSize:'clamp(3rem,11vw,150px)',fontWeight:900,textTransform:'uppercase',lineHeight:1,letterSpacing:'-0.02em'}}>About me</h2>
        <p ref={txtRef} style={{color:'#D7E2EA',fontWeight:500,lineHeight:1.75,fontSize:'clamp(0.88rem,1.5vw,1.2rem)',maxWidth:580}}>With a focus on results over code, i build websites, AI agents and mobile apps that solve real problems for real businesses. As CTO &amp; co-founder of Koeta, i vibe-code products that compete at the highest level — without a single line of traditional programming. i believe the best builders aren&apos;t always the best coders.</p>
        <div ref={statsRef} style={{display:'flex',gap:'0.75rem',flexWrap:'wrap',justifyContent:'center'}}>
          <span className="stat-pill">⚡ CTO, Koeta Inc</span>
          <span className="stat-pill">🛠 Vibe Coder</span>
          <span className="stat-pill">🤖 AI Builder</span>
          <span className="stat-pill">🇳🇬 Abuja, Nigeria</span>
        </div>
        <div ref={btnRef}><a href="https://wa.me/2348165642323" target="_blank" rel="noreferrer" className="cta-btn" style={{padding:'clamp(10px,1.5vw,16px) clamp(28px,4vw,52px)',fontSize:'clamp(0.7rem,1vw,0.88rem)'}}>Let&apos;s Build Together</a></div>
      </div>
    </section>
  );
}

function ServiceItem({svc,index}){
  const ref=useReveal({delay:index*0.08,y:24});
  return(<div ref={ref} className="svc-row"><span style={{fontWeight:900,fontSize:'clamp(2.2rem,7vw,110px)',color:'#0C0C0C',lineHeight:1,flexShrink:0}}>{svc.n}</span><div style={{paddingTop:'0.4rem'}}><div style={{fontWeight:600,fontSize:'clamp(0.95rem,1.8vw,1.9rem)',textTransform:'uppercase',color:'#0C0C0C',marginBottom:'0.4rem'}}>{svc.name}</div><div style={{fontWeight:300,fontSize:'clamp(0.78rem,1.3vw,1.15rem)',color:'rgba(12,12,12,0.6)',lineHeight:1.75,maxWidth:620}}>{svc.desc}</div></div></div>);
}

function ServicesSection(){
  const h2Ref=useReveal({delay:0,y:40});
  return(<section id="services" style={{background:'#FFFFFF',borderRadius:'clamp(28px,5vw,60px) clamp(28px,5vw,60px) 0 0',padding:'clamp(4rem,7vw,8rem) clamp(1.5rem,6vw,5rem)',marginTop:-36}}><h2 ref={h2Ref} style={{fontSize:'clamp(3rem,11vw,150px)',fontWeight:900,textTransform:'uppercase',textAlign:'center',color:'#0C0C0C',lineHeight:1,marginBottom:'clamp(2.5rem,5vw,6rem)',letterSpacing:'-0.02em'}}>Services</h2><div style={{maxWidth:980,margin:'0 auto'}}>{SERVICES.map((svc,i)=><ServiceItem key={svc.n} svc={svc} index={i}/>)}</div></section>);
}

function ProjectCard({project,index,total}){
  const cardRef=useRef(null);
  const [scale,setScale]=useState(1);
  const targetScale=1-(total-1-index)*0.03;
  const imgR='clamp(16px,2.5vw,36px)';
  useEffect(()=>{
    const el=cardRef.current; if(!el)return;
    const fn=()=>{ const rect=el.getBoundingClientRect(); const progress=Math.max(0,Math.min(1,-rect.top/(window.innerHeight*0.55))); setScale(1-progress*(1-targetScale)); };
    window.addEventListener('scroll',fn,{passive:true}); return()=>window.removeEventListener('scroll',fn);
  },[targetScale]);
  return(
    <div style={{height:'85vh',position:'relative'}}>
      <div ref={cardRef} className="proj-card" style={{top:`${96+index*28}px`,padding:'clamp(1rem,2vw,2rem)',transform:`scale(${scale})`,transition:'transform 0.1s linear'}}>
        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'clamp(0.75rem,1.5vw,1.5rem)',flexWrap:'wrap',gap:'0.75rem'}}>
          <div style={{display:'flex',alignItems:'center',gap:'clamp(0.75rem,2vw,2rem)'}}>
            <span className="hero-grad" style={{fontWeight:900,fontSize:'clamp(2rem,5.5vw,72px)',lineHeight:1}}>{project.n}</span>
            <div>
              <div style={{fontSize:'clamp(0.58rem,0.9vw,0.8rem)',color:'rgba(215,226,234,0.4)',textTransform:'uppercase',letterSpacing:'0.12em'}}>{project.category}</div>
              <div style={{fontSize:'clamp(0.95rem,2.2vw,1.9rem)',fontWeight:700,color:'#D7E2EA',textTransform:'uppercase'}}>{project.name}</div>
              <div style={{fontSize:'clamp(0.62rem,0.95vw,0.85rem)',color:'rgba(215,226,234,0.4)',fontWeight:300,maxWidth:420,marginTop:2}}>{project.desc}</div>
            </div>
          </div>
          <a href={project.url} target={project.url==='#'?undefined:'_blank'} rel="noreferrer" className="live-btn" style={{padding:'clamp(8px,1vw,13px) clamp(18px,2.2vw,36px)',fontSize:'clamp(0.6rem,0.85vw,0.8rem)'}}>{project.url==='#'?'Coming Soon':'Live Project'}</a>
        </div>
        <div style={{display:'flex',gap:'clamp(0.4rem,0.8vw,0.875rem)'}}>
          <div style={{width:'40%',display:'flex',flexDirection:'column',gap:'clamp(0.4rem,0.8vw,0.875rem)'}}>
            <img src={project.imgs[0]} alt="" style={{width:'100%',height:'clamp(100px,13vw,190px)',objectFit:'cover',borderRadius:imgR}}/>
            <img src={project.imgs[1]} alt="" style={{width:'100%',height:'clamp(120px,17vw,260px)',objectFit:'cover',borderRadius:imgR}}/>
          </div>
          <div style={{width:'60%'}}><img src={project.imgs[2]} alt="" style={{width:'100%',height:'clamp(240px,31vw,470px)',objectFit:'cover',borderRadius:imgR}}/></div>
        </div>
      </div>
    </div>
  );
}

function ProjectsSection(){
  const h2Ref=useReveal({delay:0,y:40});
  return(<section id="projects" style={{background:'#0C0C0C',borderRadius:'clamp(28px,5vw,60px) clamp(28px,5vw,60px) 0 0',padding:'clamp(4rem,6vw,6rem) clamp(1.5rem,5vw,4rem)',marginTop:-36,position:'relative',zIndex:10}}><h2 ref={h2Ref} className="hero-grad" style={{fontSize:'clamp(3rem,11vw,150px)',fontWeight:900,textTransform:'uppercase',textAlign:'center',lineHeight:1,letterSpacing:'-0.02em',marginBottom:'clamp(2.5rem,5vw,5rem)'}}>Projects</h2>{PROJECTS.map((proj,i)=><ProjectCard key={proj.n} project={proj} index={i} total={PROJECTS.length}/>)}</section>);
}

function Footer(){
  const ref=useReveal({delay:0,y:30});
  return(<footer style={{background:'#0C0C0C',borderTop:'1px solid rgba(215,226,234,0.08)',padding:'clamp(4rem,6vw,6rem) clamp(1.5rem,5vw,4rem)',textAlign:'center'}}><div ref={ref} style={{display:'flex',flexDirection:'column',alignItems:'center',gap:'1.5rem'}}><div className="hero-grad" style={{fontSize:'clamp(2.5rem,9vw,7rem)',fontWeight:900,letterSpacing:'-0.02em',lineHeight:1}}>NONSODEV</div><p style={{color:'rgba(215,226,234,0.4)',textTransform:'uppercase',letterSpacing:'0.15em',fontSize:'clamp(0.62rem,1vw,0.85rem)'}}>CTO · Vibe Coder · AI Builder · Abuja, Nigeria</p><div style={{display:'flex',gap:'1.5rem',justifyContent:'center',flexWrap:'wrap'}}><a href="https://github.com/NonsoDev001" target="_blank" rel="noreferrer" style={{color:'rgba(215,226,234,0.3)',fontSize:'0.875rem',textDecoration:'none'}}>GitHub</a><span style={{color:'rgba(215,226,234,0.15)'}}>·</span><a href="https://wa.me/2348165642323" target="_blank" rel="noreferrer" style={{color:'rgba(215,226,234,0.3)',fontSize:'0.875rem',textDecoration:'none'}}>WhatsApp</a></div><a href="https://wa.me/2348165642323" target="_blank" rel="noreferrer" className="cta-btn" style={{padding:'clamp(12px,1.8vw,18px) clamp(32px,5vw,64px)',fontSize:'clamp(0.75rem,1.1vw,0.95rem)',marginTop:'1rem'}}>Contact Me</a><p style={{color:'rgba(215,226,234,0.12)',fontSize:'0.7rem',marginTop:'2rem',textTransform:'uppercase',letterSpacing:'0.1em'}}>© 2025 Chukwunonso Offorka · NonsoDev001</p></div></footer>);
}

export default function NonsoDev() {
  return (<><StyleInjector/><div className="nd-root"><HeroSection/><MarqueeSection/><AboutSection/><ServicesSection/><ProjectsSection/><Footer/></div></>);
}
