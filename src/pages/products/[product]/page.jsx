import '../style.css';
import { Suspense } from 'react';
import LoadingSmall from "@/components/loading";
import { Button } from "@/components/ui/button";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import AccordionDetails from "./accordion";
import { useEffect, useState, useRef } from 'react';
import { Loading } from '@/components/loading';
import RecommendsProducts from './recommend';
import BuyBtn from './buttons';
import { Heart, Share2 } from 'lucide-react';

async function getProduct(id) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_PRODUCT + "/" + id}`);
  return res.json();
}

export default function Details({ params }) {
  const [product, setProduct] = useState(null);
  const panelRef = useRef([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const productData = await getProduct(params.id);
        setProduct(productData);
        const setfirst = await panelRef.current[0].classList.add('active');
      } catch (error) {
        console.error('Error fetching product data:', error);
      }
    }

    fetchData();
  }, [params.id]);

  if (!product) {
    return <Loading />;
  }
  
  const handlePanel = (index) => {
    panelRef.current.forEach((ref) => {
      if (ref) {
        ref.classList.remove('active');
      }
    });

    if (panelRef.current[index]) {
      panelRef.current[index].classList.add('active');
    }
};
  

  return (
   <>
    <div className="w-full h-[200px] bg-black">
      <div className="relative max-w-full min-w-[250px] h-[85%] mx-auto">
        <video muted autoPlay loop className="absolute inset-0 w-full h-full object-fill">
          <source src={process.env.NEXT_PUBLIC_API_PRODUCT + "/video/" + params.id} type="video/mp4" />
          Shop with style
        </video>
      </div>
    </div>
    <main className="bg-gray-100 relative bottom-[30px] z-[2] rounded-t-[20px]">
    <br />
      <div className="relative w-[80%] h-[200px] mx-auto">
        <Image
          src={`data:image/jpeg;base64,${product.image}`}
          fill={true}
          quality={100}
          priority={true}
          alt="product"
        />
      </div>
      <div className="w-[95%] my-4 rounded-md p-4 mx-auto bg-white">
       <p>Edition: {product.edition}</p>
       <p>color, size, and more</p>
      </div>
      <div className="w-[95%] my4 p-4 rounded-md mx-auto bg-white">
        <p className="text-lg">{product.name}</p>
        <p>{product.edition}</p>
        <br />
        <small>brand: {product.brand}</small>
        <h3 className="text-xl"><b>₦{product.price}</b></h3><br /><br />
        <h4 className="text-green-700">{product.availability}</h4>
        <span className="grid grid-cols-3 float-right">
          <Heart />
          <Share2 />
        </span>
      </div><br />
      <div className="container">
        {
         product.images.map((val, index) => {
          return (
            <div 
              ref={(element) => (panelRef.current[index] = element)}
              onClick={() => handlePanel(index)} 
              className="panel">
              <img src={`data:image/jpeg;base64,${val}`} />
            </div>
           )
          })
        }
      </div>
   </main>
   
   <AccordionDetails
     description={product.description} 
   />
   
   <Suspense fallback={<LoadingSmall />}>
     <RecommendsProducts 
      category={product.category} 
     />
   </Suspense>
   <BuyBtn product={product} />
  </>
  );
}
