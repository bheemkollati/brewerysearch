import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function BreweryDetails() {
  const location = useLocation();
  //   const currentPath = location.pathname;
  //   useEffect(() => {
  //     console.log(currentPath, "curere");
  //     console.log(location, "location");
  //   }, [currentPath]);
  const navigate = useNavigate();
  console.log("testing in brwery details");
  console.log(location.state.data, "location props");
  const data = location.state.data;
  console.log("local sear detil.s.s", localStorage.search_word);
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "start",
        padding: "10px",
        background: "white",
        border: "1px solid black",
        borderRadius: "5px",
        margin: "8px",
      }}
    >
      <Typography variant="body1">Name - {data.name}</Typography>
      <Typography variant="body1">
        Brewery Type - {data.brewery_type}
      </Typography>

      <Typography variant="body1">City- {data.city}</Typography>
      <Typography variant="body1">State - {data.state}</Typography>
      <Typography variant="body1">Country - {data.country}</Typography>

      <Button
        sx={{
          margin: "5px",
        }}
        variant="contained"
        onClick={() => navigate(-1)}
      >
        Go Back
      </Button>
    </Box>
  );
}

export default BreweryDetails;
