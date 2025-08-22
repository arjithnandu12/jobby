const express = require('express');
const router = express.Router();
const { getJobs, newJob, getJobById, updateJobById, deleteJobById } = require("../controllers/jobsController");
const validateTokenHandler = require('../middleware/validateTokenHandler');

router.route("/")
    .get(getJobs)
    .post(validateTokenHandler, newJob);

router.route("/:id")
    .get(getJobById)
    .put(validateTokenHandler, updateJobById)
    .delete(validateTokenHandler, deleteJobById);

module.exports = router;