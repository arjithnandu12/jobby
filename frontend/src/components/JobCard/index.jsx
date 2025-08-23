import React, { useContext } from "react";
import { Link as RouterLink } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";  

const JobCard = ({ job, onDelete }) => {
  const { user } = useContext(AuthContext);

  return (
    <div className="p-6 border border-gray-700 rounded-lg shadow-md bg-black text-white">
      <h3 className="text-lg font-semibold mb-2">{job.title}</h3>
      <p className="font-bold text-gray-300">{job.company}</p>
      <p className="text-sm text-gray-500">{job.location}</p>

      <div className="flex items-center mt-2 space-x-2">
        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-500 text-white">
          ${job.salary}
        </span>
        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-purple-500 text-white">
          {job.jobType}
        </span>
      </div>

      {/* ✅ Added Description */}
      <p className="mt-4 text-gray-300 line-clamp-2">
        {job.description}
      </p>

      <p className="mt-2 text-gray-400 text-sm">
        Posted on: {new Date(job.postedAt).toLocaleDateString()}
      </p>

      <div className="flex space-x-4 mt-6">
        <RouterLink
          to={`/jobs/${job._id}`}
          className="px-4 py-2 text-sm font-medium text-black bg-blue-500 rounded-md hover:bg-blue-600 transition-colors duration-300"
        >
          View Details
        </RouterLink>
        {user && (
          <>
            <RouterLink
              to={`/jobs/edit/${job._id}`}
              className="px-4 py-2 text-sm font-medium text-black bg-yellow-400 rounded-md hover:bg-yellow-500 transition-colors duration-300"
            >
              Edit
            </RouterLink>
            <button
              onClick={() => onDelete(job._id)}
              className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 transition-colors duration-300"
            >
              Delete
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default JobCard;
