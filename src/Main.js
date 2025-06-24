import React, { useEffect, useRef,useState } from 'react';
import './Main.css'
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useSwipeable } from 'react-swipeable';
import { useNavigate } from 'react-router-dom';



function Main() {
 

const [numbers, setNumbers] = useState(null);

const addFavourite = async (e) => {
  let newArray = numbers.map(row => [...row]);
  newArray[currentIndex][0] = 2;
  setNumbers(newArray);
  e.stopPropagation(); // 🚫 prevent parent click
    try {
      const response = await axios.post('https://soc-net.info/backend/addFavourite.php', {
        id_added:  e.target.dataset.id,
        email_viewer: localStorage.getItem('userEmail')
      });
      //(response)

    } catch (err) {
      console.error(err);
    }
  };
  const addLike = async (e) => {
    let newArray = numbers.map(row => [...row]);
    newArray[currentIndex][1] = 2;
    setNumbers(newArray);
  e.stopPropagation(); // 🚫 prevent parent click
    try {
      const response = await axios.post('https://soc-net.info/backend/addLike.php', {
        id_liked:  e.target.dataset.id,
        email_viewer: localStorage.getItem('userEmail')
      });
      //(response)
    } catch (err) {
      console.error(err);
    }
  };


const block = async (e) => {
   e.stopPropagation(); // 🚫 prevent parent click
    try {
      const response = await axios.post('https://soc-net.info/backend/block.php', {
        id_blocked:  e.target.dataset.id,
        email_blocker: localStorage.getItem('userEmail')
      });
      //(response)
	getUsers()
    } catch (err) {
      console.error(err);
    }
  };


  const deleteLike = async (e) => {
    let newArray = numbers.map(row => [...row]);
    newArray[currentIndex][1] = 1;
    setNumbers(newArray);
  e.stopPropagation(); // 🚫 prevent parent click
    try {
      const response = await axios.post('https://soc-net.info/backend/deleteLike.php', {
        id_liked:  e.target.dataset.id,
        email_viewer: localStorage.getItem('userEmail')
      });
      //(response)
    } catch (err) {
      console.error(err);
    }
  };
  const deleteFavourite = async (e) => {
    //(e.target.dataset.id)
    let newArray = numbers.map(row => [...row]);
    newArray[currentIndex][0] = 1;
    setNumbers(newArray);
  e.stopPropagation(); // 🚫 prevent parent click
    try {
      const response = await axios.post('https://soc-net.info/backend/deleteFavourite.php', {
        id_added:  e.target.dataset.id,
        email_viewer: localStorage.getItem('userEmail')
      });
      //(response)
    } catch (err) {
      console.error(err);
    }
  };
  const navigate = useNavigate();
  const [choosenCountry,setCountrie] = useState("")
  
  const handleChange = (e)=>{
    setCountrie(e.target.value)
  }
  const handleSubmit = async ()=>{
    const data = {
        country: choosenCountry,
        gender: choosenGender,
        age : parseInt(choosenAge),
        email:localStorage.getItem("userEmail")
      };
      console.log(
	      {
        country: choosenCountry,
        gender: choosenGender,
        age : choosenAge,
        email:localStorage.getItem("userEmail")
      }
      )
      try {
    const response = await fetch('https://soc-net.info/backend/filter.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    });

    const result = await response.json(); // or text() depending on what PHP returns
    console.log(result)
    if(result.length===0){
      alert('No Match Found!')
    }else{
      setUsers(result)
    }
    setShowPopup(false)
  } catch (error) {
    console.error('Error:', error);
  }
  }
  const [choosenGender,setGender] = useState("Female")
  const handleGenderChange = (e)=>{
    setGender(e.target.value)
  }
  const [choosenAge,setChoosenAge] = useState("18")
  const handleAgeChange = (e)=>{
    setChoosenAge(e.target.value)
  }
    const [currentIndex, setCurrentIndex] = useState(0);
    const [showPopup, setShowPopup] = useState(false);
    const popupRef = useRef(null);
    function handleClickOutside() {
          setShowPopup(false);
      }
   
    const [users, setUsers] = useState([]);
    const [countries, setCountries] = useState([]);
    const  getUsers = async () =>{
        const response = await axios.post('https://soc-net.info/backend/getUsers.php', {
              email: localStorage.getItem('userEmail'),
            });
          
            setNumbers(Array.from({ length: response.data.length }, () => [1, 1]))
            //console.log(response.data)
            setUsers(response.data)
    }
    const  getCountries = async () =>{
        const response = await axios.post('https://soc-net.info/backend/getCountries.php', {
              email: localStorage.getItem('userEmail'),
            });

          //response.data);
          setCountries(response.data)
          setCountrie(response.data[0])
    }
    useEffect(() => {
    // Fetch data when the component mounts
    getUsers()
    getCountries()

  }, []); // Empty dependency array = run once when the component mounts
  const handlers = useSwipeable({
    onSwipedLeft: () => {
      if (currentIndex < users.length - 1) {
        setCurrentIndex(currentIndex + 1);
      }
      
    },
    onSwipedRight: () => {
      if (currentIndex > 0) {
        setCurrentIndex(currentIndex - 1);
      }
    },
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,  // Enable swipe with mouse too (optional)
  });
   const user = users[currentIndex];
useEffect(()=>{

  if(numbers && users){
    const updatedNumbers = numbers.map(row => [...row]); // deep copy of numbers
    users.forEach((elm, index) => {
    if (elm.flag1 === 1) {
      updatedNumbers[index][1] = 2;
    }
    if (elm.flag2 === 1) {
      updatedNumbers[index][0] = 2;
    }
  });
  setNumbers(updatedNumbers); // update state once
  }
  
},[users])




if (users.length === 0) {
    return <div><div style={{display:'flex',justifyContent:'center',alignItems:'center',height:'100vh',color:'white'}}>No users</div><div style={{ background:'linear-gradient(to right, rgb(238, 42, 71), rgb(235, 200, 155))',padding: '20px', zIndex: '20000', position: 'fixed', width: "100%", left: '0', right: "0", bottom: "0px", display: "flex", justifyContent: "space-between", alignItems: 'flex-end' }}>
        <Link to="/main"><i style={{ color: 'white' }} className="fa-solid fa-house"></i></Link>
        <Link to="/views"><i className="fa-solid fa-eye"></i></Link>
        <Link to="/favourite"><i className="fa-solid fa-star"></i></Link>
        <Link to="/like"><i className="fa-solid fa-heart"></i></Link>
        <Link to="/personalInfo"><i className="fa-solid fa-user"></i></Link>
      </div>
    </div>;
  }
  return (
    <>
    {showPopup && (
        <div 
        ref={popupRef}
        style={{
          textAlign:'center',
          zIndex: '70000',
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '80%',
	  paddingBottom:'20px',
          height: 'fit-content',
          background: 'linear-gradient(to right, rgb(238, 42, 71), rgb(235, 200, 155))',
          opacity:1,
          boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
          borderRadius: '8px',
        }}>
    <h1 style={{color:'white',textAlign:'center',marginTop:'10px'}}>Match filter</h1>
    <span onClick={handleClickOutside} style={{fontSize:'1.5em',position:'absolute',color:'white',right:'15px',top:'15px'}}>X</span>
    <span style={{color:'white'}}>I am looking for a:</span><br/>
    <br/><select value={choosenGender} onChange={handleGenderChange}>
      <option value="Female">Female</option>      
      <option value="Male">Male</option>    
    </select><br/><br/>
    <span style={{color:'white'}}>who lives in:</span><br/>
    <br/><select value={choosenCountry} onChange={handleChange} name="country">
  {countries && countries.map((elm, index) => (
    <option value={elm} key={index}>
      {elm}
    </option>
  ))}
</select>
<br/><br/>
    <span style={{color:'white'}}>Who's age is equal to or above:</span><br/>
    <br/><select value={choosenAge} onChange={handleAgeChange}>
      <option value="18">18</option>      
      <option value="25">25</option>      
      <option value="30">30</option>      
      <option value="35">35</option>      
      <option value="40">40</option>      
      <option value="45">45</option>      
      <option value="50">50</option>      
      <option value="55">55</option>      
    </select><br/><br/>
    <button onClick={handleSubmit} style={{borderRadius:'10px',fontSize:'1.4em',padding:'7px 9px',color:'white',outline:'none',border:'none',backgroundColor:'pink'}}>Done</button>
  </div>
      )}
    <div style={{zIndex:'2',overflow:'hidden',position:'relative',opacity:!showPopup?'1':'0.5',overflow: 'hidden', height: '100vh' }} {...handlers}>
      
      <i onClick={()=>setShowPopup(!showPopup)} style={{overflow: 'hidden',padding:'15px',zIndex:'60000',fontSize:'1.3em',color:'white',position:'absolute',right:'20px',top:'20px'}} className="fa-solid fa-filter"></i>
      <div onClick={()=>{navigate(`/info/${user.user.id}`);}} style={{ overflow: 'hidden', position: 'relative',bottom:'15px', alignItems: 'flex-start', maxHeight: '100vh' }}>
        <div style={{ position: 'relative', height: '100vh' }} key={user.user.id}>
          <div style={{ display: 'flex', flexDirection: 'column', color: '#fff', position: 'absolute', width: '100%', bottom: '200px', justifyContent:'center',alignItem:'center',margin: 'auto', zIndex: '10000', textAlign: 'center' }}>
            <div style={{ fontWeight: 'bold', fontSize: '1.4em', letterSpacing: '3px' }}>{user.user.name}</div>
            <div style={{ fontSize: '1.2em', letterSpacing: '3px' }}>{user.user.age} {user.user.city!=null && <span>.</span>} {user.user.city}</div>
            <div style={{ justifyContent:'center',alignItems:'center',flexDirection:'center',textAlign: 'center', display: 'flex', flexWrap: 'wrap', margin: 'auto' }}>
              {user.user.profession && <span className='info'>{user.user.profession}</span>}
              {user.user.religion && <span className='info'>{user.user.religion}</span>}
              {user.user.ethnicity && <span className='info'>{user.user.ethnicity}</span>}
              {user.user.nationality && <span className='info'>{user.user.nationality}</span>}
            </div>
          </div>
{user.image && user.image.name && <img
            src={`https://soc-net.info/backend/uploads/${user.image.name}`}
            alt={`person${user.user.id}`}
            style={{ width: '100%', zIndex: '5', height: '100vh', position: 'absolute', objectFit: 'cover' }}
          />}
          <div style={{ position: 'absolute', width: '100%', margin: 'auto', zIndex: '10000', textAlign: 'center', lineHeight: '160vh' }}>
            <i onClick={block} data-id={user.user.id} style={{color:'green',border:'1px solid green',padding:'10px',borderRadius:'50%',fontSize:'1.3em',fontWeight:'bold'}} class="fa-solid fa-xmark"></i>
            <i 
            data-id={user.user.id} onClick={(e) => {
                    const newNumbers = numbers.map((row, index) =>
    index === currentIndex ? [row[0] + 1, row[1]] : row
  );
  setNumbers(newNumbers);
    if (numbers[currentIndex][0]%2===0) {
      deleteFavourite(e);
      }
     else {
      addFavourite(e);
    }
  }}
  style={{
  margin: '20px',
  padding: '10px',
  border: (numbers[currentIndex][0] % 2 !== 0)
    ? '2px solid #fff':'',
  borderRadius: '50%',
  background: (numbers[currentIndex][0] % 2 === 0)
    ? 'linear-gradient(to right, rgb(238, 42, 71), rgb(235, 200, 155))'
    : 'transparent',
  color: (numbers[currentIndex][0] % 2 === 0)
    ? 'red' // fallback color — gradient can't go here
    : '#fff',
  fontSize: '1.3em'
}}
   className="fa-solid fa-star"></i>
            <Link onClick={(e)=>{e.stopPropagation()}} rel="noopener noreferrer" to={`/chat/${user.user.id}`}><i style={{ margin: '20px', padding: '20px', backgroundImage: 'linear-gradient(to right, #ee2a47, rgb(235 200 155))', borderRadius: '50%', color: 'white', fontSize: '1.9em' }} className="fa-solid fa-message"></i></Link>
            <i data-id={user.user.id} onClick={(e) => {
                    const newNumbers = numbers.map((row, index) =>
    index === currentIndex ? [row[0], row[1]+1] : row
  );
  setNumbers(newNumbers);
    if (numbers[currentIndex][1]%2===0) {
      deleteLike(e);
      }
     else {
      addLike(e);
    }
  }}
              style={{
  margin: '20px',
  padding: '10px',
  border: (numbers[currentIndex][1] % 2 !== 0)
    ? '2px solid #fff':'',
  borderRadius: '50%',
  background: (numbers[currentIndex][1] % 2 === 0)
    ? 'linear-gradient(to right, rgb(238, 42, 71), rgb(235, 200, 155))'
    : 'transparent',
  color: (numbers[currentIndex][1] % 2 === 0)
    ? 'red' // fallback color — gradient can't go here
    : '#fff',
  fontSize: '1.3em'
}}

              className="fa-solid fa-heart"
            />

          </div>
        </div>
      </div>
      <div style={{ background:'linear-gradient(to right, rgb(238, 42, 71), rgb(235, 200, 155))',padding: '20px', zIndex: '20000', position: 'fixed', width: "100%", left: '0', right: "0", bottom: "0px", display: "flex", justifyContent: "space-between", alignItems: 'flex-end' }}>
        <Link to="/main"><i style={{ color: 'white' }} className="fa-solid fa-house"></i></Link>
        <Link to="/views"><i className="fa-solid fa-eye"></i></Link>
        <Link to="/favourite"><i className="fa-solid fa-star"></i></Link>
        <Link to="/like"><i className="fa-solid fa-heart"></i></Link>
        <Link to="/personalInfo"><i className="fa-solid fa-user"></i></Link>
      </div>
    </div></>
  );
}

export default Main
