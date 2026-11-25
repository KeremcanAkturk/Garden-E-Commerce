import { webcrypto } from 'crypto';
import { TextEncoder } from 'util';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';

global.TextEncoder = TextEncoder;
Object.defineProperty(window, 'crypto', { configurable: true, value: webcrypto });
window.scrollTo = jest.fn();

jest.mock('react-router/dom', () => require('react-router/dist/development/dom-export'), { virtual: true });

const { MemoryRouter } = require('react-router-dom');
const App = require('./App').default;
const { createAppStore } = require('./store');

function openApp(path) {
  return render(
    <Provider store={createAppStore()}>
      <MemoryRouter initialEntries={[path]}><App /></MemoryRouter>
    </Provider>
  );
}

beforeEach(() => localStorage.clear());

test('visitors can see the form and get a registration prompt when trying to fill it out', () => {
  openApp('/form');
  expect(screen.getByLabelText('E-posta')).toBeDisabled();
  expect(screen.getByLabelText('Açıklama')).toBeDisabled();
  expect(screen.getByLabelText('Şehir')).toBeDisabled();
  expect(screen.getByRole('button', { name: 'Kaydet' })).toBeDisabled();

  userEvent.click(screen.getByRole('button', { name: /oturum açma seçeneklerini göster/i }));
  expect(screen.getByRole('alert')).toHaveTextContent('Önce formu doldurun.');
  expect(screen.getByRole('link', { name: 'kayıt ol' })).toHaveFocus();
  expect(screen.getByRole('link', { name: 'giriş yap' })).toHaveAttribute('href', '/giris');
});

const mainNav = () => screen.getByRole('navigation', { name: 'Ana menü' });

test('registration and login unlock the form, and form completion survives a reload', async () => {
  const email = 'fidan@example.com';
  const password = 'Fidan-12345!';
  const { unmount } = openApp('/');
  userEvent.click(within(mainNav()).getByRole('link', { name: 'Kayıt ol' }));
  userEvent.type(screen.getByLabelText('E-posta'), email);
  userEvent.type(screen.getByLabelText('Şifre'), password);
  userEvent.click(screen.getByRole('button', { name: 'Kayıt ol' }));
  expect(await screen.findByLabelText('Açıklama')).toBeEnabled();
  expect(screen.queryByLabelText('E-posta')).not.toBeInTheDocument();
  expect(screen.getByText(email)).toBeInTheDocument();
  userEvent.click(screen.getByRole('button', { name: 'Kaydet' }));
  unmount();

  openApp('/');
  expect(screen.getByText(/Form Dolduruldu/i)).toBeInTheDocument();
  userEvent.click(screen.getByRole('button', { name: 'Çıkış yap' }));
  userEvent.click(within(mainNav()).getByRole('link', { name: 'Form' }));
  expect(screen.getByLabelText('Açıklama')).toBeDisabled();
  userEvent.click(screen.getByRole('link', { name: 'giriş yap' }));
  userEvent.type(screen.getByLabelText('E-posta'), email);
  const passwordField = screen.getByLabelText('Şifre');
  userEvent.type(passwordField, 'YanlışParola123');
  userEvent.click(screen.getByRole('button', { name: 'Giriş yap' }));
  expect(await screen.findByRole('alert')).toBeVisible();
  userEvent.clear(passwordField);
  userEvent.type(passwordField, password);
  userEvent.click(screen.getByRole('button', { name: 'Giriş yap' }));
  expect(await screen.findByText('Tanışalım mı?')).toBeInTheDocument();
  userEvent.click(within(mainNav()).getByRole('link', { name: 'Form' }));
  expect(screen.getByText('Formu zaten doldurdun, teşekkürler!')).toBeInTheDocument();
  expect(screen.queryByLabelText('Açıklama')).not.toBeInTheDocument();
});

function seedSignedInUser(email = 'fidan@example.com') {
  localStorage.setItem('nature.account.' + email, JSON.stringify({ salt: '0'.repeat(32), hash: '0'.repeat(64), formCompleted: false }));
  localStorage.setItem('nature.session', email);
}

