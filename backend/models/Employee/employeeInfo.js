import mongoose from "mongoose";

const infoSchema = mongoose.Schema(
    {
        iD:{
            type: String,
            required: true,
        },
        fname:{
            type: String,
            required: true,
        },
        lname:{
            type: String,
            required: true,
        },
        nic:{
            type: String,
            required: true,
        },
        role:{
            type: String,
            required: true,
        },
        gender:{
            type: String,
            required: true,
        },
        dob:{
            type: String,
            required: true,
        },
        conNo:{
            type: String,
            required: true,
        },
        email:{
            type: String,
            required: true,
        },
        address:{
            type: String,
            required: true,
        },
        bsalary:{
            type:  Number,
            required: true,
        },
        dateJoin:{
            type: String,
            required: true,
        },
        dateTer:{
            type: String,
            required: true,
        },
    }
);

export const Information = mongoose.model('Information',infoSchema); 
