const mongoose = require('mongoose');

const serviceProviderSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Provider name is required'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please add a valid email address'
        ]
    },
    phone: {
        type: String,
        required: [true, 'Phone number is required']
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: 6,
        select: false // Do not return password by default
    },
    services: [{
        type: String,
        required: true
    }],
    location: {
        type: String,
        required: [true, 'Location area is required']
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('ServiceProvider', serviceProviderSchema);
