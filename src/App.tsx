import { useMemo, useState } from 'react'
import { Bell, BookOpen, Compass, Download, Gamepad2, Heart, Home, Menu, Search, Settings, ShoppingBag, Sparkles, Users, X, ChevronRight, Play, ArrowRight, SlidersHorizontal, CircleHelp, Trophy, Clock3 } from 'lucide-react'

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
type Page='home'|'library'|'store'|'friends'|'downloads'|'wishlist'|'settings'|'help'
function App(){
 const [page,setPage]=useState<Page>('home')
 const [slide,setSlide]=useState(0)
 const [query,setQuery]=useState('')
 const [mobileNav,setMobileNav]=useState(false)
 const [favorites,setFavorites]=useState<string[]>(()=>{try{return JSON.parse(localStorage.getItem('pixora-favorites')||'[]')}catch{return []}})
 const toggleFavorite=(id:string)=>setFavorites(old=>{const next=old.includes(id)?old.filter(x=>x!==id):[...old,id];localStorage.setItem('pixora-favorites',JSON.stringify(next));return next})
 const filtered=useMemo(()=>games.filter(g=>(page!=='wishlist'||favorites.includes(g.id))&&(`${g.title} ${g.genre}`.toLowerCase().includes(query.toLowerCase()))),[page,favorites,query])
 const navItems:{id:Page;label:string;icon:any}[]=[{id:'home',label:'Game store',icon:Home},{id:'library',label:'Library',icon:BookOpen},{id:'store',label:'Store',icon:ShoppingBag},{id:'friends',label:'Friends',icon:Users},{id:'downloads',label:'Downloads',icon:Download},{id:'wishlist',label:'Wishlist',icon:Heart}]
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
    <div className="greeting"><span>Good day,</span> Player</div>
    <label className="top-search"><Search size={17}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search games, genres..."/><kbd>⌘ K</kbd></label>
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
      <div className="hero-cta"><button className="store-primary" onClick={()=>choose('library')}>Explore game <ArrowRight size={16}/></button><button className="trailer-btn" onClick={()=>choose('library')}><Play size={14}/> View details</button></div>
     </div>
     <div className="hero-pagination">{slides.map((s,i)=><button key={s.title} className={slide===i?'selected':''} onClick={()=>setSlide(i)} aria-label={`Show ${s.title}`}/>)}</div>
     <div className="hero-arrows"><button onClick={()=>setSlide(i=>(i+slides.length-1)%slides.length)} aria-label="Previous feature">‹</button><button onClick={()=>setSlide(i=>(i+1)%slides.length)} aria-label="Next feature">›</button></div>
    </section>
    <section className="recommend-section">
     <div className="section-topline"><div><span className="section-kicker">HAND-PICKED FOR YOU</span><h2>Recommended for you</h2></div><button className="see-all" onClick={()=>choose('library')}>View all <ArrowRight size={14}/></button></div>
     <div className="recommend-row">{games.slice(0,5).map(g=><GameCard key={g.id} game={g}/>)}</div>
    </section>
    <section className="lower-store-grid"><div className="lower-panel"><div className="section-topline"><div><span className="section-kicker">YOUR COLLECTION</span><h2>Recently added</h2></div><button className="see-all" onClick={()=>choose('library')}>Library <ArrowRight size={14}/></button></div><div className="empty-library"><BookOpen size={22}/><div><b>Your library is waiting</b><span>Games you add will appear here.</span></div></div></div><div className="lower-panel activity-panel"><div className="section-topline"><div><span className="section-kicker">PIXORA COMMUNITY</span><h2>Activity feed</h2></div></div><div className="empty-library"><Users size={22}/><div><b>Your community starts here</b><span>Friend activity will appear when social features launch.</span></div></div></div></section>
   </>:<section className="subpage-store"><div className="subpage-heading"><div><span className="section-kicker">PIXORA / {page.toUpperCase()}</span><h1>{page==='library'?'Your library':page==='wishlist'?'Your wishlist':page==='friends'?'Friends':page==='downloads'?'Downloads':page==='settings'?'Settings':page==='help'?'Help & support':'Discover more games'}</h1><p>{page==='wishlist'?'Your saved games, all in one place.':page==='friends'?'Your social space is getting ready.':'Explore your PIXORA gaming space.'}</p></div><SlidersHorizontal size={20}/></div>
    {page==='library'||page==='store'||page==='wishlist'?filtered.length?<div className="subpage-game-grid">{filtered.map(g=><GameCard key={g.id} game={g}/>)}</div>:<div className="empty-large"><Heart size={30}/><h3>Nothing saved yet</h3><p>Tap the heart on any game to add it to your wishlist.</p><button className="store-primary" onClick={()=>choose('home')}>Browse games <ArrowRight size={15}/></button></div>:<div className="empty-large"><Users size={30}/><h3>{page==='friends'?'Friends are coming soon':page==='downloads'?'No downloads yet':page==='settings'?'Guest settings':'How can we help?'}</h3><p>{page==='friends'?'We’ll add friend profiles and presence when multiplayer features are ready.':page==='downloads'?'Your downloaded games will appear here.':page==='settings'?'Account controls will be available when accounts launch.':'Support and FAQs will be available here.'}</p><button className="store-primary" onClick={()=>choose('home')}>Back to game store</button></div>}
   </section>}
   <footer className="store-footer"><span>© 2026 PIXORA</span><span>PLAY MORE. LIVE THE GAME.</span></footer>
  </div>
  <aside className="right-rail">
   <div className="right-heading"><b>Friends online</b><span>0 online</span></div>
   <div className="friends-empty"><div className="friends-orbit"><Users size={21}/></div><b>Your crew will be here</b><span>Invite friends when social play arrives.</span></div>
   <div className="right-heading activity-heading"><b>Activity feed</b><button onClick={()=>choose('friends')}>View all <ChevronRight size={13}/></button></div>
   <div className="activity-empty"><Clock3 size={18}/><span>No activity yet. Your game milestones will show up here.</span></div>
   <div className="right-promo"><Trophy size={19}/><b>Your next achievement</b><span>Every great player starts with a first game.</span><button onClick={()=>choose('library')}>Explore games</button></div>
  </aside>
 </div>
}
export default App
