import React, { useState } from 'react'
import './Gig.scss';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { newRequest } from '../../../../fiverbackend/Utils/newRequest';
import { fetchUser } from '../GigCards/GigCard';
import { Reviews } from '../Reviews/Reviews';
import { Link } from 'react-router-dom';
import Slider from "react-slick";


export const Gig = () => {
  const navigate=useNavigate();
const[data,setdata]=useState(null);
const[err,Seterr]=useState("");
  const {id}=useParams();
  const user= JSON.parse(localStorage.getItem('currentuser'));
  console.log(user._id);
  const fetchData=async ()=>{
    try{
      const res=await  newRequest.get(`gigs/single/${id}`);
      console.log(res,"res");
      if(res){
        const user=await fetchUser(res.data.userId);

        return {...res.data,username:user.data.username,userimg:user.data.img};
      }
    }
    catch(err){
      Seterr(err.response.message)
    throw  new Error("error");
     

    }


  }
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };



  useEffect(()=>{

fetchData().then(data=>{
    console.log(data);
    setdata(data);
  
}).catch((err)=>{
  // Seterr(err)
});


  },[])

  const handleBuy=async()=>{



  }

  return (
  <div className="Gig">
   {data? ( <div className="container">
        <div className="left">

          <span className='cat'>{data.cat} </span>
          <h1 >{data.title}</h1>
          <div className="rating">
            <img className='pp' srcSet={data.userimg} />
            <span className="name">{data.username}</span>
            {data.totalStars!=0?Array(Math.round(data.totalStars/data.starNumber)).fill(<img src="/img/star.png" alt="" />):<img src="/img/star.png" alt="" />
              
            }
            
            {/* <img src="/img/star.png" alt="" />
            <img src="/img/star.png" alt="" />
            <img src="/img/star.png" alt="" />
            <img src="/img/star.png" alt="" /> */}

            

          </div>

       {data.images.length!=0&&
        <div className="slid">

      
          <Slider {...settings} >

            { data.images&& data.images.map((img)=>(
                <img className='prod' src={img} key={img}/>
              ))
            }
            {/* <img
              src="https://images.pexels.com/photos/1074535/pexels-photo-1074535.jpeg?auto=compress&cs=tinysrgb&w=1600"
              alt=""
            />
            <img
              src="https://images.pexels.com/photos/1462935/pexels-photo-1462935.jpeg?auto=compress&cs=tinysrgb&w=1600"
              alt=""
            />
            <img
              src="https://images.pexels.com/photos/1054777/pexels-photo-1054777.jpeg?auto=compress&cs=tinysrgb&w=1600"
              alt=""
            /> */}
          </Slider>
          </div>
}

          <h2>About this Gig</h2>
          <div className="about">
            <p style={{lineHeight:'25px'}}
            
            >{data.desc}</p>
          </div>
          
        
            
                
                    <Reviews parent={true}/>

                  
            
            
             
            
            


        </div>
        <div className="right">
          <div className="bill">
            <div className="topic">  1 {data.shortTitle}</div>
            <div className="price">{"Rs "+data.price}</div>

          </div>
          <div className="details">
      {data?.features.map((feature)=>(
        <div>
{feature}
        </div>
        
        
        
        

      )
      
      )
    

      }
        <div>{"delivery time "+data.deliveryTime+" days"}</div>
          </div>

          <Link to={`/pay/${id}`}>
          <button  className='buybtn'>
            Buy-Now
          
            </button>
            </Link>

          <p></p>
        </div>
      
     
     </div>):("loading")

}
      
    </div>
  )
}
