import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Apple } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function PaymentMethod() {
 const [activeTab, setActiveTab] = useState('card');
 const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    address: '',
    cardNumber: '',
    month: '',
    year: '',
    cvc: '',
  });
  
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  
 return(
  <section>
    <Card>
      <CardHeader>
        <CardTitle>Payment Method</CardTitle>
        <CardDescription>
          Add a new payment method to your account.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
       <div>
        <RadioGroup defaultValue="card" className="grid grid-cols-3 gap-4">
          <div>
            <RadioGroupItem 
            onClick={() => setActiveTab('card')} 
            value="card" id="card" 
            className="peer sr-only" />
            <Label
              htmlFor="card"
              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="mb-3 h-6 w-6"
              >
                <rect width="20" height="14" x="2" y="5" rx="2" />
                <path d="M2 10h20" />
              </svg>
              Card
            </Label>
          </div>
          <div>
            <RadioGroupItem
              onClick={() => setActiveTab('paypal')}
              value="paypal"
              id="paypal"
              className="peer sr-only"
            />
            <Label
              htmlFor="paypal"
              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
            >
              <Apple className="mb-3 h-6 w-6" />
              Paypal
            </Label>
          </div>
          <div>
            <RadioGroupItem  
            onClick={() => setActiveTab('other')}
            value="apple" 
            id="apple" 
            className="peer sr-only" />
            <Label
              htmlFor="apple"
              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
            >
              <Apple className="mb-3 h-6 w-6" />
              Apple
            </Label>
          </div>
        </RadioGroup>
        {/* card payment method */}
        <div>
         { activeTab == "card" &&
          <form onSubmit={handleSubmit}>
           <div className="grid gap-2 my-4">
             <Label htmlFor="cardNumber">Card number</Label>
             <Input type="number" id="number" />
           </div>
           <div className="grid grid-cols-3 gap-6 my-4">
             <div className="grid gap-2">
               <Label htmlFor="month">Expires</Label>
               <Select>
                 <SelectTrigger id="month">
                   <SelectValue placeholder="Month" />
                 </SelectTrigger>
                 <SelectContent>
                   <SelectItem value="1">January</SelectItem>
                   <SelectItem value="2">February</SelectItem>
                   <SelectItem value="3">March</SelectItem>
                   <SelectItem value="4">April</SelectItem>
                   <SelectItem value="5">May</SelectItem>
                   <SelectItem value="6">June</SelectItem>
                   <SelectItem value="7">July</SelectItem>
                   <SelectItem value="8">August</SelectItem>
                   <SelectItem value="9">September</SelectItem>
                   <SelectItem value="10">October</SelectItem>
                   <SelectItem value="11">November</SelectItem>
                   <SelectItem value="12">December</SelectItem>
                 </SelectContent>
               </Select>
             </div>
             <div className="grid gap-2">
               <Label htmlFor="year">Year</Label>
               <Select>
                 <SelectTrigger id="year">
                   <SelectValue placeholder="Year" />
                 </SelectTrigger>
                 <SelectContent>
                   {Array.from({ length: 10 }, (_, i) => (
                     <SelectItem key={i} value={`${new Date().getFullYear() + i}`}>
                       {new Date().getFullYear() + i}
                     </SelectItem>
                   ))}
                 </SelectContent>
               </Select>
             </div>
             <div className="grid gap-2">
               <Label htmlFor="cvc">CVC</Label>
               <Input type="number" id="cvc" placeholder="CVC" />
             </div>
           </div>
           <Button className="w-full">Continue</Button>
          </form>
         }
         { activeTab == "paypal" &&
          <div>
          </div>
         }
         { activeTab == "other" &&
          <div>
          </div>
         }
        </div>
       </div>
      </CardContent>
      <CardFooter>
        <small className="text-center">Diksa Inc...</small>
      </CardFooter>
    </Card>
  </section>
  )
}