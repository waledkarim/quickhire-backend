require("dotenv").config();
const connectDB = require("../lib/db");
const Job = require("../models/job.model");

const jobs = [
  {
    title: "Frontend Developer (React)",
    company: "Qtec Solution Limited",
    location: "Dhaka, Bangladesh",
    category: "Frontend",
    description:
      "Build responsive UI using React/Next.js. Strong CSS/Tailwind skills required.",
  },
  {
    title: "Backend Developer (Node.js)",
    company: "QuickHire",
    location: "Remote",
    category: "Backend",
    description:
      "Develop REST APIs with Express and MongoDB. Experience with validation and clean architecture.",
  },
  {
    title: "UI/UX Designer",
    company: "DesignSprint Studio",
    location: "Dhaka, Bangladesh",
    category: "Design",
    description:
      "Create polished UI based on Figma. Strong layout/typography and responsive design sense.",
  },
  {
    title: "QA Engineer",
    company: "QualityWorks",
    location: "Chattogram, Bangladesh",
    category: "QA",
    description:
      "Write test cases, perform regression testing, and collaborate with devs to ship reliable features.",
  },
  {
    title: "Associate Software Engineer",
    company: "Startup Hub",
    location: "Dhaka, Bangladesh",
    category: "Software Engineering",
    description:
      "Work across frontend and backend tasks. Must be comfortable with Git and shipping iteratively.",
  },
];

async function seed() {
  try {
    await connectDB();
    const inserted = await Job.insertMany(jobs);
    console.log(`✅ Inserted ${inserted.length} jobs`);
    process.exit(0);
  } catch (err) {
    console.error("❌ Seed failed:", err.message);
    process.exit(1);
  }
}

seed();
