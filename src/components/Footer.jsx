import { Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <Paper
      sx={{
        width: "100%",
        minHeight: "150px",
        bgcolor: "#111",
        marginTop: "4rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        marginRight: "240px",
      }}
    >
      <Box>
        <Typography variant="body1" marginTop="2rem" gutterBottom>
          Copyright © 2021 &nbsp;
          <Link to="/">
            <Typography variant="h6" component="span" color="primary">
              CryptoDesk Inc.
            </Typography>
          </Link>
          <br />
          All Rights Reserved.
        </Typography>
      </Box>
      <Box>
        <Link to="/">
          <Typography
            variant="body2"
            color="text.secondary"
            component="span"
            marginRight="0.5rem"
          >
            Home
          </Typography>
        </Link>
        <Link to="/exchanges">
          <Typography
            variant="body2"
            color="text.secondary"
            component="span"
            marginRight="0.5rem"
          >
            Exchanges
          </Typography>
        </Link>
        <Link to="/news">
          <Typography
            variant="body2"
            color="text.secondary"
            component="span"
            marginRight="0.5rem"
          >
            News
          </Typography>
        </Link>
      </Box>
    </Paper>
  );
};

export default Footer;
