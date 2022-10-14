const mongoose = require('mongoose');

const eventSchema= new mongoose.Schema({
    event_name: {
        type: String,
        require: 'Event Name is required',
        max: 64,
        trim: true
    },
    event_description: {
        type: String,
        required: 'Event description is required',
        trim: true 
    },
    image: String,
    starting_time: {
        type: Number,
        required: 'Starting time is required',
        max: 6
    },
    ticket_cost: {
        type: Number,
        required: 'Ticket Cost is required',
        max: 6
    },
    quantity: {
        type: Number,
        required: 'quantity is required',
        max: 6

    },
    country: {
        type: String,
        required: 'Country Name is Required',
        max: 64,
        trim: true
    }
});

eventSchema.index({
    event_name: 'text',
    
});

module.exports = mongoose.model('Event', eventSchema);