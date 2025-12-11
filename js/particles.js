// Dreamcore particle engine for canvas & parallax orbs
const canvas = document.getElementById('dreamCanvas');
if(canvas){
  const ctx = canvas.getContext('2d');
  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;

  const orbs = [];
  const colors = ['rgba(255,255,255,0.6)','rgba(200,200,255,0.5)','rgba(255,220,255,0.5)'];
  for(let i=0;i<50;i++){
    orbs.push({
      x: Math.random()*width,
      y: Math.random()*height,
      r: 20+Math.random()*50,
      dx: (Math.random()-0.5)*0.5,
      dy: (Math.random()-0.5)*0.5,
      color: colors[Math.floor(Math.random()*colors.length)]
    });
  }

  function animate(){
    ctx.clearRect(0,0,width,height);
    orbs.forEach(o=>{
      ctx.beginPath();
      ctx.arc(o.x,o.y,o.r,0,Math.PI*2);
      ctx.fillStyle = o.color;
      ctx.fill();
      o.x += o.dx; o.y += o.dy;
      if(o.x<0 || o.x>width) o.dx*=-1;
      if(o.y<0 || o.y>height) o.dy*=-1;
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
