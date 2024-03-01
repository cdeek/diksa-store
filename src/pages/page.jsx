import { Suspense } from 'react';
import LoadingSmall from "./components/loading";
import SlideShow from './home/slide_show';
import TopDeals from './home/top_deals';
import Categories from './home/categories';
import Recommends from './home/recommends';
import { Products, ProductsGrid } from './product/page';
import QuoteMachine from '../components/quote_machine';



export default function Home() {
  return (
    <main>
      <SlideShow  />
      <TopDeals />
      <Categories />
      {/* ads */}
      <Recommends  />
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
