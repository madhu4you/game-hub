import React from "react";
import {
    Container,
    Typography,
    Box,
    Paper,
    Grid,
    Avatar,
    Divider,
} from "@mui/material";
import { SportsEsports as GameIcon } from "@mui/icons-material";

const AboutPage = () => {
    return (
        <Container maxWidth="md">
            <Box sx={{ my: 4 }}>
                <Paper elevation={2} sx={{ p: 4, borderRadius: 2 }}>
                    <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
                        <Avatar
                            sx={{
                                bgcolor: "primary.main",
                                mr: 2,
                                width: 56,
                                height: 56,
                            }}
                        >
                            <GameIcon fontSize="large" />
                        </Avatar>
                        <Typography variant="h3" component="h1">
                            About Game Hub
                        </Typography>
                    </Box>

                    <Typography variant="h5" gutterBottom sx={{ mb: 2 }}>
                        Our Mission
                    </Typography>
                    <Typography variant="body1" paragraph>
                        Game Hub was created with one simple goal in mind: to
                        provide a collection of engaging brain games that are
                        accessible to everyone. We believe that mental exercise
                        should be both fun and challenging, which is why we've
                        carefully designed games that can be enjoyed by users of
                        all ages and skill levels.
                    </Typography>

                    <Divider sx={{ my: 3 }} />

                    <Typography variant="h5" gutterBottom sx={{ mb: 2 }}>
                        Our Games
                    </Typography>

                    <Grid container spacing={3} sx={{ mb: 4 }}>
                        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                            <Box>
                                <Typography variant="h6" gutterBottom>
                                    Tic-Tac-Toe
                                </Typography>
                                <Typography variant="body2">
                                    The classic game reimagined with adjustable
                                    grid sizes from 3x3 to 10x10, offering a new
                                    twist on this timeless favorite.
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                            <Box>
                                <Typography variant="h6" gutterBottom>
                                    Sudoku
                                </Typography>
                                <Typography variant="body2">
                                    Test your logical thinking with puzzles
                                    ranging from easy to expert difficulty. Each
                                    puzzle is carefully crafted to have a unique
                                    solution.
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                            <Box>
                                <Typography variant="h6" gutterBottom>
                                    Spelling Bee
                                </Typography>
                                <Typography variant="body2">
                                    Challenge your vocabulary by creating words
                                    from a set of letters, with one letter that
                                    must be used in every word.
                                </Typography>
                            </Box>
                        </Grid>
                    </Grid>

                    <Divider sx={{ my: 3 }} />

                    <Typography variant="h5" gutterBottom sx={{ mb: 2 }}>
                        Contact Us
                    </Typography>
                    <Typography variant="body1">
                        Have questions, suggestions, or feedback? We'd love to
                        hear from you! Reach out to our team at{" "}
                        <strong>support@gamehub.example.com</strong>.
                    </Typography>
                </Paper>
            </Box>
        </Container>
    );
};

export default AboutPage;
