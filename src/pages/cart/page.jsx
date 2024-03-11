import { useEffect, useState } from 'react';
import context  from '@/context/use_context';
import Loading from '../loading';
import { PlusCircle, MinusCircle, Trash2, Heart } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import './style.css';


export default async function Cart() {
  const { total, cartItems, removeToCart, setCheckoutProducts } = context();
  const [subTotal, setSubTotal] = useState(total);
  const array = [{subTotal}];
  
  return(
      <main className="text-center">
        <div className="flex items-center justify-between p-8 mt-2">
          <h3>Your Cart</h3>
          <span>Total price: ₦{subTotal}</span>
        </div>
        
        {cartItems.map((product) => {
         let quantity = 1;
         const item = {
          quantity,
          image: product.image,
          name: product.name + product.edition,
          price: product.price
         };
         array.push(item);
          return (
            <>
            <div className="flex my-4 w-[95%] mx-auto bg-white rounded-md">
              <div className="w-[150px] h-full">
                <img src={`data:image/jpeg;base64,${product.image}`} className="w-full h-full rounded-l-md" alt="product" />
              </div>
              <div className="m-4">
                <span className="float-right">
                  <Heart />
                </span>
                <p>{product.name} {product.edition}</p>
                <p>₦{product.price}</p>
                <small>{product.availability}</small>
                <div className="flex items-center justify-between">
                   <span className="" onClick={() => { removeToCart(product) }}>
                     <Trash2 className="text-red-700" />
                   </span>
                   <div className="flex w-[150px] items-center justify-between">
                     <span onClick={() =>{ if (quantity > 1) {
                       quantity = quantity - 1;
                      setSubTotal(subTotal - product.price);
                     }}}>
                       <MinusCircle className="text-[orange]" />
                     </span>
                     <span>{quantity}</span>
                     <span onClick={() => { 
                      quantity = quantity + 1; 
                      setSubTotal(subTotal + product.price);
                     }}>
                       <PlusCircle className="text-[orange]" />
                     </span>
                   </div>
                </div>
              </div>
            </div>
            <Separator />
            </>
         )})
        }
        {cartItems.length === 0 ? (
        <p className="mt-20">Empty Cart</p>
       ): 
          <Link onClick={() => {setCheckoutProducts(array)}} to="/checkout" className="mx-auto my-4 w-[90%] bg-red-600 text-white p-4">Checkout</Link>
        }
      </main>
    )
}
