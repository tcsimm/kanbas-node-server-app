import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  name: { type: String, required: true },
  number: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  department: { type: String, required: false },
  credits: { type: Number, required: false },
  description: { type: String, required: true },
  image: { type: String, required: false } 
}, 
{ collection: "courses" });

export default courseSchema;
