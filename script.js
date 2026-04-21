function escapeHTML(str) {
  if (!str) return '';
  return str.replace(/[&<>"']/g, function(char) {
    const map = { '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' };
    return map[char];
  });
}

/* ================================================================
   UTILITATE — Toast (notificare)
   Afișează un mesaj jos pe ecran timp de câteva secunde
================================================================ */
const toastEl = document.getElementById('toast');
let toastTimer;

function showToast(message) {
  clearTimeout(toastTimer);
  toastEl.textContent = message;
  toastEl.classList.add('show');
  toastTimer = setTimeout(() => toastEl.classList.remove('show'), 3400);
}

/* ================================================================
   UTILITATE — Skeleton loader
   Generează placeholder-uri animate cât timp așteptăm date
================================================================ */
function buildSkeletons(count, imageHeight) {
  return Array(count).fill(0).map(() => `
    <div class="skeleton">
      <div class="skeleton-img" style="height:${imageHeight}px"></div>
      <div class="skeleton-body">
        <div class="skeleton-line"></div>
        <div class="skeleton-line short"></div>
      </div>
    </div>
  `).join('');
}

/* ================================================================
   1. PRELOADER
   La încărcarea completă a paginii:
   - ascundem preloader-ul
   - arătăm site-ul
================================================================ */
window.addEventListener('load', function() {
  setTimeout(function() {
    document.getElementById('pl').classList.add('hidden');

    setTimeout(function() {
      document.getElementById('pl').style.display = 'none';
      document.getElementById('site').classList.add('visible');
    }, 900); // 900ms = durata tranziției din CSS

  }, 1500); // 1500ms = timp minim afișare preloader
});

/* ================================================================
   2. ANIMAȚII SCROLL (IntersectionObserver)
   Cardurile sunt invizibile inițial (opacity: 0 în CSS).
   Când intră în ecran, primesc clasa "visible" care le face vizibile.
================================================================ */
const scrollObserver = new IntersectionObserver(function(entries) {
  entries.forEach(function(entry) {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      scrollObserver.unobserve(entry.target); // oprim observarea după prima apariție
    }
  });
}, { threshold: 0.07 }); // se declanșează când 7% din element e vizibil

// Funcție helper — observăm elementele după ce sunt create în DOM
function observeElements(selector) {
  document.querySelectorAll(selector).forEach(function(el) {
    if (!el.classList.contains('visible')) {
      scrollObserver.observe(el);
    }
  });
}

/* ================================================================
   3. SECȚIUNEA STILIZARE — Lookbook / Idei de outfit
   Date locale — nu depind de niciun API extern
================================================================ */
const outfits = [
  {
    img:    'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=500&h=680&fit=crop',
    label:  'Minimalism urban',
    tip:    'Sacou bej + pantaloni largi crem + loaferi',
    season: 'Primăvară / Toamnă'
  },
  {
    img:    'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=500&h=680&fit=crop',
    label:  'Feminitate soft',
    tip:    'Rochie fluidă în nuanțe pastel + eșarfă cașmir',
    season: 'Vară'
  },
  {
    img:    'https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?w=500&h=680&fit=crop',
    label:  'Power dressing',
    tip:    'Costum structurat + cămașă albă + curea metalică',
    season: 'Tot anul'
  },
  {
    img:    'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=500&h=680&fit=crop',
    label:  'Street luxe',
    tip:    'Trench coat + blugi drepți + sneakers albi',
    season: 'Toamnă'
  },
  {
    img:    'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=500&h=680&fit=crop',
    label:  'Noapte de gală',
    tip:    'Rochie midi satin + colier statement + pantofi stiletto',
    season: 'Seară'
  },
  {
    img:    'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=500&h=680&fit=crop',
    label:  'Editorial chic',
    tip:    'Trench oversized + rochie tricot + cizme înalte',
    season: 'Iarnă'
  }
];

// Construim HTML-ul pentru fiecare outfit și îl injectăm în grilă
document.getElementById('styleGrid').innerHTML = outfits.map(function(outfit) {
  return `
    <article class="style-card" tabindex="0" aria-label="Look: ${escapeHTML(outfit.label)}">
      <img src="${outfit.img}" loading="lazy" alt="Outfit: ${escapeHTML(outfit.label)}">
      <div class="style-overlay">
        <p class="style-label">${escapeHTML(outfit.label)}</p>
        <p class="style-tip">${escapeHTML(outfit.tip)}</p>
      </div>
      <div class="style-bar">
        <span class="style-season">${escapeHTML(outfit.season)}</span>
      </div>
    </article>
  `;
}).join('');

