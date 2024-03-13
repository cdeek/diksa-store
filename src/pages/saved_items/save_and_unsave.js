import { useToast } from "@/components/ui/use-toast";

export const saveItem = (token, product_id) => {
  const { toast } = useToast();
  
 fetch(process.env.NEXT_PUBLIC_API_SAVED_ITEM, {
        method: 'POST',
        headers: {
          'Authorization': `bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({product_id})
      })
      .then(res => {
        if (!res.ok) {
          toast({
            description: "Item not save",
          });
        } else {
          toast({
            description: "Item saved",
          });
        }
      })
}

export const unsaveItem = (token, product_id) => {
  const { toast } = useToast();
  
 fetch(`${process.env.NEXT_PUBLIC_API_SAVED_ITEM}/${product_id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `bearer ${token}`
        }
      })
      .then(response => response.json())
      .then(data => console.log(data.message))
}