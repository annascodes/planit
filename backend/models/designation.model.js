import mongoose from "mongoose";


const designationSchema = new mongoose.Schema(
    {
        createdBy:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        }
        ,
        title:{
            type: String,
        }
    },{timestamps:true}
)
const Designation = mongoose.model("Designation", designationSchema);
export default Designation;