import React, { useState } from "react";
import {
    Container,
    Box,
    Paper,
    Typography,
    TextField,
    Button,
    Tab,
    Tabs,
    Divider,
    InputAdornment,
    IconButton,
    Alert,
    Grid,
    Avatar,
} from "@mui/material";
import {
    Person as PersonIcon,
    Email as EmailIcon,
    Lock as LockIcon,
    Visibility,
    VisibilityOff,
    LockOpen as LockOpenIcon,
} from "@mui/icons-material";
import { useNavigate } from "@tanstack/react-router";
import { useAppContext } from "../context/AppContext";
import { useFormik } from "formik";
import * as yup from "yup";

// Validation schemas using Yup
const loginSchema = yup.object({
    email: yup
        .string()
        .email("Enter a valid email")
        .required("Email is required"),
    password: yup
        .string()
        .min(6, "Password should be of minimum 6 characters length")
        .required("Password is required"),
});

const registerSchema = yup.object({
    name: yup
        .string()
        .min(2, "Name should be of minimum 2 characters length")
        .required("Name is required"),
    email: yup
        .string()
        .email("Enter a valid email")
        .required("Email is required"),
    password: yup
        .string()
        .min(6, "Password should be of minimum 6 characters length")
        .required("Password is required"),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref("password"), null], "Passwords must match")
        .required("Confirm password is required"),
});

