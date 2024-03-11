import { Link } from 'react-router-dom';


export default function NotUser() {
  return(
     <div className="rounded-md bg-white shadow my-14 mx-auto text-center p-4 w-[70%] border-2 border-gray-400">
        <h1 className="mb-6">You have to login or signup first</h1>
        <Link to="user/login" className="m-4 bg-indigo-500 py-2 px-6 rounded-lg">
           Login
        </Link>
        <Link to="user/signup" className="m-4 bg-indigo-500 py-2 px-6 rounded-lg">
           Signup
        </Link>
    </div>
    )
}
