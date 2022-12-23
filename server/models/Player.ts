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
    championships: {
        type:String,
        required: true,
    }
}) 

export default mongoose.model("Player", PlayerSchema);

