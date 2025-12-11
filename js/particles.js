// js/particles.js
document.addEventListener("DOMContentLoaded", () => {

  const canvas = document.getElementById("dreamCanvas");
  const parallax = document.getElementById("parallaxOrbs");
  const shapesLayer = document.getElementById("floatingShapes");

  /* CANVAS PARTICLES */
  if (canvas) {
    const ctx = canvas.getContext("2d");
    let w = canvas.width = window.innerWidth;
    let h = canvas.height = window.innerHeight;

    const particles = [];
    for (let i = 0; i < 90; i++) { // more but smaller
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        r: 2 + Math.random() * 6,            // small radius
        dx: (Math.random() - 0.5) * 0.35,
        dy: (Math.random() - 0.5) * 0.35,
        opacity: Math.random() * 0.5 + 0.15,
        dOpacity: (Math.random() * 0.003) + 0.0006
      });
    }

    function draw() {
      ctx.clearRect(0, 0, w, h);
      particles.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${p.opacity})`;
        ctx.fill();

        p.x += p.dx; p.y += p.dy;
        if (p.x < -10 || p.x > w + 10) p.dx *= -1;
        if (p.y < -10 || p.y > h + 10) p.dy *= -1;

        p.opacity += p.dOpacity;
        if (p.opacity > 0.85 || p.opacity < 0.08) p.dOpacity *= -1;
      });
      requestAnimationFrame(draw);
    }
    draw();

    window.addEventListener("resize", () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    });
  }

  /* PARALLAX BLURRED ORBS */
  if (parallax) {
    parallax.innerHTML = "";
    for (let i = 0; i < 20; i++) {
      const orb = document.createElement("div");
      orb.className = "orb";
      const size = 20 + Math.random() * 80;
      orb.style.width = orb.style.height = `${size}px`;
      orb.style.left = `${Math.random() * 100}%`;
      orb.style.top = `${Math.random() * 100}%`;
      orb.style.opacity = (Math.random() * 0.45 + 0.12).toFixed(2);
      orb.style.animationDuration = `${8 + Math.random() * 8}s`;
      parallax.appendChild(orb);
    }

    // simple parallax on mouse (desktop)
    if (!('ontouchstart' in window)) {
      document.addEventListener('mousemove', (e) => {
        const px = (e.clientX / window.innerWidth - 0.5) * 10;
        const py = (e.clientY / window.innerHeight - 0.5) * 6;
        parallax.style.transform = `translate(${px}px, ${py}px)`;
      });
    }
  }

  /* FLOATING SHAPES */
  if (shapesLayer) {
    shapesLayer.innerHTML = "";
    for (let i = 0; i < 12; i++) {
      const s = document.createElement("div");
      s.className = "shape";
      const left = Math.random() * 95;
      const top = Math.random() * 95;
      const size = 18 + Math.random() * 52;
      s.style.left = `${left}%`;
      s.style.top = `${top}%`;
      s.style.width = `${size}px`;
      s.style.height = `${Math.max(18, size / 1.6)}px`;
      s.style.opacity = (Math.random() * 0.35 + 0.08).toFixed(2);
      s.style.animationDuration = `${8 + Math.random() * 10}s`;
      s.style.transform = `rotate(${Math.random() * 30 - 10}deg)`;
      shapesLayer.appendChild(s);
    }
  }

});
        o.y += o.dy;

        if(o.x<0||o.x>width) o.dx*=-1;
        if(o.y<0||o.y>height) o.dy*=-1;

        o.opacity += o.dOpacity;
        if(o.opacity>0.8 || o.opacity<0.1) o.dOpacity*=-1;
      });
      requestAnimationFrame(animate);
    }

    animate();

    window.addEventListener('resize', ()=>{
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });
  }

  // Parallax blurred orbs
  if(parallax){
    parallax.innerHTML = ''; // clear existing
    for(let i=0;i<25;i++){
      const orb = document.createElement('div');
      orb.className = 'orb';
      orb.style.left = `${Math.random()*100}%`;
      orb.style.top = `${Math.random()*100}%`;
      const size = 30 + Math.random()*80;
      orb.style.width = orb.style.height = `${size}px`;
      orb.style.opacity = Math.random()*0.4 + 0.2;
      orb.style.animationDuration = `${8 + Math.random()*8}s`;
      parallax.appendChild(orb);
    }
  }

});
      if(o.x<0 || o.x>width) o.dx*=-1;
      if(o.y<0 || o.y>height) o.dy*=-1;

      // fade in/out
      o.opacity += o.dOpacity;
      if(o.opacity > 0.8 || o.opacity < 0.1) o.dOpacity *= -1;
    });
    requestAnimationFrame(animate);
  }

  animate();

  window.addEventListener('resize', ()=>{
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });
}

// Parallax blurred orbs
const parallax = document.getElementById('parallaxOrbs');
if(parallax){
  for(let i=0;i<25;i++){ // more smaller blurred orbs
    const orb = document.createElement('div');
    orb.className = 'orb';
    orb.style.left = `${Math.random()*100}%`;
    orb.style.top = `${Math.random()*100}%`;
    const size = 30 + Math.random()*80; // smaller sizes
    orb.style.width = `${size}px`;
    orb.style.height = `${size}px`;
    orb.style.opacity = Math.random()*0.4 + 0.2; // subtle opacity
    orb.style.animationDuration = `${8 + Math.random()*8}s`; // different float speeds
    parallax.appendChild(orb);
  }
}
      if(o.x<0 || o.x>width) o.dx*=-1;
      if(o.y<0 || o.y>height) o.dy*=-1;

      // fade in/out
      o.opacity += o.dOpacity;
      if(o.opacity > 0.8 || o.opacity < 0.1) o.dOpacity *= -1;
    });
    requestAnimationFrame(animate);
  }

  animate();

  window.addEventListener('resize', ()=>{
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });
}

// Parallax blurred orbs
const parallax = document.getElementById('parallaxOrbs');
if(parallax){
  for(let i=0;i<25;i++){ // more smaller blurred orbs
    const orb = document.createElement('div');
    orb.className = 'orb';
    orb.style.left = `${Math.random()*100}%`;
    orb.style.top = `${Math.random()*100}%`;
    const size = 30 + Math.random()*80; // smaller sizes
    orb.style.width = `${size}px`;
    orb.style.height = `${size}px`;
    orb.style.opacity = Math.random()*0.4 + 0.2; // subtle opacity
    orb.style.animationDuration = `${8 + Math.random()*8}s`; // different float speeds
    parallax.appendChild(orb);
  }
}
  window.addEventListener('resize', ()=>{
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });
}

// Parallax blurred orbs
const parallax = document.getElementById('parallaxOrbs');
if(parallax){
  for(let i=0;i<15;i++){
    const orb = document.createElement('div');
    orb.className = 'orb';
    orb.style.left = `${Math.random()*100}%`;
    orb.style.top = `${Math.random()*100}%`;
    orb.style.width = `${50+Math.random()*120}px`;
    orb.style.height = orb.style.width;
    parallax.appendChild(orb);
  }
}
