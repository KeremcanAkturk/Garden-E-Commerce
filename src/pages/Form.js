import { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import alertify from 'alertifyjs';
import 'alertifyjs/build/css/alertify.min.css';
import { completeForm, selectCurrentEmail, selectFormCompleted } from '../store';

const groupClass = 'flex flex-col gap-2';
const labelClass = 'text-sm font-semibold text-[#294936]';
const inputClass = 'w-full rounded-xl border border-[#ced5be] bg-white px-4 py-3 text-base text-[#24362b] placeholder:text-[#9aa393] transition focus:border-[#7c9653] focus:outline-none focus:ring-2 focus:ring-[#d8e5b4]';

function SaplingForm({ currentEmail }) {
  const dispatch = useDispatch();
  const [showWarning, setShowWarning] = useState(false);
  const registerLink = useRef(null);

  function promptSignIn() {
    setShowWarning(true);
    registerLink.current?.focus();
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!currentEmail) {
      promptSignIn();
      return;
    }
    const data = new FormData(event.currentTarget);
    try {
      if (!dispatch(completeForm())) return;
    } catch {
      alertify.error('Form kaydedilemedi. Tarayıcının yerel depolama ayarlarını kontrol edin.');
      return;
    }
    const message = document.createElement('span');
    message.textContent = `${currentEmail} kaydedildi (${data.get('city')})`;
    alertify.success(message);
  }

  return (
    <>
      {!currentEmail && (
        <div className="mt-6 rounded-xl border border-[#ced5be] bg-white px-4 py-3 text-sm text-[#294936]">
          {showWarning && <p role="alert" className="mb-2 font-semibold">Önce formu doldurun.</p>}
          <p>
            Bu formu açmak için{' '}
            <Link ref={registerLink} to="/kayit" className="font-semibold underline">kayıt ol</Link>
            {' '}veya{' '}
            <Link to="/giris" className="font-semibold underline">giriş yap</Link>.
          </p>
        </div>
      )}
      <Form onSubmit={handleSubmit} className="relative mt-8 rounded-[2rem] bg-[#e9eddd] p-7 md:p-10">
        <fieldset disabled={!currentEmail} className="flex min-w-0 flex-col gap-5 disabled:opacity-60">
          {currentEmail ? (
            <p className="text-sm text-[#294936]">
              <span className="font-semibold">Hesap:</span> {currentEmail}
            </p>
          ) : (
            <FormGroup className={groupClass}>
              <Label for="email" className={labelClass}>E-posta</Label>
              <Input type="email" name="email" id="email" placeholder="ornek@mail.com" className={inputClass} />
            </FormGroup>
          )}
          <FormGroup className={groupClass}>
            <Label for="description" className={labelClass}>Açıklama</Label>
            <Input type="textarea" name="description" id="description" rows="4" placeholder="Kısaca kendinden bahset..." className={`${inputClass} resize-y`} />
          </FormGroup>
          <FormGroup className={groupClass}>
            <Label for="city" className={labelClass}>Şehir</Label>
            <Input type="select" name="city" id="city" className={`${inputClass} cursor-pointer`}>
              <option>İstanbul</option>
              <option>Ankara</option>
              <option>İzmir</option>
              <option>Adana</option>
              <option>Edirne</option>
            </Input>
          </FormGroup>
          <Button type="submit" className="mt-2 rounded-full bg-[#294936] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#7c9653]">Kaydet</Button>
        </fieldset>
        {!currentEmail && (
          <button type="button" onClick={promptSignIn} aria-label="Formu doldurmak için oturum açma seçeneklerini göster" className="absolute inset-0 h-full w-full rounded-[2rem] bg-transparent" />
        )}
      </Form>
    </>
  );
}

function FormDone({ currentEmail }) {
  return (
    <div className="mt-8 rounded-[2rem] bg-[#e9eddd] p-7 md:p-10">
      <p className="text-lg font-semibold text-[#294936]">Formu zaten doldurdun, teşekkürler!</p>
      <p className="mt-2 text-sm text-[#667166]">{currentEmail} hesabının bilgileri kayıtlı. Tekrar doldurmana gerek yok.</p>
      <Link to="/deneme" className="mt-6 inline-flex rounded-full bg-[#294936] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#3d6349]">Fidanlara göz at</Link>
    </div>
  );
}

export default function FormPage() {
  const currentEmail = useSelector(selectCurrentEmail);
  const formCompleted = useSelector(selectFormCompleted);

  return (
    <>
      <main className="mx-auto max-w-6xl px-6 py-12 md:py-20">
        <div className="mx-auto max-w-lg">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-[#637749]">FİDAN FORMU</p>
          <h1 className="text-4xl font-semibold leading-tight tracking-tight">Bilgilerini paylaş.</h1>
          <p className="mt-3 text-base leading-7 text-[#667166]">Formu doldur, fidanın hangi şehirde filizleneceğini seç.</p>
          {currentEmail && formCompleted
            ? <FormDone currentEmail={currentEmail} />
            : <SaplingForm key={currentEmail} currentEmail={currentEmail} />}
        </div>
      </main>
    </>
  );
}
