import React, { useState } from "react";
import millify from "millify";
import HTMLReactParser from "html-react-parser";
import {
  Avatar,
  Collapse,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
} from "@mui/material";

import { UpOutlined, DownOutlined } from "@ant-design/icons";
import { useGetExchangesQuery } from "../services/cryptoApi";
import { Box } from "@mui/system";

import Loader from "./Loader";

const Row = ({ exchange }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <Box display="flex" fontWeight="600">
            {exchange.rank}
            <Avatar
              src={exchange.iconUrl}
              sx={{
                margin: "0 1rem",
              }}
            />
            {exchange.name}
          </Box>
        </TableCell>
        <TableCell align="center" sx={{ fontSize: "1rem" }}>
          {millify(exchange.volume)}
        </TableCell>
        <TableCell align="center" sx={{ fontSize: "1rem" }}>
          {millify(exchange.numberOfMarkets)}
        </TableCell>
        <TableCell align="center" sx={{ fontSize: "1rem" }}>
          {millify(exchange.marketShare)}
        </TableCell>
        <TableCell>
          <IconButton size="small" onClick={() => setOpen(!open)}>
            {open ? <UpOutlined /> : <DownOutlined />}
          </IconButton>
        </TableCell>
      </TableRow>

      <TableRow>
        <TableCell colSpan={12} style={{ paddingTop: 0, paddingBottom: 0 }}>
          <Collapse in={open}>
            <p style={{ margin: "1rem" }}>
              {HTMLReactParser(exchange.description || "")}
            </p>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

const Exchanges = () => {
  const { data, isFetching } = useGetExchangesQuery();
  const exchangesList = data?.data?.exchanges;

  if (isFetching) return <Loader />;
  return (
    <Grid container sx={{ mt: "90px" }}>
      <Grid item xs={12}>
        <TableContainer component={Paper} sx={{ bgcolor: "#222" }}>
          <Table aria-label="exchanges">
            <TableHead>
              <TableRow>
                <TableCell>Exchanges</TableCell>
                <TableCell>24h Trade Volume($)</TableCell>
                <TableCell>Markets</TableCell>
                <TableCell>Change(%)</TableCell>
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {exchangesList.map((exchange) => (
                <Row key={exchange.id} exchange={exchange} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
};

export default Exchanges;
