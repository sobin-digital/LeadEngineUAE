const mongoose = require('mongoose');
const validServices = [
    'AC Repair & Fixing', 'General Maintenance', 'AC Installation', 'Duct Cleaning',
    'Emergency Plumbing', 'Leak Detection & Repair', 'Water Heater Service', 'Drain Unblocking',
    'Deep Cleaning', 'Standard Maid Service', 'Sofa & Carpet Cleaning', 'Move-in / Move-out',
    'electrician', 'appliance-repair',
    'Emergency Electrical Fix', 'Wiring Installation', 'Lighting & Fixtures', 'Short Circuit Repair',
    'Washing Machine Repair', 'Refrigerator Repair', 'Oven / Stove Repair', 'Dishwasher Repair',
    'AC Repair', 'Plumbing', 'Cleaning', 'Car Recovery'
];

const leadSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true
    },
    phone: {
        type: String,
        required: [true, 'Phone number is required'],
        trim: true
    },
    location: {
        type: String,
        required: [true, 'Location is required'],
        trim: true
    },
    service: {
        type: String,
        required: [true, 'Service type is required'],
        enum: {
            values: validServices,
            message: '{VALUE} is not a valid service type. Service must be matched to a predefined category.'
        }
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Lead', leadSchema);
