import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_URL = 'http://localhost:5001/api/jobs';

const JobDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchJobDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchJobDetails = async () => {
    try {
      const response = await axios.get(`${API_URL}/${id}`);
      setJob(response.data);
      setLoading(false);
    } catch {
      setError('Failed to fetch job details.');
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-900">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-yellow-400"></div>
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-900 text-red-500">
        <div className="p-4 rounded-md bg-red-100 border border-red-400 text-black">
          {error || 'Job not found.'}
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage:
          "url('')",
      }}
    >
      <div className="p-6 max-w-3xl mx-auto border border-gray-700 rounded-lg shadow-lg bg-gray-900/90 text-white backdrop-blur-md">
        {/* Back Button */}
        <button
          onClick={() => navigate('/jobs')}
          className="mb-6 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-sm font-semibold rounded-lg transition-colors duration-300"
        >
          ← Back to Jobs
        </button>

        {/* Job Title */}
        <h1 className="text-3xl font-extrabold mb-3 text-yellow-400">
          {job.title || "Untitled Position"}
        </h1>

        {/* Company & Location */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
          <p className="text-xl font-semibold">
            {job.company || "Unknown Company"}
          </p>
          <p className="text-base text-gray-400">
            {job.location || "Location not specified"}
          </p>
        </div>

        {/* Salary & Job Type */}
        <div className="flex items-center mb-6 space-x-3">
          <span className="inline-block px-3 py-1 text-sm font-medium bg-green-600 rounded-full">
            💰 {job.salary ? `$${job.salary}` : "Salary not disclosed"}
          </span>
          <span className="inline-block px-3 py-1 text-sm font-medium bg-purple-600 rounded-full">
            🏷️ {job.jobType || "N/A"}
          </span>
        </div>

        {/* Description */}
        <div className="mb-6">
          <h2 className="text-lg font-bold mb-2 text-gray-200">
            Job Description
          </h2>
          <p className="text-gray-300 leading-relaxed">
            {job.description || "No description available for this job."}
          </p>
        </div>

        {/* Posted Date */}
        <p className="text-sm text-gray-500 italic">
          📅 Posted on:{" "}
          {job.postedAt
            ? new Date(job.postedAt).toLocaleDateString()
            : "Date not available"}
        </p>
      </div>
    </div>
  );
};

export default JobDetails;
