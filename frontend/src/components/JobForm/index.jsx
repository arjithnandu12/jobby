import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { AuthContext } from "../../Context/AuthContext";
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

const API_URL = "http://localhost:5001/api/jobs";

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
    jobType: "Full-time",
  });

  const validationSchema = Yup.object({
    title: Yup.string().required("Job title is required"),
    company: Yup.string().required("Company name is required"),
    location: Yup.string().required("Location is required"),
    description: Yup.string().required("Description is required"),
    salary: Yup.number().positive("Must be positive"),
    jobType: Yup.string().required("Job type is required"),
  });

  useEffect(() => {
    if (id) {
      axios.get(`${API_URL}/${id}`).then((res) => {
        setInitialValues(res.data);
      });
    }
  }, [id]);

  const handleSubmit = async (values) => {
    try {
      if (id) {
        await axios.put(`${API_URL}/${id}`, values, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
      } else {
        await axios.post(API_URL, values, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
      }
      navigate("/jobs");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundImage: `url('https://sdmntprsouthcentralus.oaiusercontent.com/files/00000000-25fc-61f8-97bc-5d6a3febceda/raw?se=2025-08-23T08%3A06%3A29Z&sp=r&sv=2024-08-04&sr=b&scid=83dc97ab-adf3-52cb-9310-119249f0e381&skoid=5c72dd08-68ae-4091-b4e1-40ccec0693ae&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-08-22T20%3A13%3A54Z&ske=2025-08-23T20%3A13%3A54Z&sks=b&skv=2024-08-04&sig=zdjQO7Rx2CGX%2BAzraZmhjUeUflDmjgbr2DmgDMJEtm0%3D')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 2,
      }}
    >
      <Container maxWidth="md">
        <Card
          elevation={8}
          sx={{
            borderRadius: 3,
            p: 4,
            backgroundColor: "rgba(255,255,255,0.9)",
            backdropFilter: "blur(6px)",
          }}
        >
          <CardContent>
            <Typography
              variant="h4"
              align="center"
              gutterBottom
              fontWeight="bold"
              color="success.main"
            >
              {id ? " Edit Job" : " Post a New Job"}
            </Typography>

            <Formik
              enableReinitialize
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ errors, touched, handleChange, values, isSubmitting }) => (
                <Form>
                  <Box display="grid" gap={3}>
                    {/* Title */}
                    <TextField
                      fullWidth
                      name="title"
                      label="Job Title"
                      value={values.title}
                      onChange={handleChange}
                      error={touched.title && Boolean(errors.title)}
                      helperText={touched.title && errors.title}
                    />

                    {/* Company */}
                    <TextField
                      fullWidth
                      name="company"
                      label="Company"
                      value={values.company}
                      onChange={handleChange}
                      error={touched.company && Boolean(errors.company)}
                      helperText={touched.company && errors.company}
                    />

                    {/* Location */}
                    <TextField
                      fullWidth
                      name="location"
                      label="Location"
                      value={values.location}
                      onChange={handleChange}
                      error={touched.location && Boolean(errors.location)}
                      helperText={touched.location && errors.location}
                    />

                    {/* Description */}
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

                    {/* Salary */}
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

                    {/* Job Type */}
                    <TextField
                      select
                      fullWidth
                      name="jobType"
                      label="Job Type"
                      value={values.jobType}
                      onChange={handleChange}
                    >
                      <MenuItem value="Full-time">Full-time</MenuItem>
                      <MenuItem value="Part-time">Part-time</MenuItem>
                      <MenuItem value="Contract">Contract</MenuItem>
                    </TextField>

                    {/* Submit */}
                    <Button
                      type="submit"
                      variant="contained"
                      size="large"
                      disabled={isSubmitting}
                      sx={{
                        py: 1.5,
                        borderRadius: 2,
                        fontWeight: "bold",
                        backgroundColor: "success.main",
                        "&:hover": { backgroundColor: "success.dark" },
                      }}
                    >
                      {id ? "Update Job ✅" : "Post Job "}
                    </Button>
                  </Box>
                </Form>
              )}
            </Formik>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default JobForm;
