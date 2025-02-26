const express = require('express');
const router = express.Router();
const Sponser = require('../Model/sponser');
const { generateToken ,jwtAuthMiddleware } = require('../middleware/jwt');
const { isSponserOwner } = require('../middleware/auth');

router.post('/new',jwtAuthMiddleware,async(req,res)=>{
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


router.get('/' ,jwtAuthMiddleware,async(req,res)=>{
    try{
        const sponser = await Sponser.find({});
        res.status(200).json({sponser: sponser});

    }catch(err){
        console.log(err);
        res.status(500).json({error : 'Internal Server Error'});
        return;
    }
});


router.get('/admin/mysponserslist', jwtAuthMiddleware, async (req, res) => {
    try {
        const userId = req.user.id; // Extract the logged-in user's ID from the token

        const sponsers = await Sponser.find({ createdBy: userId });

        res.status(200).json({ sponsers });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


router.put('/admin/update/:id', jwtAuthMiddleware, async (req, res) => {
    try {
        const userId = req.user.id; // Extract logged-in user's ID
        const { id } = req.params; // Get sponsor ID from URL
        const updateData = req.body; // Get updated data from request

        // Find and update the sponsor created by this user
        const updatedSponsor = await Sponser.findOneAndUpdate(
            { _id: id, createdBy: userId }, // Ensure user is updating their own data
            updateData,
            { new: true } // Return the updated document
        );

        if (!updatedSponsor) {
            return res.status(404).json({ error: 'Sponsor not found or unauthorized' });
        }

        res.status(200).json({ message: 'Sponsor updated successfully', updatedSponsor });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});



router.delete('/admin/delete/:id', jwtAuthMiddleware, async (req, res) => {
    try {
        const userId = req.user.id; // Extract logged-in user's ID
        const { id } = req.params; // Get sponsor ID from URL

        // Find and delete the sponsor created by this user
        const deletedSponsor = await Sponser.findOneAndDelete({ _id: id, createdBy: userId });

        if (!deletedSponsor) {
            return res.status(404).json({ error: 'Sponsor not found or unauthorized' });
        }

        res.status(200).json({ message: 'Sponsor deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


module.exports = router;