import { toast } from "use-toast";
export const saveItem = (token, product_id) => {
 fetch(process.env.NEXT_PUBLIC_API_SAVED_ITEM, {
        method: 'POST',
        headers: {
          'Authorization': `bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({product_id})
      });
      toast("Item saved");
}

export const unsaveItem = (token, product_id) => {
 fetch(`${process.env.NEXT_PUBLIC_API_SAVED_ITEM}/${product_id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `bearer ${token}`
        }
      })
      .then(response => response.json())
      .then(data => console.log(data.message))
}