// js/main.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile
} from "https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js";

// ---------- Firebase config ----------
const firebaseConfig = {
  apiKey: "AIzaSyCl5hlO_FK2Pl4un8S4rKbQNj9sYy5WLi0",
  authDomain: "dreamscape-portfolio.firebaseapp.com",
  projectId: "dreamscape-portfolio",
  storageBucket: "dreamscape-portfolio.firebasestorage.app",
  messagingSenderId: "1008209469846",
  appId: "1:1008209469846:web:080c4b22e8eb1cd9923db7",
  measurementId: "G-4CS4205RSF"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Utility: get page name
const page = window.location.pathname.split("/").pop() || "index.html";

// ---------- Loader & page transitions ----------
document.addEventListener("DOMContentLoaded", () => {
  const loader = document.querySelector(".loader");
  // show a short loader on page load then hide
  if (loader) {
    loader.style.display = "flex";
    setTimeout(() => { loader.style.display = "none"; document.body.classList.add("page-ready"); }, 650);
  } else {
    document.body.classList.add("page-ready");
  }

  // Add small fade-out on link clicks for nicer transition
  document.querySelectorAll("a, .glow-btn, .nav-logo, button").forEach(el => {
    el.addEventListener("click", (e) => {
      // only animate for navigation (links or explicit data-nav)
      const href = (el.tagName === "A" && el.href) ? el.href : null;
      if (href && href.indexOf(location.origin) === 0 && !e.defaultPrevented) {
        // let normal link proceed but show fade
        document.body.classList.remove("page-ready");
        document.body.style.transition = "opacity .45s ease";
        document.body.style.opacity = 0;
        setTimeout(()=> { window.location = href; }, 420);
        e.preventDefault();
      }
    });
  });

  // Setup audio toggles (works if buttons exist)
  setupAudio("audioToggleIndex", "ambientAudioIndex");
  setupAudio("audioToggleLogin", "ambientAudioLogin");
  setupAudio("audioToggleRegister", "ambientAudioRegister");
  setupAudio("audioTogglePortfolio", "ambientAudioPortfolio");
});

// ---------- Auth: Register ----------
if (page === "register.html") {
  const form = document.getElementById("registerForm");
  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const usernameField = document.getElementById("newUsername");
      const passField = document.getElementById("newPassword");
      const username = usernameField.value.trim();
      const password = passField.value.trim();
      // create synthetic email from username (keeps UI simple)
      const email = username + "@dreamscape.local";
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(userCredential.user, { displayName: username });
        // save for display
        sessionStorage.setItem("currentUser", username);
        // redirect to portfolio
        window.location.href = "portfolio.html";
      } catch (err) {
        alert(err.message);
      }
    });
  }
}

// ---------- Auth: Login ----------
if (page === "login.html") {
  const form = document.getElementById("loginForm");
  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const userField = document.getElementById("loginUsername");
      const passField = document.getElementById("loginPassword");
      const username = userField.value.trim();
      const password = passField.value.trim();
      const email = username + "@dreamscape.local";
      try {
        await signInWithEmailAndPassword(auth, email, password);
        // store current user for portfolio display
        sessionStorage.setItem("currentUser", username);
        window.location.href = "portfolio.html";
      } catch (err) {
        alert(err.message);
      }
    });
  }

  // back button
  const backBtn = document.getElementById("backBtnLogin");
  if (backBtn) backBtn.addEventListener("click", () => window.location.href = "index.html");
}

// ---------- Portfolio: protect page & show user ----------
if (page === "portfolio.html") {
  onAuthStateChanged(auth, (user) => {
    // if no user, redirect to login
    if (!user) {
      window.location.href = "login.html";
      return;
    }
    // get display name
    const displayName = sessionStorage.getItem("currentUser") || user.displayName || user.email || "Traveler";
    const el = document.getElementById("portfolioUser");
    const el2 = document.getElementById("usernameDisplay");
    if (el) el.textContent = displayName;
    if (el2) el2.textContent = displayName;
  });

  // logout
  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", async () => {
      await signOut(auth);
      sessionStorage.removeItem("currentUser");
      window.location.href = "index.html";
    });
  }
}

// back button on register
if (page === "register.html") {
  const backBtn = document.getElementById("backBtnRegister");
  if (backBtn) backBtn.addEventListener("click", () => window.location.href = "index.html");
}

// project expand helper (delegate)
window.toggleCard = (btn) => {
  const card = btn.closest(".project-card");
  if (card) card.classList.toggle("expanded");
};

// scroll helper
window.scrollToSection = (id) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth" });
};

// ---------- audio helper ----------
function setupAudio(btnId, audioId) {
  const btn = document.getElementById(btnId);
  const audio = document.getElementById(audioId);
  if (!btn || !audio) return;

  audio.volume = 0.35; // comfortable default

  // Ensure autoplay doesn't crash — wait for user gesture if blocked
  btn.addEventListener("click", async () => {
    if (audio.paused) { try { await audio.play(); } catch(e) { /* autoplay blocked */ } btn.textContent = "🔊 Ambient On"; }
    else { audio.pause(); btn.textContent = "🔈 Ambient Off"; }
  });

  audio.addEventListener("play", () => btn.textContent = "🔊 Ambient On");
  audio.addEventListener("pause", () => btn.textContent = "🔈 Ambient Off");
}
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
