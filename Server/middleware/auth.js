const jwt = require('jsonwebtoken');
const Sponser = require('../Model/sponser');
const User = require('../Model/user');



module.exports.isSponserOwner = async(req,res,next)=>{
    try{
        const id = req.params.id;
        const sponser = await Sponser.findById(id);

        if(!sponser){
            res.status(404).json({error : 'Sponser not found'});
            return;
        }

        const token = localStorage.getItem("token");
        if (token) {
            try {
                const decoded = jwtDecode(token);
                console.log("Decoded token id:", decoded.id); // For debugging purposes
            } catch (error) {
                console.error("Invalid token", error);
            }
        }
       
        if(sponser.createdBy.toString() !== decoded.id.toString()){
            return res.status(401).json({error : 'Unauthorized'});
        }
        next();
    }catch(err){
        console.error(err);
        res.status(500).json({error : 'Internal Server Error'});
        return;
    }
}