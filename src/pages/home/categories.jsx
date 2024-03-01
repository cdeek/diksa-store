import { Link } from 'react-router-dom';

export default function Catgories() {
 const array = [
   {image: "/watches.png", title: "Watches", href: '/'},
   {image: "/blazer-set.png", title: "Suites", href: '/'},
   {image: "/p-cap.png", title: "Caps", href: '/'},
   {image: "/t-shirt.png", title: "T-shirts", href: '/'},
   {image: "/dress.png", title: "Dress", href: '/'},
   {image: "/sneakers.png", title: "Sneakers", href: '/'}
  ];
  return(
    <section className="p-4">
      <h1 className="text-2xl"><b>Explore Some Catgories</b></h1><br /><br />
      <div className="grid grid-cols-3 text-center">
       { array.map(i => (
        <Link to={i.href} className="my-4">
          <div className="category-circle">
            <img className="w-[100px]" src={i.image} alt="cat" />
          </div>
          <p><b>{i.title}</b></p>
        </Link>
        ))
       }
      </div>
    </section>
    )
}