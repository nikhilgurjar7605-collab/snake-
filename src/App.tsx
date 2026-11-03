import { useEffect, useState, type CSSProperties, type MouseEvent } from 'react'
import { ArrowDown, ArrowRight, ChevronLeft, ChevronRight, Gamepad2, Menu, Play, Sparkles, X, Zap, Flame, Trophy, Globe2 } from 'lucide-react'

const games = [
  { id: 'skyline', name: 'SKYLINE RUSH', type: 'RACING / ACTION', copy: 'The city is your playground. The skyline is your finish line.', cover: 'https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=1800&q=90', number: '01', tag: 'ADRENALINE' },
  { id: 'serpent', name: 'NEON SERPENT', type: 'ARCADE / SURVIVAL', copy: 'Enter the arena. Outgrow the chaos. Become the legend.', cover: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=85', number: '02', tag: 'SURVIVAL' },
  { id: 'laststand', name: 'LAST STAND', type: 'ACTION / SURVIVAL', copy: 'When the world falls apart, every second becomes a choice.', cover: 'https://assets.production.jabali.ai/7bca3d20-0e88-4cb5-a08e-6deaa838aff1/bd4d697c-7174-461b-951e-a0fbb4d7593f', number: '03', tag: 'DARK FANTASY' },
  { id: 'arcane', name: 'ARCANE BLOCKS', type: 'PUZZLE / STRATEGY', copy: 'A sharper mind is your greatest weapon.', cover: 'https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=1200&q=85', number: '04', tag: 'STRATEGY' }
]

const moments = [
  { title: 'ENTER THE UNKNOWN', kicker: 'A WORLD WITHOUT LIMITS', image: 'https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=1600&q=85', text: 'Every world has a secret. Every run has a story.' },
  { title: 'CHASE THE LEGEND', kicker: 'YOUR NEXT OBSESSION', image: 'https://assets.production.jabali.ai/7bca3d20-0e88-4cb5-a08e-6deaa838aff1/bd4d697c-7174-461b-951e-a0fbb4d7593f', text: 'Discover strange places, impossible challenges and new rivals.' },
  { title: 'MAKE YOUR MOVE', kicker: 'PLAY YOUR OWN WAY', image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1600&q=85', text: 'Go solo. Build a squad. Leave your mark.' }
]

function App() {
  const [active, setActive] = useState(0)
  const [menu, setMenu] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [moment, setMoment] = useState(0)
  const [pointer, setPointer] = useState({ x: 50, y: 40 })
  const [sound, setSound] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const timer = window.setInterval(() => setActive(v => (v + 1) % games.length), 6500)
    return () => window.clearInterval(timer)
  }, [])

  useEffect(() => {
    const nodes = document.querySelectorAll('[data-reveal]')
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible')
        observer.unobserve(entry.target)
      }
    }), { threshold: 0.12 })
    nodes.forEach(node => observer.observe(node))
    return () => observer.disconnect()
  }, [])

  const current = games[active]
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMenu(false)
  }
  const movePointer = (event: MouseEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect()
    setPointer({ x: ((event.clientX - rect.left) / rect.width) * 100, y: ((event.clientY - rect.top) / rect.height) * 100 })
  }

  return <main className="pixora-landing" onMouseMove={movePointer} style={{ '--pointer-x': pointer.x + '%', '--pointer-y': pointer.y + '%' } as CSSProperties}>
    <div className="ambient ambient-one" /><div className="ambient ambient-two" /><div className="grain" />
    <div className="scroll-progress" />
    <header className={scrolled ? 'landing-header is-scrolled' : 'landing-header'}>
      <a className="landing-brand" href="#top" onClick={e => { e.preventDefault(); scrollTo('top') }}><span className="brand-symbol"><Gamepad2 size={21} /></span><span>PIXORA<span className="brand-period">.</span><small>PLAY BEYOND</small></span></a>
      <nav className={menu ? 'landing-nav show' : 'landing-nav'}><a className="nav-active" href="#games" onClick={e => { e.preventDefault(); scrollTo('games') }}>Discover</a><a href="#moments" onClick={e => { e.preventDefault(); scrollTo('moments') }}>Experiences</a><a href="#about" onClick={e => { e.preventDefault(); scrollTo('about') }}>About</a></nav>
      <div className="header-actions"><button className="header-login" onClick={() => scrollTo('games')}>EXPLORE ARCADE <ArrowRight size={13} /></button><button className="menu-toggle" onClick={() => setMenu(!menu)} aria-label="Toggle menu">{menu ? <X /> : <Menu />}</button></div>
    </header>

    <section className="landing-hero" id="top">
      <div className="hero-image-wrap"><img key={current.cover} className="landing-hero-image" src={current.cover} alt="" /></div><div className="hero-image-overlay" /><div className="hero-grid-lines" />
      <div className="hero-copy"><div className="eyebrow"><span className="eyebrow-line" /><Sparkles size={13} /> THE NEXT LEVEL OF PLAY</div><p className="hero-index">PIXORA ORIGINALS <span>— {current.number} / 04</span></p>
        <h1>PLAY<br /><em>BEYOND</em><span className="hero-dot">.</span></h1><p className="hero-description">A universe of games. A world of competition.<br />Your next obsession starts here.</p>
        <div className="hero-feature"><span className="feature-rule" /><div><b>{current.name}</b><small>{current.type}</small></div><span className="feature-copy">{current.copy}</span></div>
        <div className="hero-buttons"><button className="btn-primary" onClick={() => scrollTo('games')}>ENTER THE ARCADE <ArrowRight size={16} /></button><button className="btn-play" onClick={() => setSound(v => !v)}><span><Play size={13} fill="currentColor" /></span>{sound ? 'SOUND EXPERIENCE ON' : 'ACTIVATE EXPERIENCE'}</button></div>
      </div>
      <div className="hero-side-note"><span>INDEPENDENT PLAY. INFINITE POSSIBILITIES.</span><i /></div><div className="hero-vertical">P X / 0 1 — 2 0 2 6</div>
      <div className="hero-bottom"><div className="hero-pager">{games.map((g, i) => <button key={g.id} className={i === active ? 'on' : ''} onClick={() => setActive(i)} aria-label={'Show ' + g.name} />)}</div><div className="hero-arrows-new"><button onClick={() => setActive(v => (v + games.length - 1) % games.length)} aria-label="Previous"><ChevronLeft /></button><button onClick={() => setActive(v => (v + 1) % games.length)} aria-label="Next"><ChevronRight /></button></div><button className="scroll-cue" onClick={() => scrollTo('games')}>SCROLL TO EXPLORE <ArrowDown size={13} /></button></div>
      <div className="hero-orb orb-one" /><div className="hero-orb orb-two" />
    </section>

    <section className="ticker"><div className="ticker-track">{Array.from({ length: 4 }, (_, i) => <span key={i}>DISCOVER <i>✳</i> PLAY <i>✳</i> COMPETE <i>✳</i> REPEAT <i>✳</i></span>)}</div></section>

    <section className="worlds-section" id="games"><div className="section-heading" data-reveal><div><span className="section-eyebrow">01 / THE ARCADE</span><h2>FIND YOUR<br /><em>PLAYGROUND.</em></h2></div><p>Different worlds. Different rules.<br />One place to play them all.</p></div>
      <div className="world-card-grid">{games.map((g, i) => <article className="world-card" key={g.id} onMouseEnter={() => setActive(i)} data-reveal style={{ '--card-index': i } as React.CSSProperties}><img src={g.cover} alt="" loading="lazy" /><div className="world-card-shade" /><div className="world-card-top"><span>{g.number} / PIXORA ORIGINAL</span><span className="world-arrow"><ArrowRight size={16} /></span></div><div className="world-card-bottom"><small>{g.type}</small><h3>{g.name}</h3><p>{g.copy}</p><button onClick={() => { setActive(i); scrollTo('top') }}>DISCOVER GAME <ArrowRight size={13} /></button></div></article>)}</div>
      <div className="section-footnote"><span>MORE WORLDS ARE IN DEVELOPMENT</span><span>BUILT FOR THE LOVE OF PLAY <i>✳</i></span></div>
    </section>

    <section className="experience-section" id="moments">
      <div className="experience-head" data-reveal><span className="section-eyebrow">02 / BEYOND THE SCREEN</span><h2>THERE'S ALWAYS<br /><em>ANOTHER WORLD.</em></h2><p>Don't just browse games. Step into an atmosphere built to pull you in.</p></div>
      <div className="experience-stage" onMouseMove={movePointer}>
        <div className="experience-image" style={{ backgroundImage: 'url(' + moments[moment].image + ')' }} />
        <div className="experience-vignette" />
        <div className="experience-content" key={moment}><span>{moments[moment].kicker}</span><h3>{moments[moment].title}</h3><p>{moments[moment].text}</p><button onClick={() => scrollTo('games')}>EXPLORE THE WORLDS <ArrowRight size={15} /></button></div>
        <div className="experience-controls">{moments.map((m, i) => <button key={m.title} className={moment === i ? 'active' : ''} onClick={() => setMoment(i)} aria-label={'Show ' + m.title}><span>0{i + 1}</span></button>)}</div>
        <span className="experience-counter">0{moment + 1} <i>/</i> 03</span>
      </div>
    </section>

    <section className="manifesto" id="about"><div className="manifesto-content" data-reveal><span className="section-eyebrow">03 / THE PIXORA MINDSET</span><h2>NOT JUST<br />ANOTHER <em>GAME.</em></h2><p>We believe the best games don't just fill time. They create moments worth coming back for. PIXORA is building a home for quick escapes, fierce rivalries and unforgettable play.</p><button className="manifesto-link" onClick={() => scrollTo('games')}>FIND YOUR NEXT GAME <ArrowRight size={16} /></button></div><div className="manifesto-stamp"><Zap size={28} /><span>PLAY<br />YOUR<br />WAY</span></div><div className="manifesto-orbit" /></section>

    <section className="stats-band"><div><Globe2 /><b>INFINITE</b><small>WORLDS TO EXPLORE</small></div><div><Flame /><b>ALWAYS ON</b><small>NEW EXPERIENCES</small></div><div><Trophy /><b>YOUR STORY</b><small>YOUR HIGH SCORE</small></div></section>

    <section className="final-cta"><span className="section-eyebrow">04 / YOUR MOVE</span><h2>READY WHEN<br /><em>YOU ARE.</em></h2><button className="btn-primary" onClick={() => scrollTo('games')}>EXPLORE PIXORA <ArrowRight size={16} /></button><span className="cta-orbit orbit-a" /><span className="cta-orbit orbit-b" /></section>
    <footer className="landing-footer"><a className="landing-brand" href="#top" onClick={e => { e.preventDefault(); scrollTo('top') }}><span className="brand-symbol"><Gamepad2 size={19} /></span><span>PIXORA<span className="brand-period">.</span><small>PLAY BEYOND</small></span></a><span>© 2026 PIXORA ARCADE</span><span>MADE FOR THE LOVE OF PLAY.</span><button onClick={() => scrollTo('top')}>BACK TO TOP ↑</button></footer>
  </main>
}
export default App