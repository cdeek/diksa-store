import Cookies from 'js-cookie';
import { useNavigate, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import context from '@/context/use_context';
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import {
 AlertCircle,
} from 'lucide-react';

export default function Signup() {
  const { user, dispatch } = context();
  const router = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState(null);
  const [country, setCountry] = useState('');
  const [loading, setloading] = useState(false);
  const [error, setError] = useState(null);
 
 useEffect(()=>{
  if(user){
    
  }
 },[])
  const handleSubmit = async (e) => {
   e.preventDefault();
   setloading(true);
   setError('');

   const data = { name, email, password, country };
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_USER}/signup`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
        },
      body: JSON.stringify(data)
    });
    const json = await res.json();
    if(!res.ok) {
      setloading(false);
      setError(json.error || 'Something went wrong. Please try again.');
    }
    if(res.ok) {
   const setUser = await Cookies.set('userData', JSON.stringify(json), { expires: 7 });
   dispatch({type: "LOGIN", payload: json});
   setloading(false);
   router.push('/');
    }
  };
  return(
      <form onSubmit={handleSubmit} className="form mt-14">
        <h3>Create account</h3><br /><br />
        <label for="name">Name : </label>
        <input onChange={(e) => setName(e.target.value)} id="name" type="text" required />
        <label for="user-email">Email : </label>
        <input onChange={(e) => setEmail(e.target.value)} id="user-email" type="text" />
        <label for="password">Password : </label>
        <input onChange={(e) => setPassword(e.target.value)} id="Password" type="password" />
        <select onChange={(e) => setCountry(e.target.value)} required>
          <option selected item>Country</option>
          <option value="nigeria">Nigeria</option>
          <option value="niger">Niger</option>
        </select>
        {!loading &&
          <button>Signup</button>
        }
        {loading &&
          <button disabled={true} >Signing up...</button>
        }
        {error && 
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
        }
        <br />
        <Link className="text-center" to="/login">login?</Link>
      </form>
    )
}
