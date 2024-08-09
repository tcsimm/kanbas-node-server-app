import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
  _id: { type: String, required: true }, // Assuming the course ID is manually assigned, like "RS101"
  name: { type: String, required: true },
  number: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  department: { type: String, required: true }, // Assuming this is a department ID or code
  credits: { type: Number, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true } // Path or URL to the course image
}, 
{ collection: "courses" });

export default courseSchema;
