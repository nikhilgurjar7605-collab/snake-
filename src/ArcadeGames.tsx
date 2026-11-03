import { useCallback, useEffect, useState } from 'react'
import { RotateCcw, Play, Pause, Trophy, Gamepad2 } from 'lucide-react'

type GameId = 'snake' | '2048' | 'xo'
const SIZE = 15
const startSnake = [{x:7,y:7},{x:6,y:7},{x:5,y:7}]
const randomFood = (snake:{x:number,y:number}[]) => { let p={x:Math.floor(Math.random()*SIZE),y:Math.floor(Math.random()*SIZE)}; while(snake.some(s=>s.x===p.x&&s.y===p.y)) p={x:Math.floor(Math.random()*SIZE),y:Math.floor(Math.random()*SIZE)}; return p }
const new2048 = () => { const b=Array(16).fill(0); [0,1].forEach(()=>{let i=Math.floor(Math.random()*16);while(b[i])i=Math.floor(Math.random()*16);b[i]=Math.random()<.9?2:4});return b }
function slide(board:number[],dir:string){
 const out=board.slice()
 for(let line=0;line<4;line++){
  const ids=Array.from({length:4},(_,i)=>dir==='left'?line*4+i:dir==='right'?line*4+3-i:dir==='up'?i*4+line:(3-i)*4+line)
  const vals=ids.map(i=>out[i]).filter(Boolean);const merged:number[]=[]
  for(let i=0;i<vals.length;i++){if(vals[i]===vals[i+1]){merged.push(vals[i]*2);i++}else merged.push(vals[i])}
  ids.forEach((id,i)=>out[id]=merged[i]||0)
 }
 if(out.every((v,i)=>v===board[i]))return {board,score:0}
 const empty=out.map((v,i)=>v===0?i:-1).filter(i=>i>=0);if(empty.length){const i=empty[Math.floor(Math.random()*empty.length)];out[i]=Math.random()<.9?2:4}
 return {board:out,score:out.reduce((s,v)=>s+v,0)-board.reduce((s,v)=>s+v,0)}
}
export default function ArcadeGames(){
 const [game,setGame]=useState<GameId>('snake')
 const [snake,setSnake]=useState(startSnake),[food,setFood]=useState(()=>randomFood(startSnake)),[dir,setDir]=useState('right'),[running,setRunning]=useState(false),[snakeOver,setSnakeOver]=useState(false),[snakeScore,setSnakeScore]=useState(0)
 const [board,setBoard]=useState(new2048),[score,setScore]=useState(0),[best,setBest]=useState(0)
 const [cells,setCells]=useState<(string|null)[]>(Array(9).fill(null)),[turn,setTurn]=useState('X'),[winner,setWinner]=useState<string|null>(null)
 const resetSnake=()=>{setSnake(startSnake);setFood(randomFood(startSnake));setDir('right');setRunning(false);setSnakeOver(false);setSnakeScore(0)}
 const reset2048=()=>{setBoard(new2048());setScore(0)}
 const resetXO=()=>{setCells(Array(9).fill(null));setTurn('X');setWinner(null)}
 const moveSnake=useCallback((next:string)=>{const opposite:Record<string,string>={up:'down',down:'up',left:'right',right:'left'};setDir(old=>opposite[old]===next?old:next)},[])
 useEffect(()=>{const key=(e:KeyboardEvent)=>{const map:{[k:string]:string}={ArrowUp:'up',w:'up',ArrowDown:'down',s:'down',ArrowLeft:'left',a:'left',ArrowRight:'right',d:'right'};if(map[e.key]&&game==='snake'){e.preventDefault();moveSnake(map[e.key])}if(game==='2048'){const d:{[k:string]:string}={ArrowUp:'up',ArrowDown:'down',ArrowLeft:'left',ArrowRight:'right'};if(d[e.key]){e.preventDefault();const r=slide(board,d[e.key]);if(r.score){setBoard(r.board);setScore(v=>v+r.score);setBest(v=>Math.max(v,score+r.score))}}}};window.addEventListener('keydown',key);return()=>window.removeEventListener('keydown',key)},[game,moveSnake,board,score])
 useEffect(()=>{if(!running||snakeOver)return;const t=window.setInterval(()=>{setSnake(prev=>{const head={...prev[0]};if(dir==='up')head.y--;if(dir==='down')head.y++;if(dir==='left')head.x--;if(dir==='right')head.x++;const ate=head.x===food.x&&head.y===food.y;const body=ate?prev:[...prev.slice(0,-1)];if(head.x<0||head.y<0||head.x>=SIZE||head.y>=SIZE||body.some(p=>p.x===head.x&&p.y===head.y)){setRunning(false);setSnakeOver(true);return prev}const next=[head,...body];if(ate){setSnakeScore(v=>v+10);setFood(randomFood(next))}return next})},135);return()=>window.clearInterval(t)},[running,snakeOver,dir,food])
 const playXO=(i:number)=>{if(cells[i]||winner)return;const next=cells.slice();next[i]=turn;const lines=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];const won=lines.some(line=>line.every(n=>next[n]===turn));setCells(next);if(won)setWinner(turn);else if(next.every(Boolean))setWinner('DRAW');else setTurn(turn==='X'?'O':'X')}
 return <section className="arcade-play-section" id="play-now">
  <div className="arcade-play-head"><span className="section-eyebrow">LIVE / PLAYABLE NOW</span><h2>NO TRAILERS.<br/><em>JUST PLAY.</em></h2><p>Pick a game. Learn the controls in seconds. Chase your high score.</p></div>
  <div className="arcade-shell">
   <div className="arcade-tabs">{([{id:'snake',name:'NEON SNAKE',sub:'ARCADE'}, {id:'2048',name:'NEON 2048',sub:'PUZZLE'}, {id:'xo',name:'GRID CLASH',sub:'2 PLAYER'}] as const).map(g=><button key={g.id} className={game===g.id?'selected':''} onClick={()=>setGame(g.id)}><span>{g.name}</span><small>{g.sub}</small></button>)}</div>
   <div className="arcade-console">
    {game==='snake'&&<div className="mini-game-wrap"><div className="mini-game-top"><div><small>PIXORA ORIGINAL / 001</small><h3>NEON SNAKE</h3></div><div className="game-score"><small>YOUR SCORE</small><b>{snakeScore.toString().padStart(4,'0')}</b></div></div><div className="snake-board">{Array.from({length:SIZE*SIZE},(_,i)=>{const x=i%SIZE,y=Math.floor(i/SIZE),isSnake=snake.some(p=>p.x===x&&p.y===y),isHead=snake[0].x===x&&snake[0].y===y;return <i key={i} className={isHead?'snake-head':isSnake?'snake-body':food.x===x&&food.y===y?'snake-food':''}/>})}</div><div className="game-controls-row"><span>{snakeOver?'RUN OVER — TRY AGAIN':running?'RUNNING — KEEP MOVING':'READY WHEN YOU ARE'}</span><button onClick={()=>setRunning(v=>!v)} disabled={snakeOver}>{running?<Pause size={15}/>:<Play size={15}/>} {running?'PAUSE':'START'}</button><button className="game-reset" onClick={resetSnake}><RotateCcw size={15}/> RESET</button></div><div className="touch-pad"><button onClick={()=>moveSnake('up')}>↑</button><div><button onClick={()=>moveSnake('left')}>←</button><button onClick={()=>moveSnake('down')}>↓</button><button onClick={()=>moveSnake('right')}>→</button></div></div><p className="game-hint">Use arrow keys / WASD or the touch controls. Eat the pink energy orbs. Don't hit yourself.</p></div>}
    {game==='2048'&&<div className="mini-game-wrap"><div className="mini-game-top"><div><small>PIXORA ORIGINAL / 002</small><h3>NEON 2048</h3></div><div className="game-score"><small>SCORE / BEST {best}</small><b>{score}</b></div></div><div className="number-board">{board.map((v,i)=><div key={i} className={'number-tile '+(v?'tile-'+Math.min(v,2048):'')}>{v||''}</div>)}</div><div className="game-controls-row"><span>MERGE MATCHING NUMBERS TO REACH 2048</span><button className="game-reset" onClick={reset2048}><RotateCcw size={15}/> NEW GAME</button></div><div className="number-controls"><button onClick={()=>{const r=slide(board,'up');if(r.score){setBoard(r.board);setScore(v=>v+r.score);setBest(v=>Math.max(v,score+r.score))}}}>↑</button><div><button onClick={()=>{const r=slide(board,'left');if(r.score){setBoard(r.board);setScore(v=>v+r.score);setBest(v=>Math.max(v,score+r.score))}}}>←</button><button onClick={()=>{const r=slide(board,'down');if(r.score){setBoard(r.board);setScore(v=>v+r.score);setBest(v=>Math.max(v,score+r.score))}}}>↓</button><button onClick={()=>{const r=slide(board,'right');if(r.score){setBoard(r.board);setScore(v=>v+r.score);setBest(v=>Math.max(v,score+r.score))}}}>→</button></div></div><p className="game-hint">Slide with arrow keys or buttons. Combine equal tiles and build your way to 2048.</p></div>}
    {game==='xo'&&<div className="mini-game-wrap"><div className="mini-game-top"><div><small>PIXORA ORIGINAL / 003</small><h3>GRID CLASH</h3></div><div className="game-score"><small>{winner?'MATCH RESULT':'CURRENT TURN'}</small><b>{winner||turn}</b></div></div><div className="xo-board">{cells.map((v,i)=><button key={i} className={v==='X'?'xo-x':v==='O'?'xo-o':''} onClick={()=>playXO(i)} disabled={!!v||!!winner}>{v||'+'}</button>)}</div><div className="game-controls-row"><span>{winner==='DRAW'?'IT’S A DRAW':winner?winner+' WINS THE ROUND':'TWO PLAYERS / ONE DEVICE'}</span><button className="game-reset" onClick={resetXO}><RotateCcw size={15}/> REMATCH</button></div><p className="game-hint">Take turns placing X and O. First to connect three marks wins.</p></div>}
   </div>
  </div>
 </section>
}
