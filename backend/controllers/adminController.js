import Admin from "../model/Admin.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export const addAdmin = async (req,res,next) =>{
    const {email,password} = req.body;
    if(!email && !password ){
        return res.status(422).json({message:"invalid input "})
    }
    
   
    let existingAdmin;
    try{
        existingAdmin = await Admin.findOne({email})

    }catch(error){
        console.log(error)
    }
    if(existingAdmin){
        return res.status(400).json({message:"admin already exists"})

    }
    let admin;
    var salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password,salt);

    try{
        console.log(email)
        admin = new Admin({email,password:hashedPassword})
        admin = await admin.save();
        
    }catch(error){
        console.log(error)
    }
    if(!admin){
        return res.status(500).json({message:"unable to create Admin"})

    }

    return res.status(201).json(admin)
}

//login admin
export const login = async(req,res,next) =>{
    const {email,password} = req.body;
    if(!email && !password ){
        return res.status(422).json({message:"invalid input "})
    }
    
    let existingAdmin;
    try {
        existingAdmin = await Admin.findOne({email})
    } catch (error) {
        console.log(error)
    }

    if(!existingAdmin){
        return res.status(400).json({message:"admin not found"})
    }
    const isPasswordCorrect = bcrypt.compareSync(password,existingAdmin.password);

    if(!isPasswordCorrect){
        return res.status(400).json({message:"incorrect password"})

    }
   
    const token = jwt.sign({id:existingAdmin._id},"SECRET",{expiresIn:"7d"})
    return res.status(200).json({message:"authentication complete",token,id:existingAdmin._id})
}

export const getAllAdmin = async (req,res,next) =>{
let admins;
try {
    admins = await Admin.find()
    
} catch (error) {
    return console.log(error)
}
if(!admins){
    return res.status(404).json({message:"no admin found"})
}

return res.status(200).json(admins);

}