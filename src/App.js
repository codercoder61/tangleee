
import Login from "./Login"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUp from './SignUp';
import Main from './Main';
import PersonalInfo from './PersonalInfo';
import Update from './Update'
import ImageUpload from './ImageUpload';
import Info from './Info';
import Views from './Views';
import Favourite from './Favourite';
import Like from './Like';
import Chat from './Chat';
import React, { useEffect } from 'react';
import axios from 'axios';
import { useFirebaseNotifications } from "./useFirebaseNotifications";

function App() {
	useFirebaseNotifications();
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/main" element={<Main />} />
        <Route path="/personalInfo" element={<PersonalInfo />} />
        <Route path="/update" element={<Update />} />
        <Route path="/imageupload" element={<ImageUpload />} />
        <Route path="/info/:id" element={<Info />} />		
	<Route path="/chat/:id" element={<Chat />} />
        <Route path="/views" element={<Views />} />
        <Route path="/favourite" element={<Favourite />} />
        <Route path="/like" element={<Like />} />
      </Routes>
    </Router>
  );
}

export default App;
