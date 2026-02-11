import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    image:{
        type:Array,
        required:true
    },
    language:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    author:{
        type:String,
        required:true
    },
    bestseller:{
        type:Boolean,
        default:false
    },
    date:{
        type:Date,
        required:true,
        default: Date.now
    }

})

const bookModel  = mongoose.models.book  || mongoose.model("book",bookSchema);

export default bookModel;