import { useEffect, useState } from 'react';
import context  from '@/context/use_context';
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Link } from 'react-router-dom';

export default function RecommendsProducts({ category }) {
 const { products } = context();
 const filteredProducts = products.filter(f => {
  f.category.toLowerCase().includes(category)
 });
 return (
    <ScrollArea className="w-[75%] whitespace-nowrap rounded-md border bg-white;">
      <div className="flex w-max space-x-4 p-4">
      {filteredProducts.map((item) => {
        return (
          <figure key={item._id} className="card shrink-0">
            <Link to={`/product/${item._id}`}>
             <div className="overflow-hidden rounded-md">
                <img
                  src={`data:image/png;base64,${item.product_image.base64_string}`}
                  alt="product image"
                  className="aspect-[3/4] h-fit w-fit object-cover"
                  width={150}
                  height={250}
                />
              </div>
              <figcaption className="pt-2 text-xs text-muted-foreground">
                <span className="font-semibold text-foreground">
                  ₦{item.price}
                  {item.product_name}
                </span>
              </figcaption>
            </Link>
          </figure>
      )
      })}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  )
}