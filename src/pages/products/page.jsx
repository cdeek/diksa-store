import './style.css';

// not in use
async function userProducts() {
  const res = await fetch(NEXT_PUBLIC_API_PRODUCT + "/auth", {
    next: {revalidate: 0},
    headers: {
     'Authorization': `bearer ${user.token}`
    }
  })
  if(res.ok){
  return res.json();
  }
}

export default async function UserProducts() {
  const products = await userProducts();
  return(
      <main>
       {
      products.map((item) => (
        <div key={item._id} className="bg-[whitesmoke] w-[80%]">
            <img
              src="/"
              width={200}
              height={200}
              alt="product"
            />
            <div className="inline p-2">
              <h3><b>{item.price}</b></h3>
              <h3>Product Description</h3>
              <p>{item.description}</p>
            </div>
            <div className="flex justify-between">
              <button className="bg-red-500">Delete</button>
              <a className="p-2 bg-blue-500 text-white" href={`/product_list/${item._id}`}>Edit</a>
            </div>
        </div>))
       }
       {products.length === 0 && (
        <p className="text-center">You Haven't post anything yet.</p>
       )}
      </main>
   )
}
