import  jwt from 'jsonwebtoken'


export const generateToken = (id,title, res) =>{
    const token = jwt.sign({id,title}, process.env.jwt_key )

    
    res.cookie('access_token', token, {httpOnly: true})
}