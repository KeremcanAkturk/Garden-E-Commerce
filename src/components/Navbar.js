import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import { logout, selectCurrentEmail } from '../store';
import CartDropdown from './CartDropdown';

const sections = [['baslangic', 'Başlangıç'], ['kesfet', 'Keşfet'], ['hakkinda', 'Hakkında']];
const pages = [['/form', 'Form'], ['/deneme', 'Fidanlar'], ['/bitki-bakimi', 'Bakım']];
const accountButton = 'self-start rounded-full bg-[#294936] px-5 py-2 text-sm font-semibold text-white transition hover:bg-[#3d6349]';
const pageLink = ({ isActive }) => `transition hover:text-[#7c9653] ${isActive ? 'font-semibold text-[#6d813f]' : ''}`;

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const currentEmail = useSelector(selectCurrentEmail);
  const dispatch = useDispatch();
  const closeMenu = () => setMenuOpen(false);

  function handleLogout() {
    dispatch(logout());
    closeMenu();
  }

  return (
    <header className="border-b border-[#dde2d5]">
      <nav aria-label="Ana menü" className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-5">
        <Link to="/" onClick={closeMenu} className="text-2xl font-bold tracking-tight">Nature <span className="text-[#7c9653]">✳</span></Link>
        <button type="button" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-controls="navigation" className="rounded-lg border border-[#ced5be] px-3 py-2 text-sm lg:hidden">{menuOpen ? 'Kapat' : 'Menü'}</button>
        <div id="navigation" className={`${menuOpen ? 'flex' : 'hidden'} w-full flex-col gap-5 text-sm lg:flex lg:w-auto lg:flex-row lg:items-center lg:gap-6`}>
          {sections.map(([id, label]) => <Link key={id} to={{ pathname: '/', hash: id }} onClick={closeMenu} className="transition hover:text-[#7c9653]">{label}</Link>)}
          {pages.map(([to, label]) => <NavLink key={to} to={to} onClick={closeMenu} className={pageLink}>{label}</NavLink>)}
          <CartDropdown />
          {currentEmail ? (
            <button type="button" onClick={handleLogout} className={accountButton}>Çıkış yap</button>
          ) : (
            <>
              <NavLink to="/giris" onClick={closeMenu} className={pageLink}>Giriş yap</NavLink>
              <Link to="/kayit" onClick={closeMenu} className={accountButton}>Kayıt ol</Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
