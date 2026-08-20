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
function parseDate(d){
  const [dd,mm,yyyy]=d.split('/').map(Number);
  return new Date(yyyy,mm-1,dd);
}

/* ===== TRANG CHỦ: RENDER "KHUYẾN NGHỊ GIAO DỊCH" (tín hiệu TradingView qua Make.com) ===== */
// Dán Sheet ID vào đây sau khi tạo Google Sheet (đoạn giữa /d/ và /edit trên URL).
// Chưa cấu hình (để nguyên placeholder) thì site tự hiện dữ liệu mẫu có nhãn "DỮ LIỆU MẪU".
const SIGNALS_SHEET_ID = "146SPjk_Oa1aWCLUJZh2NqGpjarNIL9ZegUB4DELrKcY";
const SIGNALS_SHEET_NAME = "Sheet1";
const SIGNALS_MAX_COUNT = 6; // chỉ hiện N lệnh mới nhất trên trang chủ

// Đúng 9 trường webhook TradingView gửi qua Make.com: action, tradeType,
// ticker, entry, price, sl, tp1, tp2, tp3 — cột "Time" là tùy chọn (Make.com
// có thể tự điền thời gian khi ghi vào Sheet).
const DEMO_SIGNALS = [
  { ticker: "SOYOILU2026", time: "", action: "SELL", tradeType: "", entry: "", price: "73.66", sl: "74.63", tp1: "73.18", tp2: "72.69", tp3: "72.21" }
];

function signalCardHTML(s, isDemo){
  // TradeType luôn giữ hướng lệnh gốc (BUY/SELL), kể cả ở dòng cập nhật
  // trạng thái sau này. Action có thể là "BUY"/"SELL" (lệnh mới) hoặc
  // "TP1_HIT"/"TP2_HIT"/"TP3_HIT"/"SL_HIT" (dòng báo đã chạm mốc).
  const dir = String(s.tradeType || s.action || '').toUpperCase();
  const dirClass = dir==='SELL' ? 'sell' : 'buy';
  const dirIcon = dir==='SELL' ? '↘' : '↗';
  const dirLabel = s.tradeType || s.action || '';

  const actionUpper = String(s.action || '').toUpperCase();
  const isStatus = actionUpper && actionUpper!=='BUY' && actionUpper!=='SELL' && actionUpper!==dir;
  const statusClass = actionUpper.includes('SL') ? 'status-danger' : (actionUpper.includes('HIT') ? 'status-success' : 'status-neutral');
  const statusLabel = String(s.action || '').replace(/_/g, ' ');

  const row=(label,val)=> (val!==undefined && val!==null && val!=='') ? `
    <div class="signal-row"><span class="label">${label}</span><span class="val">${val}</span></div>` : '';

  return `
    <div class="signal-card${isDemo?' demo':''}">
      <div class="signal-top">
        <div class="signal-pair">
          <div class="signal-avatar">${(s.ticker||'').slice(0,2).toUpperCase()}</div>
          <div><div class="signal-name">${s.ticker}</div>${s.time?`<div class="signal-time">${s.time}</div>`:''}</div>
        </div>
        ${isStatus?`<span class="sig-badge ${statusClass}">${statusLabel}</span>`:''}
      </div>
      <div class="signal-tags">
        <span class="sig-badge ${dirClass}">${dirIcon} ${dirLabel}</span>
      </div>
      <div class="signal-divider"></div>
      ${row('Entry', s.entry)}
      ${row('Giá', s.price)}
      ${row('Take profit 1', s.tp1)}
      ${row('Take profit 2', s.tp2)}
      ${row('Take profit 3', s.tp3)}
      ${row('Stop loss', s.sl)}
    </div>`;
}

