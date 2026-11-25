export function slugify(text) {
  const map = { ç: 'c', ğ: 'g', ı: 'i', ö: 'o', ş: 's', ü: 'u' };
  return text
    .toLocaleLowerCase('tr')
    .replace(/[çğıöşü]/g, (letter) => map[letter])
    .replace(/[^a-z0-9]+/g, '-') 
    .replace(/^-+|-+$/g, '');
}
const rawProducts = [
  {
    id: 1,
    name: 'Çam fidanı',
    image:'/fidanlar/camfidani.jpg',
    type: 'İğne yapraklı',
    shape: 'conifer',
    colors: ['#38563d', '#4f7350'],
    summary: 'Dört mevsim yeşil kalan, rüzgâra ve kuraklığa dayanıklı bir ağaç.',
    description: 'Çam, kökleri derine indiği için eğimli arazilerde toprağı tutar. Bahçe kenarına rüzgâr perdesi olarak ya da tek başına dikilebilir. İlk iki yıl düzenli sulama ister, sonrasında kendi başının çaresine bakar.',
    sizes: [
      { label: '30–50 cm', price: 150 },
      { label: '60–80 cm', price: 240 },
      { label: '100–120 cm', price: 390 },
    ],
    care: { sun: 'Tam güneş', water: 'Haftada 1 kez', season: 'Ekim – Mart', height: '15–25 m' },
  },
  {
    id: 2,
    name: 'Meşe fidanı',
    image:'/fidanlar/mesefidani.webp',
    type: 'Yaprak döken',
    shape: 'round',
    colors: ['#5d7a3e', '#7c9653'],
    summary: 'Uzun ömürlü, geniş taçlı ve yüzlerce canlıya yuva olan bir ağaç.',
    description: 'Meşe yavaş büyür ama yüzyıllarca yaşar. Geniş tacı yazın serin bir gölge yapar, palamutları kuşlar ve sincaplar için besindir. Derin ve iyi süzülen toprağı sever.',
    sizes: [
      { label: '30–50 cm', price: 200 },
      { label: '60–80 cm', price: 320 },
      { label: '100–120 cm', price: 520 },
    ],
    care: { sun: 'Tam güneş / yarı gölge', water: 'Haftada 1–2 kez', season: 'Kasım – Mart', height: '20–30 m' },
  },
  {
    id: 3,
    name: 'Zeytin fidanı',
    image:'/fidanlar/zeytinfidani.webp',
    type: 'Meyve veren',
    shape: 'olive',
    colors: ['#7f8f62', '#a3ae82'],
    summary: 'Gümüşi yapraklı, sıcak ve güneşli bahçelerin vazgeçilmezi.',
    description: 'Zeytin kuraklığa çok dayanıklıdır ve doğru bakımla 3–5 yıl içinde meyve vermeye başlar. Saksıda da yetişebilir; kışın sert don olan yerlerde korunaklı bir köşe tercih et.',
    sizes: [
      { label: '40–60 cm', price: 250 },
      { label: '80–100 cm', price: 420 },
      { label: '120–150 cm', price: 690 },
    ],
    care: { sun: 'Tam güneş', water: '10 günde 1 kez', season: 'Mart – Mayıs', height: '4–8 m' },
  },
  {
    id: 4,
    name: 'Mısır',
    image:'/fidanlar/misirfidani.jpg',
    type: 'Meyve veren',
    shape: 'corn',
    colors: ['#6d813f', '#e3b341'],
    summary: 'Hızlı büyüyen, yaz sonunda koçan veren tek yıllık bir bitki.',
    description: 'Mısır ilkbaharda dikilir ve yaz sonuna kadar boy atar. Birbirini tozlayabilmeleri için tek sıra yerine küçük bir öbek halinde dikmek daha iyi sonuç verir.',
    sizes: [
      { label: '10–20 cm', price: 285 },
      { label: '30–40 cm', price: 360 },
    ],
    care: { sun: 'Tam güneş', water: 'Haftada 2–3 kez', season: 'Nisan – Haziran', height: '1,5–2,5 m' },
  },
  {
    id: 5,
    name: 'Elma fidanı',
    image:'/fidanlar/elmafidani.jpg',
    type: 'Meyve veren',
    shape: 'fruit',
    colors: ['#5f8a46', '#c8453b'],
    summary: 'İlkbaharda beyaz çiçek, sonbaharda kıtır kıtır elma.',
    description: 'Elma ağacı soğuk kışları sever; meyve tutması için kışın belli bir süre soğuk görmesi gerekir. Daha iyi verim için yakınına farklı çeşit bir elma daha dikmeni öneririz.',
    sizes: [
      { label: '60–80 cm', price: 500 },
      { label: '100–120 cm', price: 750 },
      { label: '150+ cm', price: 1100 },
    ],
    care: { sun: 'Tam güneş', water: 'Haftada 1–2 kez', season: 'Kasım – Mart', height: '3–6 m' },
  },
  {
    id: 6,
    name: 'Çilek fidanı',
    image:'/fidanlar/cilekfidani.webp',
    type: 'Meyve veren',
    shape: 'strawberry',
    colors: ['#4f7350', '#d9473f'],
    summary: 'Balkonda bile yetişen, ilk yıldan meyve veren tatlı bir bitki.',
    description: 'Çilek saksıda, askılı sepette ya da bahçe yatağında yetişir. Yayılan sürgünleriyle kendini çoğaltır. Meyveler toprağa değmesin diye altına saman sermek çürümeyi önler.',
    sizes: [
      { label: '5’li viyol', price: 1000 },
      { label: '10’lu viyol', price: 1800 },
    ],
    care: { sun: 'Tam güneş / yarı gölge', water: 'Toprak kurudukça', season: 'Mart – Mayıs', height: '20–30 cm' },
  },
];

export const products = rawProducts.map((product) => ({
  ...product,
  slug: slugify(product.name),
  sizes: product.sizes.map((size) => ({ ...size, slug: slugify(size.label) })),
}));

export const findProductBySlug = (slug) => products.find((product) => product.slug === slug);

export const services = [
  {
    slug: 'dikim',
    label: 'Dikim ve yerleştirme',
    description: 'Ekibimiz fidanı diker ve en uygun ışık alan yeri seçer.',
    price: 150,
  },
  {
    slug: 'bakim',
    label: 'Bahçe bakım ziyareti',
    description: 'Dikimden sonra bir kerelik bakım ve budama ziyareti.',
    price: 250,
  },
];

export const startingPrice = (product) => Math.min(...product.sizes.map((size) => size.price));
