import React from "react";
import {
    Box,
    Container,
    Typography,
    Grid,
    Card,
    CardContent,
    CardMedia,
    Button,
    Paper,
    Avatar,
    Divider,
    Stack,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    IconButton,
    useTheme,
    useMediaQuery,
} from "@mui/material";
import {
    ArrowForward as ArrowForwardIcon,
    PlayArrow as PlayArrowIcon,
    EmojiEvents as TrophyIcon,
    People as PeopleIcon,
    Whatshot as WhatshotIcon,
    Grid3x3 as TicTacToeIcon,
    GridView as SudokuIcon,
    Spellcheck as SpellingBeeIcon,
    ArrowRight as ArrowRightIcon,
} from "@mui/icons-material";
import { Link } from "@tanstack/react-router";
import { useAppContext } from "../context/AppContext";
import GameCard from "../components/games/GameCard";
import { gamesList } from "../data/games";

// Use the centralized gamesList
const featuredGames = gamesList;

// Recent activity data (in a real app, this would come from an API)
const recentActivities = [
    {
        id: 1,
        user: {
            name: "Alex Johnson",
            avatar: null,
        },
        action: "achieved a new high score in",
        game: "Sudoku",
        score: 1250,
        time: "2 hours ago",
    },
    {
        id: 2,
        user: {
            name: "Jamie Smith",
            avatar: null,
        },
        action: "won against AI in",
        game: "Tic-Tac-Toe",
        score: null,
        time: "5 hours ago",
    },
    {
        id: 3,
        user: {
            name: "Taylor Brown",
            avatar: null,
        },
        action: "found 45 words in",
        game: "Spelling Bee",
        score: 187,
        time: "Yesterday",
    },
    {
        id: 4,
        user: {
            name: "Jordan Lee",
            avatar: null,
        },
        action: "completed an expert level puzzle in",
        game: "Sudoku",
        score: 950,
        time: "Yesterday",
    },
];

