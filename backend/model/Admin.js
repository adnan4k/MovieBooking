import mongoose, { mongo } from "mongoose";

const adminSchema = mongoose.Schema({
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String,
        minLength: 6
    },
    addedMovies: [{
        type: mongoose.Types.ObjectId,
        ref:"Movie"
    }]
});

export default mongoose.model("Admin",adminSchema)