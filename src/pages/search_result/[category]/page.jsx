import '../../product/style.css';
import { Link } from 'react-router-dom';
import { Bookmark } from "lucide-react";

async function getProducts(val) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_PRODUCT + "/category/" + val}`, {
    next: {
      revalidate: 3600
    }
  });
  if (!res.ok) {
    notFound();
  }

  return res.json();
}

export default async function Category({ params }) {
 const products = await getProducts(params.category);
 return (
  <>
  <main className="grid grid-cols-2 py-6 gap-4 mx-2">
    {
      products.map(item => (
        <div key={item._id} className="card">
          <Link href={`/product/${item._id}`}>
            <div className="logos">
              <img src="" alt="logo" />
              <Bookmark />
            </div>
            <img className="img" src={`data:image/png;base64,${item.product_image.base64_string}`} alt="product image" />
            <div className="info">
              <span className="name">{item.product_name.slice(0, 30)}...</span>
            </div>
            <p className="price">₦{item.price}</p>
          </Link>
        </div>
       ))
    }
  </main>
  </>
  )
}