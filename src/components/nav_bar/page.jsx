import { useEffect, useState } from 'react';
import Search from './search';
import Header from './header';
import { useLocation } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import './style.css';

export default function NavBar() {
 const pathname = useLocation().pathname
  return (
   pathname === "/checkout" ||
   pathname === "/privacy" ||
   pathname === "/about" || 
   pathname === "/FAQ" || 
   pathname === "/settings" ||
   pathname === "/terms_of_services" || 
   pathname === "/contact_us" || 
   pathname === "/cart"

   ) ? <header className="flex bg-gray-500 text-gray-300 py-4 px-2 m-0 w-full">
         <ArrowLeft onClick={()=>{history.back()}} />
         <h1 className="mx-auto text-2xl font-semi-bold">{pathname.slice(1).toUpperCase()}</h1>
       </header> : (
    <>
    <header className="header">
      <Header />
      <Search />
    </header>
    <div className="h-[120px]"></div>
    </>
    )
}