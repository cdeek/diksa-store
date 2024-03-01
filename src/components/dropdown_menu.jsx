import { Link } from 'react-router-dom';
import {
  Settings,
  User,
  LogOut,
  Baby,
  Dumbbell,
  ArrowLeft,
  Bookmark,
  CheckCircle,
  ChevronDown,
  Filter,
  Gamepad2,
  List,
  LogIn,
  MapPin,
  Search,
  Eye,
  Home,
  Shirt,
  Smartphone,
  Monitor,
  Tv,
  HeartPulse,
  Headphones,
  EyeOff,
  Watch,
  Footprints
} from "lucide-react";
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger
} from "@/components/ui/dropdown-menu"
import Logout from '../user/logout';

export default function DropDownMenu() {
  return(
    <DropdownMenu>
      <DropdownMenuTrigger className="hidden sm:inline" asChild>
        <Button className="bg-blue-900 color-white">Menu <ChevronDown className="inline" /></Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[400px] text-gray-700 text-xlg m-[20px]">
         <DropdownMenuLabel>Categories</DropdownMenuLabel>
         <DropdownMenuSeparator />
         <DropdownMenuGroup>
            <DropdownMenuItem>
              <Home className="mr-4 h-6 w-6" />
              <Link to="/">Home & Office</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Smartphone className="mr-4 h-6 w-6" />
              <Link to="/" >Phones & Tablets</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Monitor className="mr-4 h-6 w-6" />
              <Link to="/" >Computing</Link>
            </DropdownMenuItem>
            <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <Shirt className="mr-4 h-6 w-6" />
              <span>Clothes</span>
            </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  <DropdownMenuItem>
                    <Link to="/">Men's Fashion</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link to="/">Women's Fashion</Link>
                  </DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
            <DropdownMenuItem>
              <Headphones className="mr-4 h-6 w-6" />
              <Link to="/">Accessories</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Baby className="mr-4 h-6 w-6" />
              <Link to="/">Baby Products</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Footprints className="mr-4 h-6 w-6" />
              <Link to="/">Shoes</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Watch className="mr-4 h-6 w-6" />
              <Link to="/">Watches</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Tv className="mr-4 h-6 w-6" />
              <Link to="/">Electronics</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <HeartPulse className="mr-4 h-6 w-6" />
              <Link to="/">Health & Beauty</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Gamepad2 className="mr-4 h-6 w-6" />
              <Link to="/">Gaming</Link>
            </DropdownMenuItem>
         </DropdownMenuGroup>
         <DropdownMenuSeparator />
         <DropdownMenuGroup>
            <DropdownMenuItem>
              <Settings className="mr-4 h-6 w-6" />
              <Link to="/">Settings</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link to="/">FAQ</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link to="/">About Us</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Logout />
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
   )
}