export function Loading() {
  return (
   <div className="relative h-full p-2">
    <div className="loading"></div>
   </div>
  )
}

export default function LoadingSmall() {
  return (
    <div className="relative"> 
      <span className="small-loading"></span>
    </div>
  )
}