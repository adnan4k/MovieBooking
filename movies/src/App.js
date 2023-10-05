import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Movies from "./components/movies/Movies";
import Home from "./components/Home";
import Auth from "./components/auth/Auth";
import Admin from "./components/admin/Admin";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { adminAction, userAction } from "./store";
import Booking from "./components/booking/Booking";
import UserProfile from "./components/profile/UserProfile";
import AddMovie from "./components/movies/AddMovie";
import AdminProfile from "./components/profile/AdminProfile";


function App() {
  const dispatch = useDispatch();
  const isAdminLoggedIn = useSelector((state) =>state.admin.isLoggedin);
  const isUserLoggedIn = useSelector((state) =>state.user.isLoggedin);

  console.log("is admin",isAdminLoggedIn);
  console.log("is user",isUserLoggedIn);

  useEffect(()=>{
    if(localStorage.getItem("userId")){
         dispatch(userAction.login());
    }else if(localStorage.getItem("adminId")){
      dispatch(adminAction.login())
    }
  },[])
  return (
    <div>
      <Navbar />
      <section>
        <Routes>
        <Route path="/" element={<Home />}/>
          <Route path="/movies" element={<Movies />}/>
          <Route path="/auth" element={<Auth />}/>
          <Route path="/admin" element={<Admin />}/>
          <Route path="/booking/:id" element={<Booking />}/>
          <Route path="/user" element={<UserProfile />}/>
          <Route path="/add" element={<AddMovie />}/>
          <Route path="/admin" element={<AdminProfile/>}/>
        </Routes>
      </section>
    </div>
  );
}

export default App;
