import { useEffect, useState } from 'react'
import { ArrowDown, ArrowRight, ChevronLeft, ChevronRight, Gamepad2, Menu, Play, Sparkles, X, Zap } from 'lucide-react'
const games=[
 {id:'skyline',name:'SKYLINE RUSH',type:'RACING / ACTION',copy:'The city is your playground. The skyline is your finish line.',cover:'/covers/skyline-racer.svg',number:'01'},
 {id:'serpent',name:'NEON SERPENT',type:'ARCADE / SURVIVAL',copy:'Enter the arena. Outgrow the chaos. Become the legend.',cover:'/covers/neon-serpent.svg',number:'02'},
 {id:'laststand',name:'LAST STAND',type:'ACTION / SURVIVAL',copy:'When the world falls apart, every second becomes a choice.',cover:'/covers/last-stand.svg',number:'03'},
 {id:'arcane',name:'ARCANE BLOCKS',type:'PUZZLE / STRATEGY',copy:'A sharper mind is your greatest weapon.',cover:'/covers/arcane-blocks.svg',number:'04'}
]
function App(){
 const [active,setActive]=useState(0),[menu,setMenu]=useState(false),[scrolled,setScrolled]=useState(false)
 useEffect(()=>{const f=()=>setScrolled(window.scrollY>30);window.addEventListener('scroll',f,{passive:true});return()=>window.removeEventListener('scroll',f)},[])
 useEffect(()=>{const t=window.setInterval(()=>setActive(v=>(v+1)%games.length),6500);return()=>window.clearInterval(t)},[])
 const current=games[active],scrollTo=(id:string)=>{document.getElementById(id)?.scrollIntoView({behavior:'smooth'});setMenu(false)}
 return <main className="pixora-landing">
  <div className="ambient ambient-one"/><div className="ambient ambient-two"/><div className="grain"/>
  <header className={scrolled?'landing-header is-scrolled':'landing-header'}>
   <a className="landing-brand" href="#top" onClick={e=>{e.preventDefault();scrollTo('top')}}><span className="brand-symbol"><Gamepad2 size={21}/></span><span>PIXORA<span className="brand-period">.</span><small>PLAY BEYOND</small></span></a>
   <nav className={menu?'landing-nav show':'landing-nav'}><a className="nav-active" href="#games" onClick={e=>{e.preventDefault();scrollTo('games')}}>Discover</a><a href="#worlds" onClick={e=>{e.preventDefault();scrollTo('worlds')}}>Game worlds</a><a href="#about" onClick={e=>{e.preventDefault();scrollTo('about')}}>About</a></nav>
   <div className="header-actions"><button className="header-login" onClick={()=>scrollTo('games')}>EXPLORE ARCADE</button><button className="menu-toggle" onClick={()=>setMenu(!menu)} aria-label="Toggle menu">{menu?<X/>:<Menu/>}</button></div>
  </header>
  <section className="landing-hero" id="top">
   <div className="hero-image-wrap"><img key={current.cover} className="landing-hero-image" src={current.cover} alt=""/></div><div className="hero-image-overlay"/><div className="hero-grid-lines"/>
   <div className="hero-copy"><div className="eyebrow"><span className="eyebrow-line"/><Sparkles size={13}/> THE NEXT LEVEL OF PLAY</div><p className="hero-index">PIXORA ORIGINALS <span>— {current.number} / 04</span></p>
    <h1>PLAY<br/><em>BEYOND</em><span className="hero-dot">.</span></h1><p className="hero-description">A universe of games. A world of competition.<br/>Your next obsession starts here.</p>
    <div className="hero-feature"><span className="feature-rule"/><div><b>{current.name}</b><small>{current.type}</small></div><span className="feature-copy">{current.copy}</span></div>
    <div className="hero-buttons"><button className="btn-primary" onClick={()=>scrollTo('games')}>ENTER THE ARCADE <ArrowRight size={16}/></button><button className="btn-play" onClick={()=>scrollTo('worlds')}><span><Play size={13} fill="currentColor"/></span> EXPLORE WORLDS</button></div>
   </div>
   <div className="hero-side-note"><span>INDEPENDENT PLAY. INFINITE POSSIBILITIES.</span><i/></div><div className="hero-vertical">P X / 0 1 — 2 0 2 6</div>
   <div className="hero-bottom"><div className="hero-pager">{games.map((g,i)=><button key={g.id} className={i===active?'on':''} onClick={()=>setActive(i)} aria-label={'Show '+g.name}/>)}</div><div className="hero-arrows-new"><button onClick={()=>setActive(v=>(v+games.length-1)%games.length)} aria-label="Previous"><ChevronLeft/></button><button onClick={()=>setActive(v=>(v+1)%games.length)} aria-label="Next"><ChevronRight/></button></div><button className="scroll-cue" onClick={()=>scrollTo('games')}>SCROLL TO EXPLORE <ArrowDown size={13}/></button></div>
  </section>
  <section className="ticker"><div className="ticker-track">{Array.from({length:4},(_,i)=><span key={i}>DISCOVER <i>✳</i> PLAY <i>✳</i> COMPETE <i>✳</i> REPEAT <i>✳</i></span>)}</div></section>
  <section className="worlds-section" id="games"><div className="section-heading"><div><span className="section-eyebrow">01 / THE ARCADE</span><h2>FIND YOUR<br/><em>PLAYGROUND.</em></h2></div><p>Different worlds. Different rules.<br/>One place to play them all.</p></div>
   <div className="world-card-grid">{games.map((g,i)=><article className="world-card" key={g.id} onMouseEnter={()=>setActive(i)}><img src={g.cover} alt=""/><div className="world-card-shade"/><div className="world-card-top"><span>{g.number} / PIXORA ORIGINAL</span><span className="world-arrow"><ArrowRight size={16}/></span></div><div className="world-card-bottom"><small>{g.type}</small><h3>{g.name}</h3><p>{g.copy}</p><button onClick={()=>scrollTo('about')}>DISCOVER GAME <ArrowRight size={13}/></button></div></article>)}</div>
   <div className="section-footnote"><span>MORE WORLDS ARE IN DEVELOPMENT</span><span>BUILT FOR THE LOVE OF PLAY <i>✳</i></span></div>
  </section>
  <section className="manifesto" id="about"><div className="manifesto-content"><span className="section-eyebrow">02 / THE PIXORA MINDSET</span><h2>NOT JUST<br/>ANOTHER <em>GAME.</em></h2><p>We believe the best games don't just fill time. They create moments worth coming back for. PIXORA is building a home for quick escapes, fierce rivalries and unforgettable play.</p><button className="manifesto-link" onClick={()=>scrollTo('games')}>FIND YOUR NEXT GAME <ArrowRight size={16}/></button></div><div className="manifesto-stamp"><Zap size={28}/><span>PLAY<br/>YOUR<br/>WAY</span></div></section>
  <section className="final-cta"><span className="section-eyebrow">03 / YOUR MOVE</span><h2>READY WHEN<br/><em>YOU ARE.</em></h2><button className="btn-primary" onClick={()=>scrollTo('games')}>EXPLORE PIXORA <ArrowRight size={16}/></button><span className="cta-orbit orbit-a"/><span className="cta-orbit orbit-b"/></section>
  <footer className="landing-footer"><a className="landing-brand" href="#top" onClick={e=>{e.preventDefault();scrollTo('top')}}><span className="brand-symbol"><Gamepad2 size={19}/></span><span>PIXORA<span className="brand-period">.</span><small>PLAY BEYOND</small></span></a><span>© 2026 PIXORA ARCADE</span><span>MADE FOR THE LOVE OF PLAY.</span><button onClick={()=>scrollTo('top')}>BACK TO TOP ↑</button></footer>
 </main>
}
export default App