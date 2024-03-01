import { useHook }  from '../context/use_context';
import { Link } from 'react-router-dom';
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Heart } from "lucide-react";
import LoadingSmall from "../components/loading";
import './style.css';

export async function Products() {
  const { products } = useHook();
  return (
    <ScrollArea className="p-2 bg-gray-300 w-[90%] rounded-lg mx-auto">
      <div className="flex mx-auto z-[-2]">
      {products.map((item) => {
      // const blob = new Blob([item.product_image.data.data], { type: 'image/png' });
      // const imageUrl = URL.createObjectURL(blob);
        return (
          <figure key={item._id} className="mr-4 w-[150px] p-2 bg-white shrink-0">
            <Link to={`/product/${item._id}`}>
                <img
                  src={`data:image/png;base64,${item.image}`}
                  alt="product image"
                  className="aspect-[3/4] h-fit w-full"
                />
              <figcaption className="pt-2 text-xs text-muted-foreground">
                <span className="font-semibold text-foreground">
                  ₦{item.price}
                </span>
              </figcaption>
            </Link>
          </figure>
        )
       })}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}
        

export async function ProductsGrid() {
  const { products, fetching, user, saveItem, unsaveItem, loadMore } = useHook();
  return(
    <section className="grid grid-cols-2 py-6 gap-4 mx-2">
    {products.map((item) => {
     let style = "";
      return (
        <div key={item._id} className="card">
          <Link to={`/product/${item._id}`}>
            <div className="logos">
              <img src="" alt="logo" />
              <span onClick={() => {
                if (user) {
                  saveItem(user.token, item._id);
                  style = "bg-blue-500";
                }
              }}>
                <Heart className={style} />
              </span>
            </div>
            <img className="img" src={`data:image/png;base64,${item.image}`} alt="product image" />
            <div className="info">
              <span className="name">{item.name.slice(0, 30)}...</span>
            </div>
            <p className="price">₦{item.price}</p>
          </Link>
        </div>
      )})}
      <button onClick={() => loadMore()}>
        {fetching ? 'loading...': 'Load More'}
      </button>
    </section>
  )
}
