import mongoose from "mongoose";

export const PlayerSchema = new mongoose.Schema({
    name: {
        type:String,
        required: true,
    },
    wins: {
        type:Number,
        required: true,
    },
    draws: {
        type:Number,
        required: true,
    },
    loses: {
        type:Number,
        required: true,
    },
    matches: {
        type:Number,
    },
    points: {
        type:Number,
    },
    federations: {
        type:String,
    },
    lastMatch: {
        type:String,
    },
    lastPosition:{
        type:Number,
    },
    debiut:{
        type:String,
    }
}) 

export default mongoose.model("Player", PlayerSchema);

