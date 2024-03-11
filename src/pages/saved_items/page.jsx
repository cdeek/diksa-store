import { useState, useEffect } from 'react';
import context from '@/context/use_context';
import Logout from '../user/logout';

async function getProduct(id) {
  const res = await fetch(process.env.NEXT_PUBLIC_API_SAVED_ITEM + "/" + id)
  const json = res.json();
   return json
}

export default function SavedItems() {
 const [datas, setDatas] = useState();
 const { user, addToCart, unsaveItem, message } = context();
 
 useEffect(()=> {
   if (user) {
     fetch(process.env.NEXT_PUBLIC_API_SAVED_ITEM, {
         method: "GET",
         headers: {'Authorization': `bearer ${user.token}`}
       })
       .then(res => {return res.json()})
       .then(data => {
         setDatas(data);
       })
       .catch(err => { console.log('having error while fetching') })
   }
 }, []);
  
  return (
     <main>
       {user ?
        datas.map( async (item) => {
        const product = await getProduct(item.product_id);
        return(
         <Link 
          href={`/product/${product._id}`} 
          key={product._id}
          className="flex items-center bg-white rounded-md w-[90%] my-4 mx-auto p-2 cursor-pointer hover:bg-gray">
           <div className="w-[150px] h-full">
             <img src={`data:image/jpeg;base64,${product.image}`}
             className="w-full h-full rounded-l-md"
             alt="product" />
           </div>
           <div>
            <p>{product.name}</p>
            <p>{product.price}</p>
            <p>{product.description.slice(0, 100)}...</p>
           </div>
          </Link>
         )
       })
        :
        <div className="w-[300px] p-6 rounded-sm relative mt-[40%] mx-auto bg-white">
         <h3>Signin or Signup to Continue</h3><br />
         <Logout />
        </div>
       }
     </main>
   )
}