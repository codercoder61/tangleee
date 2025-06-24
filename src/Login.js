import React , {useState} from 'react'
import './Login.css'
import Logo from "./logo.png"
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
    const navigate = useNavigate();

    const [email,setEmail] = useState("")
    const [flag,setFlag] = useState(false)
    const [password,setPassword] = useState("")
    const handleEmailChange = (event) =>{
        setEmail(event.target.value)
    }
    const handlePasswordChange = (event) =>{
        setPassword(event.target.value)
    }
    const handleSubmit = async (e) => {
      e.preventDefault();
    
      try {
        const response = await axios.post('https://soc-net.info/backend/auth.php', {
          email: email,
          password: password,
        });
    
        //response.data);
        if(response.data===1){
            localStorage.setItem('userEmail', email);
            navigate('/main');
        }else{
            setFlag(true)
        }
      } catch (error) {
        console.error('Error sending data:', error);
      }
    };
    
  return (
    <div id="login2">
      <img width='250' src={Logo} alt="logo"/>
      <p className="welcome">Welcome<br/>Glad to see you!</p>
      <form onSubmit={handleSubmit}>
        <div style={{position:"relative"}}>
            <input required value={email} onChange={handleEmailChange} type="text" name="email"/>
            <div onClick={(e)=>{
	e.target.previousElementSibling.focus();
}} className={email!==""?"apply field":"field"}>Email / Phone Number</div>
        </div>
        <div style={{position:"relative"}}>
            <input required value={password} onChange={handlePasswordChange}  type="password" name="password"/>
            <div onClick={(e)=>{
	e.target.previousElementSibling.focus();
}} className={password!==""?"apply field":"field"}>Password</div>
        </div>
        <input style={{backgroundColor:"white",color:"#E63946",fontSize:"1.3em",fontWeight:"bold"}} type="submit" value="Login" name="login"/>
        {flag && <p style={{color:'#fff'}}>Sorry , we can't find you.</p>}
        <p style={{fontWeight:'bold',marginTop:"10px",color:"#fff",fontSize:"0.8em"}}>Don't have an Account ?<Link to="/signup"><span style={{marginLeft:"5px",color:"#fff",fontSize:"1.4em"}}>Sign Up Now</span></Link></p>
      </form>
    </div>
  )
}

export default Login
