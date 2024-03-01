import Ribbon from './ribbon';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Home, Menu, ArrowLeft } from "react-feather";
import { useEffect, useState } from 'react';
import Search from './search';
import './style.css';


export default function NavBar() {
 const location = useLocation();
 const navigate = useNavigate();
 
  return (
   location === "/checkout" ||
   location === "/privacy" ||
   location === "/about" || 
   location === "/FAQ" || 
   location === "/settings" ||
   location === "/terms_of_services" || 
   location === "/contact_us" || 
   location === "/cart"

   ) ? (
     <header className="flex text-white space-x-4 bg-white py-4 px-2 m-0 w-full">
       <ArrowLeft onClick={() => navigate(-1)} size={25} />
       <h1 className="text-xl font-bold">Diksa</h1>
     </header>) : (
    <>
    <header className="header">
      <Ribbon />
      <Search />
    </header>
    <div className="h-[106px]"></div>
    </>
    )
}