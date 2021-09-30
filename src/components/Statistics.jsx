import React from "react";
import { Grid, Typography } from "@mui/material";

const Statistics = ({ title, subtitle }) => {
  return (
    <Grid item xs={6}>
      <Typography variant="subtitle1" component="p" color="text.secondary">
        {title}
      </Typography>
      <Typography variant="body1" fontSize="1.8rem">
        {subtitle}
      </Typography>
    </Grid>
  );
};

export default Statistics;
