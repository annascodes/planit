import mongoose, { mongo } from "mongoose";

const teamSchema = new mongoose.Schema(
    {
        createdBy:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
        ,
        teamName:{
            type: String,
            required: true,
        },
        team: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            }
        ]
        // teamMembers:[
        //     {
        //         member:{
        //             type:mongoose.Schema.Types.ObjectId,
        //             ref: "User"
        //         },
        //         role:{
        //             type: String,
        //             required: true,
        //         }
        //     }
        // ],
       

    },{timestamps:true}
)

const Team = mongoose.model('Team', teamSchema)
export default Team;
