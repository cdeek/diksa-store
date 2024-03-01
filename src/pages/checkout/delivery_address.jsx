import { useState } from 'react';
import { useHook }  from '../../context/use_context';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  AlertDialog,
  AlertDialogPortal,
  AlertDialogOverlay,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectGroup,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function DeliveryAddress({onTab}) {
 const [country, setCountry] = useState('');
 const [customerInfo, setCustomerInfo] = useState(null);
 
 const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    setCustomerInfo({
      email: formData.get('email'),
      title: formData.get('title'),
      first_name: formData.get('first_name'),
      last_name: formData.get('last_name'),
      country,
      address: formData.get('address'),
      city: formData.get('city') || "null",
      state: formData.get('state') || "null",
      phone_number: formData.get('phone'),
      zip: formData.get('zip') || "null",
    });
  };
 return(
  <section>
      <h2 className="text-lg font-semibold mb-4">Shipping</h2>
      <form onSubmit={handleSubmit}>
       <Input type="email" className="block my-4" name="email" placeholder="Your e-mail address" required />
       <h3 className="font-semibold mb-4">Send my order to</h3>
       <RadioGroup defaultValue="other" name="title" className="grid grid-cols-5 gap-2 my-4">
        <div>
         <RadioGroupItem value="mr" id="mr" />
         <Label htmlFor="mr">Mr</Label>
        </div>
        <div>
         <RadioGroupItem value="ms" id="ms" />
         <Label htmlFor="ms">Ms</Label>
        </div>
        <div>
         <RadioGroupItem value="mx" id="mx" />
         <Label htmlFor="mx">Mx</Label>
        </div>
        <div>
         <RadioGroupItem value="alh" id="alh" />
         <Label htmlFor="alh">Alh</Label>
        </div>
        <div>
         <RadioGroupItem value="other" id="other" />
         <Label htmlFor="other">Other</Label>
        </div>
       </RadioGroup>
       
       <Input className="block my-4" name="first_name" placeholder="First name*" required />
       <Input className="block my-4" name="last_name" placeholder="Last name*" required />
       
        <select className="w-full outline-none border-none bg-white py-3 text-gray-500" onChange={(e) => setCountry(e.target.value)} required >
          <option disabled selected item>Country</option>
          <option value="nigeria">Nigeria</option>
          <option value="niger">Niger</option>
        </select>
        {
         country == "nigeria" ? 
         (<>
          <Select name="state" required>
            <SelectTrigger className="my-4">
              <SelectValue placeholder="State" />
            </SelectTrigger>
            <SelectContent>
             <SelectItem value="abuja">Abuja</SelectItem>
             <SelectItem value="lagos">Lagos</SelectItem>
             <SelectItem value="kano">Kano</SelectItem>
             <SelectItem value="sokoto">Sokoto</SelectItem>
             <SelectItem value="kebbi">Kebbi</SelectItem>
            </SelectContent>
          </Select>
          
          <Input className="block my-4" name="address" placeholder="Delivery address*" required />
          <Input type="number" className="block my-4" name="phone" placeholder="Phone number*" required />
          </>
          )
         : ( <>
             <Input className="block my-4" name="address" placeholder="Delivery address*" required />
             <Input className="block my-4" name="city" placeholder="City/Town*" required />
             <Input className="block my-4" name="state" placeholder="State*" required />
             <Input type="number" className="block my-4" name="zip" placeholder="Zip code*" required />
             <Input type="number" className="block my-4" name="phone" placeholder="Phone number*" required />
           </>)
        }
        { !customerInfo ?
        <Button type="submit" className="w-full">Continue</Button>
        :
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button type="submit" className="w-full">Continue</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you abdolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                The information you provided are correct.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="flex justify-between">
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={() => onTab({ customer_Infomation: customerInfo }, "Delivery Method")}>Continue</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        }
      </form>
    </section>
  )
}