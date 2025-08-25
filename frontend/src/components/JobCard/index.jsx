import React, { useContext } from "react";
import { Link as RouterLink } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";
import { Card, CardContent, Typography, Chip, Button, Box } from "@mui/material";
import { motion } from "framer-motion";

const MotionCard = motion(Card);

const JobCard = ({ job, onDelete }) => {
  const { user } = useContext(AuthContext);

  // Check if the current user is the owner of the job post
  const isOwner = user && user._id === job.user;

  return (
    <MotionCard
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.98 }}
      elevation={4}
      sx={{
        borderRadius: "20px",
        overflow: "hidden",
        background: "linear-gradient(135deg, #fdfbfb, #ebedee)", // Light gradient
        color: "#1a1a1a",
      }}
    >
      <CardContent>
        {/* Title */}
        <Typography variant="h6" fontWeight="bold" sx={{ color: "#2c3e50" }}>
          {job.title}
        </Typography>

        {/* Company */}
        <Typography variant="subtitle1" sx={{ color: "#34495e" }}>
          {job.company}
        </Typography>

        {/* Location */}
        <Typography variant="body2" sx={{ color: "#7f8c8d" }}>
          {job.location}
        </Typography>

        {/* Salary & Job Type */}
        <Box mt={2} display="flex" gap={1}>
          {job.salary && (
            <Chip
              label={`$${job.salary}`}
              sx={{
                bgcolor: "#2ecc71",
                color: "white",
                fontWeight: "bold",
              }}
            />
          )}
          <Chip
            label={job.jobType}
            sx={{
              bgcolor: "#9b59b6",
              color: "white",
              fontWeight: "bold",
            }}
          />
        </Box>

        {/* Description */}
        <Typography variant="body2" sx={{ mt: 2, color: "#2c3e50", opacity: 0.85 }}>
          {job.description}
        </Typography>

        {/* Posted Date */}
        <Typography variant="caption" sx={{ mt: 1, display: "block", color: "#7f8c8d" }}>
          Posted on: {new Date(job.postedAt).toLocaleDateString()}
        </Typography>

        {/* Action Buttons */}
        <Box mt={3} display="flex" gap={2}>
          <Button
            component={RouterLink}
            to={`/jobs/${job._id}`}
            variant="contained"
            sx={{
              bgcolor: "#3498db",
              "&:hover": { bgcolor: "#2980b9" },
              borderRadius: "12px",
            }}
          >
            View Details
          </Button>

          {isOwner && (
            <>
              <Button
                component={RouterLink}
                to={`/jobs/edit/${job._id}`}
                variant="contained"
                sx={{
                  bgcolor: "#f1c40f",
                  color: "black",
                  "&:hover": { bgcolor: "#d4ac0d" },
                  borderRadius: "12px",
                }}
              >
                Edit
              </Button>

              <Button
                onClick={() => onDelete(job._id)}
                variant="contained"
                sx={{
                  bgcolor: "#e74c3c",
                  "&:hover": { bgcolor: "#c0392b" },
                  borderRadius: "12px",
                }}
              >
                Delete
              </Button>
            </>
          )}
        </Box>
      </CardContent>
    </MotionCard>
  );
};

export default JobCard;
