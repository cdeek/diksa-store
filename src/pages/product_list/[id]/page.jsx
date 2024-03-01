async function getProduct(id) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_PRODUCT + "/auth/" + id}`, {
    next: {
      revalidate: 1800
    }
  });
  if (!res.ok) {
    notFound();
  }
  
  return res.json();
}

export default async function EditProduct({ params }) {
 const product = await getProduct(params.id);
 
 const handleSubmit = (e) => {
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
   
  )
}