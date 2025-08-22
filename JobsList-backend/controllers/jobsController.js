const asyncHandler = require("express-async-handler");

const Job = require("../models/jobModel");
const getJobs= asyncHandler(async (req,res)=>{
    const jobs=await Job.find({});
    res.status(200).json(jobs);
})
const newJob= asyncHandler(async (req,res)=>{
    const {title,company,location,salary,jobType} = req.body;
    if (!title || !company || !location || !salary || !jobType) {res.status(400);
        throw new Error("Please fill all the fields");
    }
    const job=await Job.create({
        title,
        company,
        location,
        salary,
        jobType
    }); 
  
   res.status(201).json(job);

})
const getJobById= asyncHandler(async (req,res)=>{
    const job=await Job.findById(req.params.id);
    if (!job){
        res.status(404);
        throw new Error("Job not found");
    }
    res.status(200).json(job);
})
const updateJobById = asyncHandler(async (req, res) => {
    const job = await Job.findById(req.params.id);
    if (!job) {
        res.status(404);
        throw new Error("Job not found");
    }

    const { title, company, location, salary, jobType } = req.body;

    const updatedJob = await Job.findByIdAndUpdate(
        req.params.id,
        { title, company, location, salary, jobType },
        { new: true, runValidators: true }
    );

    res.status(200).json(updatedJob);
});

const deleteJobById=asyncHandler(async (req,res)=>{
    const job = await Job.findById(req.params.id);
    if (!job) {
        res.status(404);
        throw new Error("Job not found");
    }
    await Job.findByIdAndDelete(req.params.id);
    res.status(200).json(job);
})
module.exports={getJobs,newJob,getJobById, updateJobById,deleteJobById};