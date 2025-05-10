import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useBreakpoint } from "../hooks/useBreakpoints";
import { enqueNotistack } from "../Utils/enqueNotistack/enqueNotistack";

const Register: React.FC = () => {
  const { isMobile } = useBreakpoint();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [confirmPasswordFocused, setConfirmPasswordFocused] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (!confirmPassword) {
      setError("Please confirm your password.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    try {
      await axios.post(process.env.API_URL + "/auth/register", {
        email,
        password,
      });
      setSuccess("Registration successful. Please login.");
      setTimeout(() => navigate("/login"), 1000);
    } catch (err) {
      setError((err as any).response?.data?.msg || "Registration failed");
    }
  };
  const bg = isMobile ? "./assets/bg_mobile.svg" : "./assets/bg_desktop.svg";
  useEffect(() => {
    if (error) {
      enqueNotistack(error, { variant: "error" });
    }
  }, [error]);
  return (
    <Box
      display="flex"
      justifyContent={isMobile ? "center" : "space-between"}
      alignItems="center"
      flexDirection="row"
      component="main"
      sx={{
        minHeight: "100vh",
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      {!isMobile && (
        <Box display="flex" justifyContent="center" alignContent="center">
          <Box
            component="img"
            src="./assets/logo.svg"
            alt="Lemonpay Logo"
            sx={{
              position: "fixed",
              top: "4%",
              left: "1%",
              zIndex: 1,
              width: "20rem",
              height: "6.4rem",
              mx: "auto",
              mb: 2,
            }}
          ></Box>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="flex-start"
            sx={{
              position: "fixed",
              bottom: "19%",
              left: "2%",
            }}
            width="50%"
          >
            <Typography
              variant="body1"
              fontSize="3rem"
              fontWeight={450}
              color="white"
              lineHeight="120%"
              letterSpacing="0.1rem"
            >
              Join 8 Million Businesses
            </Typography>
            <Typography
              fontSize="3rem"
              variant="body1"
              fontWeight={450}
              color="#FFD600"
              lineHeight="120%"
              letterSpacing="0.1rem"
            >
              Powering Growth with
            </Typography>
            <Typography
              fontSize="3rem"
              variant="body1"
              fontWeight={450}
              color="white"
              lineHeight="120%"
              letterSpacing="0.1rem"
            >
              Lemonpay!
            </Typography>
          </Box>
        </Box>
      )}
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
        width={isMobile ? "100%" : "40%"}
      >
        {isMobile && (
          <Box
            component="img"
            src="./assets/logo.svg"
            alt="Lemonpay Logo"
            sx={{
              zIndex: 1,
              width: "20rem",
              height: "6.4rem",
              mx: "auto",
              mb: 2,
              position: "fixed",
              top: "2%",
            }}
          ></Box>
        )}
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            width: "100%",
            p: "4rem 2rem 2rem 2rem",
            display: "flex",
            flexDirection: "column",
            gap: 1,
          }}
        >
          <Typography
            variant="body1"
            fontWeight={600}
            color="white"
            lineHeight="120%"
            letterSpacing="0.1rem"
            mb={1}
            fontSize="2.5rem"
          >
            Welcome Sign Up System
          </Typography>
          <Typography
            variant="body1"
            fontWeight={450}
            color="white"
            lineHeight="30px"
            letterSpacing="0.1rem"
            fontSize="1.4rem"
          >
            Your gateway to seamless
          </Typography>
          <Typography
            variant="body1"
            fontWeight={450}
            color="white"
            lineHeight="30px"
            letterSpacing="0.1rem"
            mb={2}
            fontSize="1.4rem"
          >
            transactions and easy payments.
          </Typography>
          <Box width={isMobile ? "100%" : "70%"}>
            <Typography
              variant="body1"
              fontWeight={450}
              color="white"
              lineHeight="18px"
              letterSpacing="2%"
              fontSize="1rem"
            >
              Email
            </Typography>
            <TextField
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              fullWidth
              autoFocus
              variant="outlined"
              margin="normal"
              placeholder={emailFocused ? "" : "mahadev@lemonpay.tech"}
              onFocus={() => setEmailFocused(true)}
              onBlur={() => setEmailFocused(false)}
              sx={{
                "& .MuiOutlinedInput-root": {
                  backgroundColor: "#E6E1FAA3",
                },
              }}
            />
            <Typography
              variant="body1"
              fontWeight={450}
              color="white"
              lineHeight="18px"
              letterSpacing="2%"
              fontSize="1rem"
            >
              Password
            </Typography>
            <TextField
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              fullWidth
              variant="outlined"
              margin="normal"
              placeholder={passwordFocused ? "" : "Min 8 characters"}
              onFocus={() => setPasswordFocused(true)}
              onBlur={() => setPasswordFocused(false)}
              sx={{
                "& .MuiOutlinedInput-root": {
                  background: "#E6E1FAA3",
                },
              }}
              inputProps={{ minLength: 8 }}
              InputProps={{
                endAdornment: (
                  <Box
                    onClick={() => setShowPassword((show) => !show)}
                    justifyContent="center"
                    alignItems="center"
                    display="flex"
                    sx={{
                      cursor: "pointer",
                    }}
                  >
                    {showPassword ? (
                      <i
                        className="ri-eye-off-line"
                        style={{ color: "white", fontSize: "1.5rem" }}
                      ></i>
                    ) : (
                      <i
                        className="ri-eye-line"
                        style={{ color: "white", fontSize: "1.5rem" }}
                      ></i>
                    )}
                  </Box>
                ),
              }}
            />
            <Typography
              variant="body1"
              fontWeight={450}
              color="white"
              lineHeight="18px"
              letterSpacing="2%"
              fontSize="1rem"
            >
              Confirm Password
            </Typography>
            <TextField
              type={showPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              fullWidth
              variant="outlined"
              margin="normal"
              placeholder={passwordFocused ? "" : "Min 8 characters"}
              onFocus={() => setPasswordFocused(true)}
              onBlur={() => setPasswordFocused(false)}
              sx={{
                "& .MuiOutlinedInput-root": {
                  background: "#E6E1FAA3",
                },
              }}
              inputProps={{ minLength: 8 }}
              InputProps={{
                endAdornment: (
                  <Box
                    onClick={() => setShowPassword((show) => !show)}
                    justifyContent="center"
                    alignItems="center"
                    display="flex"
                    sx={{
                      cursor: "pointer",
                    }}
                  >
                    {showPassword ? (
                      <i
                        className="ri-eye-off-line"
                        style={{ color: "white", fontSize: "1.5rem" }}
                      ></i>
                    ) : (
                      <i
                        className="ri-eye-line"
                        style={{ color: "white", fontSize: "1.5rem" }}
                      ></i>
                    )}
                  </Box>
                ),
              }}
            />
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <FormControlLabel
                control={<Checkbox sx={{ color: "white" }} />}
                label={
                  <Typography variant="body2" sx={{ color: "white" }}>
                    Remember me
                  </Typography>
                }
              />
              <Link
                href="/login"
                underline="hover"
                sx={{ color: "white" }}
                fontWeight={600}
              >
                Sign In
              </Link>
            </Box>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              sx={{
                mt: 2,
                borderRadius: 2,
                backgroundColor: "#ffffff",
              }}
            >
              <Typography fontWeight={700} color="black" align="center">
                Sign Up
              </Typography>
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Register;
