const { request } = require('express')
const { mongo } = require('mongoose')
const mongoose=require('mongoose')

const urlSchema=new mongoose.Schema({
        shortID: {
            type: String,
            required: true, // Corrected spelling from "require"
            unique: true,
        },
        redirectURL: {
            type: String,
            required: true, // Corrected spelling from "require"
        },
        visitHistory: [
            { timestamp: { type: Number } }
        ],
    }, {
        timestamps: true, // Corrected spelling from "timestamp"
    });
    

const URL=mongoose.model("url",urlSchema)
module.exports=URL;