import mongoose from "mongoose";

const subTaskSchema = new mongoose.Schema({
    
    createdBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    title:{
        type:String,
        required: true
    },
    status:{
        type: String,
        enum: ['todo', 'inprogress', 'completed'],
        default:'todo'

    }
},{timestamps: true})

const Subtask = mongoose.model('Subtask', subTaskSchema)
export default Subtask