const LoginPage = () => {
    const [tabValue, setTabValue] = useState(0);
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const { login } = useAppContext();
    const navigate = useNavigate();

    // Handle tab change
    const handleTabChange = (_, newValue) => {
        setTabValue(newValue);
        setError("");
        setSuccess("");
    };

    // Toggle password visibility
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    // Handle login form submission
    const loginFormik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: loginSchema,
        onSubmit: (values) => {
            // For this demo, we're using a simplified login process
            // In a real app, this would make an API call to authenticate
            try {
                // Mock successful login
                if (
                    values.email === "demo@example.com" &&
                    values.password === "password123"
                ) {
                    login({
                        id: "1",
                        name: "Demo User",
                        email: values.email,
                    });
                    setSuccess("Login successful! Redirecting...");
                    setTimeout(() => {
                        navigate({ to: "/" });
                    }, 1500);
                } else {
                    setError("Invalid email or password");
                }
            } catch (err) {
                setError("Login failed. Please try again.");
            }
        },
    });

    // Handle register form submission
    const registerFormik = useFormik({
        initialValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
        validationSchema: registerSchema,
        onSubmit: (values) => {
            try {
                // In a real app, this would make an API call to register
                // For demo purposes, automatically "register" and log in
                login({
                    id: "2",
                    name: values.name,
                    email: values.email,
                });
                setSuccess("Registration successful! Redirecting...");
                setTimeout(() => {
                    navigate({ to: "/" });
                }, 1500);
            } catch (err) {
                setError("Registration failed. Please try again.");
            }
        },
    });

    return (
        <Container maxWidth="sm">
            <Box
                sx={{
                    mt: 8,
                    mb: 4,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Avatar
                    sx={{
                        m: 1,
                        bgcolor: "primary.main",
                        width: 56,
                        height: 56,
                    }}
                >
                    <LockOpenIcon fontSize="large" />
                </Avatar>
                <Typography component="h1" variant="h4" gutterBottom>
                    Welcome to Game Hub
                </Typography>
                <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{ mb: 3 }}
                >
                    Sign in to track your progress and compete on the
                    leaderboard
                </Typography>

                <Paper
                    elevation={3}
                    sx={{ p: { xs: 2, sm: 3 }, width: "100%", borderRadius: 2 }}
                >
                    <Tabs
                        value={tabValue}
                        onChange={handleTabChange}
                        variant="fullWidth"
                        sx={{ mb: 3 }}
                    >
                        <Tab label="Sign In" />
                        <Tab label="Register" />
                    </Tabs>

                    {error && (
                        <Alert severity="error" sx={{ mb: 2 }}>
                            {error}
                        </Alert>
                    )}
                    {success && (
                        <Alert severity="success" sx={{ mb: 2 }}>
                            {success}
                        </Alert>
                    )}

                    {/* Login Tab */}
                    {tabValue === 0 && (
                        <form onSubmit={loginFormik.handleSubmit}>
                            <TextField
                                margin="normal"
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                autoFocus
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <EmailIcon />
                                        </InputAdornment>
                                    ),
                                }}
                                value={loginFormik.values.email}
                                onChange={loginFormik.handleChange}
                                error={
                                    loginFormik.touched.email &&
                                    Boolean(loginFormik.errors.email)
                                }
                                helperText={
                                    loginFormik.touched.email &&
                                    loginFormik.errors.email
                                }
                            />
                            <TextField
                                margin="normal"
                                fullWidth
                                name="password"
                                label="Password"
                                type={showPassword ? "text" : "password"}
                                id="password"
                                autoComplete="current-password"
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <LockIcon />
                                        </InputAdornment>
                                    ),
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={
                                                    handleClickShowPassword
                                                }
                                                edge="end"
                                            >
                                                {showPassword ? (
                                                    <VisibilityOff />
                                                ) : (
                                                    <Visibility />
                                                )}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                                value={loginFormik.values.password}
                                onChange={loginFormik.handleChange}
                                error={
                                    loginFormik.touched.password &&
                                    Boolean(loginFormik.errors.password)
                                }
                                helperText={
                                    loginFormik.touched.password &&
                                    loginFormik.errors.password
                                }
                            />

                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                size="large"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Sign In
                            </Button>

                            <Divider sx={{ my: 2 }}>
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                >
                                    Demo Account
                                </Typography>
                            </Divider>

                            <Box sx={{ textAlign: "center", mt: 1 }}>
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                    gutterBottom
                                >
                                    Email: demo@example.com
                                </Typography>
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                >
                                    Password: password123
                                </Typography>
                            </Box>
                        </form>
                    )}

                    {/* Register Tab */}
                    {tabValue === 1 && (
                        <form onSubmit={registerFormik.handleSubmit}>
                            <TextField
                                margin="normal"
                                fullWidth
                                id="name"
                                label="Full Name"
                                name="name"
                                autoComplete="name"
                                autoFocus
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <PersonIcon />
                                        </InputAdornment>
                                    ),
                                }}
                                value={registerFormik.values.name}
                                onChange={registerFormik.handleChange}
                                error={
                                    registerFormik.touched.name &&
                                    Boolean(registerFormik.errors.name)
                                }
                                helperText={
                                    registerFormik.touched.name &&
                                    registerFormik.errors.name
                                }
                            />
                            <TextField
                                margin="normal"
                                fullWidth
                                id="email-register"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <EmailIcon />
                                        </InputAdornment>
                                    ),
                                }}
                                value={registerFormik.values.email}
                                onChange={registerFormik.handleChange}
                                error={
                                    registerFormik.touched.email &&
                                    Boolean(registerFormik.errors.email)
                                }
                                helperText={
                                    registerFormik.touched.email &&
                                    registerFormik.errors.email
                                }
                            />
                            <Grid container spacing={2}>
                                <Grid size={{ xs: 12, sm: 6 }}>
                                    <TextField
                                        margin="normal"
                                        fullWidth
                                        name="password"
                                        label="Password"
                                        type={
                                            showPassword ? "text" : "password"
                                        }
                                        id="password-register"
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <LockIcon />
                                                </InputAdornment>
                                            ),
                                        }}
                                        value={registerFormik.values.password}
                                        onChange={registerFormik.handleChange}
                                        error={
                                            registerFormik.touched.password &&
                                            Boolean(
                                                registerFormik.errors.password
                                            )
                                        }
                                        helperText={
                                            registerFormik.touched.password &&
                                            registerFormik.errors.password
                                        }
                                    />
                                </Grid>
                                <Grid size={{ xs: 12, sm: 6 }}>
                                    <TextField
                                        margin="normal"
                                        fullWidth
                                        name="confirmPassword"
                                        label="Confirm Password"
                                        type={
                                            showPassword ? "text" : "password"
                                        }
                                        id="confirm-password"
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <LockIcon />
                                                </InputAdornment>
                                            ),
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="toggle password visibility"
                                                        onClick={
                                                            handleClickShowPassword
                                                        }
                                                        edge="end"
                                                    >
                                                        {showPassword ? (
                                                            <VisibilityOff />
                                                        ) : (
                                                            <Visibility />
                                                        )}
                                                    </IconButton>
                                                </InputAdornment>
                                            ),
                                        }}
                                        value={
                                            registerFormik.values
                                                .confirmPassword
                                        }
                                        onChange={registerFormik.handleChange}
                                        error={
                                            registerFormik.touched
                                                .confirmPassword &&
                                            Boolean(
                                                registerFormik.errors
                                                    .confirmPassword
                                            )
                                        }
                                        helperText={
                                            registerFormik.touched
                                                .confirmPassword &&
                                            registerFormik.errors
                                                .confirmPassword
                                        }
                                    />
                                </Grid>
                            </Grid>

                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                size="large"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Register
                            </Button>
                        </form>
                    )}
                </Paper>
            </Box>
        </Container>
    );
};

export default LoginPage;
