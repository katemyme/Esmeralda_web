// ── DOM ──────────────────────────────────────────────────────────────────────

const catalogGrid      = document.getElementById("catalogGrid");
const searchInput      = document.getElementById("searchInput");
const resultsCount     = document.getElementById("resultsCount");
const productDetail    = document.getElementById("productDetail");
const detailClose      = document.getElementById("detailClose");
const detailTitle      = document.getElementById("detailTitle");
const detailDescription = document.getElementById("detailDescription");
const detailZone       = document.getElementById("detailZone");
const priceSteel       = document.getElementById("priceSteel");
const priceLuxurySteel = document.getElementById("priceLuxurySteel");
const priceTitanium    = document.getElementById("priceTitanium");
const detailImage      = document.getElementById("detailImage");
const whatsappTextLink  = document.getElementById("whatsappTextLink");
const whatsappFloatLink = document.getElementById("whatsappFloatLink");
const zonePills        = document.querySelectorAll(".zone-pill");

// ── Estado ───────────────────────────────────────────────────────────────────

const whatsappPhoneNumber = "50584272274";
let activeZone = "all";
let filterTimer;

// ── Datos ────────────────────────────────────────────────────────────────────

const zoneLabels = {
  oreja:    "Oreja",
  nariz:    "Nariz",
  ceja:     "Ceja",
  boca:     "Boca",
  corporal: "Corporal",
};

const products = [
  {
    name: "Helix",
    zone: "oreja",
    preview: "emerald",
    image: "",
    description: "Acabado premium con estilo minimalista.",
    prices: { steel: 450, luxurySteel: 550, titanium: 750 },
  },
  {
    name: "Septum",
    zone: "nariz",
    preview: "white",
    image: "",
    description: "Una pieza discreta con presencia elegante.",
    prices: { steel: 550, luxurySteel: 650, titanium: 750 },
  },
  {
    name: "Lobulo",
    zone: "oreja",
    preview: "black",
    image: "",
    description: "Diseño sobrio para uso diario con acabado refinado.",
    prices: { steel: 600, luxurySteel: 1100, titanium: 1500 },
  },
  {
    name: "Conch",
    zone: "oreja",
    preview: "emerald",
    image: "",
    description: "Estilo moderno que resalta la forma de la oreja.",
    prices: { steel: 450, luxurySteel: 550, titanium: 750 },
  },
  {
    name: "Tragus",
    zone: "oreja",
    preview: "white",
    image: "",
    description: "Detalle pequeño con gran personalidad.",
    prices: { steel: 550, titanium: 770 },
  },
  {
    name: "Daith",
    zone: "oreja",
    preview: "black",
    image: "",
    description: "Perfil elegante para un look limpio y actual.",
    prices: { steel: 490, luxurySteel: 600, titanium: 810 },
  },
  {
    name: "Nostril",
    zone: "nariz",
    preview: "emerald",
    image: "",
    description: "Un clásico versátil con presencia sutil.",
    prices: { steel: 450, titanium: 750 },
  },
  {
    name: "Ceja",
    zone: "ceja",
    preview: "black",
    image: "",
    description: "Toque urbano para una imagen más atrevida.",
    prices: { steel: 450, luxurySteel: 650, titanium: 750 },
  },
  {
    name: "Bridge",
    zone: "nariz",
    preview: "emerald",
    image: "",
    description: "Diseño frontal que destaca con fuerza visual.",
    prices: { steel: 550, titanium: 850 },
  },
  {
    name: "Lengua",
    zone: "boca",
    preview: "white",
    image: "",
    description: "Pieza audaz para un estilo auténtico.",
    prices: { steel: 550, luxurySteel: 650, titanium: 850 },
  },
  {
    name: "Labio",
    zone: "boca",
    preview: "black",
    image: "",
    description: "Acabado llamativo con balance entre moda y actitud.",
    prices: { steel: 450, luxurySteel: 550, titanium: 750 },
  },
  {
    name: "Industrial",
    zone: "oreja",
    preview: "emerald",
    image: "",
    description: "Doble perforación para una estética contundente.",
    prices: { steel: 450, luxurySteel: 650, titanium: 850 },
  },
  {
    name: "Flat",
    zone: "oreja",
    preview: "white",
    image: "",
    description: "Diseño minimalista que combina con todo.",
    prices: { steel: 450, luxurySteel: 550, titanium: 750 },
  },
  {
    name: "Surface",
    zone: "corporal",
    preview: "black",
    image: "",
    description: "Línea limpia para una apariencia futurista.",
    prices: { titanium: 1200 },
  },
  {
    name: "Ombligo",
    zone: "corporal",
    preview: "emerald",
    image: "",
    description: "Ideal para looks de verano con brillo sutil.",
    prices: { steel: 450, luxurySteel: 550, titanium: 1100 },
  },
  {
    name: "Pezón",
    zone: "corporal",
    preview: "white",
    image: "",
    description: "Opciones discretas o bold según tu estilo.",
    prices: { luxurySteel: 750, titanium: 2200 },
  },
];

