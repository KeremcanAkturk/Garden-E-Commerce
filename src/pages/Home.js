import { useState } from 'react';
import { Link } from 'react-router-dom';
import Counter from '../components/Counter';
import LessonCard from '../components/LessonCard';

const lessons = [
  { number: '01', title: 'Küçük parçalar, büyük sayfalar.', topic: 'Bileşenler', description: 'Navbar, kartlar ve sayaç ayrı dosyalarda. Birini değiştir, sayfanın nasıl yenilendiğini gör.', file: 'components/Navbar.js' },
  { number: '02', title: 'Aynı yapı, farklı içerik.', topic: 'Props', description: 'Bu üç kart aynı bileşeni kullanıyor. Başlık ve açıklamalar, props ile dışarıdan geliyor.', file: 'components/LessonCard.js' },
  { number: '03', title: 'Bir tıkla, bir şey değişsin.', topic: 'Redux', description: 'Artı düğmesi bir action gönderir. Reducer sayıyı bir artırır ve sayaç yeni değeri gösterir.', file: 'counterSlice.js' },
  { number: '04', title: 'Neden olmuyor ki ?.', topic: 'Garip', description: 'İşler Garip Bir Hal Alıyor', file: 'components/LessonCard.js' },
];

const photos = [
  { src: '/fotograf.jpg', alt: 'Birinci Fotoğraf' },
  { src: '/fotograf2.jpg', alt: 'İkinci Fotoğraf' },
  { src: '/fotograf3.jpg', alt: 'Üçüncü Fotoğraf' },
  { src: '/fotograf4.jpg', alt: 'Dördüncü Fotoğraf' },
];

export default function Home() {
  const [name, setName] = useState('');

  return (
    <main className="mx-auto max-w-6xl px-6">
      <section id="baslangic" className="grid items-center gap-12 py-16 md:grid-cols-2 md:py-24">
        <div>
          <p className="mb-9 text-xs font-bold uppercase tracking-[0.2em] text-[#637749]">KÜÇÜK ADIMLAR / YENİ FİKİRLER</p>
          <h1 className="text-5xl font-semibold leading-[1.1] tracking-tight md:text-6xl">Doğayı Koru .<br />Doğayı Sev.<br /><span className="text-[#6d813f]">Doğa.</span></h1>
          <p className="mt-6 max-w-md text-base leading-7 text-[#667166]">Burası senin küçük deneme alanın. React ile parçaları birleştir, Tailwind ile kendi tarzını ekle.</p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a href="#kesfet" className="inline-flex items-center gap-6 rounded-full bg-[#294936] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#3d6349]">Keşfetmeye başla <span aria-hidden="true">↗</span></a>
            <Link to="/bagis" className="inline-flex items-center gap-2 rounded-full bg-[#d8e5b4] px-6 py-3 text-sm font-semibold text-[#294936] transition hover:bg-[#c5d5a7]">Fidan bağışla <span aria-hidden="true">🌱</span></Link>
          </div>
          <p className="mt-5 text-xs text-[#788174]">Mükemmel olmak zorunda değil. Başlaman yeterli.</p>
        </div>
        <div className="relative rounded-[2rem] bg-[#e9eddd] p-7 md:p-10">
          <div className="mb-10 flex justify-between text-xs font-semibold text-[#637749]"><span>DENEME ALANI</span><span>● CANLI ÖRNEK</span></div>
          <div className="mb-8 flex h-28 items-end justify-center gap-3" aria-hidden="true">
            <div className="h-16 w-16 rounded-t-full bg-[#b6c78a]" />
            <div className="h-28 w-16 rounded-t-full bg-[#7c9653]" />
            <div className="h-20 w-16 rounded-t-full bg-[#38563d]" />
          </div>
          <label htmlFor="name" className="mb-2 block text-sm font-semibold">Tanışalım mı?</label>
          <input id="name" value={name} onChange={(event) => setName(event.target.value)} placeholder="Adını yaz…" maxLength={40} className="w-full rounded-xl border border-[#ced5be] bg-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#7c9653]" />
          <p aria-live="polite" className="mt-4 text-sm">{name.trim() ? `Merhaba ${name.trim()}, iyi ki geldin!` : 'Merhaba, geleceğin geliştiricisi!'} <span aria-hidden="true">✦</span></p>
        </div>
      </section>

      <section id="kesfet" className="py-12">
        <h2 className="mb-12 text-6xl font-semibold">Fotoğraf köşem</h2>
        <div className="grid grid-cols-2 gap-4">
          {photos.map((photo) => (
            <img key={photo.src} src={photo.src} alt={photo.alt} className="h-60 w-full rounded object-cover" />
          ))}
        </div>
      </section>

      <section className="py-12">
        <h2 className="mb-6 text-3xl font-semibold">Temeller</h2>
        <div className="grid gap-5 md:grid-cols-4">
          {lessons.map((lesson) => (
            <LessonCard key={lesson.number} {...lesson} />
          ))}
        </div>
      </section>

      <Counter />

      <section id="hakkinda" className="py-14">
        <h2 className="mb-3 text-xl font-semibold">Senin elinden çıksın.</h2>
        <p className="max-w-xl text-sm leading-7 text-[#667166]">İlk denemen: ana başlığı değiştir. Sonra bir kart ekle, butonun rengini seç veya sayacın artış miktarını değiştir. Her küçük değişiklik yeni bir şey öğretir.</p>
      </section>
    </main>
  );
}
