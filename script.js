/* ================================================================
   FAS SUN — Logica paginii
   Versiune finală: toate ID-urile aliniate, toate funcțiile lucrează
================================================================ */

/* ---------- UTILITATE: escapeHTML (securitate XSS) ---------- */
function escapeHTML(str) {
  if (!str) return '';
  return str.replace(/[&<>"']/g, function(char) {
    const map = { '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' };
    return map[char];
  });
}

/* ---------- UTILITATE: Toast notification ---------- */
const toastEl = document.getElementById('toast');
let toastTimer;
function showToast(message) {
  clearTimeout(toastTimer);
  toastEl.textContent = message;
  toastEl.classList.add('on');
  toastTimer = setTimeout(() => toastEl.classList.remove('on'), 3400);
}

/* ---------- UTILITATE: Skeleton loader ---------- */
function buildSkeletons(count, imageHeight) {
  return Array(count).fill(0).map(() => `
    <div class="sk">
      <div class="sk-img" style="height:${imageHeight}px"></div>
      <div class="sk-body">
        <div class="sk-ln"></div>
        <div class="sk-ln s"></div>
      </div>
    </div>
  `).join('');
}

/* ================================================================
   1. PRELOADER
================================================================ */
window.addEventListener('load', function() {
  setTimeout(function() {
    document.getElementById('pl').classList.add('out');
    setTimeout(function() {
      document.getElementById('pl').style.display = 'none';
      document.getElementById('site').classList.add('on');
    }, 900);
  }, 1500);
});

