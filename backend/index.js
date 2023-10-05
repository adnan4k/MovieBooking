import express from "express"
import mongoose, { connect } from "mongoose"
import userRouter from "./routes/userRoutes.js";
import dotenv from "dotenv"
import adminRouter from "./routes/adminRoutes.js";
import movieRouter from "./routes/movieRoutes.js";
import bookingRouter from "./routes/bookingRoutes.js";
import cors from "cors"


dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

//middlewares
app.use("/user",userRouter)
app.use("/admin",adminRouter)
app.use("/movie",movieRouter)
app.use("/booking",bookingRouter)


mongoose.connect('mongodb+srv://fayomuhe5:movie@cluster0.k2m79tb.mongodb.net/?retryWrites=true&w=majority')
.then(()=>{
    console.log("db connected");
    app.listen(5000,()=>{
        console.log("app is lestining to port :5000")
    })
}).catch((err)=>{
    console.log(`error occured ${err}`)
}) 
