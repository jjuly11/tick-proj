const mongoose = require('mongoose');

const eventSchema= new mongoose.Schema({
    event_name: {
        type: String,
        require: 'Event Name is required',
        max: 64,
        trim: true
    },
    event_host: {
        type: String,
        required: 'Event Host name is required',
        trim: true 
    },
    age_restricted: {
        type: Boolean,
        required: 'Age Restriction is required'
    },
    venue_name:{
        type: String,
        required: "Venue Name is required",
        max: 128,
        trim: true 
    },
    venue_address: {
        type: String,
        max:128,
        trim: true 
    },
    ticket_types:{
        type: Array,
    },
    event_description: {
        type: String,
        required: 'Event description is required',
        trim: true 
    },
    image: String,
    sale_end_time: {
        type: String,
        required: 'Sale end time is required, how long will the tickets be available',
        max: 6
    },
    ticket_cost: {
        type: Number,
        required: 'Ticket Cost is required',
        max: 20000000
    },
    quantity: {
        type: Number,
        required: 'quantity is required, how many tickets remain',
        max: 200000

    },
    country: {
        type: String,
        required: 'Country Name is Required',
        max: 64,
        trim: true
    },
    availability: {
        type: Boolean,
        required: 'Availability is required'
    }
});

eventSchema.index({
    event_name: 'text',
    country: 'text'
})

module.exports = mongoose.model('Event', eventSchema);