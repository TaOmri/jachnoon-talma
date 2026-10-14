/* =========================================================
   הג׳חנון של תלמה — all editable business details live here
   ========================================================= */
const CONFIG = {
  // WhatsApp number in international format, no "+" or leading 0
  phone: '972523985754',
  phoneDisplay: '052-398-5754',
  // kind 'main' gets its own card; kind 'extra' is listed together in the add-ons card
  items: [
    { id: 'full',  kind: 'main', name: 'קומפלט',      desc: 'ג׳חנון עם ביצה חומה, רסק וסחוג', price: 25, photo: 'assets/images/full.jpg' },
    { id: 'plain', kind: 'main', name: 'ג׳חנון לבד',  desc: 'רק הג׳חנון, בלי כלום',           price: 20 },
    { id: 'x-egg',    kind: 'extra', name: 'ביצה',  order: 'תוספת ביצה',  price: 3, color: '#6b3f22' },
    { id: 'x-resek',  kind: 'extra', name: 'רסק',   order: 'תוספת רסק',   price: 3, color: '#c4402b' },
    { id: 'x-skhug',  kind: 'extra', name: 'סחוג',  order: 'תוספת סחוג',  price: 3, color: '#5e7d34' },
    { id: 'x-tahini', kind: 'extra', name: 'טחינה', order: 'תוספת טחינה', price: 3, color: '#d9c9a3' },
  ],
  pickupFrom: '08:30',
  pickupTo: '13:00',
  hours: [
    ['שבת', 'איסוף מ-08:30 עד 13:00'],
  ],
  hoursNote: 'או עד שנגמר הג׳חנון',
  address: 'חובב 5, חולון',
};

/* ---------- night story (hours after 22:00; last stage = 08:30) ---------- */
const STORY = [
  { at: 0,  title: 'מגלגלים את הבצק',   text: 'מותחים דק־דק, מורחים חמאה, מגלגלים. שוב ושוב, עד שיש שכבות.' },
  { at: 2,  title: 'הסיר נסגר',          text: 'ביצים חומות בין הגלילים, מכסה כבד, והאש הכי נמוכה שיש.' },
  { at: 5,  title: 'כולם ישנים',          text: 'רק הסיר ער. החמאה נמסה לאט לתוך כל שכבה.' },
  { at: 8,  title: 'הבית מתחיל להריח',   text: 'השכנים כבר יודעים. ג׳חנון אי אפשר להסתיר.' },
  { at: 9.5, title: 'הזהב נכנס',           text: 'הבצק משחים, הקצוות מתקרמלים, הביצים מקבלות צבע.' },
  { at: 10.5, title: 'בוקר טוב.',         text: 'פותחים את הסיר ומתחילים לחלק. ביצה, רסק, סחוג, טחינה. ויאללה.', cta: true },
];

/* ---------- illustrations ---------- */
const roll = (x, y, w, rot = 0, h = 42) => `
  <g transform="rotate(${rot} ${x + w / 2} ${y + h / 2})">
    <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${h / 2}" fill="url(#g-dough)"/>
    <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${h / 2}" fill="url(#p-layers)"/>
    <rect x="${x + 14}" y="${y + 6}" width="${w - 28}" height="6" rx="3" fill="#fff" opacity=".2"/>
  </g>`;
const egg = (cx, cy, rot = 0, s = 1) => `
  <g transform="rotate(${rot} ${cx} ${cy})">
    <ellipse cx="${cx}" cy="${cy}" rx="${22 * s}" ry="${28 * s}" fill="url(#g-egg)"/>
    <ellipse cx="${cx - 7 * s}" cy="${cy - 11 * s}" rx="${6 * s}" ry="${9 * s}" fill="#fff" opacity=".22"/>
  </g>`;
