//Using mongoose to connect to database
import mongoose from "mongoose";

//Connection to Database
const connectToDatabase = async ()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI)
    } catch (error) {
        console.log("Error connecting to the Database", error);
        throw new Error("Cannot connect to MongoDB")
    }
}

//Disconnection from database
const disconnectFromDatabse = async()=>{
    try {
        await mongoose.disconnect();
    } catch (error) {
        console.log("Error disconnection", error)
        throw new Error("Failed to disconnect")
    }
}

export { connectToDatabase, disconnectFromDatabse} ;