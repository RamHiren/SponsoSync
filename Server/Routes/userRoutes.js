const express = require('express');
const router = express.Router();
const User = require('../Model/user');
const { generateToken ,jwtAuthMiddleware } = require('../middleware/jwt');


router.post('/signup' ,async(req,res)=>{
    try{
        const data = req.body;
        const newUser = new User(data);
        const savedUser = await newUser.save()
        console.log("Data saved Successfully");
        // aasign jwt token
        const payload ={
            id : savedUser.id,
            username : savedUser.username
        }

        const token = generateToken(payload);
        console.log("token :" ,token);
        res.status(200).json({savedUser: savedUser ,token: token});

    }catch(err){
        console.error(err);
        // res.status(500).send('Server Error');
        res.status(500).json({error : 'Internal Server Error'});
        return;
    }
})

router.post('/login', async(req,res)=>{
    try{
        const {username ,password} = req.body;
        const user = await User.findOne({username});
        if(!user || !(user.password === password)){
            return res.status(401).json({error : 'Invalid Credentials'});
        }
        //genarate token
        const payload ={
            id : user.id,
            username : user.username
        }
        const token = generateToken(payload);
        res.status(200).json({token: token});
    }catch(err){
        console.error(err);
        res.status(500).json({error : 'Internal Server Error'});
        return;
    }
});





module.exports = router;