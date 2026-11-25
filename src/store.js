import { configureStore, createSlice } from '@reduxjs/toolkit';
import counterReducer from './counterSlice';
import cartReducer, { cartLoaded, cartStorageKey, loadCart, productAdded, saveCart } from './cartSlice';

const sessionKey = 'nature.session';
const accountPrefix = 'nature.account.';
const guest = { currentEmail: null, formCompleted: false };

function readAccount(email) {
  const stored = localStorage.getItem(accountPrefix + email);
  if (!stored) return null;
  try {
    const account = JSON.parse(stored);
    return /^[\da-f]{32}$/.test(account?.salt) && /^[\da-f]{64}$/.test(account?.hash) ? account : null;
  } catch {
    return null;
  }
}

function readSession() {
  try {
    const currentEmail = localStorage.getItem(sessionKey);
    const account = currentEmail && readAccount(currentEmail);
    if (account) return { currentEmail, formCompleted: account.formCompleted === true };
  } catch {}
  return guest;
}

const session = createSlice({
  name: 'session',
  initialState: guest,
  reducers: {
    sessionChanged: (_, action) => action.payload,
  },
});

const { sessionChanged } = session.actions;
export const selectCurrentEmail = state => state.session.currentEmail;
export const selectFormCompleted = state => state.session.formCompleted;
export function createAppStore() {
  const initialSession = readSession();
  const store = configureStore({
    reducer: { session: session.reducer, counter: counterReducer, cart: cartReducer },
    preloadedState: { session: initialSession, cart: loadCart(initialSession.currentEmail) },
  });

  let savedCart = store.getState().cart;
  store.subscribe(() => {
    const { cart, session } = store.getState();
    if (cart !== savedCart) {
      savedCart = cart;
      saveCart(session.currentEmail, cart);
    }
  });
  return store;
}

function toHex(bytes) {
  return Array.from(bytes, byte => byte.toString(16).padStart(2, '0')).join('');
}

async function hashPassword(password, salt) {
  if (!window.crypto?.subtle) {
    throw new Error('Oturum açmak için siteyi HTTPS veya localhost üzerinden açın.');
  }
  const key = await window.crypto.subtle.importKey('raw', new TextEncoder().encode(password), 'PBKDF2', false, ['deriveBits']);
  const saltBytes = Uint8Array.from(salt.match(/../g), pair => parseInt(pair, 16));
  const bits = await window.crypto.subtle.deriveBits({ name: 'PBKDF2', hash: 'SHA-256', salt: saltBytes, iterations: 600000 }, key, 256);
  return toHex(new Uint8Array(bits));
}

function openSession(dispatch, email, account) {
  localStorage.setItem(sessionKey, email);
  dispatch(sessionChanged({ currentEmail: email, formCompleted: account.formCompleted }));
  dispatch(cartLoaded(loadCart(email)));
}

export const registerAccount = (email, password) => async dispatch => {
  const normalizedEmail = email.trim().toLowerCase();
  const salt = toHex(window.crypto.getRandomValues(new Uint8Array(16)));
  const hash = await hashPassword(password, salt);
  if (readAccount(normalizedEmail)) {
    throw new Error('Bu e-posta adresi zaten kayıtlı. Giriş yapabilirsiniz.');
  }
  const account = { salt, hash, formCompleted: false };
  localStorage.setItem(accountPrefix + normalizedEmail, JSON.stringify(account));
  openSession(dispatch, normalizedEmail, account);
};

export const loginAccount = (email, password) => async dispatch => {
  const normalizedEmail = email.trim().toLowerCase();
  const account = readAccount(normalizedEmail);
  if (!account || await hashPassword(password, account.salt) !== account.hash) {
    throw new Error('E-posta adresi veya şifre hatalı.');
  }
  openSession(dispatch, normalizedEmail, account);
};

export const logout = () => dispatch => {
  localStorage.removeItem(sessionKey);
  dispatch(sessionChanged(guest));
  dispatch(cartLoaded([]));
};

export const addToCart = (item, quantity = 1) => (dispatch, getState) => {
  if (!selectCurrentEmail(getState())) return false;
  const { id, slug, name, size, price, services } = item;
  dispatch(productAdded({ id, slug, name, size, price, services, quantity }));
  return true;
};

export const completeForm = () => (dispatch, getState) => {
  const email = selectCurrentEmail(getState());
  const account = email && readAccount(email);
  if (!account || localStorage.getItem(sessionKey) !== email) {
    dispatch(sessionChanged(readSession()));
    return false;
  }
  localStorage.setItem(accountPrefix + email, JSON.stringify({ ...account, formCompleted: true }));
  dispatch(sessionChanged({ currentEmail: email, formCompleted: true }));
  return true;
};

const store = createAppStore();

window.addEventListener('storage', event => {
  const email = selectCurrentEmail(store.getState());
  if (event.key === null || event.key === sessionKey || event.key === accountPrefix + email) {
    const next = readSession();
    store.dispatch(sessionChanged(next));
    store.dispatch(cartLoaded(loadCart(next.currentEmail)));
  } else if (email && event.key === cartStorageKey(email)) {
    store.dispatch(cartLoaded(loadCart(email)));
  }
});

export default store;
