import React, { useEffect, useState } from 'react'
import './Review.scss';
import { newRequest } from '../../../../fiverbackend/Utils/newRequest';
import { fetchUser } from '../GigCards/GigCard';
export const Review = ({review}) => {
  
  const [data,setdata]=useState(null);


  useEffect(()=>{
fetchUser(review.UserId).then((res)=>{
  setdata(res.data);
})
  },[])
 
  return (

    <div className="items">     
   {data?(

    <div className="user">
    <img
      className="pp"
      src={data.img||'/img/noavatar.jpg'} alt=""/>             
     <div className="name">
        {data.username}</div>

    </div>
   ):"loading"
}
    <div className="stars">
    {Array(review.star)
          .fill()
          .map((item, i) => (
            <img src="/img/star.png" alt="" key={i} />
          ))}
      
   
    </div>
    <p> {review.desc}</p>
    <div className="helpful">
    <span>Helpful?</span>
        <img src="/img/like.png" alt="" />
        <span>Yes</span>
        <img src="/img/dislike.png" alt="" />
        <span>No</span>
    </div>
    <hr />
    </div>

  )
}
