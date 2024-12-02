import mongoose from "mongoose";


export const dbConnection = async () => {
   
    try {
        await mongoose.connect(process.env.db_path)
        console.log(` -- DB CONNECTED OK --`.bgGreen)
    } catch (error) {
        console.log(` -- ERR IN DB CONNECTION -- `.bgRed)
        console.log(error)
    }
    
}

  