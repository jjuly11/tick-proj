const mongoose= require('mongoose');

const eventSchema= new mongoose.Schema({
    event_name: {
        type: String,
        required: 'Event Name is required',
        max: 124,
        trim: true 
    },
    event_host: {
        type: String,
        required: 'Event Host Name is required',
        max: 124,
        trim: true 
    },
    event_description: {
        type: String,
        max: 2024,
        trim: true 
    },
    age_restricted: {
        type: Boolean,
        required: 'Age restriction field is required',
    },
    venue_name: {
        type: String,
        required: 'The Venue Name is required',
        max: 200,
        trim: true 
    },
    venue_address: {
        type: String ,
        max: 512,
        trim: true 
    },
    event_start: Date,
    event_end: Date,
    country: {
        type: String,
        required: 'The Country is required',
        max: 70,
        trim: true 
    },
    public: {
        type: Boolean,
        required: 'The Boolean is required',
    },
    image: String,
    tickets: [
        {
            ticket_type: String,
            ticket_cost: Number,
            ticket_amount: Number,
            available: Boolean  
        }
    ]

});

eventSchema.index({
    event_name: 'text'
})

module.exports = mongoose.model('Test_Event', eventSchema);