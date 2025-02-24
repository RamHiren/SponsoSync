const express = require('express');
const router = express.Router();
const Sponser = require('../Model/sponser');
const { generateToken ,jwtAuthMiddleware } = require('../jwt');

router.post('/new',async(req,res)=>{
    try{
        const data = req.body;
        const newSponser = new Sponser(data);
        const savedSponser = await newSponser.save()
        console.log("Data saved Successfully");
        
        res.status(200).json({savedSponser: savedSponser});

    }catch(err){
        console.error(err);
        // res.status(500).send('Server Error');
        res.status(500).json({error : 'Internal Server Error'});
        return;
    }
})

router.get('/' ,async(req,res)=>{
    try{
        const sponser = await Sponser.find({});
        res.status(200).json({sponser: sponser});

    }catch(err){
        console.log(err);
        res.status(500).json({error : 'Internal Server Error'});
        return;
    }
})

router.put('/edit/:id' ,async(req,res)=>{
    try{
        const id = req.params.id;
        const updatedData = req.body;

        const sponser = await Sponser.findByIdAndUpdate(id, updatedData, {
            new: true, //return updated document
            runValidators: true  // check again mongoose validation
        });

        if(!sponser){
            res.status(404).json({error : 'Comnpany not found'});
            return;
        }

        // console.log('Updated data', person);
        res.status(200).json(sponser);

    }catch(err){
        console.error(err);
        res.status(500).json({error : 'Internal Server Error'});
        return;
    }
})


router.delete('/:id',async (req,res)=>{
    try{
        const id =req.params.id;

        const sponser = await Sponser.findByIdAndDelete(id);
        if(!sponser){
            res.status(404).json({error : 'Sponser not found'});
            return;
        }
        console.log('Sponser deleted successfully');
        res.status(200).json(sponser);

    }catch(err){
        console.error(err);
        res.status(500).json({error : 'Internal Server Error'});
        return;
    }
})


module.exports = router;