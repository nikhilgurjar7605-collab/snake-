import { useEffect, useMemo, useState } from 'react'
import { Bell, BookOpen, Compass, Gamepad2, Heart, Home, Menu, Search, Settings, Sparkles, Users, X, ChevronRight, Play, ArrowRight, SlidersHorizontal, CircleHelp, Trophy, Clock3, Swords, Medal, Target } from 'lucide-react'

type Game={id:string;title:string;genre:string;description:string;cover:string;tag:string;status:'soon'|'live'}
const games:Game[]=[
{id:'sky-stunt',title:'Skyline Rush',genre:'Racing · Action',description:'Take the wheel above the clouds. Chain daring stunts and own the skyline.',cover:'/covers/skyline-racer.svg',tag:'PIXORA ORIGINAL',status:'soon'},
{id:'snake-survival',title:'Neon Serpent',genre:'Arcade · .IO',description:'Grow stronger, collect energy and outsmart every rival in the arena.',cover:'/covers/neon-serpent.svg',tag:'ARENA',status:'soon'},
{id:'last-stand',title:'Last Stand',genre:'Action · Survival',description:'One city. One chance. Make every move count.',cover:'/covers/last-stand.svg',tag:'COMING SOON',status:'soon'},
{id:'arcane-blocks',title:'Arcane Blocks',genre:'Puzzle · Strategy',description:'Think ahead and build your way to victory.',cover:'/covers/arcane-blocks.svg',tag:'BRAIN TEASER',status:'soon'},
{id:'trap-rush',title:'Trap Rush',genre:'Arcade',description:'Trust nothing. Time everything.',cover:'/covers/last-stand.svg',tag:'CHALLENGE',status:'soon'},
{id:'kart-clash',title:'Kart Clash',genre:'Racing',description:'Race hard. Hit harder.',cover:'/covers/skyline-racer.svg',tag:'COMING NEXT',status:'soon'},
{id:'city-dash',title:'City Dash',genre:'Arcade',description:'One more run. One more record.',cover:'/covers/neon-serpent.svg',tag:'COMING NEXT',status:'soon'},
{id:'swing-hero',title:'Swing Hero',genre:'Arcade',description:'Find your rhythm.',cover:'/covers/arcane-blocks.svg',tag:'COMING NEXT',status:'soon'}
]
const slides=[
{title:'Skyline Rush',subtitle:'THE CITY IS YOURS TO CONQUER',description:'Defy gravity. Chase the sunset. Own every road.',cover:'/covers/skyline-racer.svg',label:'FEATURED GAME'},
{title:'Neon Serpent',subtitle:'GROW. HUNT. SURVIVE.',description:'A neon arena where every turn can change everything.',cover:'/covers/neon-serpent.svg',label:'PIXORA ORIGINAL'},
{title:'Last Stand',subtitle:'NO SECOND CHANCES',description:'A city on the edge. Your story starts here.',cover:'/covers/last-stand.svg',label:'COMING SOON'}
]
type Page='home'|'library'|'multiplayer'|'leaderboard'|'wishlist'|'settings'|'help'
function App(){
 const [page,setPage]=useState<Page>('home')
 const [slide,setSlide]=useState(0)
 useEffect(()=>{const timer=window.setInterval(()=>setSlide(current=>(current+1)%slides.length),7200);return()=>window.clearInterval(timer)},[])
 const [query,setQuery]=useState('')
 const [mobileNav,setMobileNav]=useState(false)
 const [favorites,setFavorites]=useState<string[]>(()=>{try{return JSON.parse(localStorage.getItem('pixora-favorites')||'[]')}catch{return []}})
 const toggleFavorite=(id:string)=>setFavorites(old=>{const next=old.includes(id)?old.filter(x=>x!==id):[...old,id];localStorage.setItem('pixora-favorites',JSON.stringify(next));return next})
 const filtered=useMemo(()=>games.filter(g=>(page!=='wishlist'||favorites.includes(g.id))&&(`${g.title} ${g.genre}`.toLowerCase().includes(query.toLowerCase()))),[page,favorites,query])
 const navItems:{id:Page;label:string;icon:any}[]=[{id:'home',label:'Discover',icon:Compass},{id:'library',label:'My Arcade',icon:Gamepad2},{id:'multiplayer',label:'2 Player',icon:Swords},{id:'leaderboard',label:'Leaderboard',icon:Medal},{id:'wishlist',label:'Favourites',icon:Heart}]
 const choose=(p:Page)=>{setPage(p);setMobileNav(false);setQuery('')}
 const activeSlide=slides[slide]
 const GameCard=({game}:{game:Game})=><article className="store-card"><button className="store-cover" onClick={()=>choose('library')}><img src={game.cover} alt={game.title}/><span className="cover-play"><Play size={17} fill="currentColor"/></span><span className="cover-status">{game.status==='live'?'PLAY NOW':'COMING SOON'}</span></button><div className="store-card-info"><div><h3>{game.title}</h3><p>{game.genre}</p></div><button className={favorites.includes(game.id)?'wish-btn active':'wish-btn'} onClick={()=>toggleFavorite(game.id)} aria-label={favorites.includes(game.id)?'Remove from wishlist':'Add to wishlist'}><Heart size={17} fill={favorites.includes(game.id)?'currentColor':'none'}/></button></div></article>
 return <div className="pixora-shell">
  <aside className={mobileNav?'left-rail open':'left-rail'}>
   <button className="rail-brand" onClick={()=>choose('home')}><span className="rail-logo"><Gamepad2 size={22}/></span><b>PIXORA</b></button>
   <div className="rail-label">MENU</div>
   <nav className="rail-nav">{navItems.map(({id,label,icon:Icon})=><button key={id} className={page===id?'rail-link active':'rail-link'} onClick={()=>choose(id)}><Icon size={18}/><span>{label}</span>{id==='wishlist'&&favorites.length>0&&<small>{favorites.length}</small>}</button>)}</nav>
   <div className="rail-spacer"/>
   <nav className="rail-nav utility-nav"><button className="rail-link" onClick={()=>choose('settings')}><Settings size={18}/><span>Settings</span></button><button className="rail-link" onClick={()=>choose('help')}><CircleHelp size={18}/><span>Help</span></button></nav>
   <div className="rail-user"><div className="avatar guest-avatar">P</div><div><b>Player One</b><span>Guest profile</span></div><span className="online-dot"/></div>
  </aside>
  <div className="store-main">
   <header className="store-topbar">
    <button className="mobile-rail-toggle" onClick={()=>setMobileNav(!mobileNav)} aria-label="Toggle menu">{mobileNav?<X/>:<Menu/>}</button>
    <div className="greeting"><span>READY PLAYER ONE,</span> LET’S PLAY</div>
    <label className="top-search"><Search size={17}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Find your next game..."/><kbd>⌘ K</kbd></label>
    <div className="top-tools"><button aria-label="Notifications"><Bell size={18}/><i/></button><button className="top-profile" onClick={()=>choose('settings')}><span>P</span></button></div>
   </header>
   {page==='home'?<>
    <section className="store-hero">
     <img className="hero-art" src={activeSlide.cover} alt=""/>
     <div className="hero-vignette"/>
     <div className="hero-copy-store">
      <div className="hero-badges"><span className="hot-badge"><Sparkles size={12}/>{activeSlide.label}</span><span className="hero-type">PIXORA ARCADE</span></div>
      <div className="hero-overline">{activeSlide.subtitle}</div>
      <h1>{activeSlide.title}</h1>
      <p>{activeSlide.description}</p>
      <div className="hero-cta"><button className="store-primary" onClick={()=>choose('library')}>Explore the arcade <ArrowRight size={16}/></button><button className="trailer-btn" onClick={()=>choose('library')}><Play size={14}/> Browse games</button></div>
     </div>
     <div className="hero-pagination">{slides.map((s,i)=><button key={s.title} className={slide===i?'selected':''} onClick={()=>setSlide(i)} aria-label={`Show ${s.title}`}/>)}</div>
     <div className="hero-arrows"><button onClick={()=>setSlide(i=>(i+slides.length-1)%slides.length)} aria-label="Previous feature">‹</button><button onClick={()=>setSlide(i=>(i+1)%slides.length)} aria-label="Next feature">›</button></div>
    </section>
    <section className="recommend-section">
     <div className="section-topline"><div><span className="section-kicker">YOUR NEXT OBSESSION</span><h2>Featured in the arcade</h2></div><button className="see-all" onClick={()=>choose('library')}>View all <ArrowRight size={14}/></button></div>
     <div className="recommend-row">{games.slice(0,5).map(g=><GameCard key={g.id} game={g}/>)}</div>
    </section>
    <section className="lower-store-grid"><div className="lower-panel"><div className="section-topline"><div><span className="section-kicker">YOUR GAME SPACE</span><h2>Continue playing</h2></div><button className="see-all" onClick={()=>choose('library')}>Library <ArrowRight size={14}/></button></div><div className="empty-library"><BookOpen size={22}/><div><b>Your next session starts here</b><span>Your played games and progress will appear here.</span></div></div></div><div className="lower-panel activity-panel"><div className="section-topline"><div><span className="section-kicker">PLAY WITH OTHERS</span><h2>Multiplayer arena</h2></div></div><div className="empty-library"><Users size={22}/><div><b>Bring a friend into the arena</b><span>Two-player challenges and live matches are on the roadmap.</span></div></div></div></section>
   </>:<section className="subpage-store"><div className="subpage-heading"><div><span className="section-kicker">PIXORA / {page.toUpperCase()}</span><h1>{page==='library'?'My Arcade':page==='wishlist'?'Your favourites':page==='multiplayer'?'2 Player Arena':page==='leaderboard'?'Leaderboard':page==='settings'?'Settings':'Help & support'}</h1><p>{page==='wishlist'?'Your saved games, all in one place.':page==='multiplayer'?'Challenge a friend when multiplayer games go live.':page==='leaderboard'?'The best runs. The highest scores. The players to beat.':'Your PIXORA gaming space.'}</p></div><SlidersHorizontal size={20}/></div>
    {page==='library'||page==='wishlist'?filtered.length?<div className="subpage-game-grid">{filtered.map(g=><GameCard key={g.id} game={g}/>)}</div>:<div className="empty-large"><Heart size={30}/><h3>{page==='wishlist'?'No favourites yet':'Your arcade is ready'}</h3><p>{page==='wishlist'?'Tap the heart on any game to save it here.':'Your game collection and play history will live here.'}</p><button className="store-primary" onClick={()=>choose('home')}>Discover games <ArrowRight size={15}/></button></div>:<div className="empty-large">{page==='multiplayer'?<Swords size={30}/>:page==='leaderboard'?<Trophy size={30}/>:page==='settings'?<Settings size={30}/>:<CircleHelp size={30}/>}<h3>{page==='multiplayer'?'The arena is being prepared':page==='leaderboard'?'The scoreboard is waiting':page==='settings'?'Player settings':'How can we help?'}</h3><p>{page==='multiplayer'?'Two-player games and friend challenges are planned for a future PIXORA update.':page==='leaderboard'?'Rankings will appear when games begin recording verified scores.':page==='settings'?'Player profiles and preferences will be available as PIXORA grows.':'Help and game guides will appear here.'}</p><button className="store-primary" onClick={()=>choose('home')}>Back to Discover</button></div>}
   </section>}
   <footer className="store-footer"><span>© 2026 PIXORA</span><span>PLAY MORE. LIVE THE GAME.</span></footer>
  </div>
  <aside className="right-rail">
   <div className="right-heading"><b>DAILY CHALLENGE</b><span>COMING SOON</span></div>
   <div className="friends-empty"><div className="friends-orbit"><Target size={21}/></div><b>Your next challenge awaits</b><span>Daily missions and score targets will appear when games launch.</span></div>
   <div className="right-heading activity-heading"><b>TOP PLAYERS</b><button onClick={()=>choose('leaderboard')}>Leaderboard <ChevronRight size={13}/></button></div>
   <div className="activity-empty"><Trophy size={18}/><span>Rankings will be based on real in-game scores, not placeholder stats.</span></div>
   <div className="right-promo"><Swords size={19}/><b>Challenge a friend</b><span>Two-player modes are part of the PIXORA roadmap.</span><button onClick={()=>choose('multiplayer')}>Explore 2 Player</button></div>
  </aside>
 </div>
}
export default App