/* ===== TIỆN ÍCH DÙNG CHUNG: ĐỌC GOOGLE SHEET CÔNG KHAI QUA JSONP =====
   Google Sheets gviz endpoint không trả header CORS nên fetch() từ trình
   duyệt sẽ bị chặn âm thầm. Dùng JSONP (nạp qua thẻ <script>) thay vì
   fetch() — cách chính thức endpoint này được thiết kế để dùng, không bị
   CORS chặn vì script tag load cross-origin không chịu ràng buộc CORS.
   opts: { sheetName, gid, headers } — dùng sheetName HOẶC gid, headers là
   số dòng tiêu đề (bỏ qua nếu để trình duyệt/Google tự nhận diện). */
function loadGvizJSONP(sheetId, opts, onData, onError){
  window.google = window.google || {};
  window.google.visualization = window.google.visualization || {};
  window.google.visualization.Query = window.google.visualization.Query || {};
  window.google.visualization.Query.setResponse = function(json){
    try{ onData(json); }catch(e){ onError && onError(e); }
  };
  const parts=['tqx=out:json'];
  if(opts.headers)parts.push(`headers=${opts.headers}`);
  parts.push(opts.sheetName ? `sheet=${encodeURIComponent(opts.sheetName)}` : `gid=${opts.gid}`);
  parts.push(`_=${Date.now()}`);
  const script=document.createElement('script');
  script.src=`https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?${parts.join('&')}`;
  script.onerror=()=>onError && onError(new Error('script load failed'));
  document.body.appendChild(script);
}

function renderSignals(){
  const el=document.getElementById('signalGrid');
  if(!el)return;

  const showDemo=()=>{ el.innerHTML=DEMO_SIGNALS.map(s=>signalCardHTML(s,true)).join(''); };

  if(!SIGNALS_SHEET_ID || SIGNALS_SHEET_ID==='YOUR_GOOGLE_SHEET_ID_HERE'){
    showDemo();
    return;
  }

  loadGvizJSONP(SIGNALS_SHEET_ID, {sheetName:SIGNALS_SHEET_NAME, headers:1}, (json)=>{
    const cols=json.table.cols.map(c=>c.label);
    const get=(row,name)=>{
      const idx=cols.indexOf(name);
      return idx>-1 && row.c[idx] ? row.c[idx].v : '';
    };

    // Nhiều dòng có thể cùng 1 lệnh (Entry/SL/TP1-3 giống nhau) — dòng
    // sau chỉ là cập nhật trạng thái (Action đổi thành TPx_HIT/SL_HIT)
    // cho CÙNG lệnh đó, không phải lệnh mới. Gộp lại, giữ dòng mới nhất
    // cho mỗi lệnh, và xếp theo lệnh nào vừa được cập nhật gần đây nhất.
    const tradeOrder=[];
    const tradeData={};
    json.table.rows.forEach(row=>{
      const s={
        ticker:get(row,'Ticker'), time:get(row,'Time'), action:get(row,'Action'), tradeType:get(row,'TradeType'),
        entry:get(row,'Entry'), price:get(row,'Price'), sl:get(row,'SL'),
        tp1:get(row,'TP1'), tp2:get(row,'TP2'), tp3:get(row,'TP3')
      };
      if(!s.ticker)return;
      const key=[s.ticker,s.entry,s.sl,s.tp1,s.tp2,s.tp3].join('|');
      tradeData[key]=s;
      const pos=tradeOrder.indexOf(key);
      if(pos>-1)tradeOrder.splice(pos,1);
      tradeOrder.push(key);
    });

    const signals=tradeOrder.slice().reverse().slice(0,SIGNALS_MAX_COUNT).map(key=>tradeData[key]);

    if(signals.length){
      el.innerHTML=signals.map(s=>signalCardHTML(s,false)).join('');
    }else{
      showDemo();
    }
  }, showDemo);
}

/* ===== TRANG BẢNG KÝ QUỸ (ky-quy.html) ===== */
const MARGIN_SHEET_ID = "1h8m7s5nwlbJ_vgwlF7Q645K_Upmv1QzXz8xTlPt791s";
const MARGIN_SHEET_GID = 0;