const halfEgg = (cx, cy, rot = 0) => `
  <g transform="rotate(${rot} ${cx} ${cy})">
    <ellipse cx="${cx}" cy="${cy}" rx="24" ry="30" fill="#7a4a2a"/>
    <ellipse cx="${cx}" cy="${cy}" rx="20" ry="26" fill="#f4ead6"/>
    <circle cx="${cx}" cy="${cy + 3}" r="12" fill="url(#g-yolk)"/>
  </g>`;
const bowl = (cx, cy, fill, r = 26) => `
  <circle cx="${cx}" cy="${cy + 3}" r="${r + 2}" fill="#000" opacity=".12"/>
  <circle cx="${cx}" cy="${cy}" r="${r}" fill="#fffaf0"/>
  <circle cx="${cx}" cy="${cy}" r="${r - 6}" fill="url(#${fill})"/>
  <circle cx="${cx - 5}" cy="${cy - 4}" r="2.5" fill="#fff" opacity=".35"/>
  <circle cx="${cx + 6}" cy="${cy + 3}" r="2" fill="#fff" opacity=".25"/>`;
const plate = (cx = 150, cy = 104, rx = 128, ry = 80) => `
  <ellipse cx="${cx}" cy="${cy + 6}" rx="${rx}" ry="${ry}" fill="#8e4a1a" opacity=".18"/>
  <ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="#fffaf0"/>
  <ellipse cx="${cx}" cy="${cy}" rx="${rx - 22}" ry="${ry - 16}" fill="#f6ead4"/>`;

const ILLUS = {
  full: `<svg viewBox="0 0 300 210" aria-hidden="true">
    ${plate(150, 100)}
    ${roll(50, 82, 176, -8, 46)}
    ${egg(226, 98, 18)}
    ${bowl(48, 168, 'g-resek')}
    ${bowl(106, 182, 'g-skhug', 22)}
  </svg>`,
  plain: `<svg viewBox="0 0 300 210" aria-hidden="true">
    ${plate(150, 104)}
    ${roll(58, 80, 184, -6, 46)}
  </svg>`,
  extras: `<svg viewBox="0 0 300 120" aria-hidden="true">
    ${egg(52, 60, -14, 1.05)}
    ${bowl(118, 62, 'g-resek', 28)}
    ${bowl(186, 62, 'g-skhug', 28)}
    ${bowl(254, 62, 'g-tahini', 28)}
  </svg>`,
};

/* ---------- helpers ---------- */
const $ = (s) => document.querySelector(s);
const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const smooth = (a, b, x) => { const t = clamp((x - a) / (b - a)); return t * t * (3 - 2 * t); };
const shekel = (n) => `₪${n}`;
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* =========================================================
   Scene
   ========================================================= */
const scene = $('#scene');
const stage = $('#stage');
const clockEl = $('#clock');
const captionsEl = $('#captions');

captionsEl.innerHTML = STORY.map((s, i) => `
  <div class="caption${i === 0 ? ' is-on' : ''}" data-i="${i}">
    <h2>${s.title}</h2>
    <p>${s.text}</p>
    ${s.cta ? '<a class="cta" href="#menu">לתפריט ←</a>' : ''}
  </div>`).join('');
const captions = [...captionsEl.children];

// stars
const starsEl = $('#stars');
for (let i = 0; i < 70; i++) {
  const s = document.createElement('i');
  s.style.cssText = `top:${Math.random() * 62}%;left:${Math.random() * 100}%;` +
    `animation-delay:${(Math.random() * 3.5).toFixed(2)}s;` +
    `transform:scale(${(0.6 + Math.random() * 1.2).toFixed(2)})`;
  starsEl.appendChild(s);
}

let activeCaption = 0;
const NIGHT_HOURS = 10.5; // 22:00 → 08:30, when pickup opens
const CLOCK_END = 0.84; // scroll progress at which the clock reaches 08:30

