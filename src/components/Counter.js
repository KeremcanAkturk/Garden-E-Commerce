import { useDispatch, useSelector } from 'react-redux';
import { decrement, increment, reset, selectCount } from '../counterSlice';

export default function Counter() {
  const count = useSelector(selectCount);
  const dispatch = useDispatch();

  return (
    <section id="dene" className="flex flex-col justify-between gap-8 rounded-2xl bg-[#294936] p-8 text-white md:flex-row md:items-center">
      <div>
        <p className="mb-3 text-xs font-semibold tracking-widest text-[#c5d5a7]">ŞİMDİ SIRA SENDE</p>
        <h2 className="text-2xl font-semibold">Küçük bir etkileşim dene.</h2>
        <p className="mt-3 text-sm text-[#c6d2c6]">Sayacı değiştir. Ana sayfa ve Fidanlar sayfası aynı değeri gösterir.</p>
      </div>
      <div className="text-center">
        <div className="flex items-center justify-center gap-6">
          <button aria-label="Sayacı azalt" onClick={() => dispatch(decrement())} className="h-11 w-11 rounded-full border border-[#73917b] text-xl transition hover:bg-[#3d6349]">−</button>
          <output aria-live="polite" className="min-w-16 text-5xl font-semibold tabular-nums">{count}</output>
          <button aria-label="Sayacı artır" onClick={() => dispatch(increment())} className="h-11 w-11 rounded-full bg-[#d8e5b4] text-xl text-[#294936] transition hover:bg-white">+</button>
        </div>
        <button onClick={() => dispatch(reset())} className="mt-4 text-xs text-[#c6d2c6] underline underline-offset-4 hover:text-white">Başa dön</button>
      </div>
    </section>
  );
}
