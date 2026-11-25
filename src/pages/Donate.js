import { useState } from 'react';

const options = [1, 5, 10];
export default function Donate() {
  const [saplings, setSaplings] = useState(0);

  return (
    <>
      <main className="mx-auto max-w-6xl px-6">
        <section className="grid items-center gap-12 py-16 md:grid-cols-2 md:py-24">
          <div>
            <p className="mb-9 text-xs font-bold uppercase tracking-[0.2em] text-[#637749]">BİR FİDAN / BİR NEFES</p>
            <h1 className="text-5xl font-semibold leading-[1.1] tracking-tight md:text-6xl">Bir fidan bağışla.<br /><span className="text-[#6d813f]">Bir orman büyüsün.</span></h1>
            <p className="mt-6 max-w-md text-base leading-7 text-[#667166]">Bugün dikilen küçük bir fidan, yıllar sonra gölgesiyle, kuşlarıyla ve temiz havasıyla geri döner.</p>
          </div>
          <div className="rounded-[2rem] bg-[#e9eddd] p-7 md:p-10">
            <h2 className="mb-5 text-sm font-semibold">Kaç fidan bağışlamak istersin?</h2>
            <div className="flex flex-wrap gap-3">
              {options.map((option) => (
                <button
                  key={option}
                  onClick={() => setSaplings(option)}
                  aria-pressed={saplings === option}
                  className={`rounded-full border px-6 py-3 text-sm font-semibold transition ${saplings === option ? 'border-[#294936] bg-[#294936] text-white' : 'border-[#ced5be] bg-white text-[#294936] hover:bg-[#d8e5b4]'}`}
                >
                  {option} fidan
                </button>
              ))}
            </div>
            <p aria-live="polite" className="mt-6 text-sm">{saplings > 0 ? `Teşekkürler! ${saplings} fidan bağışladın.` : 'Bir seçenek seç, gerisi kendiliğinden filizlenir.'} <span aria-hidden="true">🌱</span></p>
            <p className="mt-6 text-xs text-[#788174]">Bu bir deneme sayfası; gerçek bir bağış alınmıyor.</p>
          </div>
        </section>
      </main>
    </>
  );
}
