import { Input } from "@/components/ui/input";
import { ArrowUp } from "lucide-react";

export default function CustomerService() {
 let messages = [
  {from: 'support', text: "Hi"},
  {
    from: 'support',
    text: 'How can i support you!' 
   }];
  const onSendMessage = async (message) => {
   messages.push({ from: 'user', text: message });
   
   const response = await fetch(process.env.NEXT_PUBLIC_API_AI + "/generate-completion", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message }),
    });

    const data = await response.json();
    messages.push({from: 'support', text: data})
  };
  
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const message = e.target.message.value;
    if (message.trim() !== '') {
      onSendMessage(message);
      e.target.message.value = null;
    }
  };

  return (
    <div className="mt-16">
      <div className="container grid grid-cols-1">
        {messages.map((message, index) => (
          <div key={index} className="my-2">
           <span className={`${message.from === 'user' ? 'float-right bg-blue-500 text-white p-2 rounded-xl' : 'text-gray-800 bg-white p-2 rounded-xl'}`}>
           {message.text}
           </span>
          </div>
        ))}
      </div>
      <form className="relative bottom-0 mt-4" onSubmit={handleSubmit}>
       <div className="mx-auto w-[90%] flex">
        <Input name="message" placeholder="Type your message..." />
        <button className="ml-2 text-white bg-blue-700 rounded-md" type="submit"><ArrowUp /></button>
       </div>
      </form>
    </div>
  );
}