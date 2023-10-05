import mongoose, { Types } from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        unique:true,
        
    },
    bookings:{
        type:mongoose.Types.ObjectId,
        ref:"Booking"
    }
}
)
export default mongoose.model("User",userSchema);