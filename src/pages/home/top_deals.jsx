import {useEffect, useState} from 'react';
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import Image from 'next/image';
import { Link } from 'react-router-dom';
import two from './two.jpg';

export default function TopDeals() {
 const [display, setDisplay] = useState(false);
 
 useEffect(() => {
   setTimeout( () => {
    setDisplay(true);
   }, 1500)
 }, [])
 const array = [
   {image: two, href: '/', price: 109.05},
   {image: two, href: '/', price: 1.05},
   {image: two, href: '/', price: 7.05},
   {image: two, href: '/', price: 19.05},
   {image: two, href: '/', price: 25.05},
   {image: two, href: '/', price: 19.05},
   {image: two, href: '/', price: 18.05}
  ];
  return (
    <section className="top-deals">
    { !display ?
      <div class="welcome">
        <span className="text-blue-200">W</span>
        <span className="text-green-200">E</span>
        <span className="text-indigo-200">L</span>
        <span className="text-red-200">C</span>
        <span className="text-blue-800">O</span>
        <span className="text-indigo-600">M</span>
        <span className="text-green-600">E</span>
        <span className="">.</span>
        <span className="">.</span>
      </div>
      :
      <ScrollArea className="flex mt-8">
       <div className="flex w-full">
        <Link className="p-2 mx-2 rounded-lg border-gray-600 border-2" to="/">Electronics</Link>
        <Link className="p-2 mx-2 rounded-lg border-gray-600 border-2" to="/">Clothing</Link>
        <Link className="p-2 mx-2 rounded-lg border-gray-600 border-2" to="/">UsedItems</Link>
        <Link className="p-2 mx-2 rounded-lg border-gray-600 border-2" to="/">Accessories</Link>
        <Link className="p-2 mx-2 rounded-lg border-gray-600 border-2" to="/">Phones</Link>
        <Link className="p-2 mx-2 rounded-lg border-gray-600 border-2" to="/">Sneakers</Link>
       </div>
       <ScrollBar orientation="horizontal" />
      </ScrollArea>
    }
      <div className="con">
        <h1 className="p-2 text-2xl text-left">Top Deals</h1>
        <div className="card-con">
         { array.map(i => (
          <Link to={i.href} className="card">
            <Image className="w-full h-[150px] md:h-[300px]" src={i.image} alt="img" />
            <p className="p-2 text-lg">
              <b>₦{i.price}</b>
            </p>
          </Link>
          ))
         }
        </div>
      </div>
    </section>
    )
}