import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import { loginAccount, registerAccount, selectCurrentEmail, selectFormCompleted } from '../store';

const inputClass = 'w-full rounded-xl border border-[#ced5be] bg-white px-4 py-3 text-base text-[#24362b] focus:border-[#7c9653] focus:outline-none focus:ring-2 focus:ring-[#d8e5b4]';

export default function Account({ mode }) {
  const isRegister = mode === 'register';
  const title = isRegister ? 'Kayıt ol' : 'Giriş yap';
  const currentEmail = useSelector(selectCurrentEmail);
  const formCompleted = useSelector(selectFormCompleted);
  const dispatch = useDispatch();
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    if (busy) return;

    const fields = new FormData(event.currentTarget);
    const authenticate = isRegister ? registerAccount : loginAccount;
    setError('');
    setBusy(true);
    try {
      await dispatch(authenticate(fields.get('email'), fields.get('password')));
    } catch (failure) {
      setError(failure.message);
    } finally {
      setBusy(false);
    }
  }

  if (currentEmail) return <Navigate to={formCompleted ? '/' : '/form'} replace />;

  return (
    <>
      <main className="mx-auto max-w-lg px-6 py-12 md:py-20">
        <h1 className="text-4xl font-semibold leading-tight tracking-tight">{title}</h1>
        <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-5 rounded-[2rem] bg-[#e9eddd] p-7 md:p-10">
          <div className="flex flex-col gap-2">
            <label htmlFor="account-email" className="text-sm font-semibold text-[#294936]">E-posta</label>
            <input id="account-email" name="email" type="email" autoComplete="username" required className={inputClass} />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="account-password" className="text-sm font-semibold text-[#294936]">Şifre</label>
            <input id="account-password" name="password" type="password" autoComplete={isRegister ? 'new-password' : 'current-password'} required className={inputClass} />
          </div>
          {error && <p role="alert" className="text-sm font-semibold text-red-800">{error}</p>}
          <button type="submit" disabled={busy} className="rounded-full bg-[#294936] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#3d6349] disabled:opacity-60">
            {busy ? 'Bir an lütfen…' : title}
          </button>
        </form>
        <p className="mt-5 text-center text-sm">
          {isRegister ? 'Zaten hesabın var mı?' : 'Henüz hesabın yok mu?'}{' '}
          <Link to={isRegister ? '/giris' : '/kayit'} className="font-semibold text-[#294936] underline">
            {isRegister ? 'Giriş yap' : 'Kayıt ol'}
          </Link>
        </p>
      </main>
    </>
  );
}
