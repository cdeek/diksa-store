import './style.css';
import Cookies from 'js-cookie';
import { useNavigate, Link } from 'react-router-dom';
import {  useState, useEffect } from 'react';
import context  from '@/context/use_context';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import {
 AlertCircle,
} from 'lucide-react';


export default function LoginForm() {
  const { user, dispatch } = context();
  const router = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState(null);
  const [loading, setloading] = useState(false);
  const [error, setError] = useState(null);
 
 useEffect(()=>{
  if(user){
    router.replace('/');
  }
 },[])
  const handleSubmit = async (e) => {
   e.preventDefault();
   setError('');
   setloading(true);

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_USER}/login`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
        },
      body: JSON.stringify({email, password})
    });
    const json = await res.json();
    if(!res.ok) {
      setloading(false);
      setError(json.error || 'Something went wrong. Please try again.');
    }
    if(res.ok) {
      setloading(false);
      const setUser = await Cookies.set('userData', JSON.stringify(json), { expires: 7 });
      dispatch({type: "LOGIN", payload: json});
      setloading(false);
      router.push('/');
    }
  };
  return(
      <Card className="w-[350px] my-6 mx-auto">
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>Enter your email below to login to your account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="login-form grid w-full items-center gap-4">
            <label htmlFor="user-email">Email</label>
            <input type="text" onChange={(e) => setEmail(e.target.value.toLowerCase())} id="user-email" />
            <label htmlFor="password">Password</label>
            <input type="password" onChange={(e) => setPassword(e.target.value)} id="Password" />
            {!loading &&
              <Button className="btn">Login</Button>
            }
            {loading &&
              <Button className="btn" disabled={true} >Loging in...</Button>
            }
            {error && 
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            }
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
            <Link to="/signup">signup?</Link>
            <Link to="/forgot-password">Forgot Password?</Link>
        </CardFooter>
      </Card>
    )
}
