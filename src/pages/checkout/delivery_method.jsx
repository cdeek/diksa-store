import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

export default function DeliveryMethod({products, onTab}) {
 const subTotal = products.subTotal;
 let val = 0;
 const totalQuantity = products.forEach(c => val += c.quantity);
 
 const handleClick = () => {
 const details = {
  price: subTotal + 5000,
  items: products
 };
 onTab(
  {product_details: details},
  "Payment Method"
  );
 }
 return(
  <section>
     <p>CUSTOMER ADDRESS</p>
      <div className="w-full p-4 bg-white my-4 rounded">
        <h3>add{}</h3>
        <p>add{}</p>
      </div>
     <p>DELIVERY METHOD</p>
      <div className="w-full p-4 bg-white my-4 rounded">
        <RadioGroup defaultValue="door" className="grid grid-cols-1 my-4">
          <div>
           <RadioGroupItem value="pickup" id="pickup" />
           <Label htmlFor="pickup">Pick-up Station</Label>
           <p>Delivery between {} and {}</p>
          </div>
          <div>
           <RadioGroupItem value="door" id="door" />
           <Label htmlFor="door">Door Delivery</Label>
           <p>Delivery between {} and {}</p>
          </div>
        </RadioGroup> 
      </div>
     <p>ORDER SUMMARY</p>
      <div className="w-full p-4 bg-white my-4 rounded">
        <div className="flex justify-between">
          <span>Item's total({})</span>
          <span>₦{}</span>
        </div>
        <div className="flex justify-between">
          <span>Delivery fees</span>
          <span>₦{}</span>
        </div>
        <div className="flex justify-between text-lg">
          <span>Total</span>
          <span>₦{subTotal + 5000}</span>
        </div>
      </div>
      <p>SHIPMENT</p>
      <div className="w-full p-4 bg-white my-4 rounded">
       <p>shipment 1/1</p>
       <div className="border-[1px] p-1 border-black">
        <h3>{} Delivery</h3>
        <p>Delivery between {} and {}</p>
        <hr />
        {/*
         products.map((i)=> (
          <div className="flex p-4 my-4 h-[60px] w-full">
            <div className="w-[60px] h-full">
              <img src={`data:image/jpeg;base64,${i.image}`} className="w-full h-full rounded-l-md" alt="product" />
            </div>
            <div>
              <p>{i.name}</p>
              <p>QTY: {i.quantity}</p>
            </div>
          </div>
          ))*/
        }
       </div>
      </div>
      <Button onClick={handleClick} className="w-full my-6">Continue</Button>
    </section>
  )
}