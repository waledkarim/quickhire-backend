require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const connectDB = require("./lib/db");
const jobRoutes = require("./routes/job.routes");
const applicationRoutes = require("./routes/application.routes");

const PORT = process.env.PORT;
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.use("/api/jobs", jobRoutes);
app.use("/api/applications", applicationRoutes);

app.listen(PORT, () => {
  connectDB();
  console.log("Server is running on PORT: " + PORT);
});
