import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductImage from '../components/ProductImage';
import { products } from '../products';

const basics = [
  {
    icon: '💧',
    title: 'Sulama',
    text: 'Az ve sık değil, seyrek ama derin sula. Parmağını 3–4 cm toprağa sok; kuruysa sulama zamanı gelmiştir. En iyi saatler sabah erken ya da akşamüstü.',
  },
  {
    icon: '☀️',
    title: 'Işık',
    text: 'Meyve veren fidanların çoğu günde en az 6 saat doğrudan güneş ister. Yeni dikilen fidanı ilk haftalarda öğle güneşinin en sert saatlerinden koru.',
  },
  {
    icon: '🪴',
    title: 'Toprak ve gübre',
    text: 'Su tutmayan, iyi süzülen toprak kökleri çürümekten korur. Dikim çukuruna biraz kompost karıştır. Gübreyi ilkbaharda ver; sonbaharda verilen gübre dona yakalanacak yeni sürgünler çıkarır.',
  },
  {
    icon: '🍂',
    title: 'Malç',
    text: 'Fidanın dibine 5–8 cm saman, ağaç kabuğu ya da kuru yaprak ser. Nemi korur ve yabani otları bastırır. Malçı gövdeye değdirme, birkaç parmak boşluk bırak.',
  },
  {
    icon: '✂️',
    title: 'Budama',
    text: 'Asıl budama kış sonunda, ağaç uyurken yapılır. Kuru, hastalıklı ve birbirine sürtünen dalları al. Çam gibi iğne yapraklılar çok az budama ister.',
  },
  {
    icon: '🐞',
    title: 'Zararlılar',
    text: 'Haftada bir yaprakların altına bak. Yaprak bitlerini çoğu zaman tazyikli su ya da sabunlu su ile temizleyebilirsin. Uğur böcekleri dostundur, onlara dokunma.',
  },
];

const seasons = [
  { name: 'İlkbahar', color: 'bg-[#d8e5b4]', tasks: ['Gübreleme zamanı', 'Yeni fidanları dik', 'Malçı tazele'] },
  { name: 'Yaz', color: 'bg-[#f3dfa2]', tasks: ['Sulamayı artır', 'Zararlıları kontrol et', 'Meyve yükünü hafiflet'] },
  { name: 'Sonbahar', color: 'bg-[#ecc8a8]', tasks: ['Çoğu fidan için dikim zamanı', 'Dökülen yaprakları topla', 'Gübre verme'] },
  { name: 'Kış', color: 'bg-[#d5e0e3]', tasks: ['Budama yap', 'Genç fidanları dondan koru', 'Sulamayı azalt'] },
];

const careLabels = [['sun', 'Işık'], ['water', 'Sulama'], ['season', 'Dikim zamanı']];

export default function PlantCare() {
  useEffect(() => {
    const previous = document.title;
    document.title = 'Bitki bakımı · Nature';
    return () => { document.title = previous; };
  }, []);

  return (
    <main className="mx-auto max-w-6xl px-6">
      <section className="py-16 md:py-20">
        <p className="mb-6 text-xs font-bold uppercase tracking-[0.2em] text-[#637749]">Bakım rehberi</p>
        <h1 className="max-w-3xl text-5xl font-semibold leading-[1.1] tracking-tight md:text-6xl">Fidanın büyüsün, <span className="text-[#6d813f]">sen de keyfini çıkar.</span></h1>
        <p className="mt-6 max-w-xl text-base leading-7 text-[#667166]">Doğru yere dikilmiş, doğru sulanan bir fidan ilk iki yıldan sonra çoğunlukla kendi başının çaresine bakar. Bu sayfada o ilk yılları kolaylaştıracak temel bilgiler var.</p>
      </section>

      <section aria-labelledby="basics-title" className="py-10">
        <h2 id="basics-title" className="mb-8 text-3xl font-semibold">Temel bakım</h2>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {basics.map((item) => (
            <article key={item.title} className="rounded-2xl border border-[#dde2d5] bg-white p-6">
              <span aria-hidden="true" className="flex h-12 w-12 items-center justify-center rounded-full bg-[#e9eddd] text-2xl">{item.icon}</span>
              <h3 className="mt-5 text-lg font-semibold">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-[#667166]">{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section aria-labelledby="seasons-title" className="py-10">
        <h2 id="seasons-title" className="mb-8 text-3xl font-semibold">Mevsim mevsim yapılacaklar</h2>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {seasons.map((season) => (
            <article key={season.name} className={`rounded-2xl p-6 ${season.color}`}>
              <h3 className="text-xl font-semibold text-[#294936]">{season.name}</h3>
              <ul className="mt-4 space-y-2 text-sm text-[#24362b]">
                {season.tasks.map((task) => (
                  <li key={task} className="flex gap-2"><span aria-hidden="true" className="text-[#637749]">✓</span>{task}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section aria-labelledby="per-plant-title" className="py-10">
        <h2 id="per-plant-title" className="mb-3 text-3xl font-semibold">Fidan fidan bakım</h2>
        <p className="mb-8 text-[#667166]">Her fidanın ihtiyacı biraz farklı. Kartın üstüne tıklayıp fidanın sayfasına gidebilirsin.</p>
        <div className="grid gap-5 md:grid-cols-2">
          {products.map((product) => (
            <Link key={product.id} to={`/fidanlar/${product.slug}`} className="group flex gap-5 rounded-2xl border border-[#dde2d5] bg-white p-4 transition hover:border-[#7c9653] hover:shadow-md">
              <div className="h-28 w-28 shrink-0 overflow-hidden rounded-xl bg-[#e9eddd]">
                <ProductImage product={product} className="h-full w-full" />
              </div>
              <div className="min-w-0">
                <h3 className="font-semibold group-hover:underline">{product.name}</h3>
                <dl className="mt-2 space-y-1 text-sm">
                  {careLabels.map(([key, label]) => (
                    <div key={key} className="flex gap-2">
                      <dt className="text-[#637749]">{label}:</dt>
                      <dd>{product.care[key]}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="my-10 flex flex-col items-start gap-6 rounded-[2rem] bg-[#294936] p-8 text-white md:flex-row md:items-center md:justify-between md:p-12">
        <div>
          <h2 className="text-2xl font-semibold md:text-3xl">Bakımla uğraşmak istemiyor musun?</h2>
          <p className="mt-2 max-w-lg text-[#d8e5b4]">Fidanını alırken "Bahçe bakım ziyareti" hizmetini ekle; ekibimiz gelip bakımını ve budamasını yapsın.</p>
        </div>
        <Link to="/deneme" className="shrink-0 rounded-full bg-[#d8e5b4] px-6 py-3 text-sm font-semibold text-[#294936] transition hover:bg-white">Fidanlara göz at</Link>
      </section>
    </main>
  );
}
