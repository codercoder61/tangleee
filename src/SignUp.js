import React , {useState} from 'react'
import './SignUp.css'
import Logo2 from "./logo2.png"
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function SignUp() {
    const navigate = useNavigate();
    const [name,setName] = useState("")
    const [age,setAge] = useState("")
   
    const [phoneNumber,setPhoneNumber] = useState("")
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    
   

    const handleNameChange = (event)=>{
        setName(event.target.value)
    }
    const handleAgeChange = (event)=>{
        setAge(event.target.value)
    }
   
    const handlePhoneNumberChange = (event)=>{
        setPhoneNumber(event.target.value)
    }
    const handleEmailChange = (event)=>{
        setEmail(event.target.value)
    }
    const handlePasswordChange = (event)=>{
        setPassword(event.target.value)
    }
 
   
    const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await axios.post('https://soc-net.info/backend/addUser.php', {
      name: name,
      age: age,
      
      phoneNumber: phoneNumber,
      email: email,
      password: password,
     
     
    });
   
      navigate('/');
  } catch (error) {
    console.error('Error sending data:', error);
  }
};

  return (
    <div id="login">
      <p className="welcome">Create Account<br/>To get Started Now!</p>
      <img width='150' src={Logo2} alt="logo"/>
      <form onSubmit={handleSubmit}>
        <div style={{position:"relative"}}>
            <input required value={name} onChange={handleNameChange} type="text" name="name"/>
            <div onClick={(e)=>{
	e.target.previousElementSibling.focus();
}} className={name!==""?"apply field":"field"}>Name</div>
        </div>
        <div style={{position:"relative"}}>
            <input required value={age} onChange={handleAgeChange} type="text" name="age"/>
            <div onClick={(e)=>{
	e.target.previousElementSibling.focus();
}} className={age!==""?"apply field":"field"}>Age</div>
        </div>
        
        <div style={{position:"relative"}}>
            <input required value={phoneNumber} onChange={handlePhoneNumberChange} type="text" name="phoneNumber"/>
            <div onClick={(e)=>{
	e.target.previousElementSibling.focus();
}} className={phoneNumber!==""?"apply field":"field"}>Phone number</div>
        </div>
        <div style={{position:"relative"}}>
            <input required value={email} onChange={handleEmailChange} type="text" name="email"/>
            <div onClick={(e)=>{
	e.target.previousElementSibling.focus();
}} className={email!==""?"apply field":"field"}>Email</div>
        </div>
        <div style={{position:"relative"}}>
            <input required value={password} onChange={handlePasswordChange} type="password" name="password"/>
            <div onClick={(e)=>{
	e.target.previousElementSibling.focus();
}} className={password!==""?"apply field":"field"}>Password</div>
        </div>
       
        
        <input style={{backgroundColor:"white",color:"#ee2a47",fontSize:"1.3em",fontWeight:"bold"}} type="submit" value="Sign Up" name="login"/>
        <p style={{fontWeight:'bold',margin:"10px 0 30px",color:"#fff",fontSize:"0.8em"}}>Already have an account?<Link to='/'><span style={{marginLeft:"5px",color:"#fff",fontSize:"1.4em"}}>Login Now</span></Link></p>
      </form>
    </div>
  )
}

export default SignUp
