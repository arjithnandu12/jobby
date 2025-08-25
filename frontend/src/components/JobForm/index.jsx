import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  MenuItem,
  Container,
} from "@mui/material";
import { AuthContext } from "../../Context/AuthContext.jsx";

const API_URL = "https://jobby-zzfw.onrender.com/api/jobs";

// ✅ Validation Schema
const validationSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  company: Yup.string().required("Company is required"),
  location: Yup.string().required("Location is required"),
  description: Yup.string().required("Description is required"),
  salary: Yup.number()
    .typeError("Salary must be a number")
    .positive("Salary must be positive"),
  jobType: Yup.string().required("Job type is required"),
});

const JobForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [initialValues, setInitialValues] = useState({
    title: "",
    company: "",
    location: "",
    description: "",
    salary: "",
    jobType: "",
  });
  const [loading, setLoading] = useState(true);

  const isEditing = Boolean(id);

  // ✅ Fetch job when editing
  useEffect(() => {
    const fetchJob = async () => {
      if (!isEditing) {
        setLoading(false);
        return;
      }
      try {
        const response = await axios.get(`${API_URL}/${id}`);
        setInitialValues({
          title: response.data.title || "",
          company: response.data.company || "",
          location: response.data.location || "",
          description: response.data.description || "",
          salary: response.data.salary || "",
          jobType: response.data.jobType || "",
        });
      } catch (error) {
        console.error("Error fetching job:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id, isEditing]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-black"></div>
      </div>
    );
  }

  // ✅ Handle Submit
  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const token = user?.token || localStorage.getItem("token");
      if (!token) {
        console.error("No authentication token found.");
        return;
      }

      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };

      if (isEditing) {
        await axios.put(`${API_URL}/${id}`, values, { headers });
      } else {
        await axios.post(API_URL, values, { headers });
      }

      navigate("/jobs");
    } catch (error) {
      console.error(
        `Error ${isEditing ? "updating" : "posting"} job:`,
        error.response?.data || error.message
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Card sx={{ mt: 4, boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            {isEditing ? "Edit Job" : "Post a Job"}
          </Typography>

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            enableReinitialize
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleSubmit,
              isSubmitting,
            }) => (
              <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{ display: "flex", flexDirection: "column", gap: 2 }}
              >
                <TextField
                  fullWidth
                  name="title"
                  label="Job Title"
                  value={values.title}
                  onChange={handleChange}
                  error={touched.title && Boolean(errors.title)}
                  helperText={touched.title && errors.title}
                />

                <TextField
                  fullWidth
                  name="company"
                  label="Company"
                  value={values.company}
                  onChange={handleChange}
                  error={touched.company && Boolean(errors.company)}
                  helperText={touched.company && errors.company}
                />

                <TextField
                  fullWidth
                  name="location"
                  label="Location"
                  value={values.location}
                  onChange={handleChange}
                  error={touched.location && Boolean(errors.location)}
                  helperText={touched.location && errors.location}
                />

                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  name="description"
                  label="Job Description"
                  value={values.description}
                  onChange={handleChange}
                  error={touched.description && Boolean(errors.description)}
                  helperText={touched.description && errors.description}
                />

                <TextField
                  fullWidth
                  type="number"
                  name="salary"
                  label="Salary"
                  value={values.salary}
                  onChange={handleChange}
                  error={touched.salary && Boolean(errors.salary)}
                  helperText={touched.salary && errors.salary}
                />

                <TextField
                  select
                  fullWidth
                  name="jobType"
                  label="Job Type"
                  value={values.jobType}
                  onChange={handleChange}
                  error={touched.jobType && Boolean(errors.jobType)}
                  helperText={touched.jobType && errors.jobType}
                >
                  <MenuItem value="Full-time">Full-time</MenuItem>
                  <MenuItem value="Part-time">Part-time</MenuItem>
                  <MenuItem value="Contract">Contract</MenuItem>
                </TextField>

                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={isSubmitting}
                >
                  {isEditing ? "Update Job" : "Post Job"}
                </Button>
              </Box>
            )}
          </Formik>
        </CardContent>
      </Card>
    </Container>
  );
};

export default JobForm;