/* ================================================================
   2. ANIMAȚII SCROLL (IntersectionObserver)
================================================================ */
const scrollObserver = new IntersectionObserver(function(entries) {
  entries.forEach(function(entry) {
    if (entry.isIntersecting) {
      entry.target.classList.add('vis');
      scrollObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.07 });

function observeElements(selector) {
  document.querySelectorAll(selector).forEach(function(el) {
    if (!el.classList.contains('vis')) {
      scrollObserver.observe(el);
    }
  });
}

/* ================================================================
   3. SECȚIUNEA STILIZARE — Lookbook
================================================================ */
const outfits = [
  { img:'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=500&h=680&fit=crop',
    label:'Minimalism urban', tip:'Sacou bej + pantaloni largi crem + loaferi', season:'Primăvară / Toamnă' },
  { img:'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=500&h=680&fit=crop',
    label:'Feminitate soft', tip:'Rochie fluidă în nuanțe pastel + eșarfă cașmir', season:'Vară' },
  { img:'https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?w=500&h=680&fit=crop',
    label:'Power dressing', tip:'Costum structurat + cămașă albă + curea metalică', season:'Tot anul' },
  { img:'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=500&h=680&fit=crop',
    label:'Street luxe', tip:'Trench coat + blugi drepți + sneakers albi', season:'Toamnă' },
  { img:'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=500&h=680&fit=crop',
    label:'Noapte de gală', tip:'Rochie midi satin + colier statement + pantofi stiletto', season:'Seară' },
  { img:'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=500&h=680&fit=crop',
    label:'Editorial chic', tip:'Trench oversized + rochie tricot + cizme înalte', season:'Iarnă' }
];

document.getElementById('styleGrid').innerHTML = outfits.map(function(o) {
  return `
    <article class="style-card" tabindex="0" aria-label="Look: ${escapeHTML(o.label)}">
      <img class="style-img" src="${o.img}" loading="lazy" alt="Outfit: ${escapeHTML(o.label)}">
      <div class="style-overlay">
        <p class="style-label">${escapeHTML(o.label)}</p>
        <p class="style-tip">${escapeHTML(o.tip)}</p>
      </div>
      <div class="style-bar">
        <span class="style-season">${escapeHTML(o.season)}</span>
      </div>
    </article>
  `;
}).join('');
observeElements('.style-card');

/* ================================================================
   4. SECȚIUNEA MATERIALE
================================================================ */
const materials = [
  { name:'Bumbac organic GOTS', price:'45 lei/m', origin:'Turcia 🇹🇷', cert:'GOTS',
    img:'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=400&h=280&fit=crop',
    desc:'Textură moale și respirabilă. Certificat organic — ideal pentru haine de zi cu zi.',
    tags:['Lavabil','Anti-alergic','Organic'] },
  { name:'Lână Merinos', price:'98 lei/m', origin:'Noua Zeelandă 🇳🇿', cert:'RWS',
    img:'https://images.unsplash.com/photo-1585435465945-bef5a93f8849?w=400&h=280&fit=crop',
    desc:'Fibră extrafină de 17.5 microni. Termo-reglator natural, nu provoacă mâncărime.',
    tags:['Termo-activ','Extra-fină','Premium'] },
  { name:'Mătase Mulberry', price:'210 lei/m', origin:'China 🇨🇳', cert:'OEKO-TEX',
    img:'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=400&h=280&fit=crop',
    desc:'Cel mai fin fir de mătase naturală. Luciu distinct, atingere rece, aspect de lux.',
    tags:['Lux','Hipo-alergenic','Fluid'] },
  { name:'In francez', price:'68 lei/m', origin:'Franța 🇫🇷', cert:'European Flax',
    img:'https://images.unsplash.com/photo-1599661046289-e31897846e41?w=400&h=280&fit=crop',
    desc:'Cultivat în Normandia fără pesticide. Se înmoaie cu fiecare spălare.',
    tags:['Sustenabil','Vaporos','Natural'] }
];

document.getElementById('matGrid').innerHTML = materials.map(function(m) {
  const tags = m.tags.map(t => `<span class="card-tag">${escapeHTML(t)}</span>`).join('');
  return `
    <article class="card">
      <img src="${m.img}" loading="lazy" alt="Material: ${escapeHTML(m.name)}">
      <div class="card-body">
        <span class="card-label"><i class="fas fa-certificate"></i> ${escapeHTML(m.cert)}</span>
        <h3 class="card-title">${escapeHTML(m.name)}</h3>
        <p class="card-desc">${escapeHTML(m.desc)}</p>
        <div class="card-footer">
          <span style="color:var(--text-3);font-size:.75rem">${escapeHTML(m.origin)}</span>
          <span class="card-price">${escapeHTML(m.price)}</span>
        </div>
        <div class="card-tags">${tags}</div>
      </div>
    </article>
  `;
}).join('');
observeElements('.card');

/* ================================================================
   5. SECȚIUNEA CULORI — fetch din The Color API
================================================================ */
const colors = [
  { hex:'B87B4F', note:'Ideal pentru piele & pantaloni eleganți' },
  { hex:'E2B87A', note:'Rochii de vară, accesorii aurii' },
  { hex:'8FB0D0', note:'Cămăși, costume office' },
  { hex:'C57F5E', note:'Sacouri, fuste midi de toamnă' },
  { hex:'F3E5D8', note:'Baze neutre perfecte pentru layering' }
];

document.getElementById('colorGrid').innerHTML = buildSkeletons(5, 160);

Promise.all(
  colors.map(function(c) {
    return fetch('https://www.thecolorapi.com/id?hex=' + c.hex + '&format=json')
      .then(r => r.json())
      .then(data => ({ hex:c.hex, name:data.name.value, note:c.note }))
      .catch(() => ({ hex:c.hex, name:'#'+c.hex, note:c.note }));
  })
).then(function(results) {
  document.getElementById('colorGrid').innerHTML = results.map(function(color) {
    return `
      <article class="card">
        <div class="color-swatch" style="background:#${color.hex};height:160px"
             role="img" aria-label="Culoare ${escapeHTML(color.name)}"></div>
        <div class="card-body">
          <h3 class="card-title">${escapeHTML(color.name)}</h3>
          <p class="color-hex">#${color.hex}</p>
          <p class="color-note">${escapeHTML(color.note)}</p>
          <span class="color-badge">Trend 2025</span>
        </div>
      </article>
    `;
  }).join('');
  observeElements('.card');
});

/* ================================================================
   6. SECȚIUNEA HAINE — Tab-uri
================================================================ */
const brandClothes = [
  { img:'https://images.unsplash.com/photo-1617137968427-85924c800a22?w=400&h=300&fit=crop',
    label:'Brand de autor', name:'Jachetă structurată bej',
    desc:'Croială impecabilă, umeri construiți, bumbac organic premium.', price:'890 lei', rating:'4.8' },
  { img:'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=400&h=300&fit=crop',
    label:'Brand de autor', name:'Costum în dungi fine',
    desc:'Lână Merinos italiană, tăietură dreaptă, dublură naturală.', price:'1.450 lei', rating:'4.9' },
  { img:'https://images.unsplash.com/photo-1594938298603-c8148c4beed9?w=400&h=300&fit=crop',
    label:'Brand de autor', name:'Pardesiu camel',
    desc:'Lână cașmir 30%, cădere elegantă, butoni metalici aurii.', price:'2.100 lei', rating:'5.0' },
  { img:'https://images.unsplash.com/photo-1603251579431-8041402bdeda?w=400&h=300&fit=crop',
    label:'Brand de autor', name:'Bluzon de piele eco',
    desc:'Design minimalist, fermoar ascuns, căptușeală mătase.', price:'1.200 lei', rating:'4.7' }
];

const unicatClothes = [
  { img:'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&h=300&fit=crop',
    label:'Piesă unicat', name:'Rochie asimetrică hand-made',
    desc:'Mătase Mulberry, cusută manual, model unic, nu se repetă.', price:'3.200 lei', rating:'5.0' },
  { img:'https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?w=400&h=300&fit=crop',
    label:'Piesă unicat', name:'Kimono brodat',
    desc:'In francez, broderie florală manuală, cordon inclus.', price:'1.800 lei', rating:'4.9' },
  { img:'https://images.unsplash.com/photo-1562572159-4efc207f5aff?w=400&h=300&fit=crop',
    label:'Piesă unicat', name:'Fustă midi plisată',
    desc:'Voal dublu, talie elastică, disponibilă în 3 nuanțe.', price:'650 lei', rating:'4.8' },
  { img:'https://images.unsplash.com/photo-1554412933-514a83d2f3c8?w=400&h=300&fit=crop',
    label:'Piesă unicat', name:'Top crochet manual',
    desc:'Bumbac organic, model geometric, realizat artizanal.', price:'420 lei', rating:'4.7' }
];

function buildClothCard(item) {
  return `
    <article class="card">
      <img src="${item.img}" loading="lazy" alt="${escapeHTML(item.name)}">
      <div class="card-body">
        <span class="card-label">${escapeHTML(item.label)}</span>
        <h3 class="card-title">${escapeHTML(item.name)}</h3>
        <p class="card-desc">${escapeHTML(item.desc)}</p>
        <div class="card-footer">
          <span class="card-price">${escapeHTML(item.price)}</span>
          <span style="font-size:.75rem;color:var(--text-3)">⭐ ${escapeHTML(item.rating)}</span>
        </div>
      </div>
    </article>
  `;
}

document.getElementById('pane-brand').innerHTML  = brandClothes.map(buildClothCard).join('');
document.getElementById('pane-unicat').innerHTML = unicatClothes.map(buildClothCard).join('');
observeElements('.card');

document.querySelectorAll('.tab-btn').forEach(function(btn) {
  btn.addEventListener('click', function() {
    document.querySelectorAll('.tab-btn').forEach(b => {
      b.classList.remove('active');
      b.setAttribute('aria-selected', 'false');
    });
    document.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active'));

    btn.classList.add('active');
    btn.setAttribute('aria-selected', 'true');
    document.getElementById(btn.dataset.tab).classList.add('active');

    observeElements('.card');
  });
});

/* ================================================================
   7. SECȚIUNEA ACCESORII — Slider
================================================================ */
const accessories = [
  { name:'Curea bronz auriu', img:'https://images.unsplash.com/photo-1598532163257-ae3c6b2524b6?w=340&h=240&fit=crop', desc:'Piele naturală, cataramă gold' },
  { name:'Cravată mătase', img:'https://images.unsplash.com/photo-1589756823695-278bc923f962?w=340&h=240&fit=crop', desc:'Model herringbone, 100% mătase' },
  { name:'Ochelari aviator', img:'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=340&h=240&fit=crop', desc:'Ramă aurie, lentile UV400' },
  { name:'Pălărie fedora', img:'https://images.unsplash.com/photo-1524093982496-2e84f3a0a694?w=340&h=240&fit=crop', desc:'Lână premium, bandă satin' },
  { name:'Broșă manuală', img:'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=340&h=240&fit=crop', desc:'Artizanal, placată cu aur' },
  { name:'Eșarfă cașmir', img:'https://images.unsplash.com/photo-1601924638867-3a6de6b7a500?w=340&h=240&fit=crop', desc:'Culoare camel, 100% cașmir' },
  { name:'Mănuși din piele', img:'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=340&h=240&fit=crop', desc:'Piele moale, căptușeală lână' }
];

const sliderTrack   = document.getElementById('sliderTrack');
const btnPrev       = document.getElementById('btnPrev');
const btnNext       = document.getElementById('btnNext');
const sliderCounter = document.getElementById('sliderCounter');
let currentSlide = 0;

function slidesVisible() {
  if (window.innerWidth < 600) return 1;
  if (window.innerWidth < 960) return 2;
  return 4;
}

function buildSlider() {
  const visible = slidesVisible();
  const cardWidth = `calc(${100/visible}% - ${1.5*(visible-1)/visible}rem)`;
  sliderTrack.innerHTML = accessories.map(function(a) {
    return `
      <div class="acc-card" style="flex:0 0 ${cardWidth}; min-width:${cardWidth}">
        <img src="${a.img}" loading="lazy" alt="${escapeHTML(a.name)}">
        <div class="acc-body">
          <p class="acc-name">${escapeHTML(a.name)}</p>
          <p class="acc-desc">${escapeHTML(a.desc)}</p>
        </div>
      </div>
    `;
  }).join('');
}

function updateSlider() {
  const visible = slidesVisible();
  const maxSlide = Math.max(0, accessories.length - visible);
  currentSlide = Math.min(currentSlide, maxSlide);
  const movePercent = currentSlide * (100/visible);
  sliderTrack.style.transform = `translateX(-${movePercent}%)`;
  btnPrev.disabled = currentSlide === 0;
  btnNext.disabled = currentSlide >= maxSlide;
  sliderCounter.textContent = `${currentSlide + 1} / ${maxSlide + 1}`;
}

btnPrev.addEventListener('click', () => { currentSlide--; updateSlider(); });
btnNext.addEventListener('click', () => { currentSlide++; updateSlider(); });

let resizeTimer;
window.addEventListener('resize', function() {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(function() {
    currentSlide = 0;
    buildSlider();
    updateSlider();
  }, 150);
});

buildSlider();
updateSlider();

/* ================================================================
   7. SECȚIUNEA STILURI POPULARE — Tendințe vestimentare
   Toggle Femei / Bărbați + favorite în localStorage
================================================================ */
const popularStyles = {
  women: [
    {
      name: 'Old Money',
      tagline: 'Quiet Luxury',
      emoji: '🥂',
      img: 'https://images.unsplash.com/photo-1551803091-e20673f15770?w=600&h=750&fit=crop',
      desc: 'Eleganță discretă, materiale de top, fără logo-uri vizibile. Estetica taberelor private și a yacht-urilor.',
      pieces: ['Bluză tricot cașmir', 'Pantaloni pliați', 'Mocasini din piele', 'Geantă structurată', 'Perle']
    },
    {
      name: 'Streetwear',
      tagline: 'Urban Cool',
      emoji: '🔥',
      img: 'https://images.unsplash.com/photo-1492447166138-50c3889fccb1?w=600&h=750&fit=crop',
      desc: 'Influențat de skate, hip-hop și subculturi urbane. Confort, atitudine și piese statement.',
      pieces: ['Hoodie oversized', 'Sneakers chunky', 'Cargo pants', 'Bucket hat', 'Crop top']
    },
    {
      name: 'Y2K',
      tagline: 'Early 2000s Revival',
      emoji: '✨',
      img: 'https://images.unsplash.com/photo-1535025183041-0991a977e25b?w=600&h=750&fit=crop',
      desc: 'Nostalgia anilor 2000 — strălucire, low-rise jeans, accesorii metalice și culori bonbon.',
      pieces: ['Top baby', 'Low-rise jeans', 'Curele cu strass', 'Ochelari mici', 'Fluture']
    },
    {
      name: 'Minimalist',
      tagline: 'Less is More',
      emoji: '🤍',
      img: 'https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?w=600&h=750&fit=crop',
      desc: 'Linii curate, palete neutre, croieli perfecte. Filozofia "puține piese de calitate".',
      pieces: ['Cămașă albă oversized', 'Pantaloni drepți negri', 'Trench beige', 'Ankle boots', 'Geantă tote']
    },
    {
      name: 'Boho',
      tagline: 'Free Spirit',
      emoji: '🌻',
      img: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&h=750&fit=crop',
      desc: 'Inspirație din călătorii, arta populară și natură. Texturi, broderii, libertate.',
      pieces: ['Rochie maxi imprimată', 'Vestă brodată', 'Sandale gladiator', 'Coliere stratificate', 'Pălărie largă']
    },
    {
      name: 'Dark Academia',
      tagline: 'Scholar Aesthetic',
      emoji: '📚',
      img: 'https://images.unsplash.com/photo-1509909756405-be0199881695?w=600&h=750&fit=crop',
      desc: 'Universități vechi, biblioteci pline de praf, toamnă eternă. Tweed, lână și cărți.',
      pieces: ['Sacou tweed', 'Cămașă cu guler peter pan', 'Fustă plisată', 'Pantofi oxford', 'Eșarfă']
    },
    {
      name: 'Coastal Grandma',
      tagline: 'Seaside Elegance',
      emoji: '🐚',
      img: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=600&h=750&fit=crop',
      desc: 'Cape Cod meets Nancy Meyers. Linen, bumbac alb, pălării de pai și un iaurt cu afine.',
      pieces: ['Cămașă in alb', 'Pantaloni largi crem', 'Espadrile', 'Pălărie de pai', 'Geantă din rafie']
    },
    {
      name: 'Cottagecore',
      tagline: 'Pastoral Romance',
      emoji: '🌸',
      img: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600&h=750&fit=crop',
      desc: 'Viața la țară romantizată — câmpuri de lavandă, rochii cu volane, picnicuri cu prieteni.',
      pieces: ['Rochie babydoll', 'Cardigan tricotat', 'Cizme țărănești', 'Coronițe florale', 'Cămașă cu volane']
    }
  ],
  men: [
    {
      name: 'Old Money',
      tagline: 'Quiet Luxury',
      emoji: '🥂',
      img: 'https://images.unsplash.com/photo-1617137968427-85924c800a22?w=600&h=750&fit=crop',
      desc: 'Linii clasice, paleta sobră, totul croit perfect. Fără ostentație — doar calitate.',
      pieces: ['Sacou navy', 'Pantaloni gri flannel', 'Cămașă oxford', 'Pantofi loafer', 'Ceas elegant']
    },
    {
      name: 'Streetwear',
      tagline: 'Urban Cool',
      emoji: '🔥',
      img: 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=600&h=750&fit=crop',
      desc: 'Sneaker culture, graphic tees, snapbacks. Influențat de skate și hip-hop.',
      pieces: ['Tricou graphic', 'Hoodie oversize', 'Cargo pants', 'Sneakers Jordan', 'Lanț argint']
    },
    {
      name: 'Y2K',
      tagline: 'Early 2000s Revival',
      emoji: '✨',
      img: 'https://images.unsplash.com/photo-1503443207922-dff7d543fd0e?w=600&h=750&fit=crop',
      desc: 'Cyber-aesthetic, tracksuits, lanțuri argintii și piese tehnice futuriste.',
      pieces: ['Trening Adidas', 'Tricou strâmt', 'Blugi baggy', 'Sneakers chunky', 'Ochelari shield']
    },
    {
      name: 'Minimalist',
      tagline: 'Less is More',
      emoji: '🤍',
      img: 'https://images.unsplash.com/photo-1490578474895-699cd4e2cf59?w=600&h=750&fit=crop',
      desc: 'Garderobă capsulă, palete neutre. Fiecare piesă are un scop, nimic în plus.',
      pieces: ['Cămașă albă perfectă', 'Pantaloni negri', 'Pulover gri', 'Geacă bomber', 'Sneakers albi']
    },
    {
      name: 'Boho',
      tagline: 'Free Spirit',
      emoji: '🌻',
      img: 'https://images.unsplash.com/photo-1488161628813-04466f872be2?w=600&h=750&fit=crop',
      desc: 'Surfer-meets-traveler. Texturi naturale, accesorii etnice, libertate totală.',
      pieces: ['Cămașă in lejeră', 'Pantaloni largi', 'Brățări ceramice', 'Sandale piele', 'Pălărie panama']
    },
    {
      name: 'Dark Academia',
      tagline: 'Scholar Aesthetic',
      emoji: '📚',
      img: 'https://images.unsplash.com/photo-1506634572416-48cdfe530110?w=600&h=750&fit=crop',
      desc: 'Profesor de filosofie la Oxford. Tweed, cravate, cărți vechi, toamnă perpetuă.',
      pieces: ['Sacou tweed brun', 'Cămașă albă', 'Cravată de mătase', 'Pantaloni de lână', 'Pantofi oxford']
    },
    {
      name: 'Coastal',
      tagline: 'Seaside Elegance',
      emoji: '🐚',
      img: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&h=750&fit=crop',
      desc: 'Hamptons summer, vile albe, vele și gin tonic. Confort cu eleganță.',
      pieces: ['Tricou polo alb', 'Pantaloni in beige', 'Mocasini boat', 'Pulover tricot', 'Ochelari aviator']
    },
    {
      name: 'Cottagecore',
      tagline: 'Pastoral Romance',
      emoji: '🌸',
      img: 'https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?w=600&h=750&fit=crop',
      desc: 'Fermier modern, pădure și pâine făcută în casă. Texturi naturale, paleta caldă.',
      pieces: ['Cămașă flanel', 'Pantaloni de pânză', 'Vestă tricotată', 'Cizme de muncă', 'Bandană']
    }
  ]
};

let currentGender = 'women';

/* Citim stilurile favorite din localStorage */
function loadFavStyles() {
  try {
    return JSON.parse(localStorage.getItem('fas_sun_fav_styles') || '[]');
  } catch (e) { return []; }
}

/* Salvăm stilurile favorite */
function saveFavStyles(favs) {
  try {
    localStorage.setItem('fas_sun_fav_styles', JSON.stringify(favs));
  } catch (e) {
    console.warn('Nu s-a putut salva favoritul.');
  }
}

/* Generăm cardul pentru un stil */
function buildStyleCard(style, gender) {
  const favs = loadFavStyles();
  const favKey = gender + ':' + style.name;
  const isFav = favs.includes(favKey);

  const piecesHTML = style.pieces.map(p =>
    `<span class="sp-piece">${escapeHTML(p)}</span>`
  ).join('');

  return `
    <article class="style-pop-card" role="listitem" data-fav="${favKey}">
      <button class="sp-fav ${isFav ? 'on' : ''}"
              aria-label="${isFav ? 'Șterge din favorite' : 'Adaugă la favorite'}"
              data-fav-key="${favKey}">
        <i class="${isFav ? 'fas' : 'far'} fa-heart"></i>
      </button>
      <div class="sp-img-wrap">
        <img class="sp-img" src="${style.img}" loading="lazy"
             alt="Stil ${escapeHTML(style.name)}">
        <div class="sp-overlay">
          <p class="sp-tagline">${escapeHTML(style.tagline)}</p>
          <h3 class="sp-name">${escapeHTML(style.name)} <span class="sp-emoji">${style.emoji}</span></h3>
        </div>
      </div>
      <div class="sp-body">
        <p class="sp-desc">${escapeHTML(style.desc)}</p>
        <div class="sp-pieces">${piecesHTML}</div>
      </div>
    </article>
  `;
}

/* Randăm grila */
function renderStyles() {
  const styles = popularStyles[currentGender];
  document.getElementById('stylesGrid').innerHTML =
    styles.map(s => buildStyleCard(s, currentGender)).join('');
  observeElements('.style-pop-card');
  attachFavListeners();
}

/* Atașăm event listeners pentru butoanele heart */
function attachFavListeners() {
  document.querySelectorAll('.sp-fav').forEach(function(btn) {
    btn.addEventListener('click', function(e) {
      e.stopPropagation();
      const key = btn.dataset.favKey;
      let favs = loadFavStyles();
      const icon = btn.querySelector('i');

      if (favs.includes(key)) {
        favs = favs.filter(f => f !== key);
        btn.classList.remove('on');
        icon.classList.remove('fas');
        icon.classList.add('far');
        showToast('💔 Șters din favorite');
      } else {
        favs.push(key);
        btn.classList.add('on');
        icon.classList.remove('far');
        icon.classList.add('fas');
        showToast('❤️ Adăugat la favorite');
      }
      saveFavStyles(favs);
    });
  });
}

/* Toggle Femei / Bărbați */
document.querySelectorAll('.gt-btn').forEach(function(btn) {
  btn.addEventListener('click', function() {
    document.querySelectorAll('.gt-btn').forEach(b => {
      b.classList.remove('active');
      b.setAttribute('aria-selected', 'false');
    });
    btn.classList.add('active');
    btn.setAttribute('aria-selected', 'true');
    currentGender = btn.dataset.gender;
    renderStyles();
  });
});

/* Inițializare */
renderStyles();

/* ================================================================
   8. SECȚIUNEA RECENZII — localStorage
================================================================ */
const sampleReviews = [
  { id:'sample-1', name:'Ana M.',
    comment:'Materialele sunt exact cum sunt descrise — mătasea Mulberry e absolut superbă. Livrare rapidă!',
    rating:'yes', photo:null, date:new Date('2025-03-10').getTime() },
  { id:'sample-2', name:'Bogdan R.',
    comment:'Am comandat lână Merinos pentru un costum. Calitate excepțională, croitorul a fost impresionat.',
    rating:'yes', photo:null, date:new Date('2025-02-22').getTime() },
  { id:'sample-3', name:'Cristina V.',
    comment:'Pălăria fedora e minunată, exact ce îmi doream. Prețul e corect pentru calitate.',
    rating:'yes', photo:null, date:new Date('2025-01-15').getTime() }
];

function loadSavedReviews() {
  try {
    return JSON.parse(localStorage.getItem('fas_sun_reviews') || '[]');
  } catch (e) { return []; }
}

function saveReview(review) {
  const saved = loadSavedReviews();
  saved.push(review);
  try {
    localStorage.setItem('fas_sun_reviews', JSON.stringify(saved));
  } catch (e) {
    console.warn('localStorage plin — recenzia nu a putut fi salvată.');
  }
}

function buildReviewCard(r) {
  const avatar = r.photo
    ? `<img src="${r.photo}" alt="">`
    : '<i class="fas fa-user"></i>';
  const emoji = r.rating === 'yes' ? '😍' : '😕';
  const label = r.rating === 'yes' ? 'Mulțumit' : 'Nemulțumit';
  const dateStr = new Date(r.date).toLocaleDateString('ro-RO');
  return `
    <article class="rev-card">
      <div class="rev-top">
        <div class="rev-av">${avatar}</div>
        <strong class="rev-name">${escapeHTML(r.name || 'Client')}</strong>
        <span class="rev-emoji" aria-label="${label}">${emoji}</span>
      </div>
      <p class="rev-text">${escapeHTML(r.comment)}</p>
      <time class="rev-date">${dateStr}</time>
    </article>
  `;
}

function renderReviews() {
  const userReviews = loadSavedReviews();
  const all = [...sampleReviews, ...userReviews];
  const c = document.getElementById('revContainer');
  if (all.length === 0) {
    c.innerHTML = '<p style="color:var(--text-3)">Fii primul care lasă o recenzie!</p>';
    return;
  }
  c.innerHTML = all.map(buildReviewCard).join('');
}

renderReviews();

/* ---------- Formular submit ---------- */
function resizeImageToBase64(file, maxWidth, callback) {
  const reader = new FileReader();
  reader.onload = function(ev) {
    const img = new Image();
    img.onload = function() {
      let w = img.width, h = img.height;
      if (w > maxWidth) { h = Math.round(h * maxWidth / w); w = maxWidth; }
      const canvas = document.createElement('canvas');
      canvas.width = w; canvas.height = h;
      canvas.getContext('2d').drawImage(img, 0, 0, w, h);
      callback(canvas.toDataURL('image/jpeg', 0.72));
    };
    img.src = ev.target.result;
  };
  reader.readAsDataURL(file);
}

document.getElementById('reviewImgUpload').addEventListener('change', function(e) {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = function(ev) {
    document.getElementById('imgPrev').innerHTML =
      `<img src="${ev.target.result}" alt="Previzualizare">`;
  };
  reader.readAsDataURL(file);
});

document.getElementById('submitRev').addEventListener('click', function() {
  const name = document.getElementById('revName').value.trim() || 'Client FAS SUN';
  const comment = document.getElementById('revText').value.trim();
  const rating = document.querySelector('input[name="revRating"]:checked')?.value || 'yes';
  const file = document.getElementById('reviewImgUpload').files[0];

  if (!comment || comment.length < 8) {
    showToast('⚠️ Comentariul trebuie să aibă minim 8 caractere.');
    return;
  }

  function finalSave(photoBase64) {
    const review = {
      id: 'user-' + Date.now(),
      name: name, comment: comment, rating: rating,
      photo: photoBase64 || null, date: Date.now()
    };
    saveReview(review);
    renderReviews();
    document.getElementById('revName').value = '';
    document.getElementById('revText').value = '';
    document.getElementById('reviewImgUpload').value = '';
    document.getElementById('imgPrev').innerHTML = '';
    showToast('✅ Recenzia ta a fost publicată. Mulțumim!');
  }

  if (file) {
    if (file.size > 2 * 1024 * 1024) {
      showToast('⚠️ Imaginea depășește 2MB. Alege una mai mică.');
      return;
    }
    resizeImageToBase64(file, 200, finalSave);
  } else {
    finalSave(null);
  }
});

/* ================================================================
   9. BUTONUL HERO — scroll smooth
================================================================ */
document.getElementById('btnExplore').addEventListener('click', function() {
  document.getElementById('stilizare').scrollIntoView({ behavior: 'smooth' });
});

/* ================================================================
  10. NAVIGARE ACTIVĂ la scroll
================================================================ */
const navLinks = document.querySelectorAll('.nav-links a');
const sections = document.querySelectorAll('section[id]');

const navObserver = new IntersectionObserver(function(entries) {
  entries.forEach(function(entry) {
    if (entry.isIntersecting) {
      navLinks.forEach(function(link) {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + entry.target.id) {
          link.classList.add('active');
        }
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => navObserver.observe(s));

/* ================================================================
  11. BACK TO TOP button
================================================================ */
const backToTopBtn = document.getElementById('backToTop');

window.addEventListener('scroll', function() {
  if (window.scrollY > 400) {
    backToTopBtn.classList.add('show');
  } else {
    backToTopBtn.classList.remove('show');
  }
});

backToTopBtn.addEventListener('click', function() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});