let MARGIN_ROWS_CACHE = [];
let MARGIN_ACTIVE_GROUP = '';

function marginRowHTML(r){
  return `<tr>
    <td>${r.stt}</td>
    <td>${r.name}</td>
    <td class="code">${r.code}</td>
    <td>${r.group}</td>
    <td>${r.exchange}</td>
    <td class="num">${r.marginOrg}</td>
    <td class="num">${r.marginPersonal}</td>
    <td class="num">${r.feeTrade}</td>
    <td class="num">${r.feeSettle}</td>
    <td class="num">${r.tick}</td>
  </tr>`;
}

function filterMarginTable(){
  const input=document.getElementById('marginSearch');
  const body=document.getElementById('marginTableBody');
  const count=document.getElementById('marginCount');
  if(!input || !body)return;
  const q=input.value.trim().toLowerCase();
  let filtered=MARGIN_ACTIVE_GROUP
    ? MARGIN_ROWS_CACHE.filter(r=>r.group===MARGIN_ACTIVE_GROUP)
    : MARGIN_ROWS_CACHE;
  if(q)filtered=filtered.filter(r=>(r.name+' '+r.code+' '+r.group).toLowerCase().includes(q));

  body.innerHTML=filtered.length
    ? filtered.map(marginRowHTML).join('')
    : `<tr><td colspan="10" style="text-align:center;color:var(--muted);padding:24px">Không tìm thấy hàng hóa phù hợp.</td></tr>`;
  if(count)count.textContent=filtered.length+' sản phẩm';
}

function setMarginGroup(group){
  MARGIN_ACTIVE_GROUP=group;
  document.querySelectorAll('.margin-chip').forEach(btn=>{
    btn.classList.toggle('active', btn.dataset.group===group);
  });
  filterMarginTable();
}

