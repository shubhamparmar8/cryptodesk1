import React, { useState } from "react";
import moment from "moment";
import { useGetCryptoNewsQuery } from "../services/cryptoNewsApi";
import { useGetCryptosQuery } from "../services/cryptoApi";
import {
  Avatar,
  Card,
  CardContent,
  Grid,
  Typography,
  MenuItem,
  Select,
  FormControl,
} from "@mui/material";
import { Box } from "@mui/system";
import Loader from "./Loader";

const demoImage =
  "https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News";

const News = ({ simplified }) => {
  const [newsCategory, setNewsCategory] = useState("cryptocurrency");
  const { data } = useGetCryptosQuery(100);
  const { data: cryptoNews } = useGetCryptoNewsQuery({
    newsCategory,
    count: simplified ? 6 : 12,
  });

  if (!cryptoNews?.value) return <Loader />;

  return (
    <Box sx={{ mt: simplified ? "10px" : "70px" }}>
      {!simplified && (
        <FormControl sx={{ width: "250px", margin: "1rem 0 1rem 0.5rem" }}>
          <Select
            value={newsCategory}
            onChange={(e) => setNewsCategory(e.target.value)}
          >
            <MenuItem value="cryptocurrency">Cryptocurrency</MenuItem>
            {data?.data?.coins?.map((currency) => (
              <MenuItem value={currency.name}>{currency.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
      <Grid container spacing={4}>
        {cryptoNews.value.map((news, i) => (
          <Grid item xs={12} sm={6} lg={4} key={i}>
            <Card
              sx={{ bgcolor: "#222", maxWidth: "342px", m: { xs: "0 auto" } }}
            >
              <a
                href={news.url}
                target="_blank"
                rel="noreferrer"
                style={{ textDecoration: "none" }}
              >
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="flex-start"
                  padding="0.9rem"
                >
                  <Typography variant="h6" width="70%" color="text.primary">
                    {news.name}
                  </Typography>
                  <img
                    src={news?.image?.thumbnail?.contentUrl || demoImage}
                    alt="news"
                    width="100"
                    height="100"
                  />
                </Box>
                <CardContent>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    marginBottom="0.8rem"
                  >
                    {news.description.length > 100
                      ? `${news.description.substring(0, 98)} ...`
                      : news.description}
                  </Typography>
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Box display="flex" alignItems="center">
                      <Avatar
                        src={news.provider[0]?.image?.thumbnail?.contentUrl}
                        alt="news provider"
                        sx={{ bgcolor: "text.primary" }}
                      >
                        {demoImage}
                      </Avatar>
                      <Typography
                        variant="subtitle2"
                        marginLeft="10px"
                        color="text.primary"
                      >
                        {news.provider[0]?.name}
                      </Typography>
                    </Box>
                    <Typography variant="subtitle2" color="text.primary">
                      {moment(news.datePublished).startOf("ss").fromNow()}
                    </Typography>
                  </Box>
                </CardContent>
              </a>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default News;
