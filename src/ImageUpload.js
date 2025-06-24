import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';
import { useState ,useEffect} from 'react';

function ImageUpload() {

  const [data, setData] = useState(null);

   const handleFetch = async () => {
    setData(null);
    try {
      const response = await axios.post('https://soc-net.info/backend/getUserImages.php', {
        id: localStorage.getItem("userId")
      });
      //response);
      setData(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(()=>{
    handleFetch()
  },[])

      const [image, setImage] = useState(null);

      const handleFileChange = async (e) => {
  const file = e.target.files[0];
  if (!file) return;
  //e.target.files);
  //'Selected file:', file);

  setImage(file);

  // Immediately upload after selecting file
  const formData = new FormData();
  formData.append('image', file);
  formData.append('id', localStorage.getItem("userId") || 1); // fallback id

  try {
    const response = await axios.post('https://soc-net.info/backend/upload.php', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    //'Upload success:', response.data);
    e.target.value = null;
        handleFetch()

  } catch (error) {
    console.error('Upload error:', error);
  }
};

   
  return (
    <div style={{height:'100vh',background:'linear-gradient(to right, rgb(238, 42, 71), rgb(235, 200, 155))'}}>
      <div style={{background:'linear-gradient(to right, rgb(238, 42, 71), rgb(235, 200, 155))',zIndex:'5000',display:'flex',padding:'20px',justifyContent:"space-between",alignItems:'center',width:'100%',position:'fixed',right:'0',left:'0',top:"0"}}>
        <Link to="/main"><i style={{color:'white'}} className="fa-solid fa-arrow-left"></i></Link>
        <span style={{color:'white'}}>Choose 5 Images</span>
        <div>
            <Link style={{zIndex:'5000'}} to="/update">
            <i style={{color:'white',margin:'5px'}} className="fa-solid fa-chevron-right"></i></Link>
        </div>
      </div>
      <div>
            <input
                type="file"
                id="fileInput"
                onChange={handleFileChange}
                accept="image/*"
                style={{ display: 'none' }}
            />
            <div style={{top:'70px',position: 'absolute',display:'flex',flexWrap:'wrap'}}>
            <label style={{fontSize:'1.9em',backgroundColor:'pink',textAlign:'center',width:'110px',height:'110px',cursor: 'pointer',margin:'0px 5px 5px',lineHeight:'110px',zIndex: '9000',color: 'white'}} htmlFor="fileInput" className="file-label">
                +
            </label>
            {
  data && data.map((elm) => (
    <img
      src={`https://soc-net.info/backend/uploads/${elm.name}`}
      alt={elm.name}
      key={elm.id}
      style={{ width: '110px', height: '110px', objectFit: 'cover', margin: '0px 5px 5px' }}
    />
  ))
}</div>
        </div>
    </div>
  )
}

export default ImageUpload
