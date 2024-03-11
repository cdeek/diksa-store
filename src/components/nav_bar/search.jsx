import DropDownMenu from '../dropdown_menu';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const router = useNavigate();

  const handleSearch = () => {
   setSearchTerm('')
   router.push(`/search_result?term=${searchTerm}`);
  }
  
  const handleSuggest = async () => {
//   if (searchTerm.trim() !== '') {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_PRODUCT}/search/suggest?search=${searchTerm}`);
      const json = await res.json();
      setSuggestions(json);
    } catch (error) {
       console.error(error);
      }
   // } else {
   //  setSuggestions([]);
   // }
  };
  
  return(
      <div>
         <DropDownMenu />
         <div className="text-center mx-auto">
           <input 
             type="search" 
             placeholder="Search..." 
             className="search-input"
             onKeyPress={(e) => {
              setSearchTerm(e.target.value)
              handleSuggest()
             }}
             value={searchTerm}
           />
           <button onClick={handleSearch} className="search-btn">Search</button>
           { suggestions &&
            <ul className="w-full list-none mt-4 bg-white">
             {suggestions.map((suggestion, index) => (
               <li onClick={() => {
                searchTerm(suggestion);
                handleSearch();
               }} key={index} className="p-2">
                 {suggestion}
               </li>
             ))}
           </ul>
           }
         </div>
      </div>
    )
}
