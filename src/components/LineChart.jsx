import React from "react";
import { Line } from "react-chartjs-2";
import { Box } from "@mui/system";
import { Grid, Typography } from "@mui/material";

const LineChart = ({ coinHistory, currentPrice, coinName }) => {
  const coinPrice = [];
  const coinTimestamp = [];

  for (let i = 0; i < coinHistory?.data?.history?.length; i++) {
    coinPrice.push(coinHistory?.data?.history[i].price);
    coinTimestamp.push(
      new Date(coinHistory?.data?.history[i].timestamp).toLocaleDateString()
    );
  }

  const data = {
    labels: coinTimestamp,
    datasets: [
      {
        borderWidth: 2,
        pointRadius: 0,
        label: "Price In USD",
        data: coinPrice,
        fill: false,
        backgroundColor: "#009688",
        borderColor: "#009688",
      },
    ],
  };

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };

  return (
    <>
      <Grid container sx={{ alignItems: "center", marginBottom: "1.5rem" }}>
        <Grid item xs={12} md={8} sx={{ mb: "1rem" }}>
          <Typography
            variant="h5"
            color="primary"
            fontWeight="600"
            gutterBottom
          >
            {coinName} Price Chart
          </Typography>
        </Grid>
        <Grid item xs={12} md={4} sx={{ mb: "1rem" }}>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography variant="body2" fontWeight="500">
              Change: {coinHistory?.data?.change}%
            </Typography>
            <Typography variant="body2" fontWeight="500">
              Current Price: $ {currentPrice}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Line data={data} options={options} />
        </Grid>
      </Grid>
    </>
  );
};

export default LineChart;
