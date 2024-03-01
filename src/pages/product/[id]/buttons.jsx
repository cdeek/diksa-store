"use client";
import '../style.css';
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { PlusCircle, MinusCircle } from 'lucide-react';
import { useState, useRef } from 'react';
import { useHook } from '../../context/use_context';

export default function BuyBtn({ product }) {
 const { addToCart, message, setCheckoutProducts } = useHook();
 const [quantity, setQuantity] = useState(1);
 const con1 = useRef();
 const con2 = useRef();
 
 const show = () => {
  con2.current.style.display = "none";
  con1.current.style.height = "200px";
 };
 const close = () => {
  con1.current.style.height = "0";
  con2.current.style.display = "block";
 };
 const handleClick = () => {
   setCheckoutProducts({
    subTotal: quantity * product.price,
    price: product.price,
    image: product.image,
    quantity,
    name: product.name + product.edition
   });
 };
 return (
   <div className="w-full fixed bottom-0 z-[3]">
     <div ref={con2} className="mx-auto">
       <Button  onClick={() => {
        show()
        }}className="m-1 w-[200px] bg-blue-600 text-white p-4">
           Buy now
       </Button>
       <Button  onClick={() => {
          addToCart(product);
          toast("Item added to cart.");
       }}className="m-1 w-[200px] bg-red-600 text-white p-4">
           Add to cart
       </Button>
     </div>
     <div ref={con1} className="addjust">
       <button className="text-black p-2 text-[30px] float-right" onClick={close}>&times;</button>
       <br />
       <h3>Select quantity</h3><br />
       <div className="mx-auto flex items-center justify-between">
         <span onClick={() =>{ if (quantity > 1) { setQuantity(quantity - 1); }}}>
           <MinusCircle className="text-[orange]" />
         </span>
         <span>{quantity}</span>
         <span onClick={() =>{ setQuantity(quantity + 1); }}>
           <PlusCircle className="text-[orange]" />
         </span>
       </div><br />
       <a href="/checkout" onClick={handleClick} className="w-[300px] bg-green-600 text-white p-4">Proceed</a>
     </div>
   </div>
  )
}