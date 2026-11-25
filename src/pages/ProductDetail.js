import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import ProductImage from '../components/ProductImage';
import { findProductBySlug, services } from '../products';
import { addToCart, selectCurrentEmail } from '../store';

const careLabels = [['sun', 'Işık'], ['water', 'Sulama'], ['season', 'Dikim zamanı'], ['height', 'Yetişkin boyu']];

export default function ProductDetail() {
  const { slug } = useParams();
  const product = findProductBySlug(slug);

  useEffect(() => {
    if (!product) return;
    const previous = document.title;
    document.title = `${product.name} · Nature`;
    return () => { document.title = previous; };
  }, [product]);

  if (!product) {
    return (
      <main className="mx-auto max-w-6xl px-6 py-24 text-center">
        <h1 className="text-3xl font-semibold">Fidan bulunamadı</h1>
        <p className="mt-3 text-[#667166]">Aradığın fidan kaldırılmış ya da adres yanlış yazılmış olabilir.</p>
        <Link to="/deneme" className="mt-8 inline-block rounded-full bg-[#294936] px-6 py-3 text-sm font-semibold text-white hover:bg-[#3d6349]">Tüm fidanlara dön</Link>
      </main>
    );
  }

  return <ProductView key={slug} product={product} />;
}

function ProductView({ product }) {
  const currentEmail = useSelector(selectCurrentEmail);
  const dispatch = useDispatch();
  const [sizeSlug, setSizeSlug] = useState(product.sizes[0].slug);
  const [quantity, setQuantity] = useState(1);
  const [notice, setNotice] = useState(null);

  const [serviceSlugs, setServiceSlugs] = useState([]);

  const size = product.sizes.find((option) => option.slug === sizeSlug);
  const chosenServices = services.filter((service) => serviceSlugs.includes(service.slug));
  const unitPrice = size.price + chosenServices.reduce((sum, service) => sum + service.price, 0);

  function chooseSize(slug) {
    setSizeSlug(slug);
    setNotice(null);
  }

  function toggleService(slug) {
    setServiceSlugs(serviceSlugs.includes(slug) ? serviceSlugs.filter((s) => s !== slug) : [...serviceSlugs, slug]);
    setNotice(null);
  }

  function handleAdd() {
    const id = [`${product.slug}/${size.slug}`, ...chosenServices.map((service) => service.slug)].join('+');
    const item = {
      id, slug: product.slug, name: product.name, size: size.label, price: unitPrice,
      services: chosenServices.map((service) => service.label),
    };
    setNotice(dispatch(addToCart(item, quantity)) ? 'added' : 'login');
  }

  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      <nav aria-label="Konum" className="mb-8 text-sm text-[#667166]">
        <Link to="/deneme" className="hover:text-[#294936] hover:underline">Fidanlar</Link>
        <span aria-hidden="true" className="mx-2">/</span>
        <span aria-current="page" className="font-semibold text-[#294936]">{product.name}</span>
      </nav>

      <div className="grid items-start gap-10 md:grid-cols-2 lg:gap-16">
        <div className="overflow-hidden rounded-[2rem] border border-[#dde2d5] bg-[#e9eddd] md:sticky md:top-6">
          <ProductImage product={product} className="aspect-square w-full" />
        </div>

        <div>
          <span className="rounded-full bg-[#e9eddd] px-3 py-1 text-xs font-semibold text-[#637749]">{product.type}</span>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">{product.name}</h1>
          <p className="mt-3 text-lg text-[#667166]">{product.summary}</p>
          <p aria-live="polite" className="mt-6 text-3xl font-semibold text-[#294936]">{unitPrice * quantity} TL
            {quantity > 1 && <span className="ml-2 text-sm font-normal text-[#667166]">({unitPrice} TL × {quantity})</span>}
          </p>

          <fieldset className="mt-8">
            <legend className="mb-3 text-sm font-semibold">Boy seç</legend>
            <div className="flex flex-wrap gap-3">
              {product.sizes.map((option) => (
                <label key={option.slug} className={`cursor-pointer rounded-xl border px-4 py-3 text-sm transition has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-[#7c9653] ${option.slug === sizeSlug ? 'border-[#294936] bg-[#294936] text-white' : 'border-[#ced5be] bg-white hover:border-[#7c9653]'}`}>
                  <input type="radio" name="size" value={option.slug} checked={option.slug === sizeSlug} onChange={() => chooseSize(option.slug)} className="sr-only" />
                  <span className="block font-semibold">{option.label}</span>
                  <span className={option.slug === sizeSlug ? 'text-[#d8e5b4]' : 'text-[#637749]'}>{option.price} TL</span>
                </label>
              ))}
            </div>
          </fieldset>

          <fieldset className="mt-8">
            <legend className="mb-3 text-sm font-semibold">İsteğe bağlı ek hizmetler</legend>
            <div className="flex flex-col gap-3">
              {services.map((service) => {
                const checked = serviceSlugs.includes(service.slug);
                return (
                  <label key={service.slug} className={`flex cursor-pointer items-center gap-4 rounded-xl border px-4 py-3 transition has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-[#7c9653] ${checked ? 'border-[#294936] bg-[#f1f4e9]' : 'border-[#ced5be] bg-white hover:border-[#7c9653]'}`}>
                    <input type="checkbox" checked={checked} onChange={() => toggleService(service.slug)} className="h-5 w-5 shrink-0 accent-[#294936]" />
                    <span className="flex-1">
                      <span className="block font-semibold">{service.label}</span>
                      <span className="block text-sm text-[#667166]">{service.description}</span>
                    </span>
                    <span className="shrink-0 text-sm font-semibold text-[#294936]">+{service.price} TL</span>
                  </label>
                );
              })}
            </div>
          </fieldset>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <div className="flex items-center rounded-full border border-[#ced5be] bg-white">
              <button type="button" aria-label="Adedi azalt" onClick={() => setQuantity(Math.max(1, quantity - 1))} disabled={quantity === 1} className="h-11 w-11 rounded-full text-lg hover:bg-[#f1f4e9] disabled:opacity-40">−</button>
              <span aria-label="Adet" className="w-8 text-center font-semibold">{quantity}</span>
              <button type="button" aria-label="Adedi artır" onClick={() => setQuantity(Math.min(99, quantity + 1))} className="h-11 w-11 rounded-full text-lg hover:bg-[#f1f4e9]">+</button>
            </div>
            <button type="button" onClick={handleAdd} className="flex-1 rounded-full bg-[#294936] px-8 py-3 font-semibold text-white transition hover:bg-[#3d6349] sm:flex-none">
              Sepete ekle
            </button>
          </div>

          {notice === 'added' && (
            <p role="status" className="mt-4 rounded-xl bg-[#d8e5b4] px-4 py-3 text-sm text-[#294936]">
              {quantity} adet {product.name} ({size.label}{chosenServices.map((service) => `, ${service.label}`).join('')}) sepetine eklendi. Üst menüdeki <strong>Sepet</strong> düğmesinden görebilirsin.
            </p>
          )}
          {notice === 'login' && !currentEmail && (
            <div role="alert" className="mt-4 rounded-xl border border-[#ced5be] bg-white px-4 py-3 text-sm text-[#294936]">
              Sepete fidan eklemek için önce{' '}
              <Link to="/giris" className="font-semibold underline">giriş yap</Link>
              {' '}veya{' '}
              <Link to="/kayit" className="font-semibold underline">kayıt ol</Link>.
            </div>
          )}

          <section className="mt-10 border-t border-[#dde2d5] pt-8">
            <h2 className="mb-3 text-lg font-semibold">Bu fidan hakkında</h2>
            <p className="leading-7 text-[#4f5b50]">{product.description}</p>
            <dl className="mt-6 grid grid-cols-2 gap-3">
              {careLabels.map(([key, label]) => (
                <div key={key} className="rounded-xl bg-[#f1f4e9] p-4">
                  <dt className="text-xs font-semibold uppercase tracking-wide text-[#637749]">{label}</dt>
                  <dd className="mt-1 font-semibold">{product.care[key]}</dd>
                </div>
              ))}
            </dl>
          </section>
        </div>
      </div>
    </main>
  );
}
