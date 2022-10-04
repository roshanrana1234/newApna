import mongoose from 'mongoose';
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const AdminSingupSchema = new mongoose.Schema({

    phonenumber: {
        type: Number,
        required: true,
        unique: true
    },

    fullname: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },


    // firstfrom: [
    //     {
    //         hiringFor: {
    //             type: String,

    //             required: true
    //         },
    //         hiringoption: {
    //             type: String,
    //             enum: ["My own company", "My clients"],
    //             required: true
    //         },
    //         companyName: {
    //             type: String,

    //             required: true

    //         },
    //         companyWeb: {
    //             type: String,

    //         },
    //         employeesNumber: {
    //             type: String,

    //         },

    //     }]
    // ,




})

AdminSingupSchema.pre('save', async function (next) {
    console.log("hii pre");
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 12)
        this.confrimPassword = await bcrypt.hash(this.password, 12)
    }
    next();
})




const AdminSingup = mongoose.model('AdminSingup', AdminSingupSchema)


export default AdminSingup;