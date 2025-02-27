const express = require('express');
const router = express.Router();
const Admin = require('../Model/admin');
const Event = require('../Model/event');
const Sponser = require('../Model/sponser');
const { generateToken ,jwtAuthMiddleware } = require('../middleware/jwt');
const {isAdmin} = require('../middleware/auth');


router.post('/signup' ,async(req,res)=>{
    try{
        const data = req.body;
        const newAdmin = new Admin(data);
        const savedAdmin = await newAdmin.save()
        console.log("Data saved Successfully");
        // aasign jwt token
        const payload ={
            id : savedAdmin.id,
            username : savedAdmin.username
        }

        const token = generateToken(payload);
        console.log("token :" ,token);
        res.status(200).json({savedAdmin: savedAdmin ,token: token});

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
        const admin = await Admin.findOne({username});
        if(!admin || !(admin.password === password)){
            return res.status(401).json({error : 'Invalid Credentials'});
        }
        //genarate token
        const payload ={
            id : admin.id,
            username : admin.username
        }
        const token = generateToken(payload);
        res.status(200).json({token: token});
    }catch(err){
        console.error(err);
        res.status(500).json({error : 'Internal Server Error'});
        return;
    }
});




router.get('/sponser' ,isAdmin,async(req,res)=>{
    try{
        const sponser = await Sponser.find({});
        res.status(200).json({sponser: sponser});

    }catch(err){
        console.log(err);
        res.status(500).json({error : 'Internal Server Error'});
        return;
    }
});



router.put('/sponser/:id', isAdmin, async (req, res) => {
    try {
        const { id } = req.params;
        const { isVerified } = req.body;

        const sponsor = await Sponser.findById(id);
        if (!sponsor) {
            return res.status(404).json({ error: 'Sponsor not found' });
        }

        sponsor.isVerified = isVerified;
        await sponsor.save();

        res.status(200).json({ message: 'Sponsor verified successfully', sponsor });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});



router.delete('/sponser/:id', isAdmin, async (req, res) => {
    try {
        const { id } = req.params;

        const sponsor = await Sponser.findById(id);
        if (!sponsor) {
            return res.status(404).json({ error: 'Sponsor not found' });
        }

        await sponsor.deleteOne();
        res.status(200).json({ message: 'Sponsor deleted successfully' });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});



// Backend routes for event verification
router.get('/events', isAdmin, async (req, res) => {
    try {
        const events = await Event.find({});
        res.status(200).json({ events });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.put('/events/:id', isAdmin, async (req, res) => {
    try {
        const { id } = req.params;
        const { isVerified } = req.body;

        const event = await Event.findById(id);
        if (!event) {
            return res.status(404).json({ error: 'Event not found' });
        }

        event.isVerified = isVerified;
        await event.save();

        res.status(200).json({ message: 'Event verified successfully', event });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.delete('/events/:id', isAdmin, async (req, res) => {
    try {
        const { id } = req.params;

        const event = await Event.findById(id);
        if (!event) {
            return res.status(404).json({ error: 'Event not found' });
        }

        await event.deleteOne();
        res.status(200).json({ message: 'Event deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;