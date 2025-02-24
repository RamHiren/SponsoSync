// import mongoose from "mongoose";
const mongoose = require('mongoose');
const { Schema } = mongoose;

const sponserSchema = new Schema({
    sponsername:{
        type: String,
        required: true,
        
    },
    email: {
        type: String,
        required: true,
        
    },
    
    location:{
        type: [String],
        required: true,
        
    },
    
    type:{
        type: String,
        required: true,
    },
   
    SocialMedia: {
        type: [String],
        required: true,
    },
   
    price: {
        type: [String],
        required: true,
    },
    
    minimalAudienceCount: {
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

const Sponser = mongoose.model('Sponser',sponserSchema);
module.exports = Sponser;