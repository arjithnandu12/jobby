const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  company: { type: String, required: true },
  location: { type: String, required: true },
  description: { type: String, required: true },
  salary: { type: Number },
  jobType: {
    type: String,
    required: true,
    enum: ["Full-time", "Part-time", "Contract"],
  },
  postedAt: { type: Date, default: Date.now },

  // ✅ User reference (to track which user created the job)
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("Job", jobSchema);
