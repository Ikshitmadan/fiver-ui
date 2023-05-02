import React, { useEffect, useState } from 'react'
import './Featured.scss';
import { useNavigate } from 'react-router-dom';
export const Featured = () => {
  const [search,setsearch]=useState("");
  const navigate=useNavigate();

  const submit=()=>{
    console.log(search,"hi");

    if(search.length===0){
      return;
    }
    navigate(`/gigs?search=${search}`);
  }


  return (
   <div className="featured">
    <div className="container">
      <div className="left">
      <h1> find the  perfect   freelance service for your Buissness</h1>
<div className="search">
<div className="searchbar">
      <input  type="text" name="" id=""  placeholder='Search the best' onChange={(e)=>setsearch(e.target.value)}/>
      <button onClick={submit}>Search </button>
      </div>
    
</div>
    

      </div>
      <div className="right">
        <img src="./img/man.png" alt="" />
      </div>
    </div>
   </div>
  )
}
