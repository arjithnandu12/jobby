import React, { useState, useContext } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { AuthContext } from "../../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import axios from "axios";

const API_URL = "https://jobby-zzfw.onrender.com/api/user";

const LoginForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  // Validation Schema
  const getValidationSchema = () =>
    Yup.object().shape({
      username: !isLogin
        ? Yup.string()
            .min(3, "Username must be at least 3 characters")
            .required("Username is required")
        : Yup.string(),
      email: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
    });

  const handleSubmit = async (
    values,
    { setSubmitting, setErrors, resetForm }
  ) => {
    try {
      if (isLogin) {
        const response = await axios.post(`${API_URL}/login`, {
          email: values.email,
          password: values.password,
        });
        login(response.data.accessToken);
        navigate("/", { replace: true });
      } else {
        await axios.post(`${API_URL}/register`, {
          username: values.username,
          email: values.email,
          password: values.password,
        });
        alert("Registration successful. Please log in.");
        setIsLogin(true);
        resetForm();
      }
    } catch (err) {
      setErrors({
        apiError:
          err.response?.data?.message || "Something went wrong. Try again.",
      });
    }
    setSubmitting(false);
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: 8 }}>
      <Paper
        elevation={6}
        sx={{
          p: 4,
          width: 400,
          bgcolor: "#1e1e2f",
          color: "white",
          borderRadius: 3,
        }}
      >
        <Typography variant="h4" align="center" gutterBottom>
          {isLogin ? "Login" : "Register"}
        </Typography>

        <Formik
          initialValues={{ username: "", email: "", password: "" }}
          validationSchema={getValidationSchema()}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          {({
            values,
            handleChange,
            touched,
            errors,
            handleBlur,
            isSubmitting,
          }) => (
            <Form>
              {errors.apiError && (
                <Typography
                  color="error"
                  sx={{ mb: 2, fontSize: "0.9rem", textAlign: "center" }}
                >
                  {errors.apiError}
                </Typography>
              )}

              {!isLogin && (
                <TextField
                  fullWidth
                  margin="normal"
                  label="Username"
                  name="username"
                  value={values.username}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.username && Boolean(errors.username)}
                  helperText={touched.username && errors.username}
                  InputLabelProps={{ style: { color: "#bbb" } }}
                  InputProps={{
                    style: { color: "white" },
                  }}
                />
              )}

              <TextField
                fullWidth
                margin="normal"
                label="Email Address"
                name="email"
                type="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.email && Boolean(errors.email)}
                helperText={touched.email && errors.email}
                InputLabelProps={{ style: { color: "#bbb" } }}
                InputProps={{
                  style: { color: "white" },
                }}
              />

              <TextField
                fullWidth
                margin="normal"
                label="Password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.password && Boolean(errors.password)}
                helperText={touched.password && errors.password}
                InputLabelProps={{ style: { color: "#bbb" } }}
                InputProps={{
                  style: { color: "white" },
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                        sx={{ color: "white" }}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <Button
                type="submit"
                variant="contained"
                color="warning"
                fullWidth
                sx={{ mt: 3, fontWeight: "bold" }}
                disabled={isSubmitting}
              >
                {isLogin ? "Login" : "Register"}
              </Button>
            </Form>
          )}
        </Formik>

        <Typography align="center" sx={{ mt: 3 }}>
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <Button onClick={() => setIsLogin(!isLogin)} sx={{ color: "orange" }}>
            {isLogin ? "Register here" : "Login here"}
          </Button>
        </Typography>
      </Paper>
    </Box>
  );
};

export default LoginForm;
