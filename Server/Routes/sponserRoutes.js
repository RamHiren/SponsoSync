const express = require('express');
const router = express.Router();
const Sponser = require('../Model/sponser');
const { generateToken ,jwtAuthMiddleware } = require('../middleware/jwt');
const { isSponserOwner } = require('../middleware/auth');
const { sendEmail } = require('./emailService');


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



// Apply for a sponsor and store event ID
router.post("/:sponsorId/apply", jwtAuthMiddleware, async (req, res) => {
  try {
    const { sponsorId } = req.params;
    const { eventId } = req.body;

    if (!eventId) {
      return res.status(400).json({ message: "Event ID is required" });
    }

    // Find the sponsor by ID
    const sponsor = await Sponser.findById(sponsorId);
    if (!sponsor) {
      return res.status(404).json({ message: "Sponsor not found" });
    }

    // Check if event is already in the interested list
    if (sponsor.interested.includes(eventId)) {
      return res.status(400).json({ message: "Already applied for this event" });
    }

    // Add the event ID to the interested array
    sponsor.interested.push(eventId);
    await sponsor.save();

    res.status(200).json({ message: "Successfully applied for the event", sponsor });
  } catch (error) {
    console.error("Error applying for sponsor:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});






// router.post('/:sponsorId/apply', async (req, res) => {
//   const { sponsorId } = req.params;
//   const { eventId } = req.body;

//   // Fetch sponsor details (assuming you have a Sponsor model)
//   const sponsor = await Sponser.findById(sponsorId);
//   if (!sponsor) {
//     return res.status(404).json({ message: 'Sponsor not found' });
//   }

//   // Fetch event details (assuming you have an Event model)
//   const event = await Event.findById(eventId);
//   if (!event) {
//     return res.status(404).json({ message: 'Event not found' });
//   }

//   // Send email to sponsor
//   const subject = `New Application for Event: ${event.eventname}`;
//   const text = `You have a new application for the event: ${event.eventname}.`;
//   await sendEmail(sponsor.email, subject, text);

//   // Save the application (assuming you have an Application model)
// //   const application = new Application({ sponsor: sponsorId, event: eventId });
// //   await application.save();

//   res.status(200).json({ message: 'Applied successfully!' });
// });

module.exports = router;

