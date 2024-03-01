import { Routes, Route, Navigate } from "react-router-dom";
import { useHook }  from './context/use_context';

import Home from "./pages/page";
import About from "./pages/about";
import Cart from "./pages/cart/page";
import Contact from "./pages/contact_us/page";
import Checkout from "./pages/checkout/page";
import Customer from "./pages/customer_service/page";
import FAQ from "./pages/FAQ/page";
import Fgtpss from "./pages/user/forgot_password/page";
import Login from "./pages/user/login/page";
import Privacy from "./pages/privacy/page";
import Product from "./pages/product/[id]/page";
import ProList from "./pages/product_list/page";
import SavedItem from "./pages/saved_items/page";
import Search from "./pages/search_result/page";
import Sell from "./pages/sell/page";
import Signup from "./pages/user/signup/page";
import Settings from "./pages/settings/page";
import Terms from "./pages/terms_of_services/page";
import NotFound from "./pages/NotFound";

export const Router = () => {
 const { user } = useHook();
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="/sell" element={<Sell />} />
      <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
      <Route path="/signup" element={user ? <Navigate to="/" /> : <Signup />} />
      <Route path="/saved-items" element={<SavedItem />} />
      <Route path="/about" element={<About />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/contact-us" element={<Contact />} />
      <Route path="/customer-service" element={<Customer />} />
      <Route path="/FAQ" element={<FAQ />} />
      <Route path="/forgot-password" element={<Fgtpss />} />
      <Route path="/privacy" element={<Privacy />} />
      <Route path="/product/:id" element={<Product />} />
      <Route path="/product-list" element={<ProList />} />
      <Route path="/search-result/:id" element={<Search />} />
      <Route path="/terms-of-services" element={<Terms />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};