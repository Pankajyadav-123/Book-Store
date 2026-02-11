import mongoose  from "mongoose";

const user = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,

    },
    password:{
        type:String,
        required:true
    },
    cartData:{
        type:Object,
        default:{}
    }
},{minimize:false})

const User = mongoose.models.user || mongoose.model("User", user);

export default User;