// ── Helpers ───────────────────────────────────────────────────────────────────

const escapeSvgText = (value) =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");

const createPlaceholderImage = (name, zone) => {
  const label    = escapeSvgText(name);
  const subtitle = escapeSvgText(zoneLabels[zone] || "Perforación");
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 560" role="img" aria-label="${label}">
      <defs>
        <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#F2FAF5" />
          <stop offset="100%" stop-color="#E6F4EC" />
        </linearGradient>
      </defs>
      <rect width="800" height="560" rx="36" fill="url(#g)" />
      <circle cx="650" cy="120" r="110" fill="rgba(24, 128, 74, 0.10)" />
      <circle cx="140" cy="430" r="150" fill="rgba(14, 92, 52, 0.06)" />
      <text x="50%" y="47%" fill="#0E5C34" font-family="Segoe UI, Arial, sans-serif" font-size="54" font-weight="700" text-anchor="middle">${label}</text>
      <text x="50%" y="57%" fill="#4A6355" font-family="Segoe UI, Arial, sans-serif" font-size="24" text-anchor="middle">${subtitle}</text>
      <text x="50%" y="72%" fill="#18804A" font-family="Segoe UI, Arial, sans-serif" font-size="20" text-anchor="middle">Espacio para imagen</text>
    </svg>`;
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
};

const getProductImage = (product) =>
  product.image?.trim() || createPlaceholderImage(product.name, product.zone);

const formatCurrency = (value, plus = false) => `C$${value}${plus ? "+" : ""}`;

const isValidPrice = (value) => Number.isFinite(value) && value > 0;

const getAvailablePrices = (prices) =>
  [
    { label: "Acero quirúrgico", value: prices?.steel,        plus: false },
    { label: "Acero de lujo",    value: prices?.luxurySteel,  plus: false },
    { label: "Titanio",          value: prices?.titanium,     plus: true  },
  ].filter((e) => isValidPrice(e.value));

const getPreviewPrice = (prices) => {
  const list = getAvailablePrices(prices);
  if (!list.length) return "Precio no disponible";
  const min = list.reduce((m, e) => Math.min(m, e.value), list[0].value);
  return list.length === 1 ? formatCurrency(min) : `Desde ${formatCurrency(min)}`;
};

// ── Render ────────────────────────────────────────────────────────────────────

const renderResultsCount = (count) => {
  if (!resultsCount) return;
  resultsCount.textContent =
    count === 0
      ? "No se encontraron perforaciones con ese filtro."
      : `${count} perforaciones disponibles.`;
};

const renderCatalog = (items) => {
  if (!catalogGrid) return;

  // Estado vacío
  if (items.length === 0) {
    const empty = document.createElement("div");
    empty.className = "catalog-empty";
    empty.innerHTML =
      `<strong>Sin resultados</strong>` +
      `<p>Intenta con otro término o cambia el filtro de zona.</p>`;
    catalogGrid.replaceChildren(empty);
    renderResultsCount(0);
    return;
  }

  const fragment = document.createDocumentFragment();

  items.forEach((product, index) => {
    const card = document.createElement("article");
    card.className = "product-card";
    card.setAttribute("role", "button");
    card.setAttribute("tabindex", "0");
    card.setAttribute("aria-label",
      `Ver detalle de ${product.name} en zona ${zoneLabels[product.zone]}`);
    card.dataset.product = product.name;
    // Stagger de entrada: máximo 440ms para que la lista no sea interminable
    card.style.animation =
      `cardIn 440ms cubic-bezier(0.22, 1, 0.36, 1) ${Math.min(index * 55, 440)}ms both`;

    // Preview (imagen / placeholder)
    const preview = document.createElement("div");
    preview.className = `product-preview ${product.preview}`;

    const previewImage = document.createElement("img");
    previewImage.className = "product-image";
    previewImage.src = getProductImage(product);
    previewImage.alt = product.name;
    previewImage.decoding = "async";
    previewImage.loading = "lazy";
    preview.appendChild(previewImage);

    // Badge de zona sobre la imagen
    const zoneBadge = document.createElement("span");
    zoneBadge.className = "card-zone";
    zoneBadge.textContent = zoneLabels[product.zone];
    preview.appendChild(zoneBadge);

    const title = document.createElement("h2");
    title.textContent = product.name;

    const description = document.createElement("p");
    description.textContent = product.description;

    const previewPrice = document.createElement("span");
    previewPrice.className = "preview-price";
    previewPrice.textContent = getPreviewPrice(product.prices);

    card.append(preview, title, description, previewPrice);
    fragment.appendChild(card);
  });

  catalogGrid.replaceChildren(fragment);
  renderResultsCount(items.length);
};

// ── Filtrado ──────────────────────────────────────────────────────────────────

const getFilteredProducts = () => {
  const query = (searchInput?.value || "").trim().toLowerCase();

  return products.filter((product) => {
    const matchZone = activeZone === "all" || product.zone === activeZone;
    if (!matchZone) return false;
    if (!query) return true;
    const text = `${product.name} ${product.description} ${zoneLabels[product.zone]}`.toLowerCase();
    return text.includes(query);
  });
};

const applyFilters = () => {
  // Primera carga: renderizar directamente con stagger
  if (!catalogGrid.children.length) {
    renderCatalog(getFilteredProducts());
    return;
  }

  // Filtrado posterior: fundido de salida → re-render → fundido de entrada
  catalogGrid.style.opacity = "0";
  catalogGrid.style.transform = "translateY(8px)";

  clearTimeout(filterTimer);
  filterTimer = setTimeout(() => {
    renderCatalog(getFilteredProducts());
    requestAnimationFrame(() => {
      catalogGrid.style.opacity = "";
      catalogGrid.style.transform = "";
    });
  }, 220);
};

// ── Detalle de producto ───────────────────────────────────────────────────────

const openDetail = (product) => {
  if (!product) return;

  const availablePrices = getAvailablePrices(product.prices);

  detailTitle.textContent       = product.name;
  detailDescription.textContent = product.description;
  detailZone.textContent        = `Zona: ${zoneLabels[product.zone]}`;

  if (detailImage) {
    detailImage.src = getProductImage(product);
    detailImage.alt = `Imagen de ${product.name}`;
  }

  const msg  = `Hola, quisiera más información sobre ${product.name} (${zoneLabels[product.zone]}).`;
  const href = `https://wa.me/${whatsappPhoneNumber}?text=${encodeURIComponent(msg)}`;
  if (whatsappTextLink)  whatsappTextLink.href  = href;
  if (whatsappFloatLink) whatsappFloatLink.href = href;

  // Cerrar menú si estaba abierto
  const hamburgerMenu   = document.getElementById("hamburgerMenu");
  const hamburgerToggle = document.getElementById("hamburgerToggle");
  hamburgerMenu?.classList.remove("active");
  document.body.classList.remove("hamburger-open");
  hamburgerToggle?.setAttribute("aria-expanded", "false");

  // Precios
  const priceRows = [
    { element: priceSteel,       price: product.prices.steel,        plus: false },
    { element: priceLuxurySteel, price: product.prices.luxurySteel,  plus: false },
    { element: priceTitanium,    price: product.prices.titanium,     plus: true  },
  ];

  priceRows.forEach((row) => {
    const li = row.element?.closest("li");
    if (!li) return;
    if (isValidPrice(row.price)) {
      row.element.textContent  = formatCurrency(row.price, row.plus);
      li.style.display = "flex";
    } else {
      li.style.display = "none";
    }
  });

  if (!availablePrices.length) {
    detailDescription.textContent =
      `${product.description} No hay precios disponibles para mostrar.`;
  }

  // Forzar re-trigger de la animación del modal
  productDetail.classList.remove("show");
  void productDetail.offsetWidth; // reflow
  productDetail.classList.add("show");
  productDetail.setAttribute("aria-hidden", "false");
  document.body.classList.add("detail-open");
  document.body.style.overflow = "hidden";
  detailClose?.focus();
};

