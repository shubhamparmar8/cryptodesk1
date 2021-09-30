import React, { useState } from "react";
import HTMLReactParser from "html-react-parser";
import { useParams } from "react-router-dom";
import millify from "millify";
import { Box } from "@mui/system";

import {
  MoneyCollectOutlined,
  DollarCircleOutlined,
  FundOutlined,
  ExclamationCircleOutlined,
  StopOutlined,
  TrophyOutlined,
  CheckOutlined,
  NumberOutlined,
  ThunderboltOutlined,
} from "@ant-design/icons";
import {
  Typography,
  Select,
  MenuItem,
  Grid,
  Divider,
  FormControl,
} from "@mui/material";
import {
  useGetCryptoDetailsQuery,
  useGetCryptoHistoryQuery,
} from "../services/cryptoApi";
import Loader from "./Loader";

import LineChart from "./LineChart";

const CryptoDetails = () => {
  const { coinID } = useParams();
  const [timeperiod, setTimeperiod] = useState("7d");
  const { data, isFetching } = useGetCryptoDetailsQuery(coinID);
  const { data: coinHistory } = useGetCryptoHistoryQuery({
    coinID,
    timeperiod,
  });
  const cryptoDetails = data?.data?.coin;

  if (isFetching) return <Loader />;

  const time = ["24h", "7d", "30d", "1y", "5y"];

  const stats = [
    {
      title: "Price to USD",
      value: `$ ${cryptoDetails.price && millify(cryptoDetails.price)}`,
      icon: <DollarCircleOutlined />,
    },
    { title: "Rank", value: cryptoDetails.rank, icon: <NumberOutlined /> },
    {
      title: "24h Volume",
      value: `$ ${cryptoDetails.volume && millify(cryptoDetails.volume)}`,
      icon: <ThunderboltOutlined />,
    },
    {
      title: "Market Cap",
      value: `$ ${cryptoDetails.marketCap && millify(cryptoDetails.marketCap)}`,
      icon: <DollarCircleOutlined />,
    },
    {
      title: "All-time-high(daily avg.)",
      value: `$ ${millify(cryptoDetails.allTimeHigh.price)}`,
      icon: <TrophyOutlined />,
    },
  ];

  const genericStats = [
    {
      title: "Number Of Markets",
      value: cryptoDetails.numberOfMarkets,
      icon: <FundOutlined />,
    },
    {
      title: "Number Of Exchanges",
      value: cryptoDetails.numberOfExchanges,
      icon: <MoneyCollectOutlined />,
    },
    {
      title: "Aprroved Supply",
      value: cryptoDetails.approvedSupply ? (
        <CheckOutlined />
      ) : (
        <StopOutlined />
      ),
      icon: <ExclamationCircleOutlined />,
    },
    {
      title: "Total Supply",
      value: `$ ${millify(cryptoDetails.totalSupply)}`,
      icon: <ExclamationCircleOutlined />,
    },
    {
      title: "Circulating Supply",
      value: `$ ${millify(cryptoDetails.circulatingSupply)}`,
      icon: <ExclamationCircleOutlined />,
    },
  ];

  return (
    <Grid container sx={{ mt: "70px" }}>
      <Grid item xs={12}>
        <Typography
          variant="h4"
          color="primary"
          marginTop="1rem"
          textAlign="center"
          marginBottom="0.8rem"
        >
          {data?.data?.coin.name} ({data?.data?.coin.slug}) Price
        </Typography>
        <Typography
          variant="subtitle1"
          component="p"
          textAlign="center"
          marginBottom="1rem"
        >
          {cryptoDetails.name} live price in US Dollar (USD). View value
          statistics, market cap and supply.
        </Typography>
        <Divider />
      </Grid>
      <Grid item xs={12}>
        <FormControl sx={{ width: "250px", margin: "1rem 0" }}>
          <Select
            value={timeperiod}
            onChange={(e) => setTimeperiod(e.target.value)}
          >
            {time.map((date) => (
              <MenuItem value={date}>{date}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <LineChart
          coinHistory={coinHistory}
          currentPrice={millify(cryptoDetails.price)}
          coinName={cryptoDetails.name}
        />
      </Grid>
      <Grid item xs={12} sx={{ margin: "2rem 0" }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Box>
              <Typography
                variant="h5"
                color="primary"
                fontWeight="600"
                gutterBottom
              >
                {cryptoDetails.name} Value Statistics
              </Typography>
              <Typography variant="body1" component="p" marginBottom="2rem">
                An overview showing the statistics of {cryptoDetails.name}, such
                as the base and quote currency, the rank, and trading volume.
              </Typography>
            </Box>
            {stats.map(({ icon, title, value }, index) => (
              <Box key={index}>
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                  margin="0.5rem 0"
                >
                  <Box display="flex">
                    <Typography variant="subtitle1" color="text.secondary">
                      {icon}
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      color="text.secondary"
                      marginLeft="10px"
                    >
                      {title}
                    </Typography>
                  </Box>
                  <Typography color="text.secondary">{value}</Typography>
                </Box>
                <Divider />
              </Box>
            ))}
          </Grid>
          <Grid item xs={12} md={6}>
            <Box>
              <Typography
                variant="h5"
                color="primary"
                fontWeight="600"
                gutterBottom
              >
                Other Statistics
              </Typography>
              <Typography variant="body1" component="p" marginBottom="2rem">
                An overview showing other stats of {cryptoDetails.name}.
              </Typography>
            </Box>
            {genericStats.map(({ icon, title, value }, index) => (
              <Box key={index}>
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                  margin="0.5rem 0"
                >
                  <Box display="flex">
                    <Typography variant="subtitle1" color="text.secondary">
                      {icon}
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      color="text.secondary"
                      marginLeft="10px"
                    >
                      {title}
                    </Typography>
                  </Box>
                  <Typography color="text.secondary">{value}</Typography>
                </Box>
                <Divider />
              </Box>
            ))}
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Typography
              variant="h5"
              color="primary"
              fontWeight="600"
              gutterBottom
            >
              What is {cryptoDetails.name}
            </Typography>
            <Typography variant="body2" color="text.primary">
              {HTMLReactParser(cryptoDetails.description)}
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography
              variant="h5"
              color="primary"
              fontWeight="600"
              marginBottom="2rem"
            >
              {cryptoDetails.name} Links
            </Typography>
            {cryptoDetails.links?.map((link) => (
              <Box key={link.name}>
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                  margin="1rem 0 1.5rem"
                >
                  <Typography variant="subtitle2" fontWeight="600">
                    {link.type}
                  </Typography>
                  <a href={link.url} target="_blank" rel="noreferrer">
                    <Typography
                      color="primary"
                      variant="subtitle1"
                      fontWeight="600"
                    >
                      {link.name}
                    </Typography>
                  </a>
                </Box>
                <Divider />
              </Box>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default CryptoDetails;
