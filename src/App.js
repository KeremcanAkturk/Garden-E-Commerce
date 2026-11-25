import { Navigate, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Account from './pages/Account';
import Deneme from './pages/Deneme';
import Donate from './pages/Donate';
import Form from './pages/Form';
import Home from './pages/Home';
import PlantCare from './pages/PlantCare';
import ProductDetail from './pages/ProductDetail';
import './styles.css';
import './tailwind.generated.css';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/deneme" element={<Deneme />} />
        <Route path="/fidanlar" element={<Navigate to="/deneme" replace />} />
        <Route path="/fidanlar/:slug" element={<ProductDetail />} />
        <Route path="/bitki-bakimi" element={<PlantCare />} />
        <Route path="/bagis" element={<Donate />} />
        <Route path="/form" element={<Form />} />
        <Route path="/kayit" element={<Account key="register" mode="register" />} />
        <Route path="/giris" element={<Account key="login" mode="login" />} />
        <Route path="/sepet" element={<Navigate to="/deneme" replace />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
