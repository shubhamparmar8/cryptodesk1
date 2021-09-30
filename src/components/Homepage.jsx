import React from "react";
import { Link } from "react-router-dom";
import millify from "millify";
import { Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";

import { useGetCryptosQuery } from "../services/cryptoApi";
import Cryptocurrencies from "./Cryptocurrencies";
import News from "./News";

import Loader from "./Loader";
import Statistics from "./Statistics";

const Heading = ({ title }) => (
  <Typography
    variant="h4"
    color="primary"
    sx={{ margin: "2rem 0 1.5rem ", fontWeight: 500 }}
  >
    {title}
  </Typography>
);

const HomePageSection = ({ title, path }) => (
  <Box display="flex" alignItems="baseline" justifyContent="space-between">
    <Heading title={title} />
    <Link to={path}>
      <Typography
        variant="subtitle1"
        fontWeight="500"
        color="text.secondary"
        gutterBottom
      >
        Show More
      </Typography>
    </Link>
  </Box>
);

const Homepage = () => {
  const { data, isFetching } = useGetCryptosQuery(10);
  const globalStats = data?.data?.stats;

  if (isFetching) return <Loader />;

  return (
    <Box sx={{ mt: "90px" }}>
      <Heading title="Global Crypto Stats" />
      <Grid container spacing={2}>
        <Statistics
          title="Total Cryptocurrencies"
          subtitle={globalStats.total}
        />
        <Statistics
          title="Total Exchanges"
          subtitle={millify(globalStats.totalExchanges)}
        />
        <Statistics
          title="Total Market Cap"
          subtitle={millify(globalStats.totalMarketCap)}
        />
        <Statistics
          title="Total 24h Volume"
          subtitle={millify(globalStats.total24hVolume)}
        />
        <Statistics title="Total Markets" subtitle={globalStats.totalMarkets} />
      </Grid>
      <HomePageSection
        title="Top 10 Cryptos In The World"
        path="/cryptocurrencies"
      />
      <Cryptocurrencies simplified />
      <HomePageSection title="Latest News" path="/news" />
      <News simplified />
    </Box>
  );
};

export default Homepage;
