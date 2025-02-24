// import mongoose from "mongoose";
const mongoose = require('mongoose');
const { Schema } = mongoose;

const eventSchema = new Schema({
    eventname:{
        type: String,
        required: true,
        
    },
    eventtype: {
        type: String,
        required: true,
        
    },
    
    location:{
        type: [String],
        required: true,
        
    },
   
    startDate:{
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        required: true,
        // validate: {
        //     validator: function (value) {
        //         return value >= this.startDate; // Ensures endDate is after startDate
        //     },
        //     message: 'End date must be after start date'
        // }
    },

    eventSocialMedia: {
        type: [String],
        // required: true,
    },
    eventDescription: {
        type: String,
        required: true,
    },
    proposal: {
        type: String,
        required: true,
    },

    offers: {
        type: [String],
        required: true,
    },
    eventOrganizer: {
        type: String,
        required: true,
    },

    audienceCount: {
        type: Number,
        required: true,
        min: 10,
    },

    // createdBy: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'User', // References the User model
    //     required: true
    // }

},{ timestamps: true });

const Event = mongoose.model('Event',eventSchema);
module.exports = Event;