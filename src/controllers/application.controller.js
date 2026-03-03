const mongoose = require("mongoose");
const isValidURL = require("../lib/isValidURL");
const Application = require("../models/application.model");
const Job = require("../models/job.model");

const createApplication = async (req, res) => {
  try {
    const { job_id, name, email, resume_link, cover_note } = req.body;

    // Basic required-field validation
    if (!job_id || !name || !email || !resume_link || !cover_note) {
      return res.status(400).json({
        success: false,
        message: "job_id, name, email, resume_link, cover_note are required",
      });
    }

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(job_id)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid job_id" });
    }

    // Ensure job exists
    const jobExists = await Job.exists({ _id: job_id });
    if (!jobExists) {
      return res.status(404).json({ success: false, message: "Job not found" });
    }

    // Validate email format
    const emailOk = /^\S+@\S+\.\S+$/.test(email);
    if (!emailOk) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid email address" });
    }

    // Validate resume link
    if (!isValidURL(resume_link)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid resume_link URL" });
    }

    const application = await Application.create({
      job_id,
      name: name.trim(),
      email: email.trim().toLowerCase(),
      resume_link: resume_link.trim(),
      cover_note: cover_note.trim(),
    });

    return res.status(201).json({ success: true, data: application });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = createApplication;
