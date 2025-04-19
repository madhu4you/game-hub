import React from "react";
import { Box, Typography, Grid, Container } from "@mui/material";
import { useAppContext } from "../context/AppContext";
import GameCard from "../components/games/GameCard";
import { gamesList } from "../data/games";

const GamesPage = () => {
    const { gameHistory } = useAppContext();

    return (
        <Container maxWidth={false}>
            <Box sx={{ my: 4 }}>
                <Typography
                    variant="h3"
                    component="h1"
                    gutterBottom
                    align="center"
                >
                    Games Collection
                </Typography>
                <Typography variant="h5" align="center" color="text.secondary">
                    Choose a game to play from our collection of brain games.
                </Typography>

                <Grid container spacing={2} sx={{ mt: 4 }}>
                    {gamesList.map((game) => (
                        <Grid key={game.id} size={{ xs: 12, sm: 6, md: 4 }}>
                            <GameCard
                                id={game.id}
                                title={game.title}
                                description={game.description}
                                icon={game.icon}
                                path={game.path}
                                gradientFrom={game.gradientFrom}
                                gradientTo={game.gradientTo}
                                difficulty={game.difficulty}
                                players={game.players}
                                duration={game.duration}
                                gameHistory={gameHistory}
                                variant="detailed"
                            />
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Container>
    );
};

export default GamesPage;