observeElements('.style-card');

/* ================================================================
   4. SECȚIUNEA MATERIALE
   Date locale cu informații reale despre materiale
================================================================ */
const materials = [
  {
    name:   'Bumbac organic GOTS',
    price:  '45 lei/m',
    origin: 'Turcia 🇹🇷',
    cert:   'GOTS',
    img:    'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=400&h=280&fit=crop',
    desc:   'Textură moale și respirabilă. Certificat organic — ideal pentru haine de zi cu zi.',
    tags:   ['Lavabil', 'Anti-alergic', 'Organic']
  },
  {
    name:   'Lână Merinos',
    price:  '98 lei/m',
    origin: 'Noua Zeelandă 🇳🇿',
    cert:   'RWS',
    img:    'https://images.unsplash.com/photo-1585435465945-bef5a93f8849?w=400&h=280&fit=crop',
    desc:   'Fibră extrafină de 17.5 microni. Termo-reglator natural, nu provoacă mâncărime.',
    tags:   ['Termo-activ', 'Extra-fină', 'Premium']
  },
  {
    name:   'Mătase Mulberry',
    price:  '210 lei/m',
    origin: 'China 🇨🇳',
    cert:   'OEKO-TEX',
    img:    'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=400&h=280&fit=crop',
    desc:   'Cel mai fin fir de mătase naturală. Luciu distinct, atingere rece, aspect de lux.',
    tags:   ['Lux', 'Hipo-alergenic', 'Fluid']
  },
  {
    name:   'In francez',
    price:  '68 lei/m',
    origin: 'Franța 🇫🇷',
    cert:   'European Flax',
    img:    'https://images.unsplash.com/photo-1599661046289-e31897846e41?w=400&h=280&fit=crop',
    desc:   'Cultivat în Normandia fără pesticide. Se înmoaie cu fiecare spălare.',
    tags:   ['Sustenabil', 'Vaporos', 'Natural']
  }
];

document.getElementById('matGrid').innerHTML = materials.map(function(mat) {
  const tagsHTML = mat.tags.map(t => `<span class="card-tag">${escapeHTML(t)}</span>`).join('');

  return `
    <article class="card">
      <img src="${mat.img}" loading="lazy" alt="Material: ${escapeHTML(mat.name)}">
      <div class="card-body">
        <span class="card-label"><i class="fas fa-certificate"></i> ${escapeHTML(mat.cert)}</span>
        <h3 class="card-title">${escapeHTML(mat.name)}</h3>
        <p class="card-desc">${escapeHTML(mat.desc)}</p>
        <div class="card-footer">
          <span style="color:var(--text-muted);font-size:.75rem">${escapeHTML(mat.origin)}</span>
          <span class="card-price">${escapeHTML(mat.price)}</span>
        </div>
        <div class="card-tags">${tagsHTML}</div>
      </div>
    </article>
  `;
}).join('');

observeElements('.card');

/* ================================================================
   5. SECȚIUNEA CULORI — conectată la The Color API
================================================================ */
const colors = [
  { hex: 'B87B4F', note: 'Ideal pentru piele & pantaloni eleganți' },
  { hex: 'E2B87A', note: 'Rochii de vară, accesorii aurii' },
  { hex: '8FB0D0', note: 'Cămăși, costume office' },
  { hex: 'C57F5E', note: 'Sacouri, fuste midi de toamnă' },
  { hex: 'F3E5D8', note: 'Baze neutre perfecte pentru layering' }
];

document.getElementById('colorGrid').innerHTML = buildSkeletons(5, 120);

