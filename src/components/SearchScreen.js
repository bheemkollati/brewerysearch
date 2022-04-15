import {
  Box,
  Button,
  List,
  ListItem,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { searchContext } from "../App";

function SearchScreen() {
  //   const [searchTerm, setSearchTerm] = useState("");
  const [breweryData, setBreweryData] = useState([]);

  const { searchTerm, setSearchTerm, breweryViewCount, setBreweryViewCount } =
    useContext(searchContext);

  const navigate = useNavigate();
  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };
  const handlePageViewCount = () => {
    let c =
      breweryData.length - breweryViewCount < 5 &&
      breweryData.length !== breweryViewCount
        ? breweryViewCount + (breweryData.length - breweryViewCount)
        : breweryViewCount + 5;
    setBreweryViewCount(c > breweryData.length ? 5 : c);
  };

  const handleBrewery = (params) => {
    // localStorage.setItem("breweries", JSON.stringify(breweryData));
    // localStorage.setItem("searchTerm", searchTerm);
    navigate(`/breweries/search/query/${params.name}`, {
      state: { data: params },
    });
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      console.log(searchTerm);
      axios
        .get(
          `https://api.openbrewerydb.org/breweries/search?query=${searchTerm}`
        )
        .then((response) => {
          console.log(response.data, "resoposf");
          setBreweryData(response.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }, 1000);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  //   useEffect(() => {
  //     const data = JSON.parse(localStorage.getItem("breweries"));
  //     const search = localStorage.getItem("searchTerm");

  //     search && setSearchTerm(search);
  //   }, []);
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "10px",
      }}
    >
      <Typography variant="h4" sx={{ marginBottom: "15px" }}>
        {" "}
        Brewery search
      </Typography>
      <TextField
        variant="outlined"
        label="Enter Brewery"
        onChange={handleChange}
        value={searchTerm}
      />

      {breweryData.length > 0 || searchTerm === "" ? (
        <List
          sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
        >
          {breweryData.slice(0, breweryViewCount).map((brewery, index) => (
            <ListItem key={index} onClick={() => handleBrewery(brewery)}>
              <ListItemText
                primary={brewery.name}
                sx={{
                  "&:hover": { cursor: "pointer", backgroundColor: "#F8F9FA" },
                }}
              />
            </ListItem>
          ))}
        </List>
      ) : (
        <Typography variant="body1">No data found</Typography>
      )}
      {breweryViewCount < breweryData.length && breweryData.length > 0 ? (
        <Button variant="contained" onClick={handlePageViewCount}>
          Load More
        </Button>
      ) : breweryData.length > 5 ? (
        <Button variant="contained" onClick={handlePageViewCount}>
          See Less
        </Button>
      ) : (
        ""
      )}
    </Box>
  );
}

export default SearchScreen;
