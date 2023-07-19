import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import pnf from "../media/error404.png"
import { useNavigate } from 'react-router-dom';
export default function Error404() {
  const navigate = useNavigate()
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          minHeight: '100vh',
          backgroundColor: "white",
        }}
      >
        <img loading="lazy" style={{ width: "20%" }} src={pnf} className="img-fluid" alt="Responsive image" />
        <Typography variant="h6" style={{ color: 'black' }}>
          The page you’re looking for doesn’t exist.
        </Typography>
        <Button
          onClick={() => navigate("/")}
          variant="contained" sx={{ color: "white", backgroundColor: "black", marginTop: 2 }}>Back Home</Button>

      </Box>

    </>

  );
}