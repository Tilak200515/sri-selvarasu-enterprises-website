const WHATSAPP_NUMBER = "919449425460"; // country code + number

const P = [
  ["Plain Poly Covers","Durable polyethylene covers for protecting, wrapping and packing a wide range of products.","packing-covers.jpg","Poly covers"],
  ["Printed Poly Covers","Custom printed covers for product identification and branding.","printed-covers.jpg","Poly covers"],
  ["Poly Rolls","Flexible poly roll material for cutting and packing to your application.","polythene-rolls.jpg","Poly covers"],
  ["Stretch Film","Wrapping and securing goods during storage, handling and transport.","stretch-films.jpg","Poly covers"],
  ["Polythene Rolls","Quality rolls for industrial packing, wrapping and custom requirements.","polythene-rolls.jpg","Polythene rolls"],
  ["Printed Rolls","Customised printed rolls for branding and professional packaging.","printed-rolls.jpg","Polythene rolls"],
  ["Printed Packaging Covers","Printed covers made to your product, size and design.","printed-covers.jpg","Polythene rolls"],
  ["Stretch Films","Reliable stretch films for storage, handling and transportation.","stretch-films.jpg","Polythene rolls"],
  ["Bubble Rolls","Protective bubble rolls that cushion products in packing and transport.","bubble-rolls.jpg","Polythene rolls"],
  ["Packing Covers","Practical covers for industrial and commercial packaging.","packing-covers.jpg","Polythene rolls"],
  ["Customized Packaging","Packaging developed around your dimensions, printing and use.","custom-packaging.jpg","Polythene rolls"],
  ["LDPE Covers","Clear, flexible LDPE covers in many sizes for packing, storage and dust protection.","ldpe-covers.jpg","Poly covers"],
  ["Industrial Liner Bags","Heavy-duty liner bags for lining cartons, drums and bulk packing.","liner-bags.jpg","Poly covers"]
];
const $ = s => document.querySelector(s);
const card = p => `<article class="card" id="p-${p[0].replace(/\W+/g,"-")}"><img src="assets/${p[2]}" alt="${p[0]}" loading="lazy"><div><span class="tag">Custom sizes</span><h3>${p[0]}</h3><p>${p[1]}</p><a href="#contact" data-enq="${p[0]}">Enquire</a></div></article>`;

$("#year").textContent = new Date().getFullYear();
$("#popular").innerHTML = ["LDPE Covers","Industrial Liner Bags","Printed Rolls","Bubble Rolls"].map(n => card(P.find(p => p[0] === n))).join("");

function renderGroups(q = "") {
  q = q.trim().toLowerCase();
  const items = P.filter(p => (p[0] + p[1]).toLowerCase().includes(q));
  $("#groups").innerHTML = items.length ? `<div class="grid">${items.map(card).join("")}</div>` : "";
  $("#empty").hidden = items.length > 0;
}

// Page switching: each nav link opens its own page, always from the top
const pages = ["home","about","products","contact"];
function route() {
  const id = pages.includes(location.hash.slice(1)) ? location.hash.slice(1) : "home";
  document.querySelectorAll(".view").forEach(v => v.classList.toggle("on", v.id === id));
  document.querySelectorAll("#nav a").forEach(a => a.classList.toggle("active", a.dataset.page === id));
  window.scrollTo({ top: 0, behavior: "instant" });
  $("#nav").classList.remove("open");
}
addEventListener("hashchange", route);

document.addEventListener("click", e => {
  const a = e.target.closest("[data-enq],#nav a[data-page=products]");
  if (!a) return;
  if (a.dataset.enq) { $("#product").value = a.dataset.enq; return; }
  $("#search").value = ""; renderGroups();   // Products always shows everything
});
$("#search").addEventListener("input", e => {
  renderGroups(e.target.value);
  if (location.hash !== "#products") location.hash = "#products";
});

function sendWhatsApp(ev) {
  ev.preventDefault();
  const v = id => $("#" + id).value;
  const text = `Hello Polypack Industries,\nName: ${v("name")}\nPhone: ${v("phone")}\nProduct: ${v("product")}\nRequirement: ${v("message")}`;
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`, "_blank");
}

renderGroups();
route();