const cartButton = () => screen.getByRole('button', { name: /^Sepet \d+$/ });
const addButton = () => screen.getByRole('button', { name: 'Sepete ekle' });

test('guests cannot add saplings to the cart and are pointed to sign in', () => {
  openApp('/fidanlar/cam-fidani');
  userEvent.click(addButton());
  expect(cartButton()).toHaveTextContent('0');
  expect(screen.getByRole('alert')).toHaveTextContent('Sepete fidan eklemek için önce giriş yap');
  expect(screen.getByRole('link', { name: 'giriş yap' })).toHaveAttribute('href', '/giris');
});

test('the Deneme page filters saplings by name and type', () => {
  openApp('/deneme');
  const names = () => screen.getAllByRole('heading', { level: 3, name: /fidanı$/ }).map((heading) => heading.textContent);
  expect(names()).toEqual(['Çam fidanı', 'Meşe fidanı', 'Zeytin fidanı', 'Elma fidanı', 'Çilek fidanı']);

  userEvent.click(screen.getByRole('button', { name: 'Meyve veren' }));
  expect(names()).toEqual(['Zeytin fidanı', 'Elma fidanı', 'Çilek fidanı']);

  userEvent.click(screen.getByRole('button', { name: 'Tümü' }));
  userEvent.type(screen.getByLabelText('Fidan ara'), 'ÇAM');
  expect(names()).toEqual(['Çam fidanı']);

  userEvent.click(screen.getByRole('button', { name: 'Yaprak döken' }));
  expect(screen.getByText('Aramana uyan fidan bulunamadı.')).toBeInTheDocument();
});

test('clicking a sapling opens its own page at a slug URL with sizes and price', () => {
  openApp('/deneme');
  userEvent.click(screen.getByRole('heading', { level: 3, name: 'Çilek fidanı' }));
  expect(screen.getByRole('heading', { level: 1, name: 'Çilek fidanı' })).toBeInTheDocument();
  expect(screen.getByRole('radio', { name: /5’li viyol/ })).toBeChecked();
  expect(screen.getByText(/^1000 TL/, { selector: 'p' })).toBeInTheDocument();

  userEvent.click(screen.getByRole('radio', { name: /10’lu viyol/ }));
  userEvent.click(screen.getByRole('button', { name: 'Adedi artır' }));
  expect(screen.getByText(/^3600 TL/, { selector: 'p' })).toHaveTextContent('(1800 TL × 2)');

  userEvent.click(within(screen.getByRole('navigation', { name: 'Konum' })).getByRole('link', { name: 'Fidanlar' }));
  expect(screen.getByRole('heading', { level: 2, name: 'Fidanlar' })).toBeInTheDocument();
});

test('an unknown slug shows a not-found message', () => {
  openApp('/fidanlar/boyle-bir-fidan-yok');
  expect(screen.getByRole('heading', { name: 'Fidan bulunamadı' })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: 'Tüm fidanlara dön' })).toHaveAttribute('href', '/deneme');
});

test('the navbar cart is a dropdown: it keeps sizes apart, opens, and closes', () => {
  seedSignedInUser();
  openApp('/fidanlar/cam-fidani');
  expect(screen.queryByText(/^Sepetim/)).not.toBeInTheDocument();

  userEvent.click(addButton());
  userEvent.click(addButton());
  userEvent.click(screen.getByRole('radio', { name: /60–80 cm/ }));
  userEvent.click(addButton());
  expect(cartButton()).toHaveTextContent('3');

  userEvent.click(cartButton());
  expect(cartButton()).toHaveAttribute('aria-expanded', 'true');
  expect(screen.getByText('Sepetim (3 adet)')).toBeInTheDocument();
  expect(screen.getByText('Toplam: 540 TL')).toBeInTheDocument();

  userEvent.click(screen.getByRole('button', { name: 'Çam fidanı (30–50 cm) adedini azalt' }));
  expect(screen.getByText('Toplam: 390 TL')).toBeInTheDocument();

  userEvent.keyboard('{Escape}');
  expect(screen.queryByText(/^Sepetim/)).not.toBeInTheDocument();
  expect(cartButton()).toHaveFocus();

  userEvent.click(cartButton());
  userEvent.click(screen.getByRole('heading', { level: 1, name: 'Çam fidanı' }));
  expect(screen.queryByText(/^Sepetim/)).not.toBeInTheDocument();
});

