import React from "react";
import { Container, Typography, Box, Paper, Divider } from "@mui/material";

const PrivacyPage = () => {
    return (
        <Container maxWidth="md">
            <Box sx={{ my: 4 }}>
                <Paper elevation={2} sx={{ p: 4, borderRadius: 2 }}>
                    <Typography variant="h3" component="h1" gutterBottom>
                        Privacy Policy
                    </Typography>
                    <Typography
                        variant="subtitle1"
                        color="text.secondary"
                        gutterBottom
                    >
                        Last Updated: April 18, 2025
                    </Typography>

                    <Divider sx={{ my: 3 }} />

                    <Typography variant="h5" gutterBottom>
                        1. Introduction
                    </Typography>
                    <Typography variant="body1" paragraph>
                        Welcome to Game Hub. We respect your privacy and are
                        committed to protecting your personal data. This privacy
                        policy will inform you about how we look after your
                        personal data when you visit our website and tell you
                        about your privacy rights and how the law protects you.
                    </Typography>

                    <Typography variant="h5" gutterBottom>
                        2. The Data We Collect
                    </Typography>
                    <Typography variant="body1" paragraph>
                        We collect minimal personal information needed to
                        provide our gaming services. This may include:
                    </Typography>
                    <Typography
                        variant="body1"
                        component="ul"
                        sx={{ pl: 4 }}
                        paragraph
                    >
                        <li>Username and profile information</li>
                        <li>Game scores and progress</li>
                        <li>Device information and IP address</li>
                        <li>Cookies and usage data</li>
                    </Typography>

                    <Typography variant="h5" gutterBottom>
                        3. How We Use Your Data
                    </Typography>
                    <Typography variant="body1" paragraph>
                        We use your data to:
                    </Typography>
                    <Typography
                        variant="body1"
                        component="ul"
                        sx={{ pl: 4 }}
                        paragraph
                    >
                        <li>Provide and maintain our gaming services</li>
                        <li>Track your game progress and scores</li>
                        <li>Enable leaderboards and achievement features</li>
                        <li>Improve our website and user experience</li>
                    </Typography>

                    <Typography variant="h5" gutterBottom>
                        4. Data Security
                    </Typography>
                    <Typography variant="body1" paragraph>
                        We implement appropriate security measures to protect
                        your personal data against accidental loss, unauthorized
                        access, or alteration. However, please be aware that no
                        method of transmission over the internet or electronic
                        storage is 100% secure.
                    </Typography>

                    <Typography variant="h5" gutterBottom>
                        5. Your Rights
                    </Typography>
                    <Typography variant="body1" paragraph>
                        You have the right to:
                    </Typography>
                    <Typography
                        variant="body1"
                        component="ul"
                        sx={{ pl: 4 }}
                        paragraph
                    >
                        <li>Access your personal data</li>
                        <li>
                            Request correction or deletion of your personal data
                        </li>
                        <li>Object to processing of your personal data</li>
                        <li>
                            Request restriction of processing your personal data
                        </li>
                        <li>Request transfer of your personal data</li>
                    </Typography>

                    <Typography variant="h5" gutterBottom>
                        6. Contact Us
                    </Typography>
                    <Typography variant="body1" paragraph>
                        If you have any questions about this Privacy Policy,
                        please contact us at privacy@gamehub.example.com.
                    </Typography>
                </Paper>
            </Box>
        </Container>
    );
};

export default PrivacyPage;
