import React , {useState} from 'react'
import './SignUp.css'
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function Update() {
//const [data, setData] = useState([]);
    useEffect(() => {
        axios.post('https://soc-net.info/backend/getUserData.php', {
          email: localStorage.getItem("userEmail")
        })
        .then(response => {
          //'Response:', response.data);
          //setData(response.data);
          setName(response.data[0].name)
          setAge(response.data[0].age)
          setPhoneNumber(response.data[0].number)
          setCity(response.data[0].city)
          setCountry(response.data[0].country)
          setReligion(response.data[0].religion)
          setEthnicity(response.data[0].ethnicity)
          setHeight(response.data[0].height)
          setWeight(response.data[0].weight)
          setBodyType(response.data[0].bodyType)
          setDrink(response.data[0].drink)
          setSmoke(response.data[0].smoke)
          setMaritalStatus(response.data[0].maritalStatus)
          setHaveChildren(response.data[0].haveChildren)
          setNumberChildren(response.data[0].numberOfChildren)
          setOccupation(response.data[0].profession)
          setEmployment(response.data[0].employmentStatus)
          setIncome(response.data[0].income)
          setLivingSituation(response.data[0].livingSituation)
          setRelocate(response.data[0].relocateWill)
          setRelationShip(response.data[0].lookingFor)
          setNationality(response.data[0].nationality)
          setEducation(response.data[0].education)
          setLanguage(response.data[0].spokenLanguage)
        })
        .catch(error => {
          console.error('Error posting data:', error);
        });
        
      }, []);
    const navigate = useNavigate();
    
    const [name,setName] = useState("")
    const [age,setAge] = useState("")
    const [phoneNumber,setPhoneNumber] = useState("")
    
    const [city,setCity] = useState("")
    const [country,setCountry] = useState("")
    //const [profession,setProfession] = useState("")
    const [religion,setReligion] = useState("")
    const [ethnicity,setEthnicity] = useState("")
    const [height,setHeight] = useState("")
    const [weight,setWeight] = useState("")
    const [bodyType,setBodyType] = useState("")
    const [drink,setDrink] = useState("")
    const [smoke,setSmoke] = useState("")
    const [maritalStatus,setMaritalStatus] = useState("")


    const [haveChildren,setHaveChildren] = useState("")
    const [numberChildren,setNumberChildren] = useState("")

    const [occupation,setOccupation] = useState("")
    const [employment,setEmployment] = useState("")
    const [income,setIncome] = useState("")
    const [livingSituation,setLivingSituation] = useState("")
    const [relocate,setRelocate] = useState("")
    const [relationShip,setRelationShip] = useState("")


    const [nationality,setNationality] = useState("")
    const [education,setEducation] = useState("")
    const [language,setLanguage] = useState("")
    const handleEducationChange = (event)=>{
        setEducation(event.target.value)
    }
const handleLanguageChange = (event)=>{
        setLanguage(event.target.value)
    }


    const handleNameChange = (event)=>{
        setName(event.target.value)
    }
    const handleAgeChange = (event)=>{
        setAge(event.target.value)
    }
    
    const handlePhoneNumberChange = (event)=>{
        setPhoneNumber(event.target.value)
    }
    const handleCityChange = (event)=>{
        setCity(event.target.value)
    }
    const handleCountryChange = (event)=>{
        setCountry(event.target.value)
    }
    
    const handleReligionChange = (event)=>{
        setReligion(event.target.value)
    }
    const handleEthnicityChange = (event)=>{
        setEthnicity(event.target.value)
    }
    const handleHeightChange = (event)=>{
        setHeight(event.target.value)
    }
    const handleWeightChange = (event)=>{
        setWeight(event.target.value)
    }
    const handleBodyTypeChange = (event)=>{
        setBodyType(event.target.value)
    }
    const handleDrinkChange = (event)=>{
        setDrink(event.target.value)
    }
    const handleSmokeChange = (event)=>{
        setSmoke(event.target.value)
    }
   

    const handleNationalityChange = (event)=>{
        setNationality(event.target.value)
    }

    const handleRelationShipChange = (event)=>{
        setRelationShip(event.target.value)
    }

    const handleRelocateChange = (event)=>{
        setRelocate(event.target.value)
    }
    const handleSituationChange = (event)=>{
        setLivingSituation(event.target.value)
    }
    const handleIncomeChange = (event)=>{
        setIncome(event.target.value)
    }
    const handleStatusChange = (event)=>{
        setMaritalStatus(event.target.value)
    }
    const handleOccupationChange = (event)=>{
        setOccupation(event.target.value)
    }
    const handleChildrenChange = (event)=>{
        setNumberChildren(event.target.value)
    }
    const handleHaveChildrenChange = (event)=>{
        setHaveChildren(event.target.value)
    }

    const handleStatusEmploymentChange = (event)=>{
        setEmployment(event.target.value)
    }
    
    const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await axios.post('https://soc-net.info/backend/updateUser.php', {
      email:localStorage.getItem("userEmail"),
      name: name,
      age: age,
      phoneNumber: phoneNumber,
      city: city,
      country: country,
      religion: religion,
      ethnicity: ethnicity,
      height:height,
      weight:weight,
      bodyType:bodyType,
      drink:drink,
      smoke:smoke,
      maritalStatus:maritalStatus,
      haveChildren:haveChildren,
      numberChildren:numberChildren,
      occupation:occupation,
      employment:employment,
      income:income,
      livingSituation:livingSituation,
      relocate:relocate,
      relationShip:relationShip,
      nationality:nationality,
      education:education,
      language:language
    });

    //response.data);
        navigate('/personalInfo');

  } catch (error) {
    console.error('Error sending data:', error);
  }
};

  return (
    <div id="login">
<div style={{backgroundColor:'#E63946',zIndex:'5000',display:'flex',padding:'20px',justifyContent:"space-between",alignItems:'center',width:'100%',position:'fixed',right:'0',left:'0',top:"0"}}>
        <Link to="/imageupload"><i style={{color:'white'}} className="fa-solid fa-arrow-left"></i></Link>
        <span style={{position:'absolute',top:'50%',left: '50%',
          transform: 'translate(-50%, -50%)',color:'white'}}>Profile Information</span>
        
      </div>      
      <form style={{margin:'50px'}} onSubmit={handleSubmit}>
        <p style={{color:'white'}}>Personal Info :</p>
        <div style={{position:"relative"}}>
            <input required value={name} onChange={handleNameChange} type="text" name="name"/>
            <div className={name!==""?"apply field":"field"}>Name</div>
        </div>
        <div style={{position:"relative"}}>
            <input required value={age} onChange={handleAgeChange} type="text" name="age"/>
            <div className={age!==""?"apply field":"field"}>Age</div>
        </div>
         <div style={{position:"relative"}}>
            <input required value={city} onChange={handleCityChange} type="text" name="city"/>
            <div className={city!==""?"apply field":"field"}>City</div>
        </div>
       <div style={{position:"relative"}}>
            <input required  value={country} onChange={handleCountryChange} type="text" name="country"/>
            <div className={country!==""?"apply field":"field"}>Country</div>
        </div>
        <div style={{position:"relative"}}>
            <input required value={phoneNumber} onChange={handlePhoneNumberChange} type="text" name="phoneNumber"/>
            <div className={phoneNumber!==""?"apply field":"field"}>Phone number</div>
        </div>
                <p style={{color:'white'}}>Appearance :</p>

        <div style={{position:"relative"}}>
            <input required value={height} onChange={handleHeightChange} type="text" name="height"/>
            <div className={height!==""?"apply field":"field"}>Height</div>
        </div>

        <div style={{position:"relative"}}>
            <input required value={weight} onChange={handleWeightChange} type="text" name="weight"/>
            <div className={weight!==""?"apply field":"field"}>Weight</div>
        </div>

        <div style={{position:"relative"}}>
            <input required value={bodyType} onChange={handleBodyTypeChange} type="text" name="bodyType"/>
            <div className={bodyType!==""?"apply field":"field"}>Body Type</div>
        </div>
       
                        <p style={{color:'white'}}>Life Style :</p>

        <div style={{position:"relative"}}>
            <input required value={drink} onChange={handleDrinkChange} type="text" name="drink"/>
            <div className={drink!==""?"apply field":"field"}>Drink</div>
        </div>
        <div style={{position:"relative"}}>
            <input required value={smoke} onChange={handleSmokeChange} type="text" name="smoke"/>
            <div className={smoke!==""?"apply field":"field"}>Smoke</div>
        </div>
        <div style={{position:"relative"}}>
            <input required value={maritalStatus} onChange={handleStatusChange} type="text" name="maritalStatus"/>
            <div className={maritalStatus!==""?"apply field":"field"}>Marital Status</div>
        </div><div style={{position:"relative"}}>
            <input required value={haveChildren} onChange={handleHaveChildrenChange} type="text" name="haveChildren"/>
            <div className={haveChildren!==""?"apply field":"field"}>Do you have Children?</div>
        </div><div style={{position:"relative"}}>
            <input required value={numberChildren} onChange={handleChildrenChange} type="text" name="numberChildren"/>
            <div className={numberChildren!==""?"apply field":"field"}>Number Of Children</div>
        </div><div style={{position:"relative"}}>
            <input required value={occupation} onChange={handleOccupationChange} type="text" name="smoke"/>
            <div className={occupation!==""?"apply field":"field"}>occupation</div>
        </div>
         <div style={{position:"relative"}}>
            <input required value={employment} onChange={handleStatusEmploymentChange} type="text" name="smoke"/>
            <div className={employment!==""?"apply field":"field"}>Employment Status</div>
        </div>
         <div style={{position:"relative"}}>
            <input required value={income} onChange={handleIncomeChange} type="text" name="smoke"/>
            <div className={income!==""?"apply field":"field"}>Income</div>
        </div>
         <div style={{position:"relative"}}>
            <input required value={livingSituation} onChange={handleSituationChange} type="text" name="smoke"/>
            <div className={livingSituation!==""?"apply field":"field"}>Living Situation</div>
        </div>
         <div style={{position:"relative"}}>
            <input required value={relocate} onChange={handleRelocateChange} type="text" name="smoke"/>
            <div className={relocate!==""?"apply field":"field"}>Are you Willing to Relocate?</div>
        </div>
         <div style={{position:"relative"}}>
            <input required value={relationShip} onChange={handleRelationShipChange} type="text" name="smoke"/>
            <div className={relationShip!==""?"apply field":"field"}>relationship you are looking for?</div>
        </div>

                                <p style={{color:'white'}}>Background - Cultural Values :</p>

        <div style={{position:"relative"}}>
            <input required value={nationality} onChange={handleNationalityChange} type="text" name="ethnicity"/>
            <div className={nationality!==""?"apply field":"field"}>Nationality</div>
        </div>
        <div style={{position:"relative"}}>
            <input required value={education} onChange={handleEducationChange} type="text" name="ethnicity"/>
            <div className={education!==""?"apply field":"field"}>Education</div>
        </div>
        <div style={{position:"relative"}}>
            <input required value={language} onChange={handleLanguageChange} type="text" name="ethnicity"/>
            <div className={language!==""?"apply field":"field"}>Language Spoken</div>
        </div>
        <div style={{position:"relative"}}>
            <input required value={religion} onChange={handleReligionChange} type="text" name="ethnicity"/>
            <div className={religion!==""?"apply field":"field"}>Religion</div>
        </div>
        <div style={{position:"relative"}}>
            <input required value={ethnicity} onChange={handleEthnicityChange} type="text" name="ethnicity"/>
            <div className={ethnicity!==""?"apply field":"field"}>Ethnicity</div>
        </div>
        <input style={{backgroundColor:"white",color:"#E63946",fontSize:"1.3em",fontWeight:"bold"}} type="submit" value="Update" name="login"/>
      </form>
    </div>
  )
}

export default Update
