import React, { useEffect, useState } from 'react'
import './Order.scss';
import { Link, useNavigate } from 'react-router-dom';
import { newRequest } from '../../../Utils/newRequest';

export const Order = () => {
  const [data,setdata]=useState(null);
  const navigate=useNavigate();

  const fetchOrders=async()=>{
    try{
      const res= await newRequest.get('/orders',{
        headers: {
          token:
            "Bearer "+JSON.parse(localStorage.getItem('currentuser')).token,
        }
      });
      
      console.log(res.data);
return res.data;

    }
    catch(err){

    }
 

  }

  const currentUser = JSON.parse(localStorage.getItem("currentuser"));

  const handleSubmit=async (orderr)=>{

    const sellerId=orderr.sellerId;
    const buyerId=orderr.buyerId;
    const covId=sellerId+buyerId;
    console.log(covId,sellerId,buyerId);
    try{
     
      const res =await newRequest.get(`/conversations/single/${covId}`);
      navigate(`/message/${covId}`);
    }
    catch(err){
      console.log(err);

      if(err.response.status===404){
const res=await newRequest.post(`/conversations/`,{
  id:(currentUser.isSeller)?(buyerId):(sellerId)
});
navigate(`/message/${res.data.id}`);

      }

    }
 


  }



  useEffect(()=>{
fetchOrders().then((data)=>{
  setdata(data);
  console.log(data);
  
})

  },[])


    
      return (
        <div className="MyOrders">
          <div className="container">
            <div className="titl">
              <h1>{currentUser.isSeller ? "Gigs" : "Orders"}</h1>
              {currentUser.isSeller && (
                <Link to="/add">
                  <button>Add New Gig</button>
                </Link>
              )}
            </div>
    {data&&data.length!=0?(
           
            <table>
              <tbody>
              <tr>
              <th>Image</th>
            <th>Title</th>
            <th>Price</th>
            {/* {<th>{currentUser.isSeller ? "Buyer" : "Seller"}</th>} */}
            <th>Contact</th>

              </tr>
              {data.map((order) => (
              <tr key={order._id}>
                <td>
                  <img className="image" src={order.img} alt="" />
                </td>
                <td>{order.title}</td>
                <td>{order.price}</td>
                <td>
                  <img onClick={()=>handleSubmit(order)}
                    className="message"
                    src="./img/message.png"
                    alt=""
                  />
                </td>
              </tr>
            ))}
              </tbody>
            </table>):
            (
              "loading"
            )
}
          </div>
        </div>
      );
  
}
