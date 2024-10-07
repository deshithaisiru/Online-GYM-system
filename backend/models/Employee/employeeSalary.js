import mongoose from "mongoose";

const salarySchema = mongoose.Schema(
    {
        iD:{
            type: String,
            required: true,
        },
        month:{
            type: String,
            required: true,
        },
        name:{
            type: String,
            required: true,
        },
        role:{
            type: String,
            required: true,
        },
        email:{
            type: String,
            required: true,
        },
        bsalary:{
            type: Number,
            required: true,
        },
        tsalary:{
            type: Number,
            required: true,
        },
        payst:{
            type: String,
            required: true,
        },
        otHour:{
            type: Number,
            required: true,
        },
        otRate:{
            type: Number,
            required: true,
        },
        otTotal:{
            type:  Number,
            required: true,
        },
        bonus:{
            type: Number,
            required: true,
        },
    }
);

export const Salary = mongoose.model('Salary',salarySchema);