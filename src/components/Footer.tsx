import * as React from "react";
import { experimentalStyled as styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { AppBar, Container, Typography } from "@mui/material";
import logo from "../media/logo_white.png";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import { Link } from "react-router-dom";
import play from "../media/play.png";

export default function Footer() {
  return (
    <AppBar style={{ backgroundColor: "black" }} position="sticky">
      <Container sx={{ backgroundColor: "black" }}>
        <Grid container spacing={2} paddingBottom={2} paddingTop={2}>
          <Grid xs={3} sx={{ padding: 2 }}>
            <Box>
              <img loading="lazy" style={{ width: "70px" }} src={logo} className="img-fluid" alt="Responsive image" />
            </Box>
            <Typography
              variant="body1"
              color={"white"}
              fontSize={12}
              sx={{ marginTop: 2, marginBottom: 2 }}
            >
              Largest product search engine, maximum categorized online shopping
              mall and quickest home delivery system.
            </Typography>
            <Box sx={{ display: "flex" }}>
              <FacebookIcon />
              <LinkedInIcon />
              <InstagramIcon />
            </Box>
          </Grid>
          <Grid xs={3} sx={{ padding: 2 }}>
            <Typography variant="h6">Contact Us</Typography>
            <Typography
              variant="body1"
              color={"white"}
              fontSize={12}
              sx={{ marginTop: 2 }}
            >
              House #8, Road # 14, Dhanmondi, Dhaka-1209. Email:
              support@e-valy.com
            </Typography>
          </Grid>
          <Grid xs={3} sx={{ padding: 2 }}>
            <Typography variant="h6" color={"white"}>
              Let us help you
            </Typography>

            <Link to="" style={{ listStyle: "none", textDecoration: "none" }}>
              <Typography
                variant="body1"
                color={"white"}
                fontSize={12}
                sx={{ marginTop: 2 }}
              >
                Your Account
              </Typography>
            </Link>
            <Link to="" style={{ listStyle: "none", textDecoration: "none" }}>
              <Typography
                variant="body1"
                color={"white"}
                fontSize={12}
                sx={{ marginTop: 2 }}
              >
                Your Orders
              </Typography>
            </Link>
            <Link to="" style={{ listStyle: "none", textDecoration: "none" }}>
              <Typography
                variant="body1"
                color={"white"}
                fontSize={12}
                sx={{ marginTop: 2 }}
              >
                privacy Policy
              </Typography>
            </Link>
            <Link to="" style={{ listStyle: "none", textDecoration: "none" }}>
              <Typography
                variant="body1"
                color={"white"}
                fontSize={12}
                sx={{ marginTop: 2 }}
              >
                Faq
              </Typography>
            </Link>
          </Grid>
          <Grid xs={3} sx={{ padding: 2 }}>
            <Typography variant="h6">Get our app</Typography>
            <Link to={""}>
              <img src={play} style={{ width: "200px", marginTop: 2 }} />
            </Link>
          </Grid>
        </Grid>
      </Container>
    </AppBar>
  );
}
