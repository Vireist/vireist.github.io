'use strict';
const $  = (s, r=document) => r.querySelector(s);
const $$ = (s, r=document) => [...r.querySelectorAll(s)];
const root = document.documentElement;
const CFG = window.SITE_CONFIG || {};

/* ============ ТЕМА ============ */
function initTheme(){
    $('#theme-btn').addEventListener('click', ()=> setTheme(root.dataset.theme==='dark' ? 'light' : 'dark'));
    setTheme(root.dataset.theme || 'dark', true);
}
function setTheme(t, silent){
    const animate = !silent && matchMedia('(prefers-reduced-motion: no-preference)').matches;
    if(animate) root.classList.add('theme-anim');
    root.dataset.theme = t;
    if(!silent) localStorage.setItem('vireist-theme', t);
    $('#theme-btn').textContent = t==='dark' ? '☀' : '☾';
    if(animate){ clearTimeout(setTheme._t); setTheme._t = setTimeout(()=>root.classList.remove('theme-anim'), 500); }
}

/* ============ ФИЛЬТРЫ ============ */
const state = { filters:{q:'',system:'',format:'',setting:'',tags:[],price:''} };
const cards = $$('#catalog .case-card');

function cardMatches(card){
    const f=state.filters, d=card.dataset;
    if(f.q && !d.title.includes(f.q)) return false;
    if(f.system && d.system!==f.system) return false;
    if(f.format && d.format!==f.format) return false;
    if(f.setting && d.setting!==f.setting) return false;
    if(f.price && d.price!==f.price) return false;
    if(f.tags.length){ const t=(d.tags||'').split(','); if(!f.tags.every(x=>t.includes(x))) return false; }
    return true;
}
function renderCatalog(){
    let n=0;
    cards.forEach(c=>{ const ok=cardMatches(c); c.hidden=!ok; if(ok)n++; });
    $('#count').textContent='Найдено дел: '+n;
    const f=state.filters;
    const cnt=(f.q?1:0)+(f.system?1:0)+(f.format?1:0)+(f.setting?1:0)+(f.price?1:0)+f.tags.length;
    const fc=$('#filters-count'); fc.hidden=!cnt; fc.textContent=cnt;
    $('#catalog-empty').hidden = n>0;
}
function chipSelect(sel, btn){ $$(sel+' .chip').forEach(c=>c.classList.toggle('active', c===btn)); }
function bindChips(sel, key){
    $(sel).addEventListener('click', e=>{
        const b=e.target.closest('.chip'); if(!b) return;
        chipSelect(sel, b); state.filters[key]=b.dataset.val; renderCatalog();
    });
}
function resetFilters(){
    state.filters={q:'',system:'',format:'',setting:'',tags:[],price:''};
    $('#search').value='';
    ['#f-system','#f-format','#f-setting'].forEach(s=>chipSelect(s, $(s+' .chip')));
    chipSelect('#f-price', $('#f-price .chip'));
    renderTagChips(); renderCatalog();
}
function makeTagChips(){
    const el=$('#f-tags'); if(!el) return;
    el._values=JSON.parse(el.dataset.tags||'[]'); el._expanded=false;
    renderTagChips();
    el.addEventListener('click', e=>{
        const b=e.target.closest('.chip'); if(!b) return;
        if(b.classList.contains('more')){ el._expanded=!el._expanded; renderTagChips(); return; }
        const val=b.dataset.val, arr=state.filters.tags, i=arr.indexOf(val);
        if(i>=0) arr.splice(i,1); else arr.push(val);
        renderTagChips(); renderCatalog();
    });
}
function renderTagChips(){
    const el=$('#f-tags'); if(!el || !el._values) return;
    const values=el._values, active=state.filters.tags;
    const limit=Number(CFG.tagsCollapsed)||10;
    let shown=values, hidden=0;
    if(!el._expanded && values.length>limit){
        const head=values.slice(0,limit);
        const extra=values.slice(limit).filter(v=>active.includes(v.toLowerCase()));
        shown=head.concat(extra); hidden=values.length-shown.length;
    }
    el.innerHTML = shown.map(v=>`<button class="chip${active.includes(v.toLowerCase())?' active':''}" data-val="${v.toLowerCase()}">${v}</button>`).join('')
        + (hidden>0 ? `<button class="chip more">ещё ${hidden}</button>` : '')
        + (el._expanded && values.length>limit ? `<button class="chip more">свернуть</button>` : '');
}
function initFilters(){
    bindChips('#f-system','system'); bindChips('#f-format','format'); bindChips('#f-setting','setting');
    makeTagChips();
    $('#search').addEventListener('input', e=>{ state.filters.q=e.target.value.trim().toLowerCase(); renderCatalog(); });
    $('#f-price').addEventListener('click', e=>{
        const b=e.target.closest('.chip'); if(!b) return;
        chipSelect('#f-price', b); state.filters.price=b.dataset.price; renderCatalog();
    });
    $('#reset-f').addEventListener('click', resetFilters);
    renderCatalog();
}
function initFiltersDrawer(){
    const drawer=$('#filters-drawer'), backdrop=$('#filters-backdrop');
    const open =()=>{ drawer.classList.add('open'); backdrop.classList.add('open'); document.body.classList.add('no-scroll'); drawer.setAttribute('aria-hidden','false'); };
    const close=()=>{ drawer.classList.remove('open'); backdrop.classList.remove('open'); document.body.classList.remove('no-scroll'); drawer.setAttribute('aria-hidden','true'); };
    $('#filters-open').addEventListener('click', open);
    $('#filters-close').addEventListener('click', close);
    $('#filters-apply').addEventListener('click', close);
    $('#filters-reset').addEventListener('click', resetFilters);
    backdrop.addEventListener('click', close);
    document.addEventListener('keydown', e=>{ if(e.key==='Escape') close(); });
}

