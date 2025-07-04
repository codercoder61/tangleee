import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Favourite() {
  const navigate = useNavigate();

    const [favouriteUsers, setFavouriteUsers] = useState([]);
    const [favouringUsers, setFavouringUsers] = useState([]);
    const [toggle,setToggle] = useState(false)
const [flag,setFlag] = useState(false)



const fetchFlag = async (e) => {
  
    try {
      const response = await axios.post('https://soc-net.info/backend/flag.php', {
        email: localStorage.getItem('userEmail')
      });
      //console.log(response.data)
      if(response.data.success){
	setFlag(true)
      }
    } catch (err) {
      console.error(err);
    }
  };
 

useEffect(()=>{
	fetchFlag()
},[])

  useEffect(()=>{
      getFavourite()
      getFavouring()
    },[])
  const  getFavourite = async () =>{
          const response = await axios.post('https://soc-net.info/backend/getFavourite.php', {
                email: localStorage.getItem('userEmail'),
              });
  
            //(response.data);
            setFavouriteUsers(response.data)
      }
    const  getFavouring = async () =>{
          const response = await axios.post('https://soc-net.info/backend/getFavouring.php', {
                email: localStorage.getItem('userEmail'),
              });
  
            //(response.data);
            setFavouringUsers(response.data)
      }
  return (
    <div>
      <div style={{background:'linear-gradient(to right, rgb(238, 42, 71), rgb(235, 200, 155))',zIndex:'5000',display:'flex',padding:'20px',justifyContent:"space-between",alignItems:'center',width:'100%',marginBottom:'20px',position:'fixed',right:'0',left:'0',top:"0"}}>
        <span onClick={()=>setToggle(false)} style={{color:!toggle?'white':'gray'}}>My Favourites</span>
        <span style={{color:'white'}}>|</span>
        <span onClick={()=>setToggle(true)} style={{color:toggle?'white':'gray'}}>I'm their favourite</span>
      </div>
      {!toggle && <div style={{width:'100%',marginTop:'65px',display:'flex',flexWrap:'wrap'}}>
        {favouriteUsers && favouriteUsers.map((elm, index) => (
            <div onClick={()=>{navigate(`/info/${elm.user.id}`);}} key={index} style={{width: '110px', height: '110px',position:'relative', display: 'inline-block', margin: '5px 5px 0px'}}>
          {elm.image && <img style={{ width: '110px', height: '110px', objectFit: 'cover', margin: '10px 0px 5px' }} src={`https://soc-net.info/backend/uploads/${elm.image.name}`} alt={`Person ${index}`} />}
          
            <div style={{position: 'absolute', bottom: '10px', left: '10px', color: 'white', backgroundColor: 'rgba(0,0,0,0.5)',fontSize:'0.6em', padding:'5px'}}>
                {elm.user.name} {elm.user.city},{elm.user.country}
            </div>
          
            </div>
        ))}
      </div>}
      {toggle && <div style={{width:'100%',marginTop:'65px',display:'flex',flexWrap:'wrap'}}>
        {favouringUsers && favouringUsers.map((elm, index) => (
            <div onClick={()=>{navigate(`/info/${elm.user.id}`);}} key={index} style={{width: '110px', height: '110px',position:'relative', display: 'inline-block', margin: '5px 5px 0px'}}>
          {elm.image && <img style={{ width: '110px', height: '110px', objectFit: 'cover', margin: '10px 0px 5px' }} src={`https://soc-net.info/backend/uploads/${elm.image.name}`} alt={`Person ${index}`} />}
          
            <div style={{position: 'absolute', bottom: '10px', left: '10px', color: 'white', backgroundColor: 'rgba(0,0,0,0.5)',fontSize:'0.6em', padding:'5px'}}>
                {elm.user.name} {elm.user.city},{elm.user.country}
            </div>
          
            </div>
        ))}
      </div>}
      
      <div style={{zIndex:'6000',background:'linear-gradient(to right, rgb(238, 42, 71), rgb(235, 200, 155))',padding:'20px',position:'fixed',width:"100%",left:'0',right:"0",bottom:"0px",display:"flex",justifyContent:"space-between",alignItems:'flex-end'}}>
              <Link to="/main"><i className="fa-solid fa-house"></i></Link>
              <Link to="/views"><i className="fa-solid fa-eye"></i></Link>
              <Link to="/favourite"><i style={{color:'white'}} className="fa-solid fa-star"></i></Link>
              <Link to="/like"><i className="fa-solid fa-heart"></i></Link>
<Link style={{position:'relative'}} to='/messages'><i className="fa-solid fa-message"></i>{flag && <span style={{width:'8px',position:'absolute',borderRadius:'50%',left:'7px',bottom:'17px',top:'-2px',height:'8px',display:'block',backgroundColor:'red'}}></span>}</Link>

              <Link to="/personalInfo"><i  className="fa-solid fa-user"></i></Link>
      </div>
    </div>
  )
}

export default Favourite
