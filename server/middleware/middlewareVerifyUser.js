import UserModel from "../models/User.model.js";

export async function verifyUser(req,res,next){
    try {
        const {username} = req.method === "GET" ? req.query:req.body;
        let exist = await UserModel.findOne({username})
        if(!exist){
             return res.status(404).send({error:"User does not find!"})
        }
        next();
    }  catch (e){
       res.status(404).send({
           error:"Authentication Error: \n" + e?.message
       })
    }
}

export default verifyUser