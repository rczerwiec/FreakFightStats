import mongoose from "mongoose";
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
 location: {     
   type: String,    
   default: "Poland",
   },
  date: {
    type: Date,
    default: Date.now,
  },
});
export const User = mongoose.model("User", UserSchema);
