import mongoose, { Schema } from "mongoose";

const UserSchema = new mongoose.Schema({
    lastName: {
        type: String,
        required: [true, "Please enter your last name"]  
    },
    middleName: {
        type: String,
        
    },
    firstName: {
        type: String,
        required: [true, "Please enter your first name"]  
    },
    email: {
        type:String,
        required: [true, "Please enter your first name"],
        unique: true
    },
    studentNumber:{
        type: String,
        required: [true, "Please enter your student number"],
        unique: true
    },
    department:{
        type: String,
        required: [true, "Please enter your department"],
    },
    products: [{
        type: Schema.Types.ObjectId,
        ref: 'Product'
    }],
    profilePic: {
        type: String,
        default: "https://gravatar.com/avatar/14fc7e5888d4719f5e26782e499040e5?s=400&d=mp&r=x"
        
    },
    status: {type: String, default: "pending"},
    isAdmin: {type: String, default: "false"},
    password: {
        type: String,
        required: [true, "Please enter your password"],
    }

},{timestamps: true})

export default mongoose.model('User', UserSchema)
