import Team from "../models/team.model.js";

export const createTeam = async(req, res, next)=>{
    // ["67114d2effb7b60ca3438284", "67114d7affb7b60ca3438288", "67114da4ffb7b60ca343828c"] 'alpha'

    try {
        const newTeam = new Team(
            {
                createdBy: req.user.id,
                teamName: req.body.teamName,
                team: req.body.team
            }
        )
        await newTeam.save();

        const getTeam = await Team.findOne({_id: newTeam._id}).populate(
            [
                {
                    path: 'team',
                    select: ['username', 'fullname','title']
                }
            ]
        )

        res.status(200).json(getTeam)
        
    } catch (error) {
        next(error)
    }
}


export const getAllTeams = async(req, res, next)=>{

    try {
        const allteams = await Team.find().populate(
            
                {
                    path: 'team',
                    select: ['username', 'profileImg', 'title']
                }
            
        )
  
        res.status(200).json(allteams)
        
    } catch (error) {
        next(error)
    }

}