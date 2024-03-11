import { Link } from 'react-router-dom';

export default function Catgories() {
 const array = [
   {image: "/watches.png", title: "Watches", to: '/'},
   {image: "/blazer-set.png", title: "Suites", to: '/'},
   {image: "/p-cap.png", title: "Caps", to: '/'},
   {image: "/t-shirt.png", title: "T-shirts", to: '/'},
   {image: "/dress.png", title: "Dress", to: '/'},
   {image: "/sneakers.png", title: "Sneakers", to: '/'}
  ];
  return(
    <section className="p-4">
      <h1 className="text-2xl"><b>Explore Some Catgories</b></h1><br /><br />
      <div className="grid grid-cols-3 text-center">
       { array.map((i, index) => (
        <Link key={index} to={i.to} className="my-4">
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