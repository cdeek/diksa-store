import { useState } from 'react';
import context  from '@/context/use_context';
import PaymentMethod from './payment';
import DeliveryAddress from './delivery_address';
import DeliveryMethod from './delivery_method';
import { Button } from "@/components/ui/button";
import { ArrowLeft } from 'lucide-react';

export default function DeliveryDetails() {
 const [tab, setTab] = useState("Delivery Details");
 const { checkoutProducts } = context();
 
 const orderDetails = {};
 const onTab = (val, nav) => {
  Object.assign(orderDetails, val)
  setTab(nav);
 };
  return (
  <>
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