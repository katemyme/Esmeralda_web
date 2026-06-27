const catalogGrid = document.getElementById("catalogGrid");
const searchInput = document.getElementById("searchInput");
const zoneFilter = document.getElementById("zoneFilter");
const resultsCount = document.getElementById("resultsCount");
const productDetail = document.getElementById("productDetail");
const detailClose = document.getElementById("detailClose");
const detailTitle = document.getElementById("detailTitle");
const detailDescription = document.getElementById("detailDescription");
const detailZone = document.getElementById("detailZone");
const priceSteel = document.getElementById("priceSteel");
const priceLuxurySteel = document.getElementById("priceLuxurySteel");
const priceTitanium = document.getElementById("priceTitanium");
const detailImage = document.getElementById("detailImage");
const whatsappTextLink = document.getElementById("whatsappTextLink");
const whatsappFloatLink = document.getElementById("whatsappFloatLink");

const whatsappPhoneNumber = "50584272274";

const createPlaceholderImage = (name, zone) => {
  const label = escapeSvgText(name);
  const subtitle = escapeSvgText(zoneLabels[zone] || "Perforacion");
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 560" role="img" aria-label="${label}">
      <defs>
        <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#0b0b0b" />
          <stop offset="100%" stop-color="#1b1b1b" />
        </linearGradient>
      </defs>
      <rect width="800" height="560" rx="36" fill="url(#g)" />
      <circle cx="650" cy="120" r="110" fill="rgba(24, 213, 140, 0.18)" />
      <circle cx="140" cy="430" r="150" fill="rgba(255, 255, 255, 0.06)" />
      <rect x="78" y="78" width="644" height="404" rx="28" fill="none" stroke="rgba(255, 255, 255, 0.14)" stroke-width="4" stroke-dasharray="14 14" />
      <text x="50%" y="47%" fill="#f7f7f7" font-family="Segoe UI, Arial, sans-serif" font-size="54" font-weight="700" text-anchor="middle">${label}</text>
      <text x="50%" y="57%" fill="rgba(247, 247, 247, 0.78)" font-family="Segoe UI, Arial, sans-serif" font-size="24" text-anchor="middle">${subtitle}</text>
      <text x="50%" y="72%" fill="#18d58c" font-family="Segoe UI, Arial, sans-serif" font-size="20" text-anchor="middle">Espacio para imagen manual</text>
    </svg>`;

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
};

const getProductImage = (product) => product.image?.trim() || createPlaceholderImage(product.name, product.zone);

const formatCurrency = (value, plus = false) => `C$${value}${plus ? "+" : ""}`;

const isValidPrice = (value) => Number.isFinite(value) && value > 0;

const escapeSvgText = (value) =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&apos;");

const getAvailablePrices = (prices) =>
  [
    { label: "Acero quirurgico", value: prices?.steel, plus: false },
    { label: "Acero de lujo", value: prices?.luxurySteel, plus: false },
    { label: "Titanio", value: prices?.titanium, plus: true },
  ].filter((entry) => isValidPrice(entry.value));

const getPreviewPrice = (prices) => {
  const availablePrices = getAvailablePrices(prices);

  if (availablePrices.length === 0) {
    return "Precio no disponible";
  }

  const min = availablePrices.reduce((lowest, entry) => Math.min(lowest, entry.value), availablePrices[0].value);
  return availablePrices.length === 1 ? formatCurrency(min) : `Desde ${formatCurrency(min)}`;
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
    description: "Detalle pequeno con gran personalidad.",
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
    description: "Un clasico versatil con presencia sutil.",
    prices: { steel: 450, titanium: 750 },
  },

  {
    name: "Ceja",
    zone: "ceja",
    preview: "black",
    image: "",
    description: "Toque urbano para una imagen mas atrevida.",
    prices: { steel: 450, luxurySteel: 650, titanium: 750 },
  },
  {
    name: "Bridge",
    zone: "nariz",
    preview: "emerald",
    image: "",
    description: "Diseno frontal que destaca con fuerza visual.",
    prices: { steel: 550, titanium: 850 },
  },
  {
    name: "Lengua",
    zone: "boca",
    preview: "white",
    image: "",
    description: "Pieza audaz para un estilo autentico.",
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
    description: "Doble perforacion para una estetica contundente.",
    prices: { steel: 450, luxurySteel: 650, titanium: 850 },
  },
  {
    name: "Flat",
    zone: "oreja",
    preview: "white",
    image: "",
    description: "Diseno minimalista que combina con todo.",
    prices: { steel: 450, luxurySteel: 550, titanium: 750 },
  },
  {
    name: "Surface",
    zone: "corporal",
    preview: "black",
    image: "",
    description: "Linea limpia para una apariencia futurista.",
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
    name: "Pezon",
    zone: "corporal",
    preview: "white",
    image: "",
    description: "Opciones discretas o bold segun tu estilo.",
    prices: { luxurySteel: 750, titanium: 2200 },
  },
];

const zoneLabels = {
  oreja: "Oreja",
  nariz: "Nariz",
  ceja: "Ceja",
  boca: "Boca",
  corporal: "Corporal",
};

const renderResultsCount = (count) => {
  if (!resultsCount) {
    return;
  }

  resultsCount.textContent =
    count === 0 ? "No se encontraron perforaciones con ese filtro." : `${count} perforaciones disponibles.`;
};

const renderCatalog = (items) => {
  if (!catalogGrid) {
    return;
  }

  const fragment = document.createDocumentFragment();

  items.forEach((product) => {
    const card = document.createElement("article");
    card.className = "product-card";
    card.setAttribute("role", "button");
    card.setAttribute("tabindex", "0");
    card.setAttribute("aria-label", `Ver detalle de ${product.name} en zona ${zoneLabels[product.zone]}`);
    card.dataset.product = product.name;

    const preview = document.createElement("div");
    preview.className = `product-preview ${product.preview}`;

    const previewImage = document.createElement("img");
    previewImage.className = "product-image";
    previewImage.src = getProductImage(product);
    previewImage.alt = product.name;
    previewImage.decoding = "async";
    previewImage.loading = "lazy";

    preview.appendChild(previewImage);

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

const getFilteredProducts = () => {
  const query = (searchInput?.value || "").trim().toLowerCase();
  const selectedZone = zoneFilter?.value || "all";

  return products.filter((product) => {
    const matchZone = selectedZone === "all" || product.zone === selectedZone;
    if (!matchZone) {
      return false;
    }

    if (!query) {
      return true;
    }

    const searchableText = `${product.name} ${product.description} ${zoneLabels[product.zone]}`.toLowerCase();
    return searchableText.includes(query);
  });
};

const applyFilters = () => {
  renderCatalog(getFilteredProducts());
};

window.addEventListener("load", () => {
  applyFilters();
});

const openDetail = (product) => {
  if (!product) {
    return;
  }

  const availablePrices = getAvailablePrices(product.prices);

  detailTitle.textContent = product.name;
  detailDescription.textContent = product.description;
  detailZone.textContent = `Zona: ${zoneLabels[product.zone]}`;

  if (detailImage) {
    detailImage.src = getProductImage(product);
    detailImage.alt = `Imagen de ${product.name}`;
  }

  const whatsappMessage = `Hola, quisiera mas informacion sobre ${product.name} (${zoneLabels[product.zone]}).`;
  const whatsappHref = `https://wa.me/${whatsappPhoneNumber}?text=${encodeURIComponent(whatsappMessage)}`;

  if (whatsappTextLink) {
    whatsappTextLink.href = whatsappHref;
  }

  if (whatsappFloatLink) {
    whatsappFloatLink.href = whatsappHref;
  }

  const hamburgerMenu = document.getElementById("hamburgerMenu");
  const hamburgerToggle = document.getElementById("hamburgerToggle");

  hamburgerMenu?.classList.remove("active");
  document.body.classList.remove("hamburger-open");
  hamburgerToggle?.setAttribute("aria-expanded", "false");

  const priceRows = [
    { element: priceSteel, label: "Acero quirurgico", price: product.prices.steel, plus: false },
    { element: priceLuxurySteel, label: "Acero de lujo", price: product.prices.luxurySteel, plus: false },
    { element: priceTitanium, label: "Titanio", price: product.prices.titanium, plus: true },
  ];

  priceRows.forEach((row) => {
    const listItem = row.element.closest("li");
    if (!listItem) {
      return;
    }

    if (isValidPrice(row.price)) {
      row.element.textContent = formatCurrency(row.price, row.plus);
      listItem.style.display = "list-item";
    } else {
      listItem.style.display = "none";
    }
  });

  if (availablePrices.length === 0) {
    detailDescription.textContent = `${product.description} No hay precios disponibles para mostrar.`;
  }

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
  if (!card) {
    return null;
  }

  return products.find((item) => item.name === card.dataset.product) || null;
};

catalogGrid?.addEventListener("click", (event) => {
  const product = getProductByCard(event.target);
  if (product) {
    openDetail(product);
  }
});

catalogGrid?.addEventListener("keydown", (event) => {
  if (event.key !== "Enter" && event.key !== " ") {
    return;
  }

  const product = getProductByCard(event.target);
  if (!product) {
    return;
  }

  event.preventDefault();
  openDetail(product);
});

searchInput?.addEventListener("input", applyFilters);
zoneFilter?.addEventListener("change", applyFilters);

detailClose?.addEventListener("click", closeDetail);

productDetail?.addEventListener("click", (event) => {
  if (event.target === productDetail) {
    closeDetail();
  }
});

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && productDetail?.classList.contains("show")) {
    closeDetail();
  }
});

const initNav = () => {
  window.setupHamburgerNavigation?.();
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initNav);
} else {
  initNav();
}