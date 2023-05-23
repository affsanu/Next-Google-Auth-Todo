import mongoose from "mongoose";

async function DbConnect() {
  mongoose
    .connect( process.env.MONGO_URI )
    .then(() => console.log("db connected!"))
    .catch((error) => console.log(error.message));
}


export default DbConnect;