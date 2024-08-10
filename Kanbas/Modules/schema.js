import mongoose from "mongoose";

const moduleSchema = new mongoose.Schema({
  _id: { type: String, required: true }, // ID for the module
  course: { type: String, required: true }, // ID of the associated course
  name: { type: String, required: true }, // Name of the module
  lessons: [
    {
      name: { type: String, required: true }, // Name of each lesson
    },
  ],
}, 
{ collection: "modules" });

export default moduleSchema;
