import { Box, Typography } from "@mui/material";
import React from "react";

const MainBoard = () => {
  return (
    <div>
      <Box
        sx={{
          display: "flex",
          marginTop: 2,
          marginBottom: 1,
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            backgroundColor: "white",
            padding: 2,
            textAlign: "end",
            boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
            width: "100%",
            margin: 0.2,
            borderRadius: 1,
          }}
        >
          <Typography variant="body2">Total Orders</Typography>
          <Typography variant="h6" sx={{ fontWeight: "lighter" }}>
            20
          </Typography>
        </Box>
        <Box
          sx={{
            backgroundColor: "white",
            padding: 2,
            textAlign: "end",
            boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
            width: "100%",
            margin: 0.2,
            borderRadius: 1,
          }}
        >
          <Typography variant="body2">Total Sell</Typography>
          <Typography variant="h6" sx={{ fontWeight: "lighter" }}>
            2000000 ৳
          </Typography>
        </Box>
        <Box
          sx={{
            backgroundColor: "white",
            padding: 2,
            textAlign: "end",
            boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
            width: "100%",
            margin: 0.2,
            borderRadius: 1,
          }}
        >
          <Typography variant="body2">Total Orders</Typography>
          <Typography variant="h6" sx={{ fontWeight: "lighter" }}>
            20
          </Typography>
        </Box>
      </Box>
    </div>
  );
};

export default MainBoard;
