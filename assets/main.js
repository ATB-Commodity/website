/* ===== POPUP: MỞ TÀI KHOẢN ===== */
function openModal(){
  document.getElementById('modalOverlay').classList.add('open');
  document.getElementById('modalForm').style.display='block';
  document.getElementById('modalSuccess').style.display='none';
  document.getElementById('fName').focus();
}
function closeModal(){
  document.getElementById('modalOverlay').classList.remove('open');
}

/* ===== MENU MOBILE (HAMBURGER) ===== */
function toggleMenu(){
  const menu=document.getElementById('mainMenu');
  const btn=document.getElementById('menuToggle');
  const open=menu.classList.toggle('open');
  btn.setAttribute('aria-expanded',open?'true':'false');
}
function closeMenu(){
  document.getElementById('mainMenu').classList.remove('open');
  document.getElementById('menuToggle').setAttribute('aria-expanded','false');
}
document.getElementById('mainMenu').addEventListener('click',e=>{if(e.target.tagName==='A')closeMenu()});

document.addEventListener('keydown',e=>{if(e.key==='Escape'){closeModal();closeMenu()}});

/* ===== FORM ĐĂNG KÝ TƯ VẤN (Formspree) ===== */
async function submitLead(){
  const name=document.getElementById('fName');
  const email=document.getElementById('fEmail');
  const phone=document.getElementById('fPhone');
  const errorEl=document.getElementById('formError');
  const submitBtn=document.getElementById('submitBtn');
  let ok=true;
  [name,email,phone].forEach(f=>f.classList.remove('err'));
  errorEl.style.display='none';
  if(!name.value.trim()){name.classList.add('err');ok=false}
  if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email.value.trim())){email.classList.add('err');ok=false}
  if(!/^(0|\+84)\d{8,10}$/.test(phone.value.replace(/\s/g,''))){phone.classList.add('err');ok=false}
  if(!ok)return;

  submitBtn.disabled=true;
  submitBtn.textContent='Đang gửi...';

  try{
    const res=await fetch('https://formspree.io/f/xykrbakb',{
      method:'POST',
      headers:{'Content-Type':'application/json',Accept:'application/json'},
      body:JSON.stringify({name:name.value.trim(),email:email.value.trim(),phone:phone.value.trim()})
    });
    if(!res.ok)throw new Error('submit failed');
    document.getElementById('modalForm').style.display='none';
    document.getElementById('modalSuccess').style.display='block';
  }catch(err){
    errorEl.textContent='Gửi không thành công, vui lòng thử lại';
    errorEl.style.display='block';
  }finally{
    submitBtn.disabled=false;
    submitBtn.textContent='Gửi thông tin';
  }
}

/* ===== TIỆN ÍCH DÙNG CHUNG CHO DỮ LIỆU BÀI VIẾT ===== */
function splitDate(d){
  const parts=d.split('/'); // "dd/mm/yyyy" -> ["dd","mm","yyyy"]
  return {day:parts[0], monthYear:parts[1]+'/'+parts[2]};
}

/* ===== TRANG CHỦ: RENDER "TIN TỨC 24/7" TỪ data/articles.js ===== */
function renderNewsGrid(){
  const el=document.getElementById('newsGrid');
  if(!el || typeof ARTICLES==='undefined')return;

  const items=ARTICLES.filter(a=>a.type==='news');
  if(!items.length)return;
  const feature=items.find(a=>a.feature)||items[0];
  const rest=items.filter(a=>a!==feature);
  const col1=[],col2=[];
  rest.forEach((a,i)=>(i%2===0?col1:col2).push(a));

  const cardHTML=(a,isFeature)=>`
    <article class="news-card${isFeature?' feature':''}">
      ${isFeature?`<div class="news-thumb">${a.thumb||'📰'}</div>`:''}
      <div class="news-body">
        <span class="tag ${a.tagClass||''}">${a.category}</span>
        <h3><a href="bai-viet.html?slug=${encodeURIComponent(a.slug)}">${a.title}</a></h3>
        ${isFeature && a.excerpt?`<p>${a.excerpt}</p>`:''}
        <div class="meta"><span>${a.date}</span>${a.meta2?`<span>·</span><span>${a.meta2}</span>`:''}</div>
      </div>
    </article>`;

  let html=cardHTML(feature,true);
  html+=`<div class="side-list">${col1.map(a=>cardHTML(a,false)).join('')}</div>`;
  html+=`<div class="side-list">${col2.map(a=>cardHTML(a,false)).join('')}</div>`;
  el.innerHTML=html;
}

/* ===== TRANG CHỦ: RENDER "TIN ĐIỀU HÀNH MXV" TỪ data/articles.js ===== */
function renderMxvList(){
  const el=document.getElementById('mxvList');
  if(!el || typeof ARTICLES==='undefined')return;

  const items=ARTICLES.filter(a=>a.type==='mxv');
  el.innerHTML=items.map(a=>{
    const {day,monthYear}=splitDate(a.date);
    return `<a class="mxv-item" href="bai-viet.html?slug=${encodeURIComponent(a.slug)}">
      <div class="mxv-date"><b>${day}</b>${monthYear}</div>
      <div><h3>${a.title}</h3><small>${a.note||''}</small></div>
    </a>`;
  }).join('');
}

/* ===== TRANG CHI TIẾT BÀI VIẾT (bai-viet.html) ===== */
function renderArticlePage(){
  const el=document.getElementById('articleRoot');
  if(!el || typeof ARTICLES==='undefined')return;

  const slug=new URLSearchParams(location.search).get('slug');
  const a=ARTICLES.find(x=>x.slug===slug);

  if(!a){
    el.innerHTML=`
      <div class="article-detail">
        <h1>Không tìm thấy bài viết</h1>
        <p style="margin-top:12px;color:var(--muted)">Bài viết bạn tìm không tồn tại hoặc đã bị gỡ bỏ.</p>
        <a class="btn" style="margin-top:20px;display:inline-block" href="index.html">← Về trang chủ</a>
      </div>`;
    return;
  }

  const isNews=a.type==='news';
  const catLabel=isNews?(a.category||'Tin tức'):'Tin điều hành MXV';
  document.title=a.title+' — ATB Commodity';
  const metaDesc=document.querySelector('meta[name="description"]');
  if(metaDesc)metaDesc.setAttribute('content',a.excerpt||a.note||a.title);

  const metaLine=isNews
    ? `<span>${a.date}</span>${a.meta2?`<span>·</span><span>${a.meta2}</span>`:''}`
    : `<span>${a.date}</span>${a.note?`<span>·</span><span>${a.note}</span>`:''}`;

  const disclaimer=isNews
    ? `<div class="article-disclaimer">⚠️ <b>Miễn trừ trách nhiệm:</b> Nội dung trên chỉ mang tính chất tham khảo, không phải khuyến nghị đầu tư. Giao dịch hàng hóa phái sinh có rủi ro; nhà đầu tư tự chịu trách nhiệm với quyết định của mình.</div>`
    : '';

  el.innerHTML=`
    <div class="breadcrumb"><a href="index.html">Trang chủ</a> / <span>${catLabel}</span></div>
    <article class="article-detail">
      <span class="tag ${a.tagClass||''}">${catLabel}</span>
      <h1>${a.title}</h1>
      <div class="meta">${metaLine}</div>
      <div class="article-body">${a.body}</div>
      ${disclaimer}
    </article>
    <a class="btn ghost article-back" href="index.html">← Quay lại trang chủ</a>`;
}

renderNewsGrid();
renderMxvList();
renderArticlePage();