const closeDetail = () => {
  productDetail.classList.remove("show");
  productDetail.setAttribute("aria-hidden", "true");
  document.body.classList.remove("detail-open");
  document.body.style.overflow = "";
};

const getProductByCard = (target) => {
  const card = target.closest(".product-card");
  if (!card) return null;
  return products.find((p) => p.name === card.dataset.product) || null;
};

// ── Eventos ───────────────────────────────────────────────────────────────────

window.addEventListener("load", () => {
  applyFilters();
});

zonePills.forEach((pill) => {
  pill.addEventListener("click", () => {
    zonePills.forEach((p) => p.classList.remove("active"));
    pill.classList.add("active");
    activeZone = pill.dataset.zone;
    applyFilters();
  });
});

searchInput?.addEventListener("input", applyFilters);

catalogGrid?.addEventListener("click", (e) => {
  const product = getProductByCard(e.target);
  if (product) openDetail(product);
});

catalogGrid?.addEventListener("keydown", (e) => {
  if (e.key !== "Enter" && e.key !== " ") return;
  const product = getProductByCard(e.target);
  if (!product) return;
  e.preventDefault();
  openDetail(product);
});

detailClose?.addEventListener("click", closeDetail);

productDetail?.addEventListener("click", (e) => {
  if (e.target === productDetail) closeDetail();
});

window.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && productDetail?.classList.contains("show")) {
    closeDetail();
  }
});

const initNav = () => {
  window.setupHamburgerNavigation?.();
};

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initNav);
} else {
  initNav();
}
