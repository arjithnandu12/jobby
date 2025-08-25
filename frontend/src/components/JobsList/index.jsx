import React, { useState, useEffect, useContext } from "react";
import { FaSearch, FaPlus } from "react-icons/fa";
import { Link as RouterLink } from "react-router-dom";
import axios from "axios";
import JobCard from "../JobCard/index.jsx";
import { AuthContext } from "../../Context/AuthContext";

const API_URL = "https://jobby-zzfw.onrender.com/api/jobs";

const JobsList = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { user } = useContext(AuthContext);

  // ✅ Debounce search input
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);
    return () => clearTimeout(handler);
  }, [search]);

  // ✅ Fetch jobs whenever page or search changes
  useEffect(() => {
    fetchJobs();
    // Reset page if search changes
    if (currentPage !== 1 && debouncedSearch) {
      setCurrentPage(1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, debouncedSearch]);

  // ✅ Fetch jobs from API
  const fetchJobs = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `${API_URL}?page=${currentPage}&limit=9&search=${debouncedSearch}`
      );
      setJobs(response.data.data || []);
      setTotalPages(response.data.pages || 1);
    } catch  {
      setError("Failed to fetch jobs.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Delete job (only if user has token)
  const handleDelete = async (jobId) => {
    try {
      const token = user?.token || localStorage.getItem("token");
      if (!token) {
        setError("Unauthorized: No token found.");
        return;
      }

      await axios.delete(`${API_URL}/${jobId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      fetchJobs();
    } catch  {
      setError("Failed to delete job. You may not have permission.");
    }
  };

  // ✅ Search handler
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  // ✅ Loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center mt-10">
        <div
          className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2"
          style={{ borderColor: "#000000" }}
        ></div>
      </div>
    );
  }

  // ✅ Error state
  if (error) {
    return (
      <div
        className="p-4 rounded-md mt-10 mx-8"
        style={{ backgroundColor: "#000000", color: "#FFFDF2" }}
      >
        {error}
      </div>
    );
  }

  return (
    <div
      className="p-8 min-h-screen"
      style={{ backgroundColor: "#FFFDF2", color: "#000000" }}
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">All Jobs</h2>
        <RouterLink
          to="/jobs/new"
          className="font-semibold py-2 px-4 rounded-md inline-flex items-center space-x-2 transition-colors duration-300"
          style={{ backgroundColor: "#000000", color: "#FFFDF2" }}
        >
          <FaPlus />
          <span>Post New Job</span>
        </RouterLink>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <FaSearch className="text-black" />
        </div>
        <input
          type="text"
          placeholder="Search by title, company, or location..."
          value={search}
          onChange={handleSearchChange}
          className="w-full pl-10 pr-4 py-2 rounded-md focus:outline-none transition-colors duration-300"
          style={{
            backgroundColor: "#FFFDF2",
            border: "2px solid #000000",
            color: "#000000",
          }}
        />
      </div>

      {/* Job List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobs.length > 0 ? (
          jobs.map((job) => (
            <JobCard key={job._id} job={job} onDelete={handleDelete} />
          ))
        ) : (
          <div
            className="col-span-1 md:col-span-2 lg:col-span-3 p-4 rounded-md"
            style={{ backgroundColor: "#000000", color: "#FFFDF2" }}
          >
            No jobs found matching your criteria.
          </div>
        )}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-8 space-x-4">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 rounded-md font-semibold transition-colors duration-300 disabled:opacity-50"
          style={{
            backgroundColor: "#000000",
            color: "#FFFDF2",
            border: "2px solid #000000",
          }}
        >
          Prev
        </button>

        <span className="px-4 py-2 font-semibold text-black">
          Page {currentPage} of {totalPages}
        </span>

        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          className="px-4 py-2 rounded-md font-semibold transition-colors duration-300 disabled:opacity-50"
          style={{
            backgroundColor: "#000000",
            color: "#FFFDF2",
            border: "2px solid #000000",
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default JobsList;
