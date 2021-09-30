import React, { useState, useEffect } from "react";
import millify from "millify";
import { Link } from "react-router-dom";
import { useGetCryptosQuery } from "../services/cryptoApi";
import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  InputBase,
  Paper,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import Loader from "./Loader";

const Cryptocurrencies = ({ simplified }) => {
  const count = simplified ? 10 : 100;
  const { data: cryptosList, isFetching } = useGetCryptosQuery(count);
  const [cryptos, setCryptos] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const filteredData = cryptosList?.data?.coins.filter((item) =>
      item.name.toLowerCase().includes(searchTerm)
    );
    setCryptos(filteredData);
  }, [cryptosList, searchTerm]);

  if (isFetching) return <Loader />;
  return (
    <Box sx={{ mt: simplified ? "10px" : "90px", mb: simplified ? "1rem" : 0 }}>
      {/* Search field */}
      {!simplified && (
        <Paper
          sx={{
            padding: "0.2rem",
            margin: "2rem auto",
            maxWidth: "16rem",
            textAlign: "center",
          }}
        >
          <InputBase
            sx={{
              padding: "0.4rem 0.6rem",
              fontSize: "1rem",
            }}
            placeholder="Search Cryptocurrency"
            onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
          />
        </Paper>
      )}
      <Grid container spacing={4}>
        {cryptos?.map((currency) => (
          <Grid item xs={12} sm={6} lg={4} key={currency.id}>
            {/* Card */}
            <Link key={currency.id} to={`/crypto/${currency.id}`}>
              <Card
                sx={{ bgcolor: "#222", maxWidth: "342px", m: { xs: "0 auto" } }}
              >
                <CardHeader
                  title={`${currency.rank}. ${currency.name}`}
                  avatar={
                    <Avatar
                      src={currency.iconUrl}
                      aria-label={currency.name}
                      sx={{
                        bgcolor: "text.primary",
                        objectFit: "cover",
                      }}
                    />
                  }
                />
                <Divider />

                <CardContent>
                  <Typography
                    variant="subtitle1"
                    component="p"
                    color="text.secondary"
                  >
                    Price: ${millify(currency.price)}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    component="p"
                    color="text.secondary"
                  >
                    Market Cap: {millify(currency.marketCap)}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    component="p"
                    color="text.secondary"
                  >
                    Daily Change: {currency.change}%
                  </Typography>
                </CardContent>
              </Card>
            </Link>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Cryptocurrencies;
