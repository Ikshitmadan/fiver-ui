import React from 'react'
import './Projectcard.scss'
export const Projectcard = ({item}) => {
  return (
    <div className="projectcard">
        <div className="container">
            <img src={item.img} alt="" />
            <div className="info">
                <img src={item.pp} alt="" />

             <div className="descr">
             <div className="gigs">{item.cat}</div>
               <div className="user">{item.username}</div>
             </div>


            </div>
        </div>
    </div>
  )
}
