import { Input } from "@/components/ui/input";
import NotUser from '../user/not_user';
import './style.css';
import context  from '@/context/use_context';
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload } from 'react-feather';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectGroup,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";


export default function Sell() {
  const { user } = context();
  const router = useNavigate();
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]);
  const [imagePreview, setImagePreview] = useState('');
  const [videoPreview, setVideoPreview] = useState('');
  const [imageCaption, setImageCaption] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false)
  const [emptyFields, setEmptyFields] = useState(null);
  
  const onSelect = (e) => {
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
      reader.onload = () => {
      const url = reader.result;
      setImagePreview(url);
      setImageCaption(e.target.files[0].name);
    };
  };
  
  const checkVideoSize = (e) => {
   const selectedFile = e.target.files[0];
    const maxSize = 6 * 1024 * 1024;
    if (selectedFile && selectedFile.size > maxSize) {
      alert('File size exceeds 6MB limit.');
      e.target.files = null;
    } else {
      let url = URL.createObjectURL(selectedFile);
      setVideoPreview(url);
    }
  };
  
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const formData = new FormData(e.target);
      if (images.length > 0) {
        images.forEach((file) => {
          formData.append('images', file);
        });
      }
    
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_PRODUCT}/auth`, {
      method: 'POST',
      headers: {
        'Authorization': `bearer ${user.token}`
      },
      body: formData
    })
    const json = await res.json()
    if (!res.ok) {
      setLoading(false);
      setSuccess(false);
      setError(json.error);
      setEmptyFields(json.emptyFields);
    }
    if (res.ok){
      setLoading(false);
      setSuccess(true);
  //    router.push('/')
    }
  };
  return(
    <main className="bg-[whitesmoke]">
    { !user ?
     <NotUser />
     : 
      <form onSubmit={handleSubmit} className="container">
        <h2 className="m-4">Add a New Product</h2>
        
        <Select name="category" required>
            <SelectTrigger className="my-4">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
             <SelectItem value="phone">Phone</SelectItem>
             <SelectItem value="fabrics">Fabrics</SelectItem>
             <SelectItem value="gaming">Gaming</SelectItem>
             <SelectItem value="accessories">Accessories</SelectItem>
             <SelectItem value="clothing">Clothing</SelectItem>
            </SelectContent>
          </Select>
        
        <Select name="availability" required>
            <SelectTrigger className="my-4">
              <SelectValue placeholder="Availability" />
            </SelectTrigger>
            <SelectContent>
             <SelectItem value="In stock">In stock</SelectItem>
             <SelectItem value="Few in stock">Few in stock</SelectItem>
             <SelectItem value="Out of stock">Out of stock</SelectItem>
            </SelectContent>
          </Select>
        
        <label htmlFor="name">Product Name:</label>
        <Input id="name" name="name" className="" type="text" />
        
        <label htmlFor="tags">Product Tags:</label>
        <small>separate tags with ','</small>
        <Input id="tags" name="tags" className="" type="text" />
        
        <label htmlFor="edition">Product Edition:</label>
        <Input id="edition" name="edition" className="" type="text" />
        
        <label htmlFor="brand">Product Brand:</label>
        <Input id="brand" name="brand" className="" type="text" />
        
        <label htmlFor="description">Description:</label>
        <textArea id="description" name="description" placeholder="Description..." />
        
        <label htmlFor="price">Price:</label>
        <Input id="price" name="price" className=""  type="number" step="5" />

        <br /><br />
        <h3>Upload a Product Image</h3><br />
        
       
          <figure className="bg-white p-4 my-4 mx-auto text-center">
            <img className="w-[70%] mx-auto" src={imagePreview} alt="product" />
            <figCaption className="overflow-hidden w-[70%] mx-auto p-2 bg-[whitesmoke]">
              {imageCaption}
            </figCaption>
          </figure>
     
        
        <label htmlFor="image" style={{width: 300}} className="upload-btn" for="main_img">
           Upload <Upload size={35} />
        </label>
        <Input id="image" name="image" type="file" accept="image/*" onChange={onSelect} />
        
        <label htmlFor="images">Multiple Images:</label>
        <input type="file" id="images" accept="image/*" onChange={(e) => setImages([...e.target.files]) } multiple /><br />
   
        <video muted autoPlay loop width="300" height="150">
          <source src={videoPreview} type="video/mp4" />
        </video>
        
        <label htmlFor="video">Video:</label>
        <Input type="file" id="video" name="video" accept="video/*" onChange={checkVideoSize} /><br /><br />

        <button disabled={loading} className={`${loading ? 'bg-green-400' : ''}`}>
          {loading && <span>Publishing...</span>}
          {!loading && <span>Publish</span>}
        </button>
        
        {error && 
          <div className="rounded-md border-2 text-red-300 border-red-300 p-2 m-2">
            <h4>{error}</h4>
            <ul>{emptyFields &&
                  emptyFields.map(emptyField => (<li>{emptyField}</li>)) 
                }
            </ul>
          </div>
         }
        
        {success &&
           <div className="rounded-md border-2 text-green-300 border-green-300 p-2 m-2">
             <p>uploaded</p>
           </div>
        }
      </form>
    }
    </main>
    )
}
