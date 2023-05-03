import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import './Message.scss'
import moment from 'moment';
import { newRequest } from '../../Utils/newRequest';
export const Message = () => {

  const {id}=useParams();
  const {_id}=  JSON.parse(localStorage.getItem("currentuser"))

  console.log(_id);
  const [message,setmessage]=useState(null);
const[text,settext]=useState("");
  const fetch=async()=>{
    try{
      const {data} =await  newRequest.get(`/messages/${id}`,{
        headers: {
          token:
            "Bearer "+JSON.parse(localStorage.getItem('currentuser')).token,
        }
      });
      setmessage(data);
      
    }
    catch(err){

    }
 

  }

  const handleSubmit=async()=>{
    try{
      await newRequest.post(`/messages/${id}`,{
        desc:text,
        conversationId:id
   
    },{
      headers: {
        token:
          "Bearer "+JSON.parse(localStorage.getItem('currentuser')).token,
      }
    })
    fetch()
    settext("");
  }
  catch(err){
    console.log(err);
  }





  }


  useEffect(()=>{

  fetch();

  },[])



  return (
   

    <div className="Message">

       {message?

       ( <div className="container">
        <span className="breadcrumbs">
          <Link to="/messages">Messages</Link> - John Doe 
        </span>
        <div className="messages">

         {message.map((item)=>{
return  <div className={item.userId == _id?("msg"):("msg owner")} key={item._id}>
<img
  src="https://images.pexels.com/photos/270408/pexels-photo-270408.jpeg?auto=compress&cs=tinysrgb&w=1600"
  alt=""
/>

<p>              
{item.desc}
</p>

         </div>
         })

          
}
           
        </div>

        <div className="text">
            <textarea name="" placeholder='Type your Message' id="" cols="30" rows="10" onChange={(e)=>settext(e.target.value)} value={text}></textarea>
            <button onClick={handleSubmit}>Send Message </button>
        </div>

        </div>
       ):("loading")
       }
        </div>

    
  )
}
