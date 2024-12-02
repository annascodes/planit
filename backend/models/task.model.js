import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({

    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }
    ,
    title: {
        type: String,
        required: true,
        unique: true,
    },
    assignedToUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    assignedToTeam: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Team',
    },
    status: {
        type: String,
        enum: ['todo', 'inprogress', 'completed'],
        default: 'todo'
    },
    priority: {
        type: String,
        enum: ['normal', 'medium', 'high'],
        default: 'normal'
    },
    attachments: [
        {
            type: String,
        }
    ],
    subtasks: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Subtask',
        }
    ],

    deadline: {
        type: String,
        default: new Date()
    }



}, { timestamps: true })

const Task = mongoose.model("Task", taskSchema);
export default Task;