import { useState } from 'react';
import { Link } from 'react-router-dom';
import { products } from '../products';

const contacts = [
  { icon: 'phone', label: '+90 (212) 000 00 00', href: 'tel:+902120000000' },
  { icon: 'mail', label: 'merhaba@nature.example', href: 'mailto:merhaba@nature.example' },
  { icon: 'clock', label: 'Pzt – Cmt, 09:00 – 18:00' },
];

const socials = [
  { icon: 'instagram', label: 'Instagram', href: 'https://www.instagram.com/' },
  { icon: 'x', label: 'X', href: 'https://x.com/' },
  { icon: 'facebook', label: 'Facebook', href: 'https://www.facebook.com/' },
  { icon: 'youtube', label: 'YouTube', href: 'https://www.youtube.com/' },
];

const columns = [
  {
    title: 'Hızlı bağlantılar',
    links: [
      { to: '/', label: 'Ana sayfa' },
      { to: '/deneme', label: 'Fidanlar' },
      { to: '/bitki-bakimi', label: 'Bitki bakımı' },
      { to: '/bagis', label: 'Fidan bağışla' },
      { to: { pathname: '/', hash: 'hakkinda' }, label: 'Hakkında' },
    ],
  },
  {
    title: 'Fidanlarımız',
    links: products.map((product) => ({ to: `/fidanlar/${product.slug}`, label: product.name })),
  },
  {
    title: 'Hesabım',
    links: [
      { to: '/giris', label: 'Giriş yap' },
      { to: '/kayit', label: 'Kayıt ol' },
      { to: '/form', label: 'Form' },
    ],
  },
];

const payments = ['VISA', 'Mastercard', 'troy', 'Apple Pay'];

const iconPaths = {
  phone: <><rect x="7" y="2.5" width="10" height="19" rx="2" /><path d="M11 18.5h2" /></>,
  mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3.5 6 8.5 7 8.5-7" /></>,
  clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
  instagram: <><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" /></>,
  x: <path d="M4 4l16 16M20 4 4 20" />,
  facebook: <path d="M14 8h3V4h-3a4 4 0 0 0-4 4v3H7v4h3v6h4v-6h3l1-4h-4V8.5a.5.5 0 0 1 .5-.5Z" />,
  youtube: <><rect x="2.5" y="5.5" width="19" height="13" rx="4" /><path d="m10 9.5 5 2.5-5 2.5Z" fill="currentColor" /></>,
};

function Icon({ name, className = 'h-5 w-5' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className}>
      {iconPaths[name]}
    </svg>
  );
}

function Newsletter() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    setSent(true);
    setEmail('');
  }

  return (
    <div className="text-center lg:text-left">
      <h2 className="text-3xl font-semibold leading-tight text-white md:text-4xl">İlk siparişine<br />%10 indirim</h2>
      <p className="mt-3 text-sm text-[#b9c6ad]">Bültene kaydol, kampanyalardan ilk sen haberdar ol.</p>
      {sent ? (
        <p role="status" className="mt-6 rounded-full bg-[#d8e5b4] px-6 py-3 text-sm font-semibold text-[#294936]">Teşekkürler! Bültene kaydoldun. 🌱</p>
      ) : (
        <form onSubmit={handleSubmit} className="mt-6 flex rounded-full border border-white/30 p-1 focus-within:border-[#d8e5b4]">
          <label htmlFor="newsletter-email" className="sr-only">E-posta adresin</label>
          <input
            id="newsletter-email"
            type="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="E-posta adresin"
            className="min-w-0 flex-1 bg-transparent px-5 text-sm text-white outline-none placeholder:text-[#b9c6ad]"
          />
          <button type="submit" className="shrink-0 rounded-full bg-[#d8e5b4] px-5 py-2.5 text-sm font-semibold text-[#294936] transition hover:bg-white">Kaydol</button>
        </form>
      )}
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="mt-16 bg-[#1c3326] text-[#dfe6d6]">
      <div className="border-b border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-8 lg:flex-row lg:items-center lg:justify-between">
          <Link to="/" className="text-2xl font-bold tracking-tight text-white">Nature <span className="text-[#b6c78a]">✳</span></Link>
          <ul className="flex flex-col gap-4 text-sm md:flex-row md:gap-8">
            {contacts.map((contact) => (
              <li key={contact.icon} className="flex items-center gap-2">
                <Icon name={contact.icon} className="h-5 w-5 text-[#b6c78a]" />
                {contact.href
                  ? <a href={contact.href} className="transition hover:text-white hover:underline">{contact.label}</a>
                  : <span>{contact.label}</span>}
              </li>
            ))}
          </ul>
          <ul className="flex gap-3">
            {socials.map((social) => (
              <li key={social.icon}>
                <a href={social.href} target="_blank" rel="noreferrer" aria-label={social.label} className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white transition hover:border-[#d8e5b4] hover:bg-[#d8e5b4] hover:text-[#294936]">
                  <Icon name={social.icon} className="h-[18px] w-[18px]" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-14 lg:grid-cols-[1fr_auto_22rem]">
        <nav aria-label="Alt menü" className="grid grid-cols-2 gap-10 sm:grid-cols-3">
          {columns.map((column) => (
            <div key={column.title}>
              <h3 className="mb-4 text-lg font-semibold text-white">{column.title}</h3>
              <ul className="space-y-2.5 text-sm text-[#b9c6ad]">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link to={link.to} className="transition hover:text-white">{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
        <div aria-hidden="true" className="hidden w-px bg-white/10 lg:block" />
        <Newsletter />
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-5 px-6 py-6 text-sm text-[#b9c6ad] md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} Nature. Tüm hakları saklıdır.</p>
          <ul aria-label="Ödeme yöntemleri" className="flex flex-wrap gap-2">
            {payments.map((payment) => (
              <li key={payment} className="rounded-md border border-white/30 px-3 py-1 text-xs font-bold text-white">{payment}</li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
