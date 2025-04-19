import React from "react";
import { Container, Typography, Box, Paper, Divider } from "@mui/material";

const TermsPage = () => {
    return (
        <Container maxWidth="md">
            <Box sx={{ my: 4 }}>
                <Paper elevation={2} sx={{ p: 4, borderRadius: 2 }}>
                    <Typography variant="h3" component="h1" gutterBottom>
                        Terms of Service
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
                        1. Acceptance of Terms
                    </Typography>
                    <Typography variant="body1" paragraph>
                        By accessing and using the Game Hub website and
                        services, you accept and agree to be bound by these
                        Terms of Service. If you do not agree to these terms,
                        please do not use our services.
                    </Typography>

                    <Typography variant="h5" gutterBottom>
                        2. User Accounts
                    </Typography>
                    <Typography variant="body1" paragraph>
                        When you create an account with us, you must provide
                        accurate and complete information. You are responsible
                        for maintaining the confidentiality of your account and
                        password. You agree to accept responsibility for all
                        activities that occur under your account.
                    </Typography>

                    <Typography variant="h5" gutterBottom>
                        3. Acceptable Use
                    </Typography>
                    <Typography variant="body1" paragraph>
                        You agree to use our services only for lawful purposes
                        and in accordance with these Terms. You agree not to:
                    </Typography>
                    <Typography
                        variant="body1"
                        component="ul"
                        sx={{ pl: 4 }}
                        paragraph
                    >
                        <li>
                            Use the service in any way that violates any
                            applicable laws
                        </li>
                        <li>
                            Attempt to interfere with, compromise the system
                            integrity or security, or decipher any transmissions
                        </li>
                        <li>
                            Engage in any harassing, offensive, or abusive
                            behavior
                        </li>
                        <li>
                            Attempt to bypass any measures designed to prevent
                            or restrict access to the service
                        </li>
                    </Typography>

                    <Typography variant="h5" gutterBottom>
                        4. Intellectual Property
                    </Typography>
                    <Typography variant="body1" paragraph>
                        The service and its original content, features, and
                        functionality are and will remain the exclusive property
                        of Game Hub. Our games and services are protected by
                        copyright, trademark, and other intellectual property
                        laws.
                    </Typography>

                    <Typography variant="h5" gutterBottom>
                        5. Limitation of Liability
                    </Typography>
                    <Typography variant="body1" paragraph>
                        In no event shall Game Hub be liable for any indirect,
                        incidental, special, consequential or punitive damages,
                        including loss of profits, data, or other intangible
                        losses, resulting from your access to or use of or
                        inability to access or use the service.
                    </Typography>

                    <Typography variant="h5" gutterBottom>
                        6. Changes to Terms
                    </Typography>
                    <Typography variant="body1" paragraph>
                        We reserve the right to modify these terms at any time.
                        We will provide notice of significant changes by posting
                        the new Terms on our website. Your continued use of the
                        service after such changes constitutes your acceptance
                        of the new terms.
                    </Typography>

                    <Typography variant="h5" gutterBottom>
                        7. Contact Us
                    </Typography>
                    <Typography variant="body1" paragraph>
                        If you have any questions about these Terms, please
                        contact us at terms@gamehub.example.com.
                    </Typography>
                </Paper>
            </Box>
        </Container>
    );
};

export default TermsPage;
