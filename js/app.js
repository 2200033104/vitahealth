const PRODUCTS = [
  {
    id: "p1",
    name: "VitaDaily Multivitamin for Men",
    brand: "VitaBasics",
    category: "vitamins",
    price: 799,
    oldPrice: 999,
    rating: 4.5,
    reviews: 1200,
    tag: "Bestseller",
    tagClass: "",
    tabs: ["all", "bestsellers", "immunity"],
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "p2",
    name: "C-Glow Vitamin C Face Serum",
    brand: "Leaf & Glow",
    category: "skincare",
    price: 699,
    oldPrice: 899,
    rating: 4.5,
    reviews: 856,
    tag: "20% OFF",
    tagClass: "sale",
    tabs: ["all", "skin"],
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "p3",
    name: "ForgeWhey Protein Isolate",
    brand: "ForgeFit",
    category: "fitness",
    price: 2999,
    oldPrice: null,
    rating: 4.7,
    reviews: 2100,
    tag: "New",
    tagClass: "new",
    tabs: ["all", "new", "weight"],
    image: "https://images.unsplash.com/photo-1593095948071-474c5cc2989d?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "p4",
    name: "PlantFuel Pea Protein",
    brand: "GreenPulse",
    category: "fitness",
    price: 1299,
    oldPrice: 1499,
    rating: 4.4,
    reviews: 620,
    tag: "15% OFF",
    tagClass: "sale",
    tabs: ["all", "weight"],
    image: "https://images.unsplash.com/photo-1579722821273-0f6c7d44362f?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "p5",
    name: "HairRestore Growth Serum",
    brand: "Minimalist Lab",
    category: "hair",
    price: 899,
    oldPrice: null,
    rating: 4.3,
    reviews: 410,
    tag: "Trending",
    tagClass: "",
    tabs: ["all", "hair", "trending"],
    image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "p6",
    name: "ImmuneLift Daily Booster",
    brand: "Himalaya Grove",
    category: "vitamins",
    price: 499,
    oldPrice: 699,
    rating: 4.6,
    reviews: 980,
    tag: "",
    tabs: ["all", "immunity", "bestsellers"],
    image: "https://images.unsplash.com/photo-1550572017-edd951b55104?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "p7",
    name: "Gentle Daily Face Cleanser",
    brand: "DermaLeaf",
    category: "skincare",
    price: 649,
    oldPrice: null,
    rating: 4.5,
    reviews: 1400,
    tag: "",
    tabs: ["all", "skin"],
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "p8",
    name: "Sunrise Whole Grain Oats",
    brand: "Harvest Bowl",
    category: "foods",
    price: 239,
    oldPrice: null,
    rating: 4.4,
    reviews: 720,
    tag: "",
    tabs: ["all", "weight"],
    image: "https://images.unsplash.com/photo-1517673132405-a56a62b18be5?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "p9",
    name: "DewDrop Green Tea Moisturizer",
    brand: "Plum Grove",
    category: "skincare",
    price: 575,
    oldPrice: 699,
    rating: 4.3,
    reviews: 540,
    tag: "",
    tabs: ["all", "skin"],
    image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "p10",
    name: "PulseCheck Home Monitor",
    brand: "CareKit",
    category: "home",
    price: 1499,
    oldPrice: null,
    rating: 4.6,
    reviews: 330,
    tag: "",
    tabs: ["all", "new"],
    image: "https://images.unsplash.com/photo-1581595220892-bca174dab8d2?auto=format&fit=crop&w=600&q=80"
  }
];

function money(n) {
  return "₹" + n.toLocaleString("en-IN");
}

function getCart() {
  try {
    return JSON.parse(localStorage.getItem("vh-cart") || "[]");
  } catch {
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem("vh-cart", JSON.stringify(cart));
  updateCartCount();
}

function addToCart(id) {
  const product = PRODUCTS.find((p) => p.id === id);
  if (!product) return;
  const cart = getCart();
  const existing = cart.find((item) => item.id === id);
  if (existing) existing.qty += 1;
  else cart.push({ id, qty: 1, name: product.name, price: product.price });
  saveCart(cart);
  showToast(product.name + " added to cart");
}

function updateCartCount() {
  const count = getCart().reduce((sum, item) => sum + item.qty, 0);
  document.querySelectorAll("[data-cart-count]").forEach((el) => {
    el.textContent = count;
    el.style.display = count ? "grid" : "none";
  });
}

function showToast(message) {
  let toast = document.querySelector(".toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.className = "toast";
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.style.display = "block";
  setTimeout(() => {
    toast.style.display = "none";
  }, 2200);
}

function productCard(product) {
  const tag = product.tag
    ? `<span class="tag ${product.tagClass || ""}">${product.tag}</span>`
    : "";
  const old = product.oldPrice ? `<s>${money(product.oldPrice)}</s>` : "";
  return `
    <article class="product-card">
      <div class="thumb">${tag}<img src="${product.image}" alt="${product.name}"></div>
      <h4>${product.name}</h4>
      <div class="meta">${product.brand}</div>
      <div class="rating">★ ${product.rating} (${product.reviews.toLocaleString("en-IN")} reviews)</div>
      <div class="price">${money(product.price)} ${old}</div>
      <button class="btn btn-primary btn-full" style="margin-top:10px" onclick="addToCart('${product.id}')">Add to Cart</button>
    </article>
  `;
}

document.addEventListener("DOMContentLoaded", updateCartCount);
