import axios from "axios";

export const getAllMovies = async () => {
  try {
    const response = await axios.get("/movie");
    const data = response.data;
    
    return data;
  } catch (error) {
    console.error("An error occurred while fetching data:", error);
    throw error; 
  }
};


export const sendUserAuthRequest = async (data, signup) => {
  const res = await axios
    .post(`/user/${signup ? "signup" : "login"}`, {
      name: signup ? data.name : "",
      email: data.email,
      password: data.password,
    })
    .catch((err) => console.log(err));

  if (res.status !== 200 && res.status !== 201) {
    console.log("Unexpected Error Occurred");
  }

  const resData = await res.data;
  return resData;
};

export const sendAdminAuthRequest = async (data) =>{
  try {
    const res = await axios.post("/admin/login",{
      email:data.email,
      password:data.password
     })
     if(res.data){
      const resData = res.data;
      console.log(resData);
      return resData
     }else{
      console.log("error occured");
     }
  } catch (error) {
    console.log(error)
  }
 
}

//booking
export const getMovieDetails = async (id) =>{
  try {
    const res = await axios.get(`/movie/${id}`);
    if(!res.data){
      console.log("error occured while fetching data from server ");
    }
    const resData = await res.data;
    return  resData
  } catch (error) {
    console.log(error)
  }
}

export const newBooking = async (data) =>{
  try {
    const res = await axios.post("/booking",{
      movie : data.movie,
      seatNumber: data.seatNumber,
      date: data.date,
      user:localStorage.getItem("userId")
    });
    if(res.status !==201 || 200){
      return console.log("something went wrong")
    }
    const resData =  res.data;
    return resData;
    
  } catch (error) {
    console.log(error);
  }
} 


export const getUserBooking = async () => {
  const id = localStorage.getItem("userId");
  const res = await axios
    .get(`/user/booking/${id}`)
    .catch((err) => console.log(err));

  if (res.status !== 200) {
    return console.log("Unexpected Error");
  }
  const resData = await res.data;
  return resData;
};

export const deleteBooking = async (id) => {
  const res = await axios
    .delete(`/booking/${id}`)
    .catch((err) => console.log(err));

  if (res.status !== 200) {
    return console.log("Unepxected Error");
  }

  const resData = await res.data;
  return resData;
};

export const getUserDetails = async () => {
  const id = localStorage.getItem("userId");
  const res = await axios.get(`/user/${id}`).catch((err) => console.log(err));
  if (res.status !== 200) {
    return console.log("Unexpected Error");
  }
  const resData = await res.data;
  return resData;
};

export const addMovie = async (data) => {
  const res = await axios
    .post(
      "/movie",
      {
        title: data.title,
        description: data.description,
        releaseDate: data.releaseDate,
        posterUrl: data.posterUrl,
        fetaured: data.fetaured,
        actors: data.actors,
        admin: localStorage.getItem("adminId"),
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    )
    .catch((err) => console.log(err));

  if (res.status !== 201) {
    return console.log("Unexpected Error Occurred");
  }

  const resData = await res.data;
  return resData;
};

export const getAdminData = async () => {
  const adminId = localStorage.getItem("adminId");
  const res = await axios
    .get(`/admin/${adminId}`)
    .catch((err) => console.log(err));

  if (res.status !== 200) {
    return console.log("Unexpected Error Occurred");
  }

  const resData = await res.data;
  return resData;
};


