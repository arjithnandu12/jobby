import React from "react";
import { Link } from "react-router-dom";
import { Box, Container, Typography, Button, Paper, Stack } from "@mui/material";

const Home = () => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "Roboto, sans-serif",
        backgroundColor: "#fdf6e3",
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={8}
          sx={{
            p: 6,
            textAlign: "center",
            borderRadius: 4,
            backgroundColor: "#fffbe9",
            backdropFilter: "blur(6px)",
            transition: "transform 0.3s",
            "&:hover": {
              transform: "scale(1.05)",
            },
          }}
        >
          {/* Title */}
          <Typography
            variant="h2"
            component="h1"
            fontWeight="bold"
            gutterBottom
            color="black"
          >
            Welcome to the Job Board
          </Typography>

          {/* Subtext */}
          <Typography variant="body1" color="black" paragraph>
            Find your dream job or post a new opportunity today — let’s grow
            together sustainably!
          </Typography>

          {/* Navigation Buttons */}
          <Stack spacing={2} mt={3}>
            <Button
              component={Link}
              to="/jobs"
              variant="contained"
              size="large"
              sx={{
                px: 5,
                py: 1.5,
                borderRadius: "50px",
                fontWeight: "bold",
                backgroundColor: "black",
                color: "white",
                "&:hover": { backgroundColor: "#333" },
                boxShadow: 3,
              }}
            >
              Explore All Jobs
            </Button>


            

            <Button
              component={Link}
              to="/jobs/new"
              variant="contained"
              size="large"
              sx={{
                px: 5,
                py: 1.5,
                borderRadius: "50px",
                fontWeight: "bold",
                backgroundColor: "green",
                color: "white",
                "&:hover": { backgroundColor: "darkgreen" },
                boxShadow: 3,
              }}
            >
              Post a Job
            </Button>
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
};

export default Home;
