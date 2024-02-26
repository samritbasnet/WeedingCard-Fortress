import React from "react";
import { Container, Typography } from "@mui/material";

const Footer = () => {
  return (
    <footer style={{ backgroundColor: "#c6e6ee", padding: "20px", textAlign: "center", width: "100%" }}>
      <Container maxWidth="md">
        <Typography variant="body2" color="textSecondary">
          &copy; {new Date().getFullYear()} Team Fortress. All rights reserved.
        </Typography>
      </Container>
    </footer>
  );
};

export default Footer;