function renderMarginTable(){
  const root=document.getElementById('marginTableRoot');
  if(!root)return;

  // Ưu tiên giá trị đã định dạng sẵn (VD "12.576.000 đ") thay vì số thô.
  const cell=(c)=> c ? (c.f!=null ? c.f : (c.v!=null?c.v:'')) : '';

  loadGvizJSONP(MARGIN_SHEET_ID, {gid:MARGIN_SHEET_GID}, (json)=>{
    // Đọc theo đúng vị trí cột (không dựa tên cột) vì ô tiêu đề "Mã hàng
    // hóa" bị dính chung với dòng tiêu đề gộp (merge cell) phía trên.
    MARGIN_ROWS_CACHE = json.table.rows.map(row=>({
      stt: cell(row.c[1]),
      name: cell(row.c[2]),
      code: cell(row.c[3]),
      group: cell(row.c[4]),
      exchange: cell(row.c[5]),
      marginOrg: cell(row.c[6]),
      marginPersonal: cell(row.c[7]),
      feeTrade: cell(row.c[8]),
      feeSettle: cell(row.c[9]),
      tick: cell(row.c[13])
    })).filter(r=>r.name);

    if(!MARGIN_ROWS_CACHE.length){
      root.innerHTML=`<p style="color:var(--muted)">Chưa có dữ liệu ký quỹ.</p>`;
      return;
    }

    MARGIN_ACTIVE_GROUP='';
    const groups=[...new Set(MARGIN_ROWS_CACHE.map(r=>r.group).filter(Boolean))];
    const chipsHTML=[`<button class="margin-chip active" data-group="" onclick="setMarginGroup('')">Tất cả</button>`]
      .concat(groups.map(g=>`<button class="margin-chip" data-group="${g}" onclick="setMarginGroup('${g}')">${g}</button>`))
      .join('');

    root.innerHTML=`
      <div class="margin-toolbar">
        <div class="margin-toolbar-left">
          <b>Biểu ký quỹ &amp; phí</b>
          <span id="marginCount">${MARGIN_ROWS_CACHE.length} sản phẩm</span>
        </div>
        <div class="margin-toolbar-right">
          <div class="margin-filters">${chipsHTML}</div>
          <input type="text" id="marginSearch" class="margin-search" placeholder="Tìm mã / tên...">
        </div>
      </div>
      <div class="margin-table-wrap">
        <table class="margin-table">
          <thead><tr>
            <th>STT</th><th>Hàng hóa</th><th>Mã hàng hóa</th><th>Nhóm hàng hóa</th>
            <th>Sở liên thông</th><th>Mức ký quỹ tổ chức</th><th>Mức ký quỹ cá nhân</th>
            <th>Phí Giao Dịch</th><th>Phí Thanh Toán Hợp Đồng</th><th>Biến Động Trên 1 Giá</th>
          </tr></thead>
          <tbody id="marginTableBody">${MARGIN_ROWS_CACHE.map(marginRowHTML).join('')}</tbody>
        </table>
      </div>`;

    document.getElementById('marginSearch').addEventListener('input', filterMarginTable);
  }, ()=>{
    root.innerHTML=`<p style="color:var(--red)">Không tải được dữ liệu ký quỹ. Vui lòng thử lại sau.</p>`;
  });
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

  document.title=a.title+' — ATB Commodity';
  const metaDesc=document.querySelector('meta[name="description"]');
  if(metaDesc)metaDesc.setAttribute('content',a.note||a.title);

  const metaLine=`<span>${a.date}</span>${a.note?`<span>·</span><span>${a.note}</span>`:''}`;

  const attachment=a.attachment
    ? `<div class="article-attachment">
        <div class="icon">📎</div>
        <div class="info"><b>${a.attachment.name}</b><span>Mở trong tab mới</span></div>
        <a class="btn" href="${a.attachment.url}" target="_blank" rel="noopener">Xem</a>
      </div>`
    : '';

  el.innerHTML=`
    <div class="breadcrumb"><a href="index.html">Trang chủ</a> / <span>Tin điều hành MXV</span></div>
    <article class="article-detail">
      <span class="tag">Tin điều hành MXV</span>
      <h1>${a.title}</h1>
      <div class="meta">${metaLine}</div>
      <div class="article-body">${a.body}</div>
      ${attachment}
    </article>
    <a class="btn ghost article-back" href="index.html">← Quay lại trang chủ</a>`;
}

/* ===== TRANG DANH SÁCH (danh-sach.html) ===== */
function renderListPage(){
  const el=document.getElementById('listRoot');
  if(!el || typeof ARTICLES==='undefined')return;

  const items=ARTICLES.slice().sort((a,b)=>parseDate(b.date)-parseDate(a.date));
  const pageTitle='Tin điều hành MXV';
  document.title=pageTitle+' — ATB Commodity';

  const listHTML=!items.length
    ? '<p style="color:var(--muted)">Chưa có bài viết nào.</p>'
    : `<div class="mxv-list">${items.map(a=>{
        const {day,monthYear}=splitDate(a.date);
        return `<a class="mxv-item" href="bai-viet.html?slug=${encodeURIComponent(a.slug)}">
          <div class="mxv-date"><b>${day}</b>${monthYear}</div>
          <div><h3>${a.title}</h3><small>${a.note||''}</small></div>
        </a>`;
      }).join('')}</div>`;

  el.innerHTML=`
    <div class="breadcrumb"><a href="index.html">Trang chủ</a> / <span>${pageTitle}</span></div>
    <div class="sec-head"><div><h2>Tin điều hành <span>MXV</span></h2></div></div>
    ${listHTML}
    <a class="btn ghost article-back" style="margin-top:30px" href="index.html">← Quay lại trang chủ</a>`;
}

renderSignals();
renderMxvList();
renderArticlePage();
renderListPage();
renderMarginTable();
