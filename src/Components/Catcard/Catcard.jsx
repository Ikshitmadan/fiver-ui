import React from 'react'
import { Link } from 'react-router-dom'
import './Catcard.scss'
export const Catcard = ({item}) => {
  const url=`/gigs?cat=${item.title}`
  return (
    <Link to={url}>
    <div className="catcard">
     <div className="container">
<img src={item.img} alt="" />
<div className="title">{item.title}</div>
<div className="desc">{item.desc}</div>

        </div>
    </div>
    </Link>
  )
}
