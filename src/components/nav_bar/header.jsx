import { useRef } from 'react';
import { Link } from 'react-router-dom';
import SideNav from './side_nav';
import context from '@/context/use_context';

export default function Header() {
  const { user, cartItems } = context();
  const sideNav = useRef();
  const menuBar = useRef();
  
  const show = () => {
      menuBar.current.style.display = "none";
      sideNav.current.style.width = "70%";
    };
  const close = () => {
    sideNav.current.style.width = "0";
    menuBar.current.style.display = "block";
  };
  return(
    <main>
     <div className="mb-4 w-full">
        <div className="inline-flex">
          {/* menu bar button */}
          <button ref={menuBar} className="sm:hidden" onClick={show}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
          {/* logo */}
          <Link to="/"><h1 className="text-2xl mx-4">DIKSA</h1></Link>
        </div>
        
        <div className="flex float-right">
          {/* user */}
          {user ? 
            (<span>Hi {user.name}</span>)
           :
            (<nav className="hidden md:inline space-x-0.5">
              <Link to="/user/login" className="login">Login</Link>
              <Link to="/user/signup">Sign up</Link>
            </nav>)
          } 
          
            {/* cart svg */}
          <Link to="/cart">
            <svg className="inline" xmlns="http://www.w3.org/2000/svg" width="40" height="20" viewBox="0 0 576 512" className="ml-2">
              <path fill="#e6e4e4" d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"/>
            </svg>
            <span className="cart-number">
              {cartItems.length}
            </span>
          </Link>
        </div>
     </div>
     <SideNav sideNav={sideNav} close={close} />
     </main>
    )
}
