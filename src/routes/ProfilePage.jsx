import React, { useState } from "react";
import {
    Container,
    Box,
    Typography,
    Paper,
    Avatar,
    Button,
    Grid,
    Divider,
    Card,
    CardContent,
    CardHeader,
    IconButton,
    Badge,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    useTheme,
    Stack,
    List,
    ListItem,
    ListItemText,
    ListItemAvatar,
} from "@mui/material";
import {
    Edit as EditIcon,
    Delete as DeleteIcon,
    Settings as SettingsIcon,
    Logout as LogoutIcon,
    EmojiEvents as TrophyIcon,
    Grid3x3 as TicTacToeIcon,
    GridView as SudokuIcon,
    Spellcheck as SpellingBeeIcon,
    History as HistoryIcon,
} from "@mui/icons-material";
import { useAppContext } from "../context/AppContext";
import { useNavigate } from "@tanstack/react-router";

// Recent activity data (would be fetched from an API in a real app)
const recentActivity = [
    {
        id: 1,
        type: "tic-tac-toe",
        title: "Won a Tic-Tac-Toe game",
        date: "2025-04-17T14:30:00",
        icon: TicTacToeIcon,
        details: "Grid size: 3x3, Score: 1-0",
    },
    {
        id: 2,
        type: "sudoku",
        title: "Completed a Sudoku puzzle",
        date: "2025-04-16T09:45:00",
        icon: SudokuIcon,
        details: "Difficulty: Medium, Time: 08:24",
    },
    {
        id: 3,
        type: "spelling-bee",
        title: "Reached Queen Bee rank",
        date: "2025-04-15T19:22:00",
        icon: SpellingBeeIcon,
        details: "Score: 235, Words found: 35/45",
    },
    {
        id: 4,
        type: "achievement",
        title: 'Unlocked "Sudoku Apprentice" achievement',
        date: "2025-04-15T19:15:00",
        icon: TrophyIcon,
        details: "Completed 5 Sudoku puzzles",
    },
    {
        id: 5,
        type: "tic-tac-toe",
        title: "Lost a Tic-Tac-Toe game",
        date: "2025-04-14T16:50:00",
        icon: TicTacToeIcon,
        details: "Grid size: 5x5, Score: 0-1",
    },
];

// Format date for display
const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
};

