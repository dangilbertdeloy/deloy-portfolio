// Wait until DOM fully loaded
document.addEventListener("DOMContentLoaded", () => {

  const canvas = document.getElementById('dreamCanvas');
  const parallax = document.getElementById('parallaxOrbs');

  // Canvas particles
  if(canvas){
    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    const orbs = [];
    const colors = ['rgba(255,255,255,0.6)','rgba(200,200,255,0.5)','rgba(255,220,255,0.5)'];

    for(let i=0;i<60;i++){
      orbs.push({
        x: Math.random()*width,
        y: Math.random()*height,
        r: 8 + Math.random()*20,
        dx: (Math.random()-0.5)*0.3,
        dy: (Math.random()-0.5)*0.3,
        opacity: Math.random()*0.5+0.2,
        dOpacity: (Math.random()*0.002)+0.001
      });
    }

    function animate(){
      ctx.clearRect(0,0,width,height);
      orbs.forEach(o=>{
        ctx.beginPath();
        ctx.arc(o.x,o.y,o.r,0,Math.PI*2);
        ctx.fillStyle = `rgba(255,255,255,${o.opacity})`;
        ctx.fill();

        o.x += o.dx;
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
