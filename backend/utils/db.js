import mongoose from "mongoose";
const ConnectDB=async()=>{
   try{
    await mongoose.connect(process.env.MONGO_URL);
    console.log("MongoDB Connected");
   } catch(error){
    console.error("Database connection error:", error.stack);

   }
}

export default ConnectDB;
















