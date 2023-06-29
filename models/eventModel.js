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
    event_description: {
        type: String,
        required: "Event Description is required",
        max: 4124,
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
    event_starting_date:{
      type: Date,
      required: "starting date is required"
    },
    event_starting_time:{
      type: String,
      required: "starting time is required"
    },
    type_of_ticket:{
        type: Array,
        required: "Ticket Type Must Be Selected"
    },
    general_admission: {
        type: Number,
        max: 1024,
        trim: true
    },
    vip: {
        type: Number,
        max: 1024,
        trim: true
    },
    reserved_seating:{
        type: Number,
        max: 1024,
        trim: true
    },
    multi_day_pass:{
        type: Number,
        max: 1024,
        trim: true
    },
    early_bird_discount:{
        type: Number,
        max: 1024,
        trim: true
    },
    coded_discount: {
        type: Number,
        max: 1024,
        trim: true
    },
    tickets_at_door: {
        type: Number,
        max: 1024,
        trim: true
    },
    one_day_pass: {
        type: Number,
        max: 1024,
        trim: true
    },
    venue_address: {
        type: String,
        required: "Venue Address is required",
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
    // sale_end_time: {
    //     type: String,
    //     required: 'Sale end time is required, how long will the tickets be available',
    //     max: 6
    // },
    coded_discount_cost: {
        type: Number,
        required: 'Ticket Cost is required',
        max: 20000000
    },
    early_bird_discount_cost: {
        type: Number,
        required: 'Ticket Cost is required',
        max: 20000000
    },
    multi_day_pass_cost: {
        type: Number,
        required: 'Ticket Cost is required',
        max: 20000000
    },
    vip_cost: {
        type: Number,
        required: 'Ticket Cost is required',
        max: 20000000
    },
    general_admission_cost: {
        type: Number,
        required: 'Ticket Cost is required',
        max: 20000000
    },
    one_day_pass_cost: {
        type: Number,
        required: 'Ticket Cost is required',
        max: 20000000
    },
    reserved_seating_cost: {
        type: Number,
        required: 'Ticket Cost is required',
        max: 20000000
    },
    tickets_at_door_cost: {
        type: Number,
        required: 'Ticket Cost is required',
        max: 20000000
    },
    // quantity: {
    //     type: Number,
    //     required: 'quantity is required, how many tickets remain',
    //     max: 200000

    // },
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
