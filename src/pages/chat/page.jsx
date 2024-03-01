// import { Input } from "@/components/ui/input";
// import { ArrowUp } from "lucide-react";
// import { useState, useEffect } from 'react';

// export default function ChatInterface() {
//   const [messages, setMessages] = useState([]);
  
//   const socket = new WebSocket('ws://localhost:8080');
  
//   useEffect(() => {
//   socket.addEventListener('open', (event) => {
//       alert('connected')
//       setMessages([
//       {from: 'support', text: 'hi'},
//       {from: 'support', text: 'we are not available at this moment'}
//       ])
//     });

//     socket.addEventListener('message', (event) => {
//       const receivedMessage = event.data;
//       setMessages((prevMessages) => [...prevMessages, {
//       text: receivedMessage,
//       from: 'support'
//       }]);
//     });

//     // return () => {
//     //   socket.close();
//     // };
//   }, []);

//   const handleSubmit = (e) => {
//   e.preventDefault();
   
//   const input = e.target.message.value;
//   if (input) {
//     setMessages((prevMessages) => [...prevMessages, {
//       text: input,
//       from: 'user'
//     }]);
//     socket.send(e.target.message.value);
//     e.target.message.value = null;
//   }
//   };

//   return (
//     <div className="mt-16">
//       <div className="container grid grid-cols-1">
//         {messages.map((message, index) => (
//           <div key={index} className="my-2">
//           <span className={`${message.from === 'user' ? 'float-right bg-blue-500 text-white p-2 rounded-xl' : 'text-gray-800 bg-white p-2 rounded-xl'}`}>
//           {message.text}
//           </span>
//           </div>
//         ))}
//       </div>
//       <form className="relative bottom-0 mt-4" onSubmit={handleSubmit}>
//       <div className="mx-auto w-[90%] flex">
//         <Input name="message" type="text" placeholder="Type your message..." />
//         <button className="ml-2 text-white bg-blue-700 rounded-md" type="submit"><ArrowUp /></button>
//       </div>
//       </form>
//     </div>
//   );
// }