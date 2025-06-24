import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';


function Info() {
  const { id } = useParams();
  

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
    const [data2, setData2] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    useEffect(() => {
    
    axios.post('https://soc-net.info/backend/getUserData.php', {
      id: id
    })
    .then(response => {
      //(response.data);
      
      setData(response.data);
      //data)
    })
    .catch(error => {
      console.error('Error posting data:', error);
    });
    
  }, []);
useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % data2.length);
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, [data2]);

  const handleFetch = async () => {
    try {
      const response = await axios.post('https://soc-net.info/backend/getUserImages.php', {
        id: id
      });
      //response);
      setData2(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleFetch2 = async () => {
    try {
      const response = await axios.post('https://soc-net.info/backend/addView.php', {
        id_viewed: id,
        email_viewer: localStorage.getItem('userEmail')
      });
      //(response)
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(()=>{
      handleFetch()
      handleFetch2()
    },[])
  
  return (
    <div>
      <div style={{textAlign:'center',background:'linear-gradient(to right, rgb(238, 42, 71), rgb(235, 200, 155))',zIndex:'5000',display:'flex',padding:'20px',justifyContent:"space-between",alignItems:'center',width:'100%',position:'fixed',right:'0',left:'0',top:"0"}}>
        <Link to="/main"><i style={{color:'white'}} className="fa-solid fa-arrow-left"></i></Link>
        <span style={{position:'absolute',top:'50%',left: '50%',
          transform: 'translate(-50%, -50%)',color:'white'}}>{data && data[0] && data[0].name}</span>
        
      </div>
      <div style={styles.sliderContainer}><div
        style={{
          ...styles.slider,
          transform: `translateX(-${currentIndex * 100}%)`,
        }}
      >
        {data2 && data2.map((src, index) => (
          <img key={index} src={`https://soc-net.info/backend/uploads/${src.name}`} alt={`Slide ${index}`} style={styles.image} />
        ))}
      </div></div>
      <div style={{padding:'20px',marginTop:'20px',color:'white',fontWeight:'bold'}}>
        Personal Info:
        <hr style={{backgroundColor:"white",width:'100%',margin:'auto'}} />
        <div style={{margin:'20px 0',display:'flex',flexDirection:'column'}}>
          <span>Name: {data && data[0] && data[0].name}</span>
          <span>Age: {data && data[0] && data[0].age}</span>
          <span>Number : {data && data[0] && data[0].number}</span>
          <span>City: {data && data[0] && data[0].city}</span>
          <span>Country: {data && data[0] && data[0].country}</span>
        </div>
        Appearance:
                <hr style={{backgroundColor:"white",width:'100%',margin:'auto'}} />
        <div style={{margin:'20px 0',display:'flex',flexDirection:'column'}}>
          <span>Height: {data && data[0] && data[0].height}</span>
          <span>Weight: {data && data[0] && data[0].weight}</span>
          <span>Body Type: {data && data[0] && data[0].bodyType}</span>
        </div>

        Life style:
        <hr style={{backgroundColor:"white",width:'100%',margin:'auto'}}/>

        <div style={{margin:'20px 0',display:'flex',flexDirection:'column'}}>
          <span>Drink: {data && data[0] && data[0].drink}</span>
          <span>Smoke: {data && data[0] && data[0].smoke}</span>
          <span>Marital Status: {data && data[0] && data[0].maritalStatus}</span>
          <span>Have Children: {data && data[0] && data[0].haveChildren}</span>
          <span>Number of Children: {data && data[0] && data[0].numberOfChildren}</span>
          <span>Profession: {data && data[0] && data[0].profession}</span>
          <span>Employment Status: {data && data[0] && data[0].employmentStatus}</span>
          <span>Income: {data && data[0] && data[0].income}</span>
          <span>Living Situation: {data && data[0] && data[0].livingSituation}</span>
          <span>Willing to Relocate: {data && data[0] && data[0].relocateWill}</span>
          <span>Looking for: {data && data[0] && data[0].lookingFor}</span>

        </div>
  
        Background - Cultural Values
        <hr style={{backgroundColor:"white",width:'100%',margin:'auto'}}/>

        <div style={{margin:'20px 0 60px',display:'flex',flexDirection:'column'}}>
          <span>Nationality: {data && data[0] && data[0].nationality}</span>
          <span>Education: {data && data[0] && data[0].education}</span>
          <span>Language Spoken: {data && data[0] && data[0].spokenLanguage}</span>
          <span>Religion: {data && data[0] && data[0].religion}</span>
          <span>Ethnicity: {data && data[0] && data[0].ethnicity}</span>
        </div>
  
      </div>
      <div style={{zIndex:'6000',background:'linear-gradient(to right, rgb(238, 42, 71), rgb(235, 200, 155))',padding:'20px',position:'fixed',width:"100%",left:'0',right:"0",bottom:"0px",display:"flex",justifyContent:"space-between",alignItems:'flex-end'}}>
              <Link to="/main"><i className="fa-solid fa-house"></i></Link>
              <Link to="/views"><i className="fa-solid fa-eye"></i></Link>
              <Link to="/favourite"><i className="fa-solid fa-star"></i></Link>
              <Link to="/like"><i className="fa-solid fa-heart"></i></Link>
              <Link to="/personalInfo"><i style={{color:'white'}} className="fa-solid fa-user"></i></Link>
      </div>
    </div>
  )
}

export default Info