/* ============ КАТАЛОГ: ПЕРЕХОД ============ */
function initCatalogNav(){
    const go=card=>{ location.href=card.dataset.href; };
    $('#catalog').addEventListener('click', e=>{
        const card=e.target.closest('.case-card');
        if(card && !e.target.closest('a')) go(card);
    });
    $('#catalog').addEventListener('keydown', e=>{
        const card=e.target.closest('.case-card');
        if(card && (e.key==='Enter'||e.key===' ')){ e.preventDefault(); go(card); }
    });
}
function bindCoverErrors(){
    $$('.case-cover img, .doc-cover img').forEach(img=>
        img.addEventListener('error', ()=>{ img.parentNode.classList.add('empty'); img.remove(); }));
}

/* ============ ОТЗЫВЫ: ПАГИНАЦИЯ ============ */
const revState = { shown: Number(CFG.reviewsPageSize)||6, pageSize: Number(CFG.reviewsPageSize)||6 };
function renderReviews(){
    const list=$('#reviews-list'); if(!list) return;
    const items=$$('.rev-card', list);
    const total=items.length, shown=Math.min(revState.shown, total);
    items.forEach((el,i)=>{ el.hidden = i>=shown; });
    $('#reviews-count').textContent = total ? `показано ${shown} из ${total}` : '';
    const foot=$('#reviews-foot');
    if(total<=revState.pageSize){ foot.hidden=true; return; }
    foot.hidden=false;
    const allShown = shown===total;
    foot.innerHTML = allShown
        ? `<button class="btn ghost" id="rev-fold">Скрыть</button><span class="sec-count-foot">распечатано ${total} показаний</span>`
        : `<button class="btn" id="rev-more">Запросить ещё · +${Math.min(revState.pageSize, total-shown)}</button><button class="btn ghost" id="rev-all">Показать все ${total}</button>`;
    const more=$('#rev-more'), all=$('#rev-all'), fold=$('#rev-fold');
    if(more) more.onclick=()=>{ revState.shown=Math.min(total, revState.shown+revState.pageSize); renderReviews(); };
    if(all) all.onclick=()=>{ revState.shown=total; renderReviews(); };
    if(fold) fold.onclick=()=>{ revState.shown=revState.pageSize; renderReviews(); $('#reviews').scrollIntoView({behavior:'smooth'}); };
}

/* ============ FAQ: ПЛАВНОЕ РАСКРЫТИЕ ============ */
function initFaq(){
    document.addEventListener('click', e=>{
        const sum=e.target.closest('.faq-item summary'); if(!sum) return;
        if(matchMedia('(prefers-reduced-motion: reduce)').matches) return;
        const item=sum.parentElement, body=item.querySelector('.faq-a'); if(!body) return;
        e.preventDefault();
        if(item.open){
            const h=body.scrollHeight;
            body.animate([{height:h+'px'},{height:'0px'}],{duration:220,easing:'ease-in'}).onfinish=()=>{ item.open=false; };
        }else{
            item.open=true;
            const h=body.scrollHeight;
            body.animate([{height:'0px'},{height:h+'px'}],{duration:260,easing:'ease-out'});
        }
    });
}

/* ============ МОБИЛЬНОЕ МЕНЮ ============ */
function initMobileNav(){
    const drawer=$('#nav-drawer'), backdrop=$('#nav-backdrop');
    $('#nav-drawer-list').innerHTML=$('#main-nav').innerHTML;
    const open =()=>{ drawer.classList.add('open'); backdrop.classList.add('open'); document.body.classList.add('no-scroll'); drawer.setAttribute('aria-hidden','false'); };
    const close=()=>{ drawer.classList.remove('open'); backdrop.classList.remove('open'); document.body.classList.remove('no-scroll'); drawer.setAttribute('aria-hidden','true'); };
    $('#nav-open').addEventListener('click', open);
    $('#nav-close').addEventListener('click', close);
    backdrop.addEventListener('click', close);
    drawer.addEventListener('click', e=>{ if(e.target.closest('a')) close(); });
    document.addEventListener('keydown', e=>{ if(e.key==='Escape') close(); });
}

/* ============ ЛОГО ============ */
function initLogo(){
    const logo=$('.logo');
    logo.addEventListener('click', e=>{
        if(location.pathname!=='/') return;
        e.preventDefault();
        logo.classList.remove('logo-spin'); void logo.offsetWidth; logo.classList.add('logo-spin');
        const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
        window.scrollTo({top:0, behavior: reduce?'auto':'smooth'});
    });
}

/* ============ СТАРТ ============ */
initTheme();
if($('#catalog')){ initFilters(); initFiltersDrawer(); initCatalogNav(); }
bindCoverErrors();
renderReviews();
initFaq();
initMobileNav();
initLogo();