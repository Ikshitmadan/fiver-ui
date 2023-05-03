import React from 'react'
import './Reviews.scss'
import { Review } from '../Review/Review'
import { useState,useEffect } from 'react'
import { newRequest } from '../../../Utils/newRequest';
import { useParams } from 'react-router-dom'
export const Reviews = (props) => {
  console.log("key is",props.parent);
  const {id}=useParams();


  const fetchData=async()=>{
    try{
console.log(id);
      const res =await  newRequest.get(`/reviews/${id}`,{
        headers: {
          token:
            "Bearer "+JSON.parse(localStorage.getItem('currentuser')).token,
        }
      }
        
      );
      if(res){
        console.log(res.data);
        return res.data;
    }
  }
  catch(err){
    return err;
  }

  }

  

  const [data,setdata]=useState(null);
  useEffect(()=>{

fetchData().then((data)=>{
  console.log("setting data",data);
setdata(data);
})
  },[])
  const handleSubmit = async(e) => {
    try{
      e.preventDefault();
      const desc = e.target[0].value;
      const star = e.target[1].value;
    const data=  await newRequest.post(`/reviews/${id}`,{star:star,desc:desc},{
      headers: {
        token:
          "Bearer "+JSON.parse(localStorage.getItem('currentuser')).token,
      },
    });
  console.log(data,"handle submit");
  const res=await fetchData()
  setdata(res);
 
    }
    catch(err){

    }
  
  };

  
  return (
<div className="Reviewz">
            <h2>Reviews</h2>
         

            {data?(data.map((item)=>
              <Review id={item._id} review={item}/>
            )):"loading"}
          
          
  {!props.parent&&

          <div className="add">
        <h3>Add a review</h3>
        <form action="" className="addForm" onSubmit={handleSubmit}>
          <textarea placeholder="write your opinion" />
          <select name="" id="">
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
          </select>
          <button>Send</button>
        </form>
      </div>
}    
                      </div>
  )
}