test('the old /sepet address now leads to the Deneme page', () => {
  openApp('/sepet');
  expect(screen.getByRole('heading', { name: 'Fidanlar' })).toBeInTheDocument();
});

test('the cart survives a reload', () => {
  seedSignedInUser();
  const { unmount } = openApp('/fidanlar/mese-fidani');
  userEvent.click(addButton());
  unmount();

  openApp('/');
  expect(cartButton()).toHaveTextContent('1');
  userEvent.click(cartButton());
  expect(screen.getByText('Toplam: 200 TL')).toBeInTheDocument();
});

test('each user has their own cart: logging out empties the view, logging back in brings it back', () => {
  seedSignedInUser('ali@example.com');
  let view = openApp('/fidanlar/cam-fidani');
  userEvent.click(addButton());
  userEvent.click(addButton());
  expect(cartButton()).toHaveTextContent('2');
  userEvent.click(screen.getByRole('button', { name: 'Çıkış yap' }));
  expect(cartButton()).toHaveTextContent('0');
  view.unmount();

  seedSignedInUser('ayse@example.com');
  view = openApp('/fidanlar/zeytin-fidani');
  expect(cartButton()).toHaveTextContent('0');
  userEvent.click(addButton());
  userEvent.click(cartButton());
  expect(screen.getByText('Toplam: 250 TL')).toBeInTheDocument();
  view.unmount();

  localStorage.setItem('nature.session', 'ali@example.com');
  openApp('/deneme');
  expect(cartButton()).toHaveTextContent('2');
  userEvent.click(cartButton());
  expect(screen.getByText('Toplam: 300 TL')).toBeInTheDocument();
});

test('optional services raise the price and become their own cart line', () => {
  seedSignedInUser();
  openApp('/fidanlar/cam-fidani');
  const planting = screen.getByRole('checkbox', { name: /Dikim ve yerleştirme/ });
  expect(planting).not.toBeChecked();

  userEvent.click(addButton());
  userEvent.click(planting);
  expect(screen.getByText(/^300 TL/, { selector: 'p' })).toBeInTheDocument();
  userEvent.click(addButton());
  expect(screen.getByRole('status')).toHaveTextContent('Çam fidanı (30–50 cm, Dikim ve yerleştirme) sepetine eklendi');

  userEvent.click(cartButton());
  expect(screen.getByText('Toplam: 450 TL')).toBeInTheDocument();
  expect(screen.getByText('+ Dikim ve yerleştirme')).toBeInTheDocument();
  userEvent.click(screen.getByRole('button', { name: 'Çam fidanı (30–50 cm, Dikim ve yerleştirme) adedini artır' }));
  expect(screen.getByText('Toplam: 750 TL')).toBeInTheDocument();
});

test('the footer links to every sapling and thanks newsletter sign-ups', () => {
  openApp('/');
  const footer = within(screen.getByRole('contentinfo'));
  expect(footer.getByRole('link', { name: 'Zeytin fidanı' })).toHaveAttribute('href', '/fidanlar/zeytin-fidani');

  userEvent.type(footer.getByLabelText('E-posta adresin'), 'bulten@example.com');
  userEvent.click(footer.getByRole('button', { name: 'Kaydol' }));
  expect(footer.getByRole('status')).toHaveTextContent('Bültene kaydoldun');
});

test('the plant care page is in the menu and links each sapling to its page', () => {
  openApp('/');
  userEvent.click(within(mainNav()).getByRole('link', { name: 'Bakım' }));
  expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Fidanın büyüsün');
  expect(screen.getByRole('heading', { level: 3, name: 'Sulama' })).toBeInTheDocument();

  userEvent.click(screen.getByRole('heading', { level: 3, name: 'Elma fidanı' }));
  expect(screen.getByRole('heading', { level: 1, name: 'Elma fidanı' })).toBeInTheDocument();
});
