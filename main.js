/* ======= Navigation helpers ======= */
function goToLogin(){ window.location.href = "login.html"; }
function goToRegister(){ window.location.href = "register.html"; }
function goHome(){ window.location.href = "index.html"; }
function logout(){ alert("Logged out."); window.location.href = "index.html"; }

/* ======= Loader behavior (hide on ready) ======= */
document.addEventListener("DOMContentLoaded", ()=> {
  const loader = document.getElementById("loader");
  if(loader){
    setTimeout(()=> loader.style.display = "none", 700);
  }

  // Initialize quotes banner on pages with it
  initQuotes();
});

/* ======= Hardcoded login ======= */
const validUser = { username: "pocketful.of.sunshine", password: "sunny123" };

/* Login form */
const loginForm = document.getElementById("loginForm");
if(loginForm){
  loginForm.addEventListener("submit", e=>{
    e.preventDefault();
    const u = document.getElementById("username").value;
    const p = document.getElementById("password").value;
    if(u === validUser.username && p === validUser.password){
      showLoaderThen(() => window.location.href = "portfolio.html");
    } else {
      alert("Invalid username or password.");
    }
  });
}

/* Register form (fake) */
const registerForm = document.getElementById("registerForm");
if(registerForm){
  registerForm.addEventListener("submit", e=>{
    e.preventDefault();
    // pretend to save — you can later wire this to real storage
    alert("Account created! Please log in.");
    showLoaderThen(()=> window.location.href = "login.html");
  });
}

/* Helper to show loader then run callback */
function showLoaderThen(cb){
  const loader = document.getElementById("loader");
  if(loader){
    loader.style.display = "flex";
    setTimeout(cb, 600);
  } else {
    cb();
  }
}

/* ======= Expandable project cards ======= */
function toggleCard(btn){
  const card = btn.closest(".project-card");
  if(!card) return;
  const expanded = card.classList.toggle("expanded");
  btn.textContent = expanded ? "−" : "+";
}

