import mongoose from "mongoose";

const moduleSchema = new mongoose.Schema({
  _id: { type: String, required: true }, 
  course: { type: String, required: true }, 
  name: { type: String, required: true }, 
  lessons: [
    {
      name: { type: String, required: true },
    },
  ],
}, 
{ collection: "modules" });

export default moduleSchema;
