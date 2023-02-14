import mongoose from 'mongoose';

export const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please Provide with uniques Username"],
        unique: [true, "Username Already Exists, Please choose another one!"],
        trim: true
    },
    password: {
        type: String,
        required: [true, "Please provide a Password"],
    },
    email: {
        type: String,
        required: [true, "Please provide a unique email"],
        unique: true,
    },
    firstName: String,
    lastName: String,
    mobile: Number,
    address: String,
    profile: String

})

export default mongoose.model("User", userSchema)