/* ======= Scroll helper (nav) ======= */
function scrollToSection(id){
  const el = document.getElementById(id);
  if(!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
}

/* ======= Audio toggle logic (works across pages) ======= */
function wireAudioToggle(toggleId, audioId, labelOn="🔊 Ambient On", labelOff="🔈 Ambient Off"){
  const btn = document.getElementById(toggleId);
  const audio = document.getElementById(audioId);
  if(!btn || !audio) return;
  // persist user choice in localStorage
  const KEY = "dream_ambient_on";
  const saved = localStorage.getItem(KEY) === "1";
  if(saved){ audio.play().catch(()=>{}); btn.textContent = labelOn; }
  else { audio.pause(); btn.textContent = labelOff; }

  btn.addEventListener("click", ()=>{
    const on = !audio.paused;
    if(on){
      audio.pause();
      btn.textContent = labelOff;
      localStorage.setItem(KEY, "0");
    } else {
      audio.play().catch(()=>{});
      btn.textContent = labelOn;
      localStorage.setItem(KEY, "1");
    }
  });
}

/* attach audio toggles on DOM ready for several pages */
document.addEventListener("DOMContentLoaded", ()=>{
  wireAudioToggle("audioToggle", "ambientAudio");
  wireAudioToggle("audioToggleLogin", "ambientAudioLogin");
  wireAudioToggle("audioToggleRegister", "ambientAudioRegister");
  wireAudioToggle("audioTogglePortfolio", "ambientAudioPortfolio", "🔊", "🔈");
});

/* ======= Detect touch device (used for performance decisions) ======= */
function isTouch(){
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
}

/* ======= Cursor-follow buttons (desktop only) ======= */
if(!isTouch()){
  document.addEventListener("mousemove", e=>{
    document.querySelectorAll(".glow-btn").forEach(btn=>{
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width/2;
      const y = e.clientY - rect.top - rect.height/2;
      btn.style.transform = `translate(${x*0.03}px, ${y*0.03}px)`;
    });
    // subtle nav logo tilt
    document.querySelectorAll(".nav-logo").forEach(n=>{
      const rect = n.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width/2;
      n.style.transform = `translateX(${x*0.01}px)`;
    });
  });
}

/* ======= Particles: dreamcore floating dots ======= */
const canvas = document.getElementById("dreamCanvas");
const ctx = canvas ? canvas.getContext("2d") : null;
if(canvas && ctx){
  function resize(){ canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
  resize();
  window.addEventListener("resize", resize);

  const particleCount = isTouch() ? 60 : 160;
  class Particle {
    constructor(){ this.reset(); }
    reset(){
      this.x = Math.random()*canvas.width;
      this.y = Math.random()*canvas.height;
      this.r = Math.random()*2.6 + 0.6;
      this.vx = Math.random()*0.8 - 0.4;
      this.vy = Math.random()*0.8 - 0.4;
      this.c = `rgba(${Math.floor(180 + Math.random()*60)}, ${Math.floor(150 + Math.random()*100)}, ${Math.floor(200 + Math.random()*55)}, ${0.45 + Math.random()*0.25})`;
    }
    update(){
      this.x += this.vx; this.y += this.vy;
      if(this.x < -20 || this.x > canvas.width + 20 || this.y < -20 || this.y > canvas.height + 20) this.reset();
    }
    draw(){
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI*2);
      ctx.fillStyle = this.c;
      ctx.fill();
    }
  }

  const particles = Array.from({length: particleCount}, ()=> new Particle());
  (function animate(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    particles.forEach(p=>{ p.update(); p.draw(); });
    requestAnimationFrame(animate);
  })();
}

/* ======= Parallax orbs ======= */
const orbContainer = document.getElementById("parallaxOrbs");
if(orbContainer){
  // make a few orbs
  const ORB_COUNT = 6;
  for(let i=0;i<ORB_COUNT;i++){
    const orb = document.createElement("div");
    orb.className = "orb";
    orb.style.left = Math.random()*110 + "vw";
    orb.style.top  = Math.random()*110 + "vh";
    orb.style.width = (90 + Math.random()*120) + "px";
    orb.style.height= orb.style.width;
    orb.style.animationDuration = (10 + Math.random()*10) + "s";
    orb.style.opacity = 0.65 + Math.random()*0.25;
    orbContainer.appendChild(orb);
  }

  if(!isTouch()){
    document.addEventListener("mousemove", e=>{
      const px = (e.clientX / window.innerWidth - 0.5) * 12;
      const py = (e.clientY / window.innerHeight - 0.5) * 6;
      orbContainer.style.transform = `translate(${px}px, ${py}px)`;
    });
  }
}

/* ======= Floating dreamcore quotes ======= */
const QUOTES = [
  "“Softly, the world folds into color.”",
  "“You can carry sunlight in your pockets.”",
  "“The quietest dreams are the loudest to the heart.”",
  "“Drift — the map will find you.”",
  "“Collect little stars and leave them in a jar for later.”"
];
let quoteIndex = 0;
function initQuotes(){
  const banner = document.getElementById("quoteBanner");
  if(!banner) return;
  banner.textContent = QUOTES[quoteIndex];
  setInterval(()=>{
    quoteIndex = (quoteIndex + 1) % QUOTES.length;
    banner.style.opacity = 0;
    setTimeout(()=> { banner.textContent = QUOTES[quoteIndex]; banner.style.opacity = 1; }, 400);
  }, 6000);
}

// MUSIC CONTROLLER
let music = document.getElementById("bgMusic");
let musicOn = false;

function toggleMusic(){
  if(!musicOn){
    music.volume = 0;
    music.play();
    fadeInMusic();
  } else {
    fadeOutMusic();
  }
  musicOn = !musicOn;
}

function fadeInMusic(){
  let vol = 0;
  let fade = setInterval(()=>{
    if(vol < 0.4){
      vol += 0.01;
      music.volume = vol;
    } else {
      clearInterval(fade);
    }
  }, 60);
}

function fadeOutMusic(){
  let vol = music.volume;
  let fade = setInterval(()=>{
    if(vol > 0){
      vol -= 0.01;
      music.volume = vol;
    } else {
      music.pause();
      clearInterval(fade);
    }
  }, 60);
}
