import mongoose, { Schema } from "mongoose";

const applicationSchema = new Schema(
  {
    job_id: {
      type: Schema.Types.ObjectId,
      ref: "Job",
      required: true,
    },
    name: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please provide a valid email address"],
    },
    resume_link: {
      type: String,
      match: [/^(https?:\/\/)[^\s$.?#].[^\s]*$/, "Please provide a valid URL"],
    },
    cover_note: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

const Application = mongoose.model("Application", applicationSchema);

export default Application;
