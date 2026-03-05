const mongoose = require("mongoose");
const Job = require("../models/job.model");

const getAllJobs = async (req, res) => {
  try {
    const searchParams = req.query;
    let filter = {};

    if (searchParams.q) {
      filter.$or = [
        { title: { $regex: searchParams.q, $options: "i" } },
        { company: { $regex: searchParams.q, $options: "i" } },
      ];
    }

    if (searchParams.location) {
      filter.location = { $regex: searchParams.location, $options: "i" };
    }

    const jobs = await Job.aggregate([
      { $match: filter },

      {
        $lookup: {
          from: "applications",
          localField: "_id",
          foreignField: "job_id",
          as: "applications",
        },
      },

      {
        $addFields: {
          applicationCount: { $size: "$applications" },
        },
      },

      {
        $project: {
          applications: 0,
        },
      },

      {
        $sort: { createdAt: -1 },
      },
    ]);

    console.log("Jobs: ", jobs);

    return res.status(200).json({
      success: true,
      count: jobs.length,
      data: jobs,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const getJobById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid job id" });
    }

    const job = await Job.findById(id);

    if (!job) {
      return res.status(404).json({ success: false, message: "Job not found" });
    }

    return res.status(200).json({ success: true, data: job });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

const createJob = async (req, res) => {
  try {
    const { title, company, location, category, description } = req.body;

    if (!title || !company || !location || !category || !description) {
      return res.status(400).json({
        success: false,
        message: "title, company, location, category, description are required",
      });
    }

    const job = await Job.create({
      title: title.trim(),
      company: company.trim(),
      location: location.trim(),
      category: category.trim(),
      description,
    });

    return res.status(201).json({ success: true, data: job });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

const deleteJob = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid job id" });
    }

    const job = await Job.findByIdAndDelete(id);

    if (!job) {
      return res.status(404).json({ success: false, message: "Job not found" });
    }

    return res.status(200).json({ success: true, message: "Job deleted" });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = {
  getAllJobs,
  getJobById,
  createJob,
  deleteJob,
};