Promise.all(
  colors.map(function(c) {
    return fetch('https://www.thecolorapi.com/id?hex=' + c.hex + '&format=json')
      .then(function(res) { return res.json(); })
      .then(function(data) {
        return { hex: c.hex, name: data.name.value, note: c.note };
      })
      .catch(function() {
        return { hex: c.hex, name: '#' + c.hex, note: c.note };
      });
  })
).then(function(results) {
  document.getElementById('colorGrid').innerHTML = results.map(function(color) {
    return `
      <article class="card">
        <div class="color-swatch" style="background:#${color.hex};height:120px;border-radius:8px 8px 0 0"
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
   6. SECȚIUNEA HAINE — Date locale + Tab-uri
================================================================ */
const brandClothes = [
  {
    img:   'https://images.unsplash.com/photo-1617137968427-85924c800a22?w=400&h=300&fit=crop',
    label: 'Brand de autor · Ediție limitată',
    name:  'Jachetă structurată bej',
    desc:  'Croială impecabilă, umeri construiți, bumbac organic premium.',
    price: '890 lei'
  },
  {
    img:   'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=400&h=300&fit=crop',
    label: 'Brand de autor · Ediție limitată',
    name:  'Costum în dungi fine',
    desc:  'Lână Merinos italiană, tăietură dreaptă, dublură naturală.',
    price: '1.450 lei'
  },
  {
    img:   'https://images.unsplash.com/photo-1594938298603-c8148c4beed9?w=400&h=300&fit=crop',
    label: 'Brand de autor · Ediție limitată',
    name:  'Pardesiu camel',
    desc:  'Lână cașmir 30%, cădere elegantă, butoni metalici aurii.',
    price: '2.100 lei'
  },
  {
    img:   'https://images.unsplash.com/photo-1603251579431-8041402bdeda?w=400&h=300&fit=crop',
    label: 'Brand de autor · Ediție limitată',
    name:  'Bluzon de piele eco',
    desc:  'Design minimalist, fermoar ascuns, căptușeală mătase.',
    price: '1.200 lei'
  }
];

const unicatClothes = [
  {
    img:   'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&h=300&fit=crop',
    label: 'Piesă unicat · Atelier propriu',
    name:  'Rochie asimetrică hand-made',
    desc:  'Mătase Mulberry, cusută manual, model unic, nu se repetă.',
    price: '3.200 lei'
  },
  {
    img:   'https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?w=400&h=300&fit=crop',
    label: 'Piesă unicat · Atelier propriu',
    name:  'Kimono brodat',
    desc:  'In francez, broderie florală manuală, cordon inclus.',
    price: '1.800 lei'
  },
  {
    img:   'https://images.unsplash.com/photo-1562572159-4efc207f5aff?w=400&h=300&fit=crop',
    label: 'Piesă unicat · Atelier propriu',
    name:  'Fustă midi plisată',
    desc:  'Voal dublu, talie elastică, disponibilă în 3 nuanțe.',
    price: '650 lei'
  },
  {
    img:   'https://images.unsplash.com/photo-1554412933-514a83d2f3c8?w=400&h=300&fit=crop',
    label: 'Piesă unicat · Atelier propriu',
    name:  'Top crochet manual',
    desc:  'Bumbac organic, model geometric, realizat artizanal.',
    price: '420 lei'
  }
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
          <button class="btn btn-gold" style="padding:.4rem .9rem;font-size:.8rem">Comandă</button>
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
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById(btn.dataset.tab).classList.add('active');
    observeElements('.card');
  });
});
/* ================================================================
   7. SECȚIUNEA ACCESORII — Slider
   Slider manual fără librării externe
================================================================ */
const accessories = [
  { name: 'Curea bronz auriu',  img: 'https://images.unsplash.com/photo-1598532163257-ae3c6b2524b6?w=340&h=240&fit=crop', desc: 'Piele naturală, cataramă gold' },
  { name: 'Cravată mătase',     img: 'https://images.unsplash.com/photo-1589756823695-278bc923f962?w=340&h=240&fit=crop', desc: 'Model herringbone, 100% mătase' },
  { name: 'Ochelari aviator',   img: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=340&h=240&fit=crop', desc: 'Ramă aurie, lentile UV400' },
  { name: 'Pălărie fedora',     img: 'https://images.unsplash.com/photo-1524093982496-2e84f3a0a694?w=340&h=240&fit=crop', desc: 'Lână premium, bandă satin' },
  { name: 'Broșă manuală',      img: 'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=340&h=240&fit=crop', desc: 'Artizanal, placată cu aur' },
  { name: 'Eșarfă cașmir',      img: 'https://images.unsplash.com/photo-1601924638867-3a6de6b7a500?w=340&h=240&fit=crop', desc: 'Culoare camel, 100% cașmir' },
  { name: 'Mănuși din piele',   img: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=340&h=240&fit=crop', desc: 'Piele moale, căptușeală lână' }
];

const sliderTrack   = document.getElementById('sliderTrack');
const btnPrev       = document.getElementById('btnPrev');
const btnNext       = document.getElementById('btnNext');
const sliderCounter = document.getElementById('sliderCounter');
let currentSlide = 0;

// Câte carduri vedem simultan în funcție de lățimea ecranului
function slidesVisible() {
  if (window.innerWidth < 600) return 1;
  if (window.innerWidth < 960) return 2;
  return 4;
}

// Construiește cardurile în slider
function buildSlider() {
  const visible   = slidesVisible();
  const cardWidth = `calc(${100 / visible}% - ${1.5 * (visible - 1) / visible}rem)`;

  sliderTrack.innerHTML = accessories.map(function(acc) {
    return `
      <div class="acc-card" style="flex: 0 0 ${cardWidth}; min-width: ${cardWidth}">
        <img src="${acc.img}" loading="lazy" alt="${escapeHTML(acc.name)}">
        <div class="acc-card-body">
          <p class="acc-name">${escapeHTML(acc.name)}</p>
          <p class="acc-desc">${escapeHTML(acc.desc)}</p>
        </div>
      </div>
    `;
  }).join('');
}

// Actualizează poziția sliderului și starea butoanelor
function updateSlider() {
  const visible  = slidesVisible();
  const maxSlide = Math.max(0, accessories.length - visible);

  // Nu lăsăm indexul să depășească limitele
  currentSlide = Math.min(currentSlide, maxSlide);

  // Mutăm track-ul cu CSS transform
  const movePercent = currentSlide * (100 / visible);
  sliderTrack.style.transform = `translateX(-${movePercent}%)`;

  // Dezactivăm butoanele la capete
  btnPrev.disabled = currentSlide === 0;
  btnNext.disabled = currentSlide >= maxSlide;

  // Actualizăm contorul
  sliderCounter.textContent = `${currentSlide + 1} / ${maxSlide + 1}`;
}

btnPrev.addEventListener('click', function() { currentSlide--; updateSlider(); });
btnNext.addEventListener('click', function() { currentSlide++; updateSlider(); });

// La redimensionarea ferestrei reconstruim slider-ul
let resizeTimer;
window.addEventListener('resize', function() {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(function() {
    currentSlide = 0;
    buildSlider();
    updateSlider();
  }, 150);
});

// Inițializare
buildSlider();
updateSlider();

/* ================================================================
   8. SECȚIUNEA RECENZII

   Recenziile se salvează în localStorage (memoria browserului).
   La fiecare vizită, recenziile salvate sunt afișate din nou.
   API-urile externe au fost eliminate — v1.0 folosește doar date locale.
================================================================ */

// Câteva recenzii de exemplu afișate la prima vizită
const sampleReviews = [
  {
    id:        'sample-1',
    name:      'Ana M.',
    comment:   'Materialele sunt exact cum sunt descrise — mătasea Mulberry e absolut superbă. Livrare rapidă!',
    rating:    'yes',
    photo:     null,
    date:      new Date('2025-03-10').getTime()
  },
  {
    id:        'sample-2',
    name:      'Bogdan R.',
    comment:   'Am comandat lână Merinos pentru un costum. Calitate excepțională, croitorul a fost impresionat.',
    rating:    'yes',
    photo:     null,
    date:      new Date('2025-02-22').getTime()
  },
  {
    id:        'sample-3',
    name:      'Cristina V.',
    comment:   'Pălăria fedora e minunată, exact ce îmi doream. Prețul e corect pentru calitate.',
    rating:    'yes',
    photo:     null,
    date:      new Date('2025-01-15').getTime()
  }
];

// Citim recenziile salvate de utilizator din localStorage
function loadSavedReviews() {
  try {
    return JSON.parse(localStorage.getItem('fas_sun_reviews') || '[]');
  } catch (e) {
    return [];
  }
}

// Salvăm recenziile noi în localStorage
function saveReview(review) {
  const saved = loadSavedReviews();
  saved.push(review);
  try {
    localStorage.setItem('fas_sun_reviews', JSON.stringify(saved));
  } catch (e) {
    console.warn('localStorage plin — recenzia nu a putut fi salvată.');
  }
}

// Construim HTML-ul pentru un card de recenzie
function buildReviewCard(review) {
  const avatarHTML = review.photo
    ? `<img src="${review.photo}" alt="">`
    : '<i class="fas fa-user"></i>';

  const emoji = review.rating === 'yes' ? '😍' : '😕';
  const label = review.rating === 'yes' ? 'Mulțumit' : 'Nemulțumit';
  const dateStr = new Date(review.date).toLocaleDateString('ro-RO');

  return `
    <article class="review-card">
      <div class="review-top">
        <div class="review-avatar">${avatarHTML}</div>
        <strong class="review-name">${escapeHTML(review.name || 'Client')}</strong>
        <span class="review-emoji" aria-label="${label}">${emoji}</span>
      </div>
      <p class="review-text">${escapeHTML(review.comment)}</p>
      <time class="review-date">${dateStr}</time>
    </article>
  `;
}

function renderReviews() {
  const userReviews = loadSavedReviews();
  const allReviews  = [...sampleReviews, ...userReviews];
  const container   = document.getElementById('revContainer');

  if (allReviews.length === 0) {
    container.innerHTML = '<p style="color:var(--text-muted)">Fii primul care lasă o recenzie!</p>';
    return;
  }

  container.innerHTML = allReviews.map(buildReviewCard).join('');
}

// Afișăm la pornire
renderReviews();

/* ---------------------------------------------------------------
   Formular trimitere recenzie
--------------------------------------------------------------- */

// Utilitate — redimensionează imaginea și o convertește în Base64
// (Base64 = text lung care reprezintă imaginea, ușor de salvat în localStorage)
function resizeImageToBase64(file, maxWidth, callback) {
  const reader = new FileReader();

  reader.onload = function(event) {
    const img = new Image();

    img.onload = function() {
      let width  = img.width;
      let height = img.height;

      // Redimensionăm proporțional
      if (width > maxWidth) {
        height = Math.round(height * maxWidth / width);
        width  = maxWidth;
      }

      const canvas = document.createElement('canvas');
      canvas.width  = width;
      canvas.height = height;
      canvas.getContext('2d').drawImage(img, 0, 0, width, height);

      callback(canvas.toDataURL('image/jpeg', 0.72)); // 72% calitate JPEG
    };

    img.src = event.target.result;
  };

  reader.readAsDataURL(file);
}

// Previzualizare imagine selectată
document.getElementById('inputPhoto').addEventListener('change', function(e) {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(ev) {
    document.getElementById('photoPreview').innerHTML =
      `<img src="${ev.target.result}" alt="Previzualizare">`;
  };
  reader.readAsDataURL(file);
});

// Submit recenzie
document.getElementById('btnSubmit').addEventListener('click', function() {
  const name    = document.getElementById('inputName').value.trim() || 'Client FAS SUN';
  const comment = document.getElementById('inputComment').value.trim();
  const rating  = document.querySelector('input[name="rating"]:checked')?.value || 'yes';
  const file    = document.getElementById('inputPhoto').files[0];

  // Validare de bază
  if (!comment || comment.length < 8) {
    showToast('⚠️ Comentariul trebuie să aibă minim 8 caractere.');
    return;
  }

  // Funcție care finalizează salvarea recenziei
  function finalSave(photoBase64) {
    const review = {
      id:      'user-' + Date.now(),
      name:    name,
      comment: comment,
      rating:  rating,
      photo:   photoBase64 || null,
      date:    Date.now()
    };

    saveReview(review);
    renderReviews();

    // Resetăm formularul
    document.getElementById('inputName').value    = '';
    document.getElementById('inputComment').value = '';
    document.getElementById('inputPhoto').value   = '';
    document.getElementById('photoPreview').innerHTML = '';

    showToast('✅ Recenzia ta a fost publicată. Mulțumim!');
  }

  // Dacă a ales o imagine, o redimensionăm mai întâi
  if (file) {
    if (file.size > 2 * 1024 * 1024) { // 2MB limită
      showToast('⚠️ Imaginea depășește 2MB. Alege una mai mică.');
      return;
    }
    resizeImageToBase64(file, 200, finalSave);
  } else {
    finalSave(null);
  }
});

/* ================================================================
   9. BUTONUL HERO — scroll la prima secțiune
================================================================ */
document.getElementById('btnExplore').addEventListener('click', function() {
  document.getElementById('stilizare').scrollIntoView({ behavior: 'smooth' });
});
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

sections.forEach(function(section) {
  navObserver.observe(section);
});