import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    email:{
        type:String, 
        required:true,
        unique:true,
    },
    username:{
        type:String, 
        required:true,
        unique:true,
    },
    fullname:{
        type:String,
        required:true,
    },
    gender:{
        type:String,
        default:'male'
    },
    password:{
        type:String,
        required: true,
    },
    profileImg:{
        type:String,
        default:''
    },
    title:{
        type: String,
        // enum:['owner', 'admin', 'user'],
        default:'user'
    },

}, {timestamps:true})
const User = mongoose.model("User", userSchema);
export default User;