const HomePage = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));
    const { user } = useAppContext();

    return (
        <>
            {/* Hero Section */}
            <Box
                sx={{
                    position: "relative",
                    bgcolor: "primary.main",
                    color: "primary.contrastText",
                    pt: { xs: 8, md: 12 },
                    pb: { xs: 10, md: 14 },
                    overflow: "hidden",
                }}
            >
                <Container maxWidth={false}>
                    <Grid container spacing={4} alignItems="center">
                        <Grid size={{ xs: 12, md: 7 }}>
                            <Typography
                                variant="h2"
                                component="h1"
                                gutterBottom
                                sx={{
                                    fontWeight: 700,
                                    fontSize: { xs: "2.5rem", md: "3.5rem" },
                                }}
                            >
                                Challenge Your Mind with <br />
                                <Box
                                    component="span"
                                    sx={{ color: "secondary.main" }}
                                >
                                    Game Hub
                                </Box>
                            </Typography>

                            <Typography
                                variant="h6"
                                sx={{
                                    mb: 4,
                                    opacity: 0.9,
                                    maxWidth: "600px",
                                }}
                            >
                                Discover a collection of games designed to test
                                your skills, challenge your brain, and provide
                                hours of entertainment.
                            </Typography>

                            <Stack direction="row" spacing={2}>
                                <Button
                                    component={Link}
                                    to="/games"
                                    variant="contained"
                                    size="large"
                                    color="secondary"
                                    endIcon={<ArrowForwardIcon />}
                                    sx={{ px: 4, py: 1.5 }}
                                >
                                    Browse Games
                                </Button>
                                {!user && (
                                    <Button
                                        component={Link}
                                        to="/login"
                                        variant="outlined"
                                        size="large"
                                        color="inherit"
                                        sx={{
                                            px: 4,
                                            py: 1.5,
                                            borderColor: "primary.contrastText",
                                            "&:hover": {
                                                borderColor:
                                                    "primary.contrastText",
                                                bgcolor:
                                                    "rgba(255, 255, 255, 0.1)",
                                            },
                                        }}
                                    >
                                        Sign In
                                    </Button>
                                )}
                            </Stack>
                        </Grid>

                        {!isMobile && (
                            <Grid size={{ xs: 12, md: 5 }}>
                                <Box
                                    sx={{
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        position: "relative",
                                    }}
                                >
                                    <Paper
                                        elevation={6}
                                        sx={{
                                            width: 300,
                                            height: 300,
                                            borderRadius: "50%",
                                            display: "flex",
                                            flexDirection: "column",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            p: 4,
                                            backgroundColor: "background.paper",
                                            transform: "rotate(-5deg)",
                                            position: "absolute",
                                            zIndex: 2,
                                            left: 20,
                                            top: 50,
                                        }}
                                    >
                                        <TicTacToeIcon
                                            color="primary"
                                            sx={{ fontSize: 60, mb: 2 }}
                                        />
                                        <Typography
                                            variant="h6"
                                            align="center"
                                            color="text.primary"
                                            gutterBottom
                                        >
                                            Tic-Tac-Toe
                                        </Typography>
                                        <Button
                                            component={Link}
                                            to="/games/tic-tac-toe"
                                            variant="contained"
                                            size="small"
                                            startIcon={<PlayArrowIcon />}
                                            sx={{ mt: 1 }}
                                        >
                                            Play Now
                                        </Button>
                                    </Paper>

                                    <Paper
                                        elevation={6}
                                        sx={{
                                            width: 240,
                                            height: 240,
                                            borderRadius: "50%",
                                            display: "flex",
                                            flexDirection: "column",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            p: 3,
                                            backgroundColor: "background.paper",
                                            transform: "rotate(10deg)",
                                            position: "absolute",
                                            zIndex: 1,
                                            right: 0,
                                            bottom: 60,
                                        }}
                                    >
                                        <SudokuIcon
                                            color="warning"
                                            sx={{ fontSize: 50, mb: 2 }}
                                        />
                                        <Typography
                                            variant="h6"
                                            align="center"
                                            color="text.primary"
                                            gutterBottom
                                        >
                                            Sudoku
                                        </Typography>
                                        <Button
                                            component={Link}
                                            to="/games/sudoku"
                                            variant="contained"
                                            color="warning"
                                            size="small"
                                            startIcon={<PlayArrowIcon />}
                                            sx={{ mt: 1 }}
                                        >
                                            Play Now
                                        </Button>
                                    </Paper>
                                </Box>
                            </Grid>
                        )}
                    </Grid>
                </Container>

                {/* Decorative Shapes */}
                <Box
                    sx={{
                        position: "absolute",
                        top: "20%",
                        right: 0,
                        width: 300,
                        height: 300,
                        borderRadius: "50%",
                        backgroundColor: "rgba(255, 255, 255, 0.05)",
                        zIndex: 0,
                    }}
                />
                <Box
                    sx={{
                        position: "absolute",
                        bottom: "-10%",
                        left: "-5%",
                        width: 200,
                        height: 200,
                        borderRadius: "50%",
                        backgroundColor: "rgba(255, 255, 255, 0.05)",
                        zIndex: 0,
                    }}
                />
            </Box>

            <Container maxWidth={false} sx={{ my: { xs: 4, md: 8 } }}>
                {/* Welcome Message for Logged In Users */}
                {user && (
                    <Paper
                        sx={{
                            p: 3,
                            mb: 6,
                            borderRadius: 2,
                            backgroundColor:
                                theme.palette.mode === "dark"
                                    ? "rgba(255, 255, 255, 0.05)"
                                    : "rgba(0, 0, 0, 0.02)",
                        }}
                    >
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 2,
                            }}
                        >
                            <Avatar
                                sx={{
                                    bgcolor: "primary.main",
                                    width: 56,
                                    height: 56,
                                }}
                            >
                                {user.name.charAt(0).toUpperCase()}
                            </Avatar>
                            <Box>
                                <Typography
                                    variant="h5"
                                    gutterBottom
                                    sx={{ fontWeight: 500 }}
                                >
                                    Welcome back, {user.name}!
                                </Typography>
                                <Typography
                                    variant="body1"
                                    color="text.secondary"
                                >
                                    Continue your game journey or explore new
                                    challenges.
                                </Typography>
                            </Box>
                            <Box sx={{ ml: "auto" }}>
                                <Button
                                    component={Link}
                                    to="/profile"
                                    variant="outlined"
                                    endIcon={<ArrowRightIcon />}
                                >
                                    View Your Profile
                                </Button>
                            </Box>
                        </Box>
                    </Paper>
                )}

                {/* Featured Games Section */}
                <Box sx={{ mb: 8 }}>
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            mb: 4,
                        }}
                    >
                        <Typography
                            variant="h4"
                            component="h2"
                            sx={{ fontWeight: 600 }}
                        >
                            Featured Games
                        </Typography>
                        <Button
                            component={Link}
                            to="/games"
                            endIcon={<ArrowForwardIcon />}
                            color="primary"
                        >
                            View All
                        </Button>
                    </Box>

                    <Grid container spacing={3}>
                        {featuredGames.map((game) => (
                            <Grid key={game.id} size={{ xs: 12, sm: 6, md: 4 }}>
                                <GameCard
                                    id={game.id}
                                    title={game.title}
                                    description={game.description}
                                    icon={game.icon}
                                    path={game.path}
                                    gradientFrom={game.gradientFrom}
                                    gradientTo={game.gradientTo}
                                    variant="simple"
                                />
                            </Grid>
                        ))}
                    </Grid>
                </Box>

                <Divider sx={{ my: 6 }} />

                {/* Activity and Stats Section */}
                <Grid container spacing={4}>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Typography
                            variant="h4"
                            component="h2"
                            gutterBottom
                            sx={{ fontWeight: 600 }}
                        >
                            Recent Activity
                        </Typography>

                        <Paper
                            variant="outlined"
                            sx={{ borderRadius: 2, overflow: "hidden" }}
                        >
                            <List disablePadding>
                                {recentActivities.map((activity, index) => (
                                    <React.Fragment key={activity.id}>
                                        <ListItem
                                            alignItems="flex-start"
                                            secondaryAction={
                                                <Typography
                                                    variant="caption"
                                                    color="text.secondary"
                                                >
                                                    {activity.time}
                                                </Typography>
                                            }
                                            sx={{ py: 2 }}
                                        >
                                            <ListItemAvatar>
                                                <Avatar
                                                    alt={activity.user.name}
                                                    src={activity.user.avatar}
                                                />
                                            </ListItemAvatar>
                                            <ListItemText
                                                primary={
                                                    <Typography
                                                        variant="body1"
                                                        component="span"
                                                        sx={{ fontWeight: 500 }}
                                                    >
                                                        {activity.user.name}
                                                    </Typography>
                                                }
                                                secondary={
                                                    <>
                                                        <Typography
                                                            component="span"
                                                            variant="body2"
                                                            color="text.primary"
                                                        >
                                                            {activity.action}{" "}
                                                            <Box
                                                                component="span"
                                                                sx={{
                                                                    fontWeight: 600,
                                                                    color: "primary.main",
                                                                }}
                                                            >
                                                                {activity.game}
                                                            </Box>
                                                            {activity.score && (
                                                                <>
                                                                    {" with "}
                                                                    <Box
                                                                        component="span"
                                                                        sx={{
                                                                            fontWeight: 600,
                                                                            color: "secondary.main",
                                                                        }}
                                                                    >
                                                                        {
                                                                            activity.score
                                                                        }{" "}
                                                                        points
                                                                    </Box>
                                                                </>
                                                            )}
                                                        </Typography>
                                                    </>
                                                }
                                            />
                                        </ListItem>
                                        {index <
                                            recentActivities.length - 1 && (
                                            <Divider component="li" />
                                        )}
                                    </React.Fragment>
                                ))}
                            </List>
                        </Paper>
                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>
                        <Typography
                            variant="h4"
                            component="h2"
                            gutterBottom
                            sx={{ fontWeight: 600 }}
                        >
                            Community Highlights
                        </Typography>

                        <Grid container spacing={3}>
                            <Grid size={{ xs: 12, sm: 6 }}>
                                <Paper
                                    sx={{
                                        p: 3,
                                        borderRadius: 2,
                                        textAlign: "center",
                                        bgcolor:
                                            theme.palette.mode === "dark"
                                                ? "rgba(62, 80, 180, 0.1)"
                                                : "rgba(62, 80, 180, 0.05)",
                                    }}
                                >
                                    <TrophyIcon
                                        sx={{
                                            fontSize: 40,
                                            color: "primary.main",
                                            mb: 1,
                                        }}
                                    />
                                    <Typography
                                        variant="h4"
                                        sx={{ fontWeight: 700 }}
                                    >
                                        217
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                    >
                                        Games Played Today
                                    </Typography>
                                </Paper>
                            </Grid>

                            <Grid size={{ xs: 12, sm: 6 }}>
                                <Paper
                                    sx={{
                                        p: 3,
                                        borderRadius: 2,
                                        textAlign: "center",
                                        bgcolor:
                                            theme.palette.mode === "dark"
                                                ? "rgba(62, 80, 180, 0.1)"
                                                : "rgba(62, 80, 180, 0.05)",
                                    }}
                                >
                                    <PeopleIcon
                                        sx={{
                                            fontSize: 40,
                                            color: "primary.main",
                                            mb: 1,
                                        }}
                                    />
                                    <Typography
                                        variant="h4"
                                        sx={{ fontWeight: 700 }}
                                    >
                                        1,248
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                    >
                                        Active Players
                                    </Typography>
                                </Paper>
                            </Grid>

                            <Grid size={12}>
                                <Paper
                                    sx={{
                                        p: 3,
                                        borderRadius: 2,
                                        bgcolor:
                                            theme.palette.mode === "dark"
                                                ? "rgba(245, 124, 0, 0.1)"
                                                : "rgba(245, 124, 0, 0.05)",
                                    }}
                                >
                                    <Typography
                                        variant="h6"
                                        sx={{
                                            fontWeight: 600,
                                            display: "flex",
                                            alignItems: "center",
                                        }}
                                    >
                                        <WhatshotIcon
                                            color="warning"
                                            sx={{ mr: 1 }}
                                        />
                                        Weekly Challenge
                                    </Typography>

                                    <Box sx={{ my: 2 }}>
                                        <Typography variant="body1">
                                            Complete a Sudoku puzzle on Expert
                                            difficulty in under 10 minutes to
                                            earn a special badge!
                                        </Typography>
                                    </Box>

                                    <Button
                                        component={Link}
                                        to="/games/sudoku"
                                        variant="outlined"
                                        color="warning"
                                        sx={{ mt: 1 }}
                                    >
                                        Take the Challenge
                                    </Button>
                                </Paper>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
        </>
    );
};

export default HomePage;
