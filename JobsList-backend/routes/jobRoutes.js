const express = require('express');
const router = express.Router();
const { getJobs, newJob, getJobById, updateJobById, deleteJobById } = require("../controllers/jobsController");
const validateTokenHandler = require('../middleware/validateTokenHandler');

// Public: Get all jobs
// Protected: Create new job
router.route("/")
  .get(getJobs)
  .post(validateTokenHandler, newJob);

// Public: Get single job by ID
// Protected: Update or Delete job by ID
router.route("/:id")
  .get(getJobById)
  .put(validateTokenHandler, updateJobById)
  .delete(validateTokenHandler, deleteJobById);

module.exports = router;
