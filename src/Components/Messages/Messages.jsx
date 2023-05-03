import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Messages.scss";
import { newRequest } from '../../../Utils/newRequest';
import moment from "moment";

const Messages = () => {
  const currentUser= JSON.parse(localStorage.getItem("currentuser"),{
    headers: {
      token:
        "Bearer "+JSON.parse(localStorage.getItem('currentuser')).token,
    }
  });
console.log(currentUser);
  const fetch=async()=>{
    try{
      const res=await newRequest.get('/conversations')
      if(res){
        return res.data;
      }
      return [];
    }
    catch(err){
      console.log(err);
    }
    
  }


  
  const [data,setdata]=useState(null);
  useEffect(()=>{
    
    fetch().then((data)=>{
      setdata(data);
    })

  },[])

  const handleRead=async(id,e)=>{
    try{
      console.log(`id inside handle Read`);
      const {data}=await newRequest.put(`/conversations/${id}`);
      console.log(data);
      console.log(e.target.style);
      e.target.style.display=`none`;
     
    }
    catch(err){
      console.log(err);
    }
   
  }
  

  return (
 <div className="messages">
    {data?(

      <div className="container">
        <div className="title">
          <h1>Messages</h1>
        </div>
        <table>
          <tbody/>
          <tr>
            <th>{currentUser.isSeller ? "Buyer" : "Seller"}</th>
            <th>Last Message</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
         {data.map((c)=>{
        return   <tr key={c._id} className={
          ((currentUser.isSeller && !c.readySeller) ||
            (!currentUser.isSeller && !c.readByBuyer)) &&
          "active"
        }>
            <td>{currentUser.isSeller ? c.BuyerId : c.sellerId}</td>
            <td>
              <Link to={`/message/${c.id}`} className="link">
                {c.lastMessage? c.lastMessage.substring(0, 100):"add new chat"}
              </Link>
            </td>
            <td>{moment(c.updatedAt).fromNow()}</td>
            <td>
            {((currentUser.isSeller && !c.readySeller) ||
                    (!currentUser.isSeller && !c.readByBuyer)) && (
                    <button onClick={(e) => handleRead(c.id,e)}>
                      Mark as Read
                    </button>
                  )||("add msg")}
            </td>
          </tr>
         })       
}
        <tbody/>
        </table>
        </div>
    ):"loading"
    }
   </div>

  
 
 );
};

export default Messages;