function renderScene() {
  const r = scene.getBoundingClientRect();
  const total = r.height - window.innerHeight;
  const t = clamp(-r.top / total);

  const clock = clamp(t / CLOCK_END);
  const elapsed = clock * NIGHT_HOURS;
  const mins = Math.round((elapsed * 60) / 10) * 10;
  const h = (22 + Math.floor(mins / 60)) % 24;
  const m = mins % 60;
  clockEl.textContent = `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;

  const vars = {
    '--t': t,
    '--clock': clock,
    '--intro': 1 - smooth(0.015, 0.07, t),
    '--ui': smooth(0.05, 0.11, t),
    '--stars': 1 - smooth(0.42, 0.66, t),
    '--dawn': smooth(0.42, 0.62, t) * (1 - smooth(0.72, 0.86, t)),
    '--morning': smooth(0.68, 0.84, t),
    '--sun': smooth(0.55, 0.88, t),
    '--lid': smooth(0.85, 0.97, t),
  };
  for (const k in vars) stage.style.setProperty(k, vars[k].toFixed(4));

  let idx = 0;
  STORY.forEach((s, i) => { if (elapsed >= s.at - 0.001) idx = i; });
  if (idx !== activeCaption) {
    captions[activeCaption].classList.remove('is-on');
    captions[idx].classList.add('is-on');
    activeCaption = idx;
  }
}

let ticking = false;
function onScroll() {
  if (ticking) return;
  ticking = true;
  requestAnimationFrame(() => { renderScene(); ticking = false; });
}
window.addEventListener('scroll', onScroll, { passive: true });
window.addEventListener('resize', onScroll);
renderScene();

/* =========================================================
   Menu & cart
   ========================================================= */
const cart = Object.fromEntries(CONFIG.items.map((i) => [i.id, 0]));

const stepper = (item) => `
  <div class="stepper" role="group" aria-label="כמות ${item.order || item.name}">
    <button type="button" data-id="${item.id}" data-d="1" aria-label="הוספת ${item.order || item.name}">+</button>
    <output id="q-${item.id}" aria-live="polite">0</output>
    <button type="button" data-id="${item.id}" data-d="-1" aria-label="הסרת ${item.order || item.name}" disabled>−</button>
  </div>`;

const mains = CONFIG.items.filter((i) => i.kind === 'main');
const extras = CONFIG.items.filter((i) => i.kind === 'extra');

$('#cards').innerHTML = mains.map((item, i) => `
  <article class="card${i === 0 ? ' card--hero' : ''}" data-card="${item.id}">
    <div class="card-art${item.photo ? ' card-art--photo' : ''}">
      ${item.photo ? `<img src="${item.photo}" alt="${item.name}: ${item.desc}" loading="lazy">` : ILLUS[item.id] || ''}
    </div>
    <div>
      <div class="card-row">
        <h3>${item.name}</h3>
        <span class="price">${shekel(item.price)}</span>
      </div>
      <p class="card-desc">${item.desc}</p>
      ${item.id === 'full' ? `
        <div class="chips">
          <span class="chip" style="--c:#6b3f22">ביצה</span>
          <span class="chip" style="--c:var(--resek)">רסק</span>
          <span class="chip" style="--c:var(--skhug)">סחוג</span>
        </div>` : ''}
    </div>
    <div class="card-row"><span></span>${stepper(item)}</div>
  </article>`).join('') + (extras.length ? `
  <article class="card card--extras" data-card="extras">
    <div class="card-art card-art--strip">${ILLUS.extras}</div>
    <div class="card-row">
      <h3>תוספות</h3>
      <span class="price">${shekel(extras[0].price)} <small>כל אחת</small></span>
    </div>
    <ul class="extras">
      ${extras.map((x) => `
        <li class="extra" data-card="${x.id}">
          <span class="extra-name" style="--c:${x.color}">${x.name}</span>
          ${stepper(x)}
        </li>`).join('')}
    </ul>
  </article>` : '');

$('#cards').addEventListener('click', (e) => {
  const btn = e.target.closest('button[data-id]');
  if (!btn) return;
  const id = btn.dataset.id;
  cart[id] = clamp(cart[id] + Number(btn.dataset.d), 0, 99);
  updateCart();
});

const lineItems = () => CONFIG.items.filter((i) => cart[i.id] > 0);
const count = () => Object.values(cart).reduce((a, b) => a + b, 0);
const total = () => CONFIG.items.reduce((sum, i) => sum + i.price * cart[i.id], 0);

function updateCart() {
  CONFIG.items.forEach((item) => {
    const q = cart[item.id];
    $(`#q-${item.id}`).textContent = q;
    const el = document.querySelector(`[data-card="${item.id}"]`);
    el.classList.toggle('has-qty', q > 0);
    el.querySelector('[data-d="-1"]').disabled = q === 0;
  });
  document.querySelector('.card--extras')?.classList.toggle('has-qty', extras.some((x) => cart[x.id] > 0));

  const lines = lineItems();
  $('#ticket-lines').innerHTML = lines.length
    ? lines.map((i) => `<li><span>${cart[i.id]} × ${i.order || i.name}</span><span class="dots"></span><span>${shekel(i.price * cart[i.id])}</span></li>`).join('')
    : '<li class="empty">עוד לא בחרתם כלום. הסיר מחכה.</li>';

  const n = count();
  $('#ticket-total').textContent = shekel(total());
  $('#send').disabled = n === 0;
  $('#orderbar-count').textContent = n === 1 ? 'פריט אחד' : `${n} פריטים`;
  $('#orderbar-total').textContent = shekel(total());
  updateBar();
}

