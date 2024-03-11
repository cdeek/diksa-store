
async function getProduct(id) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_PRODUCT + "/auth/" + id}`);
  if (!res.ok) {
    notFound();
  }
  
  return res.json();
}

export default async function EditProduct({ params }) {
const product = await getProduct(params.id);
 
const handleSubmit = async (e) => {
  e.preventDefault();
  
  const formData = new FormData(e.target);
  
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_PRODUCT + "/auth/" + id}`, {
    method: 'PATCH',
    headers: {
      'Authorization': `bearer ${user.token}`
    },
    body: formData
  })
  const json = await res.json();
}
 
return(
   <p>products List</p>
  )
}