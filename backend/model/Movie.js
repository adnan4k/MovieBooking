import mongoose from "mongoose";


const movieSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    actors:[String],
    releaseDate:{
        type:Date,
        required:true
    },
    posterUrl:{
        type:String,
        required:true
    },
    featured:{
        type:Boolean
    },
    bookings:[{type:mongoose.Types.ObjectId,ref:"Booking"}],
    admin:{
        type: mongoose.Types.ObjectId,
        ref:"Admin"
    }


})

export default mongoose.model("Movie",movieSchema);