import { useState } from 'react';
import { useHook }  from '../../context/use_context';
import PaymentMethod from './payment';
import DeliveryAddress from './delivery_address';
import DeliveryMethod from './delivery_method';
import { Button } from "@/components/ui/button";
import { ArrowLeft } from 'lucide-react';

export default function DeliveryDetails() {
 const [tab, setTab] = useState("Delivery Details");
 const { checkoutProducts } = useHook();
 
 const orderDetails = {};
 const onTab = (val, nav) => {
  Object.assign(orderDetails, val)
  setTab(nav);
 };
  return (
  <>
   <header className="flex bg-white py-4 px-2 m-0 w-full">
     <ArrowLeft onClick={()=>{history.back()}} />
     <h1 className="ml-4 text-xl">{tab}</h1>
   </header>
   <div className="container mx-auto mt-8">
    { tab == "Delivery Details" &&
     <DeliveryAddress onTab={onTab} />
    }
    { tab == "Delivery Method" &&
     <DeliveryMethod onTab={onTab} products={checkoutProducts} />
    }
    { tab == "Payment Method" &&
     <PaymentMethod onTab={onTab} />
    }
   </div>
 </>
  )
}