const ProfilePage = () => {
    const theme = useTheme();
    const { user, gameHistory, logout } = useAppContext();
    const navigate = useNavigate();
    const [confirmLogout, setConfirmLogout] = useState(false);
    const [confirmDelete, setConfirmDelete] = useState(false);

    // If not logged in, redirect to login page
    if (!user) {
        navigate({ to: "/login" });
        return null;
    }

    // Calculate total games played, wins, etc.
    const totalGames =
        (gameHistory["tic-tac-toe"]?.wins || 0) +
        (gameHistory["tic-tac-toe"]?.losses || 0) +
        (gameHistory["sudoku"]?.completed || 0);

    const handleLogout = () => {
        logout();
        setConfirmLogout(false);
        navigate({ to: "/" });
    };

    const handleDeleteAccount = () => {
        logout(); // In a real app, would also delete the account
        setConfirmDelete(false);
        navigate({ to: "/" });
    };

    return (
        <Container maxWidth={false}>
            <Box sx={{ my: 4 }}>
                {/* Logout Confirmation Dialog */}
                <Dialog
                    open={confirmLogout}
                    onClose={() => setConfirmLogout(false)}
                >
                    <DialogTitle>Confirm Logout</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Are you sure you want to log out from your account?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setConfirmLogout(false)}>
                            Cancel
                        </Button>
                        <Button
                            onClick={handleLogout}
                            color="primary"
                            variant="contained"
                        >
                            Logout
                        </Button>
                    </DialogActions>
                </Dialog>

                {/* Delete Account Confirmation Dialog */}
                <Dialog
                    open={confirmDelete}
                    onClose={() => setConfirmDelete(false)}
                >
                    <DialogTitle>Confirm Account Deletion</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Are you sure you want to delete your account? This
                            action cannot be undone and all your game progress
                            will be lost.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setConfirmDelete(false)}>
                            Cancel
                        </Button>
                        <Button
                            onClick={handleDeleteAccount}
                            color="error"
                            variant="contained"
                        >
                            Delete Account
                        </Button>
                    </DialogActions>
                </Dialog>

                <Grid container spacing={4}>
                    {/* Left Column - Profile Card */}
                    <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                        <Card elevation={3}>
                            <Box
                                sx={{
                                    p: 2,
                                    background: theme.palette.primary.main,
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    color: "white",
                                    position: "relative",
                                }}
                            >
                                <IconButton
                                    sx={{
                                        position: "absolute",
                                        top: 8,
                                        right: 8,
                                        color: "white",
                                    }}
                                    onClick={() => setConfirmLogout(true)}
                                >
                                    <LogoutIcon />
                                </IconButton>

                                <Badge
                                    overlap="circular"
                                    anchorOrigin={{
                                        vertical: "bottom",
                                        horizontal: "right",
                                    }}
                                    badgeContent={
                                        <IconButton
                                            sx={{
                                                backgroundColor:
                                                    "background.paper",
                                                width: 32,
                                                height: 32,
                                            }}
                                        >
                                            <EditIcon fontSize="small" />
                                        </IconButton>
                                    }
                                >
                                    <Avatar
                                        sx={{
                                            width: 120,
                                            height: 120,
                                            border: "4px solid white",
                                            fontSize: "4rem",
                                        }}
                                    >
                                        {user.name.charAt(0)}
                                    </Avatar>
                                </Badge>

                                <Typography
                                    variant="h5"
                                    sx={{ mt: 2, fontWeight: "bold" }}
                                >
                                    {user.name}
                                </Typography>
                                <Typography variant="body2" sx={{ mb: 1 }}>
                                    {user.email}
                                </Typography>

                                <Box
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 1,
                                        mb: 1,
                                    }}
                                >
                                    <TrophyIcon fontSize="small" />
                                    <Typography variant="body2">
                                        {totalGames > 0
                                            ? `${totalGames} games played`
                                            : "No games played yet"}
                                    </Typography>
                                </Box>
                            </Box>

                            <CardContent>
                                <Typography variant="h6" gutterBottom>
                                    Game Statistics
                                </Typography>

                                <List>
                                    <ListItem disablePadding>
                                        <ListItemAvatar>
                                            <Avatar
                                                sx={{
                                                    bgcolor:
                                                        theme.palette.primary
                                                            .light,
                                                }}
                                            >
                                                <TicTacToeIcon />
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary="Tic-Tac-Toe"
                                            secondary={
                                                gameHistory["tic-tac-toe"]
                                                    ? `Wins: ${
                                                          gameHistory[
                                                              "tic-tac-toe"
                                                          ].wins || 0
                                                      } | Losses: ${
                                                          gameHistory[
                                                              "tic-tac-toe"
                                                          ].losses || 0
                                                      }`
                                                    : "No games played"
                                            }
                                        />
                                    </ListItem>

                                    <ListItem disablePadding sx={{ mt: 2 }}>
                                        <ListItemAvatar>
                                            <Avatar
                                                sx={{
                                                    bgcolor:
                                                        theme.palette.secondary
                                                            .light,
                                                }}
                                            >
                                                <SudokuIcon />
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary="Sudoku"
                                            secondary={
                                                gameHistory["sudoku"]
                                                    ? `Completed: ${
                                                          gameHistory["sudoku"]
                                                              .completed || 0
                                                      } puzzles`
                                                    : "No puzzles completed"
                                            }
                                        />
                                    </ListItem>

                                    <ListItem disablePadding sx={{ mt: 2 }}>
                                        <ListItemAvatar>
                                            <Avatar
                                                sx={{
                                                    bgcolor:
                                                        theme.palette.warning
                                                            .light,
                                                }}
                                            >
                                                <SpellingBeeIcon />
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary="Spelling Bee"
                                            secondary={
                                                gameHistory["spelling-bee"]
                                                    ? `High Score: ${
                                                          gameHistory[
                                                              "spelling-bee"
                                                          ].highScore || 0
                                                      } | Words Found: ${
                                                          gameHistory[
                                                              "spelling-bee"
                                                          ].wordsFound || 0
                                                      }`
                                                    : "No games played"
                                            }
                                        />
                                    </ListItem>
                                </List>

                                <Divider sx={{ my: 2 }} />

                                <Stack spacing={2}>
                                    <Button
                                        startIcon={<SettingsIcon />}
                                        variant="outlined"
                                        fullWidth
                                    >
                                        Account Settings
                                    </Button>
                                    <Button
                                        startIcon={<DeleteIcon />}
                                        variant="outlined"
                                        color="error"
                                        fullWidth
                                        onClick={() => setConfirmDelete(true)}
                                    >
                                        Delete Account
                                    </Button>
                                </Stack>
                            </CardContent>
                        </Card>
                    </Grid>

                    {/* Right Column - Activity Feed */}
                    <Grid size={{ xs: 12, md: 8 }}>
                        <Paper elevation={3} sx={{ p: 3, height: "100%" }}>
                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    mb: 3,
                                }}
                            >
                                <HistoryIcon sx={{ mr: 1 }} />
                                <Typography variant="h5">
                                    Recent Activity
                                </Typography>
                            </Box>

                            {recentActivity.length > 0 ? (
                                recentActivity.map((activity) => (
                                    <Card
                                        key={activity.id}
                                        sx={{
                                            mb: 2,
                                            backgroundColor:
                                                "background.default",
                                            boxShadow: 1,
                                        }}
                                    >
                                        <CardHeader
                                            avatar={
                                                <Avatar
                                                    sx={{
                                                        bgcolor:
                                                            activity.type ===
                                                            "tic-tac-toe"
                                                                ? "primary.light"
                                                                : activity.type ===
                                                                  "sudoku"
                                                                ? "secondary.light"
                                                                : activity.type ===
                                                                  "spelling-bee"
                                                                ? "warning.light"
                                                                : "success.light",
                                                    }}
                                                >
                                                    <activity.icon />
                                                </Avatar>
                                            }
                                            title={activity.title}
                                            subheader={formatDate(
                                                activity.date
                                            )}
                                        />
                                        <CardContent sx={{ pt: 0 }}>
                                            <Typography
                                                variant="body2"
                                                color="text.secondary"
                                            >
                                                {activity.details}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                ))
                            ) : (
                                <Typography
                                    variant="body1"
                                    color="text.secondary"
                                    align="center"
                                >
                                    No recent activity to show. Start playing
                                    games to see your activity here!
                                </Typography>
                            )}
                        </Paper>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
};

export default ProfilePage;
