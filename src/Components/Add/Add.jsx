import React from 'react'
import './Add.scss'
import { gigReducer,INITIAL_STATE } from '../../Reducer/GigReducer'
import { useReducer,useState } from 'react'
import { newRequest } from '../../../Utils/newRequest';
import { useNavigate } from 'react-router-dom'
import { upload } from '../../../Utils/Upload'
export const Add = () => {

  const [singleFile, setSingleFile] = useState(undefined);
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [error,setError]=useState(null);

  const [state, dispatch] = useReducer(gigReducer, INITIAL_STATE);
  const navigate=useNavigate()
  const handleChange=(e)=>{
    console.log(e.target.name);
    dispatch({
      type:"CHANGE_INPUT",
      payload:{name:e.target.name,value:e.target.value}
    })

  }
  const handleUpload = async () => {
    setUploading(true);
    try {
      const cover = await upload(singleFile);

      const images = await Promise.all(
        [...files].map(async (file) => {
          const url = await upload(file);
          return url;
        })
      );
      setUploading(false);
      dispatch({ type: "ADD_IMAGES", payload: { cover, images } });
    } catch (err) {
      console.log(err);
    }
  };

  const handleFeature=(e)=>{
    console.log(`handle`);
    e.preventDefault();

    console.log(`handle feature`);
    dispatch({
      type: "ADD_FEATURE",
      payload: e.target[0].value,
    });
    e.target[0].value = "";
  }

  const handleSubmit=async()=>{
    try{
    const res=  await newRequest.post('/gigs',state);
    console.log(res);

    }
    catch(err){
      console.log(err);
     setError(err);

    }

  }
  return (
    <div className="Add">
     {error&&
      <span>{error.response.data}</span>
      }
        <h1 style={{color:"lightgray",fontweight:"250px"}} className="add-gig">
            Add a new Gig
        </h1>
        <div className="container">
            <div className="left">
            <label htmlFor="">Title</label>
            <input
              name="title"
              type="text"
              placeholder="e.g. I will do something I'm really good at"
              onChange={(e)=>handleChange(e)}
            />
            <label htmlFor="">Category</label>
            <select name="cat" id="cats" onChange={handleChange}>
              <option value="design">Design</option>
              <option value="web">Web Development</option>
              <option value="animation">Animation</option>
              <option value="music">Music</option>
            </select>
            <label htmlFor="">Cover Image</label>
            <input type="file"onChange={(e)=>setSingleFile(e.target.files[0])}  />
            <label htmlFor="" >Upload Images</label>
            <input type="file" multiple onChange={(e)=>setFiles(e.target.files)}/>
            <button onClick={handleUpload}>
                {uploading ? "uploading" : "Upload"}
              </button>
            <label htmlFor="">Description</label>
            <textarea onChange={handleChange} name="desc"  id="" placeholder="Brief descriptions to introduce your service to customers" cols="0" rows="16"></textarea>
            <div className="but">
            <button onClick={(e)=>handleSubmit(e)}>Create</button>
            </div>
         
            </div>

            < div className="right">
            <label htmlFor="">Service Title</label> 
            <input name='shortTitle' type="text"  placeholder="e.g. One-page web design" onChange={handleChange}/>
            <label htmlFor="">Short Description</label>
            <textarea name="shortDesc" id="" placeholder="Short description of your service" cols="30" rows="10" onChange={handleChange}></textarea>
            <label htmlFor="">Delivery Time (e.g. 3 days)</label>
            <input type="number" name='deliveryTime' onChange={handleChange} />
            <label htmlFor="">Revision Number</label>
            <input type="number"  name='revisionNumber'/>
            <label htmlFor="">Add Features</label>
            <form action="" className="add"  onSubmit={handleFeature}>
              <input type="text" placeholder="e.g. page design"  />
              <button  type="submit" >add</button>
            </form>
            <div className="addedFeatures">
              {state?.features?.map((f) => (
                <div className="item" key={f}>
                  <button
                    onClick={() =>
                      dispatch({ type: "REMOVE_FEATURE", payload: f })
                    }
                  >
                    {f}
                    <span>X</span>
                  </button>
                </div>
              ))}
            </div>
            <label htmlFor="">Price</label>
            <input type="number"  name="price"  onChange={handleChange}/>
            
            </div>
          </div>
         
    </div>
  )
}
