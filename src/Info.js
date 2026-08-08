import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';


function Info() {
  const { id } = useParams();
  const [flag,setFlag] = useState(false)

  const styles = {
  sliderContainer: {
    width: '320px',
    height: '300px',
    overflow: 'hidden',
    margin: 'auto',
    borderRadius: '12px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
  },
  slider: {
    display: 'flex',
    transition: 'transform 0.5s ease-in-out',
    width: '100%',
    height: '100%',
  },
  image: {
    width: '320px',
    height: '400px',
    objectFit: 'cover',
    flexShrink: 0,
  },
};
    const [data, setData] = useState([]);
    const [data23, setData23] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    useEffect(() => {
    
    axios.post('https://pneuexpress.online/tanglee/getUserData.php', {
      id: parseInt(id)
    })
    .then(response => {
      //(response.data);
      
      setData(response.data);
      //data)
    })
    .catch(error => {
      console.error('Error posting data:', error);
    });
    
  }, [id]);
const fetchFlag = async (e) => {
  
    try {
      const response = await axios.post('https://pneuexpress.online/tanglee/flag.php', {
        email: localStorage.getItem('userEmail')
      });
      //(response.data)
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
useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % data23.length);
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, [data23]);




  const handleFetch = async () => {
    try {
      const response = await axios.post('https://pneuexpress.online/tanglee/getUserImagesTwo.php', {
        email: localStorage.getItem("userEmail")
      });
      //response);
      setData23(response.data.images);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {

  handleFetch();

  const handleFetch2 = async () => {
    try {
      await axios.post('https://pneuexpress.online/tanglee/addView.php', {
        id_viewed: parseInt(id),
        email_viewer: localStorage.getItem('userEmail')
      });
    } catch (err) {
      console.error(err);
    }
  };

  handleFetch2();
}, [id]);
  
  return (
    <div>
      <div style={{textAlign:'center',background:'linear-gradient(to right, rgb(238, 42, 71), rgb(235, 200, 155))',zIndex:'5000',display:'flex',padding:'20px',justifyContent:"space-between",alignItems:'center',width:'100%',position:'fixed',right:'0',left:'0',top:"0"}}>
        <Link to="/main"><i style={{color:'white'}} className="fa-solid fa-arrow-left"></i></Link>
        <span style={{position:'absolute',top:'50%',left: '50%',
          transform: 'translate(-50%, -50%)',color:'white'}}>{data && data && data.name}</span>
        <Link to={`/chat/${data && data && data.id}`}><i className="fa-solid fa-message"></i></Link>
      </div>
      <div style={styles.sliderContainer}><div
        style={{
          ...styles.slider,
          transform: `translateX(-${currentIndex * 100}%)`,
        }}
      >
        {data23 && data23.map((src, index) => (
          <img key={index} src={`https://pneuexpress.online/tanglee/uploads/${src.name}`} alt={`Slide ${index}`} style={styles.image} />
        ))}
      </div></div>
      <div style={{padding:'20px',marginTop:'20px',color:'white',fontWeight:'bold'}}>
        Personal Info:
        <hr style={{backgroundColor:"white",width:'100%',margin:'auto'}} />
        <div style={{margin:'20px 0',display:'flex',flexDirection:'column'}}>
          <span>Name: {data && data && data.name}</span>
          <span>Age: {data && data && data.age}</span>
          <span>Number : {data && data && data.number}</span>
          <span>City: {data && data && data.city}</span>
          <span>Country: {data && data && data.country}</span>
        </div>
        Appearance:
                <hr style={{backgroundColor:"white",width:'100%',margin:'auto'}} />
        <div style={{margin:'20px 0',display:'flex',flexDirection:'column'}}>
          <span>Height: {data && data && data.height}</span>
          <span>Weight: {data && data && data.weight}</span>
          <span>Body Type: {data && data && data.bodyType}</span>
        </div>

        Life style:
        <hr style={{backgroundColor:"white",width:'100%',margin:'auto'}}/>

        <div style={{margin:'20px 0',display:'flex',flexDirection:'column'}}>
          <span>Drink: {data && data && data.drink}</span>
          <span>Smoke: {data && data && data.smoke}</span>
          <span>Marital Status: {data && data && data.maritalStatus}</span>
          <span>Have Children: {data && data && data.haveChildren}</span>
          <span>Number of Children: {data && data && data.numberOfChildren}</span>
          <span>Profession: {data && data && data.profession}</span>
          <span>Employment Status: {data && data && data.employmentStatus}</span>
          <span>Income: {data && data && data.income}</span>
          <span>Living Situation: {data && data && data.livingSituation}</span>
          <span>Willing to Relocate: {data && data && data.relocateWill}</span>
          <span>Looking for: {data && data && data.lookingFor}</span>

        </div>
  
        Background - Cultural Values
        <hr style={{backgroundColor:"white",width:'100%',margin:'auto'}}/>

        <div style={{margin:'20px 0 60px',display:'flex',flexDirection:'column'}}>
          <span>Nationality: {data && data && data.nationality}</span>
          <span>Education: {data && data && data.education}</span>
          <span>Language Spoken: {data && data && data.spokenLanguage}</span>
          <span>Religion: {data && data && data.religion}</span>
          <span>Ethnicity: {data && data && data.ethnicity}</span>
        </div>
  
      </div>
      <div style={{zIndex:'6000',background:'linear-gradient(to right, rgb(238, 42, 71), rgb(235, 200, 155))',padding:'20px',position:'fixed',width:"100%",left:'0',right:"0",bottom:"0px",display:"flex",justifyContent:"space-between",alignItems:'flex-end'}}>
              <Link to="/main"><i className="fa-solid fa-house"></i></Link>
              <Link to="/views"><i className="fa-solid fa-eye"></i></Link>
              <Link to="/favourite"><i className="fa-solid fa-star"></i></Link>
              <Link to="/like"><i className="fa-solid fa-heart"></i></Link>
<Link style={{position:'relative'}} to='/messages'><i className="fa-solid fa-message"></i>{flag && <span style={{width:'8px',position:'absolute',borderRadius:'50%',left:'7px',bottom:'17px',top:'-2px',height:'8px',display:'block',backgroundColor:'red'}}></span>}</Link>

              <Link to="/personalInfo"><i style={{color:'white'}} className="fa-solid fa-user"></i></Link>
      </div>
    </div>
  )
}

export default Info
