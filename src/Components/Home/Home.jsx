import React from 'react'
import { Featured } from '../Featured/Featured'
import { Slide } from '../Slide/slide'
import { cards } from '../../data'
import { Catcard } from '../Catcard/Catcard'
import { projects } from '../../data'
import './Home.scss';
import { Projectcard } from '../Projectcard/Projectcard'
import { Footer } from '../../Footer/Footer'

export const Home = () => {
  return (
    <div className="home">
        <Featured/>
        <div className="slide">
        <Slide  slidesToShow={6} arrowScroll={5}>
            {cards.map(card=>(
<Catcard key={card.id} item={card}/>
            ))

            }
</Slide>
        </div>

<div className="features">
    <div className="container">
        <div className="content">
            <h1>A whole world freelancer at your fingertips</h1>
            <div className="text">
                <h3>best for budget</h3>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum corporis non modi.</p>
            </div>
            <div className="text">
                <h3>best for budget</h3>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum corporis non modi.</p>
            </div>
            <div className="text">
                <h3>best for budget</h3>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum corporis non modi.</p>
            </div>
           
        </div>
        <div className="videoContainer">
        <iframe height="480"   
src="https://www.youtube.com/embed/il_t1WVLNxk">
</iframe>
        </div>
    </div>
</div>
{/* <div style={{backgroundColor:'#F5F5F5'}}>


       <Slide  slidesToShow={4} arrowScroll={4} >
            {projects.map(card=>(
<Projectcard key={card.id} item={card}/>
            ))

            }
</Slide>
</div> */}

    </div>
  )
}
