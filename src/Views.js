import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function PersonalInfo() {
  const navigate = useNavigate();

    const [viewedUsers, setViewedUsers] = useState([]);
    const [viewingUsers, setViewingUsers] = useState([]);
    const [toggle,setToggle] = useState(false)



 

  useEffect(()=>{
      getViewed()
      getViewing()
    },[])
  const  getViewed = async () =>{
          const response = await axios.post('https://soc-net.info/backend/getViewed.php', {
                email: localStorage.getItem('userEmail'),
              });
  
            //(response.data);
            setViewedUsers(response.data)
      }
    const  getViewing = async () =>{
          const response = await axios.post('https://soc-net.info/backend/getViewing.php', {
                email: localStorage.getItem('userEmail'),
              });
  
            //(response.data);
            setViewingUsers(response.data)
      }
  return (
    <div>
      <div style={{background:'linear-gradient(to right, rgb(238, 42, 71), rgb(235, 200, 155))',zIndex:'5000',display:'flex',padding:'20px',justifyContent:"space-between",alignItems:'center',width:'100%',marginBottom:'20px',position:'fixed',right:'0',left:'0',top:"0"}}>
        <span onClick={()=>setToggle(false)} style={{color:!toggle?'white':'gray'}}>Profile Viewed</span>
        <span style={{color:'white'}}>|</span>
        <span onClick={()=>setToggle(true)} style={{color:toggle?'white':'gray'}}>Viewed My Profile</span>
      </div>
      {!toggle && <div style={{width:'100%',marginTop:'65px',display:'flex',flexWrap:'wrap'}}>
        {viewedUsers && viewedUsers.map((elm, index) => (
            <div onClick={()=>{navigate(`/info/${elm.user.id}`);}} key={index} style={{width: '110px', height: '110px',position:'relative', display: 'inline-block', margin: '5px 5px 0px'}}>
{elm.image && <img style={{ width: '110px', height: '110px', objectFit: 'cover', margin: '10px 0px 5px' }} key={index} src={`https://soc-net.info/backend/uploads/${elm.image.name}`} alt={`Person ${index}`} />}
          
            <div style={{position: 'absolute', bottom: '10px', left: '10px', color: 'white', backgroundColor: 'rgba(0,0,0,0.5)',fontSize:'0.6em', padding:'5px'}}>
                {elm.user.name} {elm.user.city},{elm.user.country}
            </div>
          
            </div>
        ))}
      </div>}
      {toggle && <div style={{width:'100%',marginTop:'65px',display:'flex',flexWrap:'wrap'}}>
        {viewingUsers && viewingUsers.map((elm, index) => (
            <div onClick={()=>{navigate(`/info/${elm.user.id}`);}} key={index} style={{width: '110px', margin: '5px 5px 0px', height: '110px',position:'relative', display: 'inline-block'}}>
          {elm.image && <img style={{ width: '110px', height: '110px', objectFit: 'cover', margin: '10px 0px 5px' }} key={index} src={`https://soc-net.info/backend/uploads/${elm.image.name}`} alt={`Person ${index}`} />}
          
            <div style={{position: 'absolute', bottom: '10px', left: '10px', color: 'white', backgroundColor: 'rgba(0,0,0,0.5)',fontSize:'0.6em', padding:'5px'}}>
                {elm.user.name} {elm.user.city},{elm.user.country}
            </div>
          
            </div>
        ))}
      </div>}
      
      <div style={{zIndex:'6000',background:'linear-gradient(to right, rgb(238, 42, 71), rgb(235, 200, 155))',padding:'20px',position:'fixed',width:"100%",left:'0',right:"0",bottom:"0px",display:"flex",justifyContent:"space-between",alignItems:'flex-end'}}>
              <Link to="/main"><i className="fa-solid fa-house"></i></Link>
              <Link to="/views"><i style={{color:'white'}}className="fa-solid fa-eye"></i></Link>
              <Link to="/favourite"><i className="fa-solid fa-star"></i></Link>
              <Link to="/like"><i className="fa-solid fa-heart"></i></Link>
              <Link to="/personalInfo"><i  className="fa-solid fa-user"></i></Link>
      </div>
    </div>
  )
}

export default PersonalInfo
