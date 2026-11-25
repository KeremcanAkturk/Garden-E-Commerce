import { useState } from 'react';
import { Link } from 'react-router-dom';
import { products, startingPrice } from '../products';
import ProductImage from './ProductImage';

const types = ['Tümü', ...new Set(products.map((product) => product.type))];

function ProductCard({ product }) {
  return (
    <Link
      to={`/fidanlar/${product.slug}`}
      className="group block overflow-hidden rounded-2xl border border-[#dde2d5] bg-white transition hover:-translate-y-0.5 hover:shadow-md"
    >
      <ProductImage product={product} className="aspect-[4/3] w-full transition duration-300 group-hover:scale-[1.03]" />
      <div className="p-5">
        <span className="rounded-full bg-[#f1f4e9] px-3 py-1 text-xs font-medium text-[#637749]">{product.type}</span>
        <h3 className="mt-3 text-lg font-semibold">{product.name}</h3>
        <p className="mt-1 text-sm text-[#667166]">{product.summary}</p>
        <div className="mt-4 flex items-center justify-between">
          <p className="text-[#637749]"><strong className="text-[#294936]">{startingPrice(product)} TL</strong>{"'den başlayan"}</p>
          <span aria-hidden="true" className="text-sm font-semibold text-[#294936] transition group-hover:translate-x-1">İncele →</span>
        </div>
      </div>
    </Link>
  );
}

function ProductFilter({ search, onSearch, type, onType }) {
  return (
    <div className="mb-6 flex flex-col gap-4 rounded-2xl bg-[#e9eddd] p-5 sm:flex-row sm:items-center">
      <input
        type="search"
        value={search}
        onChange={(event) => onSearch(event.target.value)}
        placeholder="Fidan ara…"
        aria-label="Fidan ara"
        className="w-full rounded-xl border border-[#ced5be] bg-white px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-[#7c9653] sm:max-w-xs"
      />
      <div className="flex flex-wrap gap-2">
        {types.map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => onType(option)}
            aria-pressed={type === option}
            className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${type === option ? 'border-[#294936] bg-[#294936] text-white' : 'border-[#ced5be] bg-white text-[#294936] hover:bg-[#d8e5b4]'}`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function ProductList() {
  const [search, setSearch] = useState('');
  const [type, setType] = useState('Tümü');

  const query = search.trim().toLocaleLowerCase('tr');
  const visibleProducts = products.filter((product) =>
    (type === 'Tümü' || product.type === type)
    && product.name.toLocaleLowerCase('tr').includes(query));

  return (
    <section className="py-12" aria-labelledby="products-title">
      <h2 id="products-title" className="mb-3 text-3xl font-semibold">Fidanlar</h2>
      <p className="mb-6 text-[#667166]">Bir fidanın üstüne tıkla; boyunu seçip sepetine ekleyebilirsin.</p>

      <ProductFilter search={search} onSearch={setSearch} type={type} onType={setType} />

      {visibleProducts.length === 0 ? (
        <p className="text-[#667166]">Aramana uyan fidan bulunamadı.</p>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {visibleProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
}
