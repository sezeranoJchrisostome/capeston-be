import mongoose from 'mongoose';

const usersSchema = new mongoose.Schema({
    Email:{
        type: String,
        required: 'This field is required'
    },
    Fullname:{
        type: String,
        required: 'This field is required'
    },
    Username:{
        type: String,
        required: 'This field is required'
    },
    emailIsVerified:{
        type: Boolean,
        required: 'This field is required'
    },
    Password:{
        type: String,
        required: 'This field is required'
    },
    userId:{
        type: Number,
    },
    profile:{
        type: String,
    },
    userType:{
        type: String
    }
});

export default mongoose.model('Users',usersSchema);