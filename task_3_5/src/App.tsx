import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage/HomePage';
import ContactInfoPage from './pages/ContactInfoPage/ContactInfoPage';
import RootLayout from './layouts/RootLayout/RootLayout';
import CheckoutLayout from './layouts/CheckoutLayout/CheckoutLayout';
import CartPage from './pages/CartPage/CartPage';
import ShipmentInfoPage from './pages/ShipmentInfoPage/ShipmentInfoPage';
import CheckoutPage from './pages/CheckoutPage/CheckoutPage';

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<RootLayout />}>
        <Route index element={<HomePage />} />
        <Route path='cart' element={<CheckoutLayout />}>
          <Route index element={<CartPage />} />
          <Route path='contact_information' element={<ContactInfoPage />} />
          <Route
            path='contact_information/shipment_information'
            element={<ShipmentInfoPage />}
          />
        </Route>
        <Route path='checkout' element={<CheckoutPage />} />
      </Route>
    )
  );
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
