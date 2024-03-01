import { useState, useEffect } from 'react';
import game from './game.jpg'
import one from './one.jpg'
import two from './two.jpg'
import three from './three.jpg'
import four from './four.jpg'

export default  function SlideShow({ products }) {
  
  let [index, setIndex] = useState(0);
  
  const slideImages = [
    {name: "back to school", path: game, url:"url"},
    {name: "back to school", path: one, url:"url"},
    {name: "back to school", path: two, url:"url"},
    {name: "back to school", path: game, url:"url"},
    {name: "back to school", path: three, url:"url"},
    {name: "back to school", path: four, url:"url"}
    ]
   
 //useEffect(() => loop, []) 
const loop = setInterval(() => {
  if(index < slideImages.length) {
    setIndex(index += 1)
  }
  if(index === slideImages.length){
    clearInterval(loop);
    setIndex(0);
  }
}, 3000)

  return (
      <div className="w-full m-0">
        <img
          className="w-full h-[230px] md:h-[450px]"
          src={slideImages[index].path}
          alt="ads"
        />
      </div>
    )
}