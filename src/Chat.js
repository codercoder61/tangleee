import React, { useEffect, useRef,useState } from 'react';
import './Chat.css'
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useParams } from 'react-router-dom';

import { useNavigate } from 'react-router-dom';



let userEmail = null

function Chat() {
const me = useRef(null)
function scrollToBottom() {
  me.current.scrollTop = me.current.scrollHeight;
}

useEffect(() => {
  if (me.current) {
    const observer = new MutationObserver(scrollToBottom);
    observer.observe(me.current, {
      childList: true,
      subtree: false
    });

    return () => observer.disconnect();
  }
}, []);
function formatTime(datetimeString) {
  const inputDate = new Date(datetimeString);
  const now = new Date();

  const isToday = inputDate.toDateString() === now.toDateString();

  // Format hours and minutes in 12-hour format with AM/PM
  const hours = inputDate.getHours();
  const minutes = inputDate.getMinutes().toString().padStart(2, '0');
  const formattedHour = (hours % 12 || 12); // No padding if not today

  // Format for "6th", "21st", etc.
  const day = inputDate.getDate();
  const suffix =
    day % 10 === 1 && day !== 11 ? 'st' :
    day % 10 === 2 && day !== 12 ? 'nd' :
    day % 10 === 3 && day !== 13 ? 'rd' : 'th';

  const month = inputDate.toLocaleString('default', { month: 'long' }); // "June"

  const timeString = isToday
    ? `${formattedHour.toString().padStart(2, '0')}:${minutes} today`
    : `${formattedHour}:${minutes} ${day}${suffix} ${month}`;

  return timeString;
}

 const { id } = useParams();
 const navigate = useNavigate();
 const [data,setData]=useState(null)
 const [data2,setData2]=useState(null)
const  [messages,setMessages]=useState(null)
const  [message,setMessage]=useState("")
 const [name,setName]=useState("")
const [currentUserImages,setCurrentUserImages]=useState(null)

const [userImages2,setUserImages2]=useState(null)
const fetchData = async () => {
      try {
        // 1. Get Other User's Data
        const userDataRes = await axios.post('https://soc-net.info/backend/getUserData.php', { id });
        setData(userDataRes.data[0]);

        // 2. Get Other User's Images
        const userImagesRes = await axios.post('https://soc-net.info/backend/getUserImages.php', { id });
        
setUserImages2(userImagesRes.data)
        // 3. Get Current User's Data
        const userEmail = localStorage.getItem('userEmail');
        const currentUserRes = await axios.post('https://soc-net.info/backend/getUserData.php', { email: userEmail });
        const currentUserData = currentUserRes.data[0];
        setData2(currentUserData);

        // 4. Get Current User's Images
        const currentUserImagesRes = await axios.post('https://soc-net.info/backend/getUserImages.php', { id: currentUserData.id });
        
setCurrentUserImages(currentUserImagesRes.data)
      } catch (error) {
        console.error('Error in fetching user data:', error);
      }
    };
 useEffect(() => {
    
	if(id)
    		fetchData();
  }, [id]);
	const fetchMessages = async (id_res,id_send) => {
      try {
        const messagesRes = await axios.post('https://soc-net.info/backend/getMessages.php', {
          idOne: id_res, // Replace with actual logic
          idTwo: id_send,
        });
        setMessages(messagesRes.data);
	
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };
  useEffect(() => {
    
	if(id && data && data2.id)
    	   fetchMessages(id,data2.id);
  }, [data2]);

useEffect(() => {
    if(data!=null)
    	setName(data.name)
    
  }, [data]); 

const sendMessage = async () => {
  if (message.trim() !== "") {
    try {
      const response = await axios.post('https://soc-net.info/backend/addMsg.php', {
        id_res: data2.id,              // Receiver ID from route or state
        id_send: id,       // Sender ID (current user)
        content: message.trim()  // Cleaned message
      });

      

      // Optional: Clear input after sending
      setMessage("");
	

    } catch (error) {
      console.error('Error sending message:', error);
    }
  }
};

useEffect(() => {
if(id && data && data2.id){
  const interval = setInterval(() => {
    fetchMessages(id,data2.id); // your function to get new messages
  }, 2000); // every 3 seconds
  return () => clearInterval(interval); // cleanup on unmount
}

}, [data2]);

  return (
    <>
  	<div style={{display:'flex',fontWeight:'bold',justifyContent:'center',backgroundColor:'rgba(255,150,150,0.2)',color:'#fff',padding:'20px'}}>Chat with : {data && name}</div>


<div ref={me} style={{paddingBottom:'30px',maxHeight:'500px',overflowY:'scroll',positon:'relative',display:'flex',flexDirection:'column',color:'white'}}>
{messages && userImages2 && currentUserImages && messages.map((elm, index) => (
  elm.id_reciever == id ? (
    <div style={{display:'flex',margin:'5px 0',alignItems:'center'}} key={elm.id}>
      <img width='50' height='50' style={{objectFit:'cover',borderRadius:'50%',marginRight:'5px'}} src={`https://soc-net.info/backend/uploads/${userImages2[0]?.name}`} alt={`photo ${elm.id}`} />
      <div style={{display:'flex',flexDirection:'column'}}><span style={{backgroundColor:'red',padding:'10px 20px',borderRadius:'25px'}}>{elm.messageContent}</span><span style={{fontSize:'0.6em'}}>{formatTime(elm.messageTime)}</span></div>
    </div>
  ) : (
    <div style={{display:'flex',margin:'5px 0',alignSelf:'flex-end',alignItems:'center'}} key={elm.id}>
      <div style={{display:'flex',flexDirection:'column'}}><span style={{backgroundColor:'pink',padding:'10px 20px',borderRadius:'25px'}}>{elm.messageContent}</span><span style={{fontSize:'0.6em'}}>{formatTime(elm.messageTime)}</span></div>
<img width='50' height='50' style={{marginLeft:'10px',objectFit:'cover',borderRadius:'50%'}} src={`https://soc-net.info/backend/uploads/${currentUserImages[0]?.name}`} alt={`photo ${elm.id}`} />
    </div>
  )
))}
<div style={{color:'white',padding:'15px',display:'flex',flexDirection:'column',justifyContent:'center',border:'none',outline:'none',bottom:'60px',width:'100%',height:'70px',position:'absolute',backgroundColor:'#ee304a'}}>
<textarea value={message} onChange={(e)=>setMessage(e.target.value)}style={{width:'85%',fontSize:'1.4em',color:'white',backgroundColor:'#ee304a',outline:'none',border:'none'}}></textarea>
<i onClick={sendMessage}style={{color:'white',position:'absolute',bottom:'30px',right:'25px',fontSize:'1.3em'}} className="fa-solid fa-paper-plane"></i></div></div>













  
      <div style={{ background:'linear-gradient(to right, rgb(238, 42, 71), rgb(235, 200, 155))',padding: '20px', zIndex: '20000', position: 'fixed', width: "100%", left: '0', right: "0", bottom: "0px", display: "flex", justifyContent: "space-between", alignItems: 'flex-end' }}>
        <Link to="/main"><i style={{ color: 'white' }} className="fa-solid fa-house"></i></Link>
        <Link to="/views"><i className="fa-solid fa-eye"></i></Link>
        <Link to="/favourite"><i className="fa-solid fa-star"></i></Link>
        <Link to="/like"><i className="fa-solid fa-heart"></i></Link>
        <Link to="/personalInfo"><i className="fa-solid fa-user"></i></Link>
      </div>
   </>
  );
}

export default Chat
