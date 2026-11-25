# Nature 🌱

A small sapling shop built with React, Redux Toolkit and Tailwind CSS. You can browse and filter saplings, pick a size and extra services on each sapling's own page, add it to your cart, and read the plant care guide.

## Features

- **Sapling list:** Search by name and filter by type.
- **Product pages:** Each sapling has a readable URL such as `/fidanlar/cam-fidani`. On the page you can choose the size, quantity and optional extra services (planting, care visit).
- **Cart:** A dropdown menu in the navbar. Each user has their own cart, and it persists across page reloads.
- **Account:** Sign up and log in. Passwords are hashed in the browser before being stored.
- **Plant care guide:** Basic care tips, a seasonal calendar and care information specific to each sapling.
- **Donation and form pages.**

## Tech stack

- [React 19](https://react.dev/) and [React Router 7](https://reactrouter.com/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [Tailwind CSS 4](https://tailwindcss.com/)
- [Create React App](https://create-react-app.dev/) and Testing Library

## Getting started

```bash
npm install
npm start
```

The app opens at [http://localhost:3000](http://localhost:3000).

## Scripts

| Command | What it does |
|---|---|
| `npm start` | Starts the development server. The Tailwind CSS file is watched and regenerated on changes. |
| `npm test` | Runs the tests. |
| `npm run build` | Builds the production version into the `build/` folder. |

## Project structure

```
public/              Static files and sapling images
scripts/             Helper scripts that generate the Tailwind CSS
src/
  components/        Pieces like the Navbar, Footer, cart and product list
  pages/             Pages (home, product page, care guide…)
  products.js        Sapling and extra service data
  store.js           Redux store, account and session logic
  cartSlice.js       Cart state
  counterSlice.js    Counter example
  App.js             Route definitions
```

`src/tailwind.generated.css` is generated automatically, so it is not committed to git. The `npm start`, `npm test` and `npm run build` commands create it on their own.
