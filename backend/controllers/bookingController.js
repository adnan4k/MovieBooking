import mongoose, { startSession } from "mongoose";
import Booking from "../model/Booking.js";
import Movie from "../model/Movie.js";
import User from "../model/User.js";

export const newBooking  = async (req,res,next) =>{
    const {movie,date,seatNumber,user } = req.body;
    let booking;
    
    let existingMovie;
    let existingUser;

    try {
        existingMovie = await Movie.findById(movie);
        existingUser = await User.findById(user);
    } catch (error) {
        return console.log(error)
    }
     
    if(!existingMovie){
        return res.status(404).json({message:"movie not found with given id"})
    }
   
    

    try {
        booking = new Booking({
            movie
            ,date:new Date(`${date}`),
            seatNumber,
            user
        })
          
    const session = mongoose.startSession();
    await session.startTransaction();
    existingMovie.bookings.push(booking);
    existingUser.bookings.push(booking);
    await existingMovie.save({session});
    await existingUser.save({session});
    await booking.save({session})
    await session.commitTransaction();


    } catch (error) {
        return console.log(error);
    }

    if(!booking){
        return res.status(422).json({message:"unable to create"});
    }else{
        return res.status(200).json(booking);
    }
}

//get booking by id
export const getBookingById = async(req,res,next) =>{
    const id = req.params.id;
    let booking;

    try {
        booking = await Booking.findById(id);
    } catch (error) {
        console.log(error);
    }

    if(!booking){
        return res.status(404).json({message:"booking not found"})
    }

    return res.status(200).json(booking)
}

//delete booking 

export const deleteBooking = async (req, res, next) => {
  try {
    const bookingId = req.params.id;
    
    // Find the booking and populate the 'user' and 'movie' fields
    const booking = await Booking.findById(bookingId).populate('user movie');

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    const session = await startSession();
    session.startTransaction();

    // Remove the booking from the user and movie
    await booking.user.bookings.pull(booking);
    await booking.movie.bookings.pull(booking);

    // Save the changes to user and movie
    await booking.user.save({ session });
    await booking.movie.save({ session });

    // Delete the booking
    await booking.remove({ session });

    await session.commitTransaction();
    session.endSession();

    res.status(200).json({ message: 'Booking deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong while deleting the booking' });
  }
};
