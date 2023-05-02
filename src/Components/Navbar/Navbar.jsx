import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Navbar.scss'
import { useState ,useEffect} from 'react'
import { newRequest } from '../../../Utils/newRequest';
export const Navbar = () => {
    const [active,setActive]=useState(true);
    const [selected,setselected]=useState(false);
    const navigate=useNavigate();


    const isActive=()=>{
        window.scrollY>0?(setActive(false)):setActive(true);
    }

    const currentUser=JSON.parse(localStorage.getItem("currentuser"));


    const handleLogout=async ()=>{
        try{
              await  newRequest.get('auth/logout');
            localStorage.removeItem("currentuser");
            console.log("logged-out");
            navigate("/");
        }
        catch(err){
            console.log(err);

        }
    


    }

    useEffect(()=>{
        const rem=window.addEventListener("scroll",isActive);
        return ()=>{
            rem;
        }

    },[])

    
    
  return (
  <nav className={active?"navbar":"navbar active"}>
    <div className="container">
        <div className="logo">
            <Link to="/">
            <span>Fiver</span>
            </Link>
           
            <span className='dot'>.</span>
        </div>
        <div className="links">
          
            {!currentUser&&<Link to="/login"><span>Sign in</span></Link>}
           {!currentUser&&<button><Link to='/register'>Join</Link>
            </button>}
           {currentUser&&(
            <div className="user" onClick={()=>selected?(setselected(false)):(setselected(true))}>
                <img src={currentUser.img||"/img/noavatar.jpg"} alt="" />
                <span>{currentUser?.username}</span>
               {selected&&

               ( <div className="options" >
                    {currentUser?.isSeller&&(
                        <>
                       <Link to='/gigs'>
                              
                           <span style={{color:"black"}} > gig</span>
                        
                            </Link>
                        <Link style={{color:"black"}}  to="/add">
                            Add new gigs
                        </Link > 
                      
                        </>
                    )

                    }

<Link style={{color:"black"}} className="link" to="/orders">
                    Orders
                  </Link>
                  <Link  style={{color:"black"}} className="link" to="/messages">
                    Messages
                  </Link>
                  <span style={{color:"black"}} onClick={handleLogout}>
                    Logout
                  </span>
                </div>)
}
            </div>
           )}
        </div>

    </div>

    <hr  className='hr'/>

    {/* <div className="menu">
        <span>Test</span>
        <span>Test2</span>
    </div> */}

  </nav>
  )
}
