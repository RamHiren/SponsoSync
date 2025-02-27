const express = require('express');
const router = express.Router();
const Event = require('../Model/event');
const { generateToken ,jwtAuthMiddleware } = require('../middleware/jwt');
const { isSponserOwner } = require('../middleware/auth');


router.post('/new',jwtAuthMiddleware,async(req,res)=>{
    try{
        const data = req.body;
        const newEvent = new Event(data);
        const savedEvent = await newEvent.save()
        console.log("Data saved Successfully");
        
        res.status(200).json({savedEvent: savedEvent});

    }catch(err){
        console.error(err);
        // res.status(500).send('Server Error');
        res.status(500).json({error : 'Internal Server Error'});
        return;
    }
})

router.get('/' ,async(req,res)=>{
    try{
        const events = await Event.find({});
        res.status(200).json({events: events});

    }catch(err){
        console.log(err);
        res.status(500).json({error : 'Internal Server Error'});
        return;
    }
})

router.get('/myevents', jwtAuthMiddleware, async (req, res) => {
    try {
        const userId = req.user.id; // Extract the logged-in user's ID from the token

        const events = await Event.find({ createdBy: userId });

        res.status(200).json({ events });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Fetch event by ID
router.get("/:eventId", jwtAuthMiddleware, async (req, res) => {
    try {
      const { eventId } = req.params;
  
      const event = await Event.findById(eventId);
      if (!event) {
        return res.status(404).json({ message: "Event not found" });
      }
  
      res.status(200).json({ event });
    } catch (error) {
      console.error("Error fetching event:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  

router.put('/edit/:id' ,jwtAuthMiddleware,async(req,res)=>{
    try{
        const id = req.params.id;
        const updatedData = req.body;

        const event = await Event.findByIdAndUpdate(id, updatedData, {
            new: true, //return updated document
            runValidators: true  // check again mongoose validation
        });

        if(!event){
            res.status(404).json({error : 'Person not found'});
            return;
        }

        // console.log('Updated data', person);
        res.status(200).json(event);

    }catch(err){
        console.error(err);
        res.status(500).json({error : 'Internal Server Error'});
        return;
    }
})


router.delete('/:id',async (req,res)=>{
    try{
        const id =req.params.id;

        const event = await Event.findByIdAndDelete(id);
        if(!event){
            res.status(404).json({error : 'Event not found'});
            return;
        }
        console.log('Event deleted successfully');
        res.status(200).json(event);

    }catch(err){
        console.error(err);
        res.status(500).json({error : 'Internal Server Error'});
        return;
    }
})


module.exports = router;