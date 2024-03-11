import { useSearchParams, Link } from 'react-router-dom';
import { Filter } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Loading } from '@/components/loading';

export default function Search() {
  const [searchResults, setSearchResults] = useState(null);
  const searchParams = useSearchParams();
  
  const term = searchParams.get('term');
  
  useEffect(() => {
      const fetchResult = async (event) => {
       try {
         const res = await fetch(`${process.env.NEXT_PUBLIC_API_PRODUCT}/search?search=${term}`);
         const json = await res.json();
         setSearchResults(json);
       } catch (error) {
         console.error('Error fetching data:', error);
         alert(error)
       }
      };
      fetchResult();
 }, [term]);
  
  if (!searchResults) {
    return <Loading />;
  }
  return(
   <main className="mt-8">
    <Filter />
     {
      searchResults.map((product) => (
       <Link 
       to={`/product/${product._id}`} 
       key={product._id}
       className="max-h-[200px] flex items-center bg-white rounded-md w-[90%] my-4 mx-auto p-2 cursor-pointer hover:bg-gray">
        <div className="w-[150px] h-full">
          <img src={`data:image/jpeg;base64,${product.product_image.base64_string}`}
          className="w-full h-full rounded-l-md"
          alt="product" />
        </div>
        <div>
         <p>{product.product_name}</p>
         <p>{product.price}</p>
        </div>
       </Link>
       ))
     }
     { searchResults.length < 1 && <p className="text-center">No results found.</p>}
  </main>
  )
}