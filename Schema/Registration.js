import mongoose from 'mongoose';
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const Schema = new mongoose.Schema({

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


    firstfrom: [
        {
            hiringFor: {
                type: String,

                required: true
            },
            hiringoption: {
                type: String,
                enum: ["My own company", "My clients"],
                required: true
            },
            companyName: {
                type: String,

                required: true

            },
            companyWeb: {
                type: String,

            },
            employeesNumber: {
                type: String,

            },

        }]
    ,


    // jobDetails: [
    //     {

    //         jobRole: {
    //             type: String,
    //         },

    //         typeOfJob: {
    //             type: String,
    //             // required:true,
    //             enum: ["Full time", "Part time"],
    //             default: "Full time"
    //         },

    //         vacncy: {
    //             type: Number,
    //             // required:true
    //         },

    //         WorkLocationType: {
    //             type: String,
    //             enum: ["Work from office", "Work from home", "Field jobs;"]
    //         },

    //         ReceiveApplicationsFrom: {
    //             type: String,
    //             enum: ["Within 10km", "Within 25km", "enter city"]
    //         },

    //         ReceiveAnyWhre: {
    //             type: String,
    //             enum: ["Yes", "No"]
    //         },

    //         jobcity: {
    //             type: String,

    //         },
    //         payType: {
    //             type: String,
    //             enum: ["Fixed only", "Fixed + incentive", "incentive only"],

    //         },
    //         additionPerks: {

    //         },
    //         area: {
    //             type: String,

    //         },
    //         completeAdress: {
    //             type: String,
    //         },

    //         sallareyMinuim: {
    //             type: Number,
    //         },
    //         sallareyMax: {
    //             type: Number,
    //         },
    //         sallareyAverage: {
    //             type: Number,
    //         },

    //         joiningFee: {
    //             type: String,
    //             enum: ["Yes", "No"],
    //         },
    //         Fee: {
    //             type: Number,


    //         },
    //         feeFor: {
    //             type: String,


    //         },

    //         feePaid: {
    //             type: String,
    //             enum: ["Before the interview", "after job confirmation", "deduct from salary"],

    //         },


    //         miniumEducation: { type: String },
    //         specificQualification: { type: String },

    //         Gender: {
    //             type: String,
    //             enum: ["Male", "Female", "Both"]
    //         },
    //         experience: { type: String },
    //         experienceYear: { type: Number },
    //         EnglishLevel: {
    //             type: Number,
    //             enum: ["No eglish", "Thoda enlish", "Good english", "Fluent english"]
    //         },

    //         skills: [{
    //             skill1: { type: String },
    //             skill2: { type: String },
    //             skill3: { type: String },
    //             skill4: { type: String },
    //             skill5: { type: String }

    //         }],

    //         assetsRequired: { type: String },
    //         aditional: { type: String },
    //         completeAdress: { type: String },



    //         InterviewerDetails: {
    //             type: String,
    //             enum: ["Myself", "Other"]
    //         },
    //         RecruiterName: { type: String },
    //         HrNumber: { type: Number },
    //         email: { type: String },
    //         typeOfInterview: {
    //             type: String,
    //             enum: ["In-person interview", "Telephonic/online interview"]
    //         },
    //         InterviewCity: { type: String },
    //         area: { type: String },
    //     }]


    // pimage:{type:String,required:true},
    // role: {
    //     type: String,
    //      enum: ["user", "admin"],
    //     default: "user",
    //   },


})

Schema.pre('save', async function (next) {
    console.log("hii pre");
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 12)
        this.confrimPassword = await bcrypt.hash(this.password, 12)
    }
    next();
})




const Registration = mongoose.model('Registration', Schema)


export default Registration;