/* ---------- WhatsApp ---------- */
function sendOrder() {
  if (!count()) return;
  const name = $('#f-name').value.trim();
  const time = $('#f-time').value;
  const msg = [
    'היי הג׳חנון של תלמה! אשמח להזמין:',
    '',
    ...lineItems().map((i) => `• ${cart[i.id]} × ${i.order || i.name} (${shekel(i.price * cart[i.id])})`),
    '',
    `סה״כ: ${shekel(total())}`,
    name ? `שם: ${name}` : null,
    time ? `שעת איסוף: ${time}` : null,
  ].filter((l) => l !== null).join('\n');
  window.open(`https://wa.me/${CONFIG.phone}?text=${encodeURIComponent(msg)}`, '_blank', 'noopener');
}
$('#send').addEventListener('click', sendOrder);
$('#orderbar-send').addEventListener('click', sendOrder);
$('#orderbar-sum').addEventListener('click', () =>
  $('#ticket').scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'center' }));

/* ---------- floating bar: visible when there's an order and the ticket is off-screen ---------- */
const bar = $('#orderbar');
let ticketVisible = false;
new IntersectionObserver(([entry]) => { ticketVisible = entry.isIntersecting; updateBar(); }, { threshold: 0.2 })
  .observe($('#ticket'));

function updateBar() {
  const on = count() > 0 && !ticketVisible;
  bar.classList.toggle('is-on', on);
  bar.setAttribute('aria-hidden', String(!on));
  bar.querySelectorAll('button').forEach((b) => (b.tabIndex = on ? 0 : -1));
}

/* =========================================================
   Info
   ========================================================= */
$('#hours').innerHTML = CONFIG.hours.map(([d, h]) => `<li><span>${d}</span><span>${h}</span></li>`).join('') +
  (CONFIG.hoursNote ? `<li class="hours-note">${CONFIG.hoursNote}</li>` : '');
$('#address').textContent = CONFIG.address;
$('#waze').href = `https://waze.com/ul?q=${encodeURIComponent(CONFIG.address)}`;
$('#phone').textContent = CONFIG.phoneDisplay;
$('#phone').href = `tel:+${CONFIG.phone}`;
$('#wa-link').href = `https://wa.me/${CONFIG.phone}`;
$('#year').textContent = new Date().getFullYear();
$('#f-time').min = CONFIG.pickupFrom;
$('#f-time').max = CONFIG.pickupTo;

updateCart();
