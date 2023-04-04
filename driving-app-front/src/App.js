import './App.css';
import { BrowserRouter, Routes, Route  } from "react-router-dom";
import RegisterPage from './components/registration/RegistrationStudent'
import Home from './components/HomePage'
import Header from './components/Header'
import LoginPage from './components/registration/LoginPage'
import SchoolRegistration from './components/registration/SchoolRegistration'
import UserVerification from './components/registration/UserVerification'
import Test from './components/registration/Test'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<><Header/><Home/></>} />
        <Route exact path="/register/student" element={<RegisterPage />} />
        <Route exact path="/login" element={<LoginPage />} />
        <Route exact path="/school/add" element={<><Header/><SchoolRegistration/></>} />
        <Route exact path="/user/verified/:id"  element={<UserVerification />} />
        <Route exact path="/test"  element={<><Header/><Test/></>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
