const asyncHandler = require("express-async-handler");

const Job = require("../models/jobModel");

// @desc    Get all jobs with pagination and search
// @route   GET /api/jobs
// @access  Public
const getJobs = asyncHandler(async (req, res) => {
    const { page=1, limit=9, search="" } = req.query;

    const pageNumber = parseInt(page);
    const limitNumber = parseInt(limit);

    const skip = (pageNumber - 1) * limitNumber;

    // Build the search query to search across title and description
    const searchQuery = search
        ? {
            $or: [
                { title: { $regex: search, $options: 'i' } },
                { company: { $regex: search, $options: "i" } },
                { location: { $regex: search, $options: "i" } },
                
            ]
        }
        : {};

    const jobs = await Job.find(searchQuery)
        .skip(skip)
        .limit(limitNumber)

    const totalJobs = await Job.countDocuments(searchQuery);

    res.status(200).json({
        success: true,
        count: jobs.length,
        total: totalJobs,
        page: pageNumber,
        pages: Math.ceil(totalJobs / limitNumber),
        data: jobs,
    });
});

const newJob = asyncHandler(async (req, res) => {
    try {
        if (Array.isArray(req.body)) {
            
            const jobs = await Job.insertMany(req.body);
            return res.status(201).json({
                success: true,
                count: jobs.length,
                data: jobs
            });
        } else {
            
            const { title, company, location, description, salary, jobType } = req.body;
            
            if (!title || !company || !location || !description || !salary || !jobType) {
                res.status(400);
                throw new Error("Please fill all the fields");
            }
            
            const job = await Job.create({ title, company, location, description, salary, jobType });
            return res.status(201).json({
                success: true,
                data: job
            });
        }
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});

const getJobById = asyncHandler(async (req, res) => {
    const job = await Job.findById(req.params.id);
    if (!job) {
        res.status(404);
        throw new Error("Job not found");
    }
    res.status(200).json(job);
});

const updateJobById = asyncHandler(async (req, res) => {
    const job = await Job.findById(req.params.id);
    if (!job) {
        res.status(404);
        throw new Error("Job not found");
    }

    // Added 'description' to the destructuring
    const { title, company, location, description, salary, jobType } = req.body;

    // Added 'description' to the update object
    const updatedJob = await Job.findByIdAndUpdate(
        req.params.id,
        { title, company, location, description, salary, jobType },
        { new: true, runValidators: true }
    );

    res.status(200).json(updatedJob);
});

const deleteJobById = asyncHandler(async (req, res) => {
    const job = await Job.findById(req.params.id);
    if (!job) {
        res.status(404);
        throw new Error("Job not found");
    }
    await Job.findByIdAndDelete(req.params.id);
    res.status(200).json(job);
});

module.exports = { getJobs, newJob, getJobById, updateJobById, deleteJobById };
