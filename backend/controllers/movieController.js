import jwt  from "jsonwebtoken"
import mongoose from "mongoose";
import Movie from "../model/Movie.js";
import Admin from "../model/Admin.js";

export const addMovie = async (req, res, next) => {
    try {
      const extractedToken = req.headers.authorization.split(" ")[1];
      if (!extractedToken || extractedToken.trim() === "") {
        return res.status(404).json({ message: "Token not found" });
      }
  
      // Verify token and get adminId
      let adminId;
      jwt.verify(extractedToken, "SECRET", (error, decrypted) => {
        if (error) {
          return res.status(400).json({ message: `${error.message}` });
        } else {
          adminId = decrypted.id;
        }
      });
  
      // Create movie
      const { title, actors, description, posterUrl, featured, releaseDate } = req.body;
  
      if (!title || !description || !posterUrl || !featured || !releaseDate) {
        return res.status(422).json({ message: "Invalid input" });
      }
  
      // Create and save movie in a transaction
      const session = await mongoose.startSession();
      session.startTransaction();
  
      const movie = new Movie({
        title,
        description,
        posterUrl,
        featured,
        releaseDate: new Date(`${releaseDate}`),
        admin: adminId,
        actors,
      });
  
      await movie.save({ session });
  
      const adminUser = await Admin.findById(adminId);
  
      adminUser.addedMovies.push(movie);
      await adminUser.save({ session });
  
      await session.commitTransaction();
  
      // Send a success response
      return res.status(200).json(movie);
    } catch (error) {
      console.error(error);
      // Send an error response
      return res.status(500).json({ message: "Internal server error" });
    }
  };
// get all movies 
export const getAllMovies = async (req,res,) =>{
    
    let movie;
    try {
        movie = await Movie.find();
    } catch (error) {
        return console.log(error)
    }
    if(!movie){
        return res.status(404).json({message:"movie not found"});
    }else{
        return res.status(200).json(movie)
    }
 }

 // get movie by id 
 export const getMovieById = async (req,res,next) =>{
    let movie;
    const id = req.params.id;
    try {
        movie = await Movie.findById(id);
    } catch (error) {
        return console.log(error);
    }
    if(!movie){
        return res.status(404).json({message:"movie not found"});
    }else{
        return res.status(200).json(movie)
    }
 }
