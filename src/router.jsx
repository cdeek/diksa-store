import { Routes, Route, Navigate, createBrowserRouter } from "react-router-dom";
import { Suspense } from 'react';
import ContextProvider from './context/context';
import { Loading } from './components/loading';
import { useToast } from '@/components/ui/use-toast'
import Nav from './components/nav_bar/page';

import Home from "./pages/Home/page";
import About from "./pages/about/page";
import Login from "./pages/user/login/page";
import Signup from "./pages/user/signup/page";
import Seller from "./pages/seller/page";
import SavedItems from "./pages/saved_items/page";
import Products from "./pages/products/page";
import Search from "./pages/search/page";
import Product from "./pages/products/[product]/page";
import EditProduct from "./pages/products/[edit]";
import Category from "./pages/products/[category]";
import Pssw from "./pages/user/forgot_password/page";
import Contact from "./pages/contact_us/page";
import Check from "./pages/checkout/page";
import Customer from "./pages/customer_service/page";
import FAQ from "./pages/FAQ/page";
import Privacy from "./pages/privacy/page";
import Settings from "./pages/settings/page";
import Terms from "./pages/terms_of_services/page";
import NotFound from "./pages/notFound";
import Footer from "./components/footer";

export const Router = () => {
  return (
    <ContextProvider>
    <Nav />
    <Suspense fallback={<Loading />}>
    <Routes>
      <Route index element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/search/:params" element={<Search />} />
      <Route path="/save" element={<SavedItems />} />
      <Route path="/my-products" element={<Products />} />
      <Route path="/product/:id" element={<Product />} />
      <Route path="/c/:id" element={<Category />} />
      <Route path="/edit/:id" element={<EditProduct />} />
      <Route path="/forgot-password" element={<Pssw />} />
      <Route path="/checkout" element={<Check />} />
      <Route path="/sell" element={<Seller />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact-us" element={<Contact />} />
      <Route path="/customer-service" element={<Customer />} />
      <Route path="/FAQ" element={<FAQ />} />
      <Route path="/privacy" element={<Privacy />} />
      <Route path="/terms-of-services" element={<Terms />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
    </Suspense>
    <Footer />
    </ContextProvider>
  );
};