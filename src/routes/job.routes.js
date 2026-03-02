const express = require("express");

const router = express.Router();
const {
  getJobs,
  getJobById,
  createJob,
  deleteJob,
} = require("../controllers/job.controller");

router.get("/", getJobs);
router.get("/:id", getJobById);
router.post("/", createJob);
router.delete("/:id", deleteJob);

module.exports = router;
