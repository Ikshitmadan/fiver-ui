import React, { useEffect, useState } from 'react'
import './Gigs.scss'
import { gigs } from '../../data';
import { GigCard } from '../GigCards/GigCard';
import { newRequest } from '../../../Utils/newRequest';
import { useLocation, useNavigate } from 'react-router-dom';
import { useRef } from 'react';
export const Gigs = () => {
    const [data,Setdata]=useState(null);
    const[loading,setloading]=useState(true);
    const [selected,setSelected]=useState(true);
    const [autherror,setautherror]=useState(null);
    const [sort,setSort]=useState("sales");
    const minRef = useRef();
    const maxRef = useRef();
    let  {search}=useLocation();
    const location=useLocation();
    console.log(location,"location");
    console.log(search,"ii");
    const navigate=useNavigate();


    async function fetchMyAPI() {
        try{

            if(search.length==0){
                search="?";
            }
            const res=await newRequest.get(`/gigs${search}&min=${minRef.current.value}&max=${maxRef.current.value}&sort=${sort}`
            );

            return res;
        }

        catch(err){
            console.log("err",err);
            if(err.response.data==="not authenticated"){
                navigate("/login");

            }
  
        }

    }

    const Resort=(type)=>{
    
setSort(type);
setSelected(false);
    }

    const submit=()=>{
        fetchMyAPI().then((res)=>{
            if(res)
            Setdata(res.data);
        })
    }

    useEffect( () => {
        console.log(`first useEffect`);
      
    fetchMyAPI().then((res)=>{
        console.log(res);
        if(res){
            Setdata(res.data);
            setloading(false);
        }
        
        else{
            console.log(res);
            
        }
        
    }).catch((err)=>{
        console.log(err);
    })
      
    }, [])

    useEffect(() => {
        console.log(`second useEffect`);
        fetchMyAPI().catch((err)=>{
            console.log(err);
        }). then((res)=>{
            console.log(res);
            if(res){
                Setdata(res.data);
                setloading(false);
            }
           
        })
      
    }, [sort])


    
    

  return (
 <div className="gigs">
     {data?.length==0&&!loading&&
       <h1 style={{display: 'inline-block', backgroundColor: 'red', textAlign: 'center', width: '100%'}}>No data to show</h1>
    
}
    
<div className="containe">
    <h1 className='breadcrumps'>Fiver artist</h1>
   
   

    <div className="menu">
        <div className="left">
            <input ref={minRef} type="text" placeholder='min'/>
            <input ref={maxRef} type="text" name="" id=""  placeholder='max' />
            <button onClick={submit}>Apply</button>
        </div>
        <div className="right">
            <span className="sortby">
                SortBy-
            </span>
            <span className="sortType">{sort}</span>
            <img src="./img/down.png" onClick={()=>setSelected(!selected)} alt="" srcset="" />
            {selected&&(
                <div className="rightmenu">
                <span onClick={()=>Resort("createdAt")}>createdAt</span>
                <span onClick={()=>Resort("sales")}>sales</span>
            </div>
)}
        </div>
    </div>

    <div className="cards">
        {data?(
            data.map((card=>
                <GigCard key={card._id} item={card}/>

            ))
        ):(<span>loading</span>)
        }
    </div>
</div>
 </div>
  )
}
