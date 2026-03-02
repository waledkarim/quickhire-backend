const router = express.Router();

router.get("/", getJobs);
router.get("/:id", getJobById);
router.post("/", createJob);
router.delete("/:id", deleteJob);

module.exports = router;
