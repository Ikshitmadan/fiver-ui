import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { newRequest } from '../../../Utils/newRequest';
import { useLocation } from 'react-router-dom'
export const Success = () => {
    const { search } = useLocation();

    console.log(`sucesssssss`);
const navigate=useNavigate()
const params = new URLSearchParams(search);
const payment_intent = params.get("payment_intent");

const confirm=async()=>{
    try{
        await newRequest.put(`/orders/`,{
            payment_intent:payment_intent  
        },{
            headers: {
                token:
                  "Bearer "+JSON.parse(localStorage.getItem('currentuser')).token,
              }
        })
        navigate('/orders');
    }
    catch(err){

    }

}
    useEffect(()=>{
        setTimeout(()=>{
            confirm()
        },3000)

    },[])
  return (
    <div>sucs</div>
  )
}
