import React from "react";
import { Box, Typography, Button, Container, Paper } from "@mui/material";
import { Link } from "@tanstack/react-router";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";

const NotFoundPage = () => {
    return (
        <Container maxWidth="md">
            <Box sx={{ my: 8, textAlign: "center" }}>
                <Paper elevation={3} sx={{ py: 6, px: 4 }}>
                    <SentimentDissatisfiedIcon
                        sx={{ fontSize: 80, color: "text.secondary", mb: 2 }}
                    />
                    <Typography variant="h2" component="h1" gutterBottom>
                        404
                    </Typography>
                    <Typography
                        variant="h5"
                        component="h2"
                        gutterBottom
                        color="text.secondary"
                    >
                        Page Not Found
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 4 }}>
                        The page you're looking for doesn't exist or has been
                        moved.
                    </Typography>
                    <Button
                        variant="contained"
                        component={Link}
                        to="/"
                        size="large"
                    >
                        Back to Home
                    </Button>
                </Paper>
            </Box>
        </Container>
    );
};

export default NotFoundPage;
