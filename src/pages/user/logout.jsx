import Cookies from 'js-cookie';
import { useNavigate, Link } from 'react-router-dom';
import context  from '@/context/use_context';
import { LogOut } from "lucide-react"

export default function  Logout({close}) {
   const { user, dispatch } = context();
   const router = useNavigate();
   return(
     <>
      {user ?
       <button onClick={() => {
         // remove user from storage
         Cookies.remove('userData');
         dispatch({type: "LOGOUT"});
         close();
         router.push('/user/login');
        }}>
          <LogOut className="mr-2 h-4 w-4 inline" /> <span>Logout</span>
       </button>
       :
       <div>
         <Link onClick={() => close() } to="/login" className="text-white m-4 bg-indigo-500 py-2 px-6 rounded-lg">
            Login
         </Link>
         <Link onClick={() => close() } to="/signup" className="text-white m-4 bg-indigo-500 py-2 px-6 rounded-lg">
            Signup
         </Link>
       </div>
         }
    </>
   )
 }
