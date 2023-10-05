import Booking from "../model/Booking.js";
import User from "../model/User.js";
import bcrypt from "bcrypt"
export const getAllUsers = async (req,res,next) =>{
    let users;

    try{
         users= await User.find()
    }catch(err){
        return next(err)
    }
    if(!users){
        return res.status(500).json({message:"no user found"})
    }
     return res.status(200).json(users)
}

export const signup = async (req,res,next) =>{
    const {name,email,password} = req.body;
    if(!name && !email && !password ){
        return res.status(422).json({message:"invalid input "})
    }
    
    let newPassword = password.toString()
    var salt = bcrypt.genSaltSync(10);
   var hash = bcrypt.hashSync(newPassword, salt);


    let user ;
    try{
        user = new User({name,email,password:hash})
        user = await user.save();
    }catch(err){
        next(err)
    }
    if(!user){
        return res.status(500).json({message:"unexpected error"});

    }
    return res.status(200).json(user);
}

export const updateUser = async (req,res,next) =>{
    const id = req.params.id;
    
    const {name,email,password} = req.body;

    if(!name && !email && !password ){
        return res.status(422).json({message:"invalid input "})
    }
    
    let user;
    try{
          user = await User.findByIdAndUpdate(id,{name,email,password})
    }catch(err){
      console.log(err);
    }

    if(!user){
        return res.status(500).json({message:"no user found"})
    }
     return res.status(200).json({message:"updated"})

}

export const deleteUser = async (req,res,next) =>{
    const id = req.params.id;
    let user;
    try{
        user = await User.findByIdAndRemove(id);

    }catch(err){
        console.log(err)
    }

    if(!user){
        return res.status(500).json({message:"no user found"})
    }
     return res.status(200).json({message:"deleted"})
}

//login 
export const login = async (req,res,next) =>{
    const {email,password} = req.body;

    if(!email  && !password ){
        return res.status(422).json({message:"invalid input "})
    }

    let existingUser ;
    try{
       existingUser = await User.findOne({email})
    }catch(err){
        console.log(err)
    }

    if(!existingUser){
        res.status(404).json({message:"unable to find the user from this id "});

    }
    
    let newPassword = password.toString()

    const isPasswordCorrect = bcrypt.compareSync(newPassword,existingUser.password)
    
    if(!isPasswordCorrect){
        res.send.json({message: "incorrect password "})
    }

    return res.status(200).json({existingUser,message: "login successful"})

}

//get booking 
export const getUsersBooking = async (req, res, next) => {
    const id = req.params.id;
    let bookings;
    try {
      bookings = await Booking.find({ user: id })
        .populate("movie")
        .populate("user");
    } catch (err) {
      return console.log(err);
    }
    if (!bookings) {
      return res.status(500).json({ message: "Unable to get Bookings" });
    }
    return res.status(200).json({ bookings });
  };

  export const getUserById = async (req, res, next) => {
    const id = req.params.id;
    let user;
    try {
      user = await User.findById(id);
    } catch (err) {
      return console.log(err);
    }
    if (!user) {
      return res.status(500).json({ message: "Unexpected Error Occured" });
    }
    return res.status(200).json({ user });
  };