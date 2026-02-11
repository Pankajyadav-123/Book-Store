import mongoose from "mongoose";

const connectedDB = async () => {
    mongoose.connection.on('connected',()=>{
        console.log("DB Connected");
    })

    mongoose.connection.on('error',()=>{
        console.log("DB Connection Error");
    })

    await mongoose.connect(`${process.env.MONGO_URL}/book-shop`)
}

export default connectedDB;