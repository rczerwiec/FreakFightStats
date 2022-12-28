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
    },
    rankDif:{
        type:Number,
        default: 0,
    },
    lastRank:{
        type:Number,
        default: 0,
    },
    currentRank:{
        type:Number,
        default: 0,
    }   
}) 

export default mongoose.model("Player", PlayerSchema);

