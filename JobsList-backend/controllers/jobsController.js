const asyncHandler = require("express-async-handler");
const Job = require("../models/jobModel");

// @desc    Get all jobs with pagination and search
// @route   GET /api/jobs
// @access  Public
const getJobs = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10, search = "" } = req.query;

  const pageNumber = parseInt(page, 10) || 1;
  const limitNumber = parseInt(limit, 10) || 9;

  const query = {
    $or: [
      { title: { $regex: search, $options: "i" } },
      { company: { $regex: search, $options: "i" } },
      { location: { $regex: search, $options: "i" } },
    ],
  };

  const count = await Job.countDocuments(query);
  const jobs = await Job.find(query)
    .limit(limitNumber)
    .skip((pageNumber - 1) * limitNumber)
    .sort({ postedAt: -1 });

  res.status(200).json({
    data: jobs,
    total: count,
    pages: Math.ceil(count / limitNumber),
    currentPage: pageNumber,
  });
});

// @desc    Create new job
// @route   POST /api/jobs
// @access  Private
const newJob = asyncHandler(async (req, res) => {
  const { title, company, location, description, salary, jobType } = req.body;

  if (!title || !company || !location || !description || !jobType) {
    res.status(400);
    throw new Error("Please provide all required fields");
  }

  const job = await Job.create({
    title,
    company,
    location,
    description,
    salary,
    jobType,
    user: req.user._id, // requires authentication middleware
  });

  res.status(201).json(job);
});

// @desc    Get single job
// @route   GET /api/jobs/:id
// @access  Public
const getJobById = asyncHandler(async (req, res) => {
  const job = await Job.findById(req.params.id);

  if (!job) {
    res.status(404);
    throw new Error("Job not found");
  }

  res.status(200).json(job);
});

// @desc    Update job
// @route   PUT /api/jobs/:id
// @access  Private
const updateJobById = asyncHandler(async (req, res) => {
  const job = await Job.findById(req.params.id);

  if (!job) {
    res.status(404);
    throw new Error("Job not found");
  }

  // Only allow the user who created the job to update it
  if (job.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("Not authorized to update this job");
  }

  const updatedJob = await Job.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json(updatedJob);
});

// @desc    Delete job
// @route   DELETE /api/jobs/:id
// @access  Private
const deleteJobById = asyncHandler(async (req, res) => {
  const job = await Job.findById(req.params.id);

  if (!job) {
    res.status(404);
    throw new Error("Job not found");
  }

  // Only allow the user who created the job to delete it
  if (job.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("Not authorized to delete this job");
  }

  await job.deleteOne();
  res.status(200).json({ message: "Job deleted successfully" });
});

module.exports = {
  getJobs,
  newJob,
  getJobById,
  updateJobById,
  deleteJobById,
};
