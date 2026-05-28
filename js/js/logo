(function() {

  /* ── shared draw function ── */
  function makeLogoDrawer(canvas) {
    if (!canvas) return null;
    const ctx = canvas.getContext('2d');
    const BASE = 840;
    const DPR  = Math.min(window.devicePixelRatio || 1, 3);
    canvas.width  = BASE * DPR;
    canvas.height = BASE * DPR;
    ctx.scale(DPR, DPR);
    const W = BASE, H = BASE, CX = W/2, CY = H/2;

    return function draw(R, na, ps, pg) {
      ctx.clearRect(0,0,W,H);

      /* background disc */
      ctx.save();
      ctx.beginPath(); ctx.arc(CX,CY,R,0,Math.PI*2);
      const bgG = ctx.createRadialGradient(CX,CY-R*0.28,R*0.07,CX,CY,R);
      bgG.addColorStop(0,'#162040'); bgG.addColorStop(1,'#08111e');
      ctx.fillStyle = bgG; ctx.fill(); ctx.restore();

      /* outer ring */
      ctx.save(); ctx.beginPath(); ctx.arc(CX,CY,R,0,Math.PI*2);
      ctx.strokeStyle='#c8a020'; ctx.lineWidth=R*0.016; ctx.globalAlpha=0.75;
      ctx.stroke(); ctx.globalAlpha=1; ctx.restore();

      /* inner ring */
      ctx.save(); ctx.beginPath(); ctx.arc(CX,CY,R-R*0.07,0,Math.PI*2);
      ctx.strokeStyle='#c8a020'; ctx.lineWidth=R*0.004; ctx.globalAlpha=0.28;
      ctx.stroke(); ctx.globalAlpha=1; ctx.restore();

      /* tick marks */
      for(let i=0;i<72;i++){
        const a=(i/72)*Math.PI*2;
        const major=i%6===0, mid=i%2===0&&!major;
        ctx.save();
        ctx.strokeStyle='#c8a020';
        ctx.lineWidth = major?R*0.009:(mid?R*0.006:R*0.004);
        ctx.globalAlpha = major?0.7:(mid?0.38:0.2);
        ctx.beginPath();
        ctx.moveTo(CX+Math.cos(a)*(R-R*0.025),CY+Math.sin(a)*(R-R*0.025));
        ctx.lineTo(CX+Math.cos(a)*(major?R-R*0.085:(mid?R-R*0.055:R-R*0.038)),
                   CY+Math.sin(a)*(major?R-R*0.085:(mid?R-R*0.055:R-R*0.038)));
        ctx.stroke(); ctx.restore();
      }

      /* cardinal labels */
      [{l:'N',a:-Math.PI/2},{l:'O',a:0},{l:'S',a:Math.PI/2},{l:'W',a:Math.PI}].forEach(d=>{
        const tx=CX+Math.cos(d.a)*(R-R*0.155);
        const ty=CY+Math.sin(d.a)*(R-R*0.155);
        ctx.save();
        ctx.font=(d.l==='N'?'bold ':'')+(R*0.075)+'px Georgia,serif';
        ctx.fillStyle=d.l==='N'?'#f0c040':'#9a7a12';
        ctx.textAlign='center'; ctx.textBaseline='middle';
        ctx.globalAlpha=d.l==='N'?1:0.7;
        ctx.fillText(d.l,tx,ty+R*0.006); ctx.restore();
      });

      /* cross + diagonal lines */
      [[0,-(R-R*0.16),0,R-R*0.16],[-(R-R*0.16),0,R-R*0.16,0]].forEach(([x1,y1,x2,y2])=>{
        ctx.save(); ctx.strokeStyle='#c8a020'; ctx.lineWidth=R*0.003; ctx.globalAlpha=0.15;
        ctx.beginPath(); ctx.moveTo(CX+x1,CY+y1); ctx.lineTo(CX+x2,CY+y2);
        ctx.stroke(); ctx.globalAlpha=1; ctx.restore();
      });
      [45,135].forEach(deg=>{
        const r=deg*Math.PI/180, d=R-R*0.16;
        ctx.save(); ctx.strokeStyle='#c8a020'; ctx.lineWidth=R*0.002; ctx.globalAlpha=0.1;
        ctx.beginPath(); ctx.moveTo(CX+Math.cos(r)*d,CY+Math.sin(r)*d);
        ctx.lineTo(CX-Math.cos(r)*d,CY-Math.sin(r)*d);
        ctx.stroke(); ctx.globalAlpha=1; ctx.restore();
      });

      /* § symbol — prominent */
      ctx.save();
      const fs = Math.round(R*1.22*ps);
      ctx.font=`bold ${fs}px Georgia,'Times New Roman',serif`;
      ctx.textAlign='center'; ctx.textBaseline='middle';
      if(pg>0.04){
        [['#ffe070',pg*0.18,R*0.24],['#d4a017',pg*0.28,R*0.13]].forEach(([col,alpha,blur])=>{
          ctx.save(); ctx.font=`bold ${fs}px Georgia,'Times New Roman',serif`;
          ctx.textAlign='center'; ctx.textBaseline='middle';
          ctx.globalAlpha=alpha; ctx.shadowColor=col; ctx.shadowBlur=blur;
          ctx.fillStyle=col; ctx.fillText('§',CX+R*0.004,CY+R*0.022); ctx.restore();
        });
      }
      const grd=ctx.createLinearGradient(CX-R*0.36,CY-R*0.5,CX+R*0.29,CY+R*0.5);
      grd.addColorStop(0.0,`rgba(255,242,180,${0.88+pg*0.12})`);
      grd.addColorStop(0.35,`rgba(240,192,50,${0.92+pg*0.08})`);
      grd.addColorStop(0.7,'rgba(180,130,10,0.88)');
      grd.addColorStop(1.0,'rgba(90,60,0,0.85)');
      ctx.globalAlpha=0.95; ctx.fillStyle=grd;
      ctx.fillText('§',CX+R*0.004,CY+R*0.022); ctx.restore();

      /* needle */
      ctx.save(); ctx.translate(CX,CY); ctx.rotate(na+Math.PI/2);
      const nlen=R*0.72, ng=ctx.createLinearGradient(0,-nlen,0,0);
      ng.addColorStop(0,'#fff0a0'); ng.addColorStop(0.4,'#f5d050'); ng.addColorStop(1,'#b8860b');
      ctx.beginPath();
      ctx.moveTo(0,-nlen); ctx.lineTo(-R*0.05,R*0.02); ctx.lineTo(0,-R*0.03); ctx.lineTo(R*0.05,R*0.02);
      ctx.closePath(); ctx.fillStyle=ng;
      ctx.shadowColor='rgba(240,192,50,0.4)'; ctx.shadowBlur=R*0.04; ctx.fill();
      ctx.shadowBlur=0;
      const slen=R*0.66, sg=ctx.createLinearGradient(0,0,0,slen);
      sg.addColorStop(0,'#7a5c0e'); sg.addColorStop(1,'#2e1f02');
      ctx.beginPath();
      ctx.moveTo(0,slen); ctx.lineTo(-R*0.05,-R*0.02); ctx.lineTo(0,R*0.03); ctx.lineTo(R*0.05,-R*0.02);
      ctx.closePath(); ctx.fillStyle=sg; ctx.fill(); ctx.restore();

      /* center jewel */
      ctx.save();
      const jr=R*0.065;
      const jg=ctx.createRadialGradient(CX-jr*0.3,CY-jr*0.3,jr*0.08,CX,CY,jr);
      jg.addColorStop(0,'#fffae0'); jg.addColorStop(0.5,'#d4a017'); jg.addColorStop(1,'#3a2800');
      ctx.beginPath(); ctx.arc(CX,CY,jr*1.55,0,Math.PI*2);
      ctx.fillStyle='#0d1525'; ctx.fill();
      ctx.strokeStyle='#d4a017'; ctx.lineWidth=R*0.012; ctx.stroke();
      ctx.beginPath(); ctx.arc(CX,CY,jr,0,Math.PI*2);
      ctx.fillStyle=jg; ctx.fill();
      ctx.beginPath(); ctx.arc(CX,CY,jr*0.38,0,Math.PI*2);
      ctx.fillStyle='#fff8c0'; ctx.fill(); ctx.restore();
    };
  }

  function lerp(a,b,t){ return a+(b-a)*t; }

  /* ── Hero logo (large) ── */
  const heroCanvas = document.getElementById('rd-hero-logo-canvas');
  const heroR = 390; // logical radius in 840px space
  let heroNeedle=-Math.PI/2, heroTarget=-Math.PI/2;
  let hPs=1, hPd=1, hPg=0, hSwayT=0, hHovered=false;
  const drawHero = makeLogoDrawer(heroCanvas);

  /* ── Header logo (small) ── */
  const headerCanvas = document.getElementById('rd-logo-canvas');
  const headerR = 102;
  let hdrNeedle=-Math.PI/2;
  const drawHeader = makeLogoDrawer(headerCanvas);

  /* ── Banner logo (sub-page centered) ── */
  const bannerCanvas = document.getElementById('rd-logo-canvas-banner');
  const bannerR = 102;
  const drawBanner = makeLogoDrawer(bannerCanvas);

  /* ── Shared animation state for header (mirrors hero subtly) ── */
  let lastT=0;

  function tick(ts){
    const dt=Math.min((ts-lastT)/16.67,3); lastT=ts;

    /* Hero */
    if(hHovered){
      hSwayT+=0.018*dt;
      heroTarget=-Math.PI/2+Math.sin(hSwayT)*0.065+Math.sin(hSwayT*0.37)*0.028;
      hPs+=0.0028*hPd*dt;
      if(hPs>1.09) hPd=-1; if(hPs<0.94) hPd=1;
      hPg=Math.max(0,Math.min(1,(hPs-0.94)/0.15));
    } else {
      heroTarget=-Math.PI/2;
      hPs=lerp(hPs,1,0.045*dt);
      hPg=lerp(hPg,0,0.055*dt);
    }
    heroNeedle=lerp(heroNeedle,heroTarget,0.045*dt);
    if(drawHero) drawHero(heroR, heroNeedle, hPs, hPg);

    /* Header (always idle, follows hero needle softly) */
    hdrNeedle=lerp(hdrNeedle,heroNeedle,0.12*dt);
    if(drawHeader) drawHeader(headerR, hdrNeedle, 1, 0);
    if(drawBanner) drawBanner(bannerR, hdrNeedle, 1, 0);

    requestAnimationFrame(tick);
  }

  const heroWrap = document.getElementById('rd-hero-logo-link');
  if(heroWrap){
    heroWrap.addEventListener('mouseenter',()=>{ hHovered=true; hSwayT=0; hPd=1; });
    heroWrap.addEventListener('mouseleave',()=>{ hHovered=false; });
  }

  /* ── Scroll handler: darken header on scroll ── */
  const header = document.getElementById('site-header');
  const headerLogo = document.getElementById('header-logo');

  function updateHeader(){
    const scrolled = window.scrollY > 60;
    if(header){
      header.classList.toggle('solid', scrolled && !document.body.classList.contains('sub-page'));
    }
  }
  window.addEventListener('scroll', updateHeader, {passive:true});

  /* ── Page switch: show/hide header logo & style ── */
  const origNavigate = window.navigate;
  window.navigate = function(pageId){
    if(origNavigate) origNavigate(pageId);
    const isHome = (pageId === 'home');
    document.body.classList.toggle('sub-page', !isHome);
    if(header){
      header.classList.toggle('page-light', !isHome);
      header.classList.toggle('solid', false);
    }
    if(headerLogo){
      headerLogo.style.opacity = isHome ? '0' : '1';
      headerLogo.style.pointerEvents = isHome ? 'none' : 'auto';
    }
    const siteNav = document.getElementById('site-nav');
    if(siteNav){
      siteNav.style.opacity = isHome ? '0' : '1';
      siteNav.style.pointerEvents = isHome ? 'none' : 'auto';
    }
    updateHeader();
  };

  /* Lang btn color on dark */
  const langBtn = document.getElementById('lang-btn');
  if(langBtn){
    langBtn.style.cssText += ';color:rgba(255,255,255,0.8);border-color:rgba(255,255,255,0.25);';
  }

  requestAnimationFrame(ts=>{ lastT=ts; requestAnimationFrame(tick); });
})();
