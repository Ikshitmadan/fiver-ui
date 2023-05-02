import React, { useState } from 'react'
import './Gigcard.scss';
import { Link, useParams } from 'react-router-dom';
import { newRequest } from '../../../Utils/newRequest';
import { useEffect } from 'react';

export const fetchUser=async (userId)=>{
    try{
        const res= await    newRequest.get(`user/${userId}`)
        console.log(res.data);
        return res;
    }
    catch(err){
        console.log(err);
    }

}
export const GigCard = ({item}) => {
    const params=useParams();
    console.log(params);
    const [user,setuser]=useState(null);

  

    useEffect(()=>{
        fetchUser(item.userId).then((res)=>{
            setuser(res.data);
        })

    },[])
    


  return (
    <Link to={`/gig/${item._id}`}
    >
    <div className='Gigcard'>
        <div className="image">
            <img src={item.cover} alt="" srcset="" />
        </div>
        {user?(<div className="author">
            <img src={user.img||'img/noavatar.jpg'} alt="" />
            <div className="name">{user.username}</div>
        </div>):("loading")}
        <div className="inform">
            <div className="gig-desc">
               {item.shortDesc||item.desc.slice(0,115)}
            </div>
            <div className="gigRating">
                <img src="./img/star.png" alt="" />
<span>{!isNaN(Math.round(item.totalStars/item.starNumber))&&Math.round(item.totalStars/item.starNumber) }</span>
            </div>

        </div>
        <hr />
        <div className="details">
            <img src="./img/heart.png" alt="" srcset="" />
            <span>{item.price}</span>
        </div>
      
    </div>
    </Link>
  )
}
