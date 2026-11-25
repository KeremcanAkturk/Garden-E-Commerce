# Nature 🌱

React, Redux Toolkit ve Tailwind CSS ile yapılmış küçük bir fidan dükkanı. Fidanları listeleyip filtreleyebilir, her fidanın kendi sayfasında boy ve ek hizmet seçip sepete ekleyebilir, bitki bakımı rehberini okuyabilirsin.

## Özellikler

- **Fidan listesi:** İsme göre arama ve türe göre filtreleme.
- **Ürün sayfaları:** Her fidanın `/fidanlar/cam-fidani` gibi okunaklı bir adresi var. Sayfada boy, adet ve isteğe bağlı ek hizmetler (dikim, bakım ziyareti) seçilebiliyor.
- **Sepet:** Navbar'da açılır bir menü. Her kullanıcının sepeti ayrı tutuluyor ve sayfa yenilense de kaybolmuyor.
- **Hesap:** Kayıt olma ve giriş yapma. Şifreler tarayıcıda hash'lenerek saklanıyor.
- **Bitki bakımı rehberi:** Temel bakım ipuçları, mevsim takvimi ve fidanlara özel bakım bilgileri.
- **Bağış ve form sayfaları.**

## Kullanılan teknolojiler

- [React 19](https://react.dev/) ve [React Router 7](https://reactrouter.com/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [Tailwind CSS 4](https://tailwindcss.com/)
- [Create React App](https://create-react-app.dev/) ve Testing Library

## Kurulum

```bash
npm install
npm start
```

Uygulama [http://localhost:3000](http://localhost:3000) adresinde açılır.

## Komutlar

| Komut | Ne yapar |
|---|---|
| `npm start` | Geliştirme sunucusunu başlatır. Tailwind CSS dosyası değişiklikleri takip ederek yeniden üretilir. |
| `npm test` | Testleri çalıştırır. |
| `npm run build` | Yayına hazır sürümü `build/` klasörüne üretir. |

## Klasör yapısı

```
public/              Statik dosyalar ve fidan görselleri
scripts/             Tailwind CSS'i üreten yardımcı betikler
src/
  components/        Navbar, Footer, sepet, ürün listesi gibi parçalar
  pages/             Sayfalar (ana sayfa, ürün sayfası, bakım rehberi…)
  products.js        Fidan ve ek hizmet verileri
  store.js           Redux store, hesap ve oturum işlemleri
  cartSlice.js       Sepet state'i
  counterSlice.js    Sayaç örneği
  App.js             Route tanımları
```

`src/tailwind.generated.css` dosyası otomatik üretildiği için git'e eklenmez. `npm start`, `npm test` ve `npm run build` komutları bu dosyayı kendileri oluşturur.
