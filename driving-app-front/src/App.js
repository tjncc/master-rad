import './App.css';
import { BrowserRouter, Routes, Route  } from "react-router-dom";
import RegisterPage from './components/registration/RegistrationStudent'
import Home from './components/HomePage'
import Header from './components/Header'
import LoginPage from './components/registration/LoginPage'
import SchoolRegistration from './components/registration/SchoolRegistration'
import UserVerification from './components/registration/UserVerification'
import Test from './components/registration/Test'
import SchoolPage from './components/pages/SchoolPage'
import AllSchools from './components/pages/AllSchools'
import AllUsers from './components/pages/AllUsers'
import ProfilePage from './components/pages/ProfilePage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<><Header/><Home/></>} />
        <Route exact path="/register/student" element={<RegisterPage />} />
        <Route exact path="/login" element={<LoginPage />} />
        <Route exact path="/school/add" element={<><Header/><SchoolRegistration/></>} />
        <Route exact path="/user/verified/:id"  element={<UserVerification />} />
        <Route exact path="/school/:id"  element={<><Header/><SchoolPage/></>} />
        <Route exact path="/schools"  element={<><Header/><AllSchools/></>} />
        <Route exact path="/users"  element={<><Header/><AllUsers/></>} />
        <Route exact path="/profile"  element={<><Header/><ProfilePage/></>} />

        <Route exact path="/test"  element={<><Header/><Test/></>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
