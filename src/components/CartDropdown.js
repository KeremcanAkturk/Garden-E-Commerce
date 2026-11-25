import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { cartCleared, productDecreased, productRemoved, selectCartCount, selectCartItems, selectCartTotal } from '../cartSlice';
import { addToCart } from '../store';

function itemLabel(item) {
  const details = [item.size, ...(item.services ?? [])].filter(Boolean);
  return details.length ? `${item.name} (${details.join(', ')})` : item.name;
}

export default function CartDropdown() {
  const cart = useSelector(selectCartItems);
  const itemCount = useSelector(selectCartCount);
  const total = useSelector(selectCartTotal);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const wrapper = useRef(null);
  const button = useRef(null);
  const { pathname } = useLocation();

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    function handleClick(event) {
      if (!wrapper.current.contains(event.target)) setOpen(false);
    }
    function handleKey(event) {
      if (event.key === 'Escape') {
        setOpen(false);
        button.current.focus(); 
      }
    }
    document.addEventListener('mousedown', handleClick);
    document.addEventListener('keydown', handleKey);
    return () => {
      document.removeEventListener('mousedown', handleClick);
      document.removeEventListener('keydown', handleKey);
    };
  }, [open]);

  return (
    <div ref={wrapper} className="relative">
      <button
        ref={button}
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-controls="cart-panel"
        className="transition hover:text-[#7c9653]"
      >
        Sepet <span className="ml-1 rounded-full bg-[#d8e5b4] px-2 py-0.5 text-xs font-semibold text-[#294936]">{itemCount}</span>
        <span aria-hidden="true" className="ml-1 text-xs">{open ? '▲' : '▼'}</span>
      </button>

      {open && (
        <div id="cart-panel" className="z-40 mt-3 w-full rounded-2xl border border-[#dde2d5] bg-white p-5 shadow-lg lg:absolute lg:right-0 lg:top-full lg:w-80">
          <p className="font-semibold">Sepetim ({itemCount} adet)</p>

          {cart.length === 0 ? (
            <p className="mt-3 text-[#667166]">
              Sepetin boş.{' '}
              <Link to="/deneme" className="font-semibold text-[#294936] underline">Fidanlar sayfasından</Link> fidan ekleyebilirsin.
            </p>
          ) : (
            <>
              <ul className="mt-3 divide-y divide-[#eef0e9]">
                {cart.map((item) => (
                  <li key={item.id} className="py-3">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        {item.slug
                          ? <Link to={`/fidanlar/${item.slug}`} className="font-semibold hover:underline">{item.name}</Link>
                          : <p className="font-semibold">{item.name}</p>}
                        {item.size && <p className="text-xs text-[#667166]">{item.size}</p>}
                        {item.services?.length > 0 && <p className="text-xs text-[#637749]">+ {item.services.join(', ')}</p>}
                      </div>
                      <p className="font-semibold">{item.price * item.quantity} TL</p>
                    </div>
                    <div className="mt-2 flex items-center gap-2">
                      <button aria-label={`${itemLabel(item)} adedini azalt`} onClick={() => dispatch(productDecreased(item.id))} className="h-7 w-7 rounded-full border border-[#73917b] hover:bg-[#f1f4e9]">−</button>
                      <span>{item.quantity} adet</span>
                      <button aria-label={`${itemLabel(item)} adedini artır`} onClick={() => dispatch(addToCart(item))} className="h-7 w-7 rounded-full border border-[#73917b] hover:bg-[#f1f4e9]">+</button>
                      <button onClick={() => dispatch(productRemoved(item.id))} className="ml-auto text-xs underline underline-offset-4">Kaldır</button>
                    </div>
                  </li>
                ))}
              </ul>
              <button onClick={() => dispatch(cartCleared())} className="mt-2 text-xs underline underline-offset-4">Sepeti temizle</button>
            </>
          )}

          <p aria-live="polite" className="mt-4 border-t border-[#dde2d5] pt-3 text-lg font-semibold">Toplam: {total} TL</p>
        </div>
      )}
    </div>
  );
}
