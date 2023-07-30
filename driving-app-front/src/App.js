import './App.css';
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
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
import MyCalendar from './components/calendar/MyCalendar';

const Layout = () => {
  return (<>
    <Header />
    <Outlet />
  </>)
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/login" element={<LoginPage />} />
        <Route exact path="/register/student" element={<RegisterPage />} />
        <Route exact path="/user/verified/:id" element={<UserVerification />} />

        <Route element={<Layout />}>
          <Route index element={<AllSchools />} />
          <Route exact path="/school/add" element={<SchoolRegistration />} />
          <Route exact path="/school/:id" element={<SchoolPage />} />
          <Route exact path="/schools" element={<AllSchools />} />
          <Route exact path="/users" element={<AllUsers />} />
          <Route exact path="/profile" element={<ProfilePage />} />
          <Route exact path="/calendar" element={<MyCalendar />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
