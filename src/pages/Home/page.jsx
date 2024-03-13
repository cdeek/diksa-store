import { Suspense } from 'react';
import LoadingSmall from "@/components/loading";
import SlideShow from './slide_show';
import TopDeals from './top_deals';
import Categories from './categories';
import { Products, ProductsGrid } from '../products/products';
import QuoteMachine from '@/components/quote_machine';



export default function Home() {
  return (
    <main>
      <SlideShow  />
      <TopDeals />
      <Categories />
      {/* ads */}
      <Suspense fallback={<LoadingSmall />}>
        <Products />
      </Suspense>
      <Suspense fallback={<LoadingSmall />}>
        <ProductsGrid />
      </Suspense>
      <QuoteMachine />
    </main>
  )
}
