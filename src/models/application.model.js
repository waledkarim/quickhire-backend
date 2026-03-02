import mongoose, { Schema } from "mongoose";

const application = new Schema(
  {
    id,
    job_id,
    name,
    email,
    resume_link,
    cover_note,
  },
  { timestamps: true },
);

const Application = mongoose.model("Application", application);

export default Application;
