import mongoose from "mongoose";

export const dbConnection = ()=>{
    mongoose.connect(process.env.MONGO_URI,{
        dbName: "HOSPITAL_MANAGEMENT_SYSTEMS", //atlas se copy krke diya hai
    })
    .then(() => {
        console.log("Connected to database!")
    })
    .catch((err) => {
        console.log(`Some error occured while connecting to database: ${err}`);
    });
}