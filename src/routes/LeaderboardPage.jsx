import React, { useState } from "react";
import {
    Box,
    Typography,
    Container,
    Paper,
    Tabs,
    Tab,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Avatar,
    Chip,
    LinearProgress,
} from "@mui/material";
import {
    Grid3x3 as TicTacToeIcon,
    GridView as SudokuIcon,
    Spellcheck as SpellingBeeIcon,
    EmojiEvents as TrophyIcon,
} from "@mui/icons-material";
import { useAppContext } from "../context/AppContext";

// Dummy data for leaderboard
const leaderboardData = {
    "tic-tac-toe": [
        {
            id: 1,
            name: "Alex Thompson",
            avatar: null,
            wins: 142,
            losses: 56,
            winRate: 71.7,
        },
        {
            id: 2,
            name: "Jamie Rodriguez",
            avatar: null,
            wins: 98,
            losses: 45,
            winRate: 68.5,
        },
        {
            id: 3,
            name: "Demo User",
            avatar: null,
            wins: 24,
            losses: 12,
            winRate: 66.7,
        },
        {
            id: 4,
            name: "Taylor Kim",
            avatar: null,
            wins: 78,
            losses: 42,
            winRate: 65.0,
        },
        {
            id: 5,
            name: "Jordan Patel",
            avatar: null,
            wins: 56,
            losses: 32,
            winRate: 63.6,
        },
        {
            id: 6,
            name: "Casey Wong",
            avatar: null,
            wins: 48,
            losses: 28,
            winRate: 63.2,
        },
        {
            id: 7,
            name: "Riley Smith",
            avatar: null,
            wins: 37,
            losses: 24,
            winRate: 60.7,
        },
        {
            id: 8,
            name: "Morgan Lee",
            avatar: null,
            wins: 29,
            losses: 22,
            winRate: 56.9,
        },
        {
            id: 9,
            name: "Dakota Jones",
            avatar: null,
            wins: 18,
            losses: 16,
            winRate: 52.9,
        },
        {
            id: 10,
            name: "Quinn Martin",
            avatar: null,
            wins: 12,
            losses: 14,
            winRate: 46.2,
        },
    ],
    sudoku: [
        {
            id: 1,
            name: "Jordan Patel",
            avatar: null,
            completed: 89,
            avgTime: "03:42",
            fastestTime: "01:28",
        },
        {
            id: 2,
            name: "Alex Thompson",
            avatar: null,
            completed: 76,
            avgTime: "04:12",
            fastestTime: "01:35",
        },
        {
            id: 3,
            name: "Morgan Lee",
            avatar: null,
            completed: 68,
            avgTime: "04:23",
            fastestTime: "01:42",
        },
        {
            id: 4,
            name: "Taylor Kim",
            avatar: null,
            completed: 57,
            avgTime: "04:45",
            fastestTime: "01:49",
        },
        {
            id: 5,
            name: "Demo User",
            avatar: null,
            completed: 12,
            avgTime: "05:10",
            fastestTime: "02:24",
        },
        {
            id: 6,
            name: "Quinn Martin",
            avatar: null,
            completed: 42,
            avgTime: "05:35",
            fastestTime: "02:10",
        },
        {
            id: 7,
            name: "Casey Wong",
            avatar: null,
            completed: 39,
            avgTime: "06:12",
            fastestTime: "02:18",
        },
        {
            id: 8,
            name: "Riley Smith",
            avatar: null,
            completed: 28,
            avgTime: "06:35",
            fastestTime: "02:45",
        },
        {
            id: 9,
            name: "Jamie Rodriguez",
            avatar: null,
            completed: 21,
            avgTime: "07:14",
            fastestTime: "03:12",
        },
        {
            id: 10,
            name: "Dakota Jones",
            avatar: null,
            completed: 14,
            avgTime: "08:21",
            fastestTime: "03:48",
        },
    ],
    "spelling-bee": [
        {
            id: 1,
            name: "Taylor Kim",
            avatar: null,
            highScore: 487,
            totalWords: 1842,
            longestStreak: 28,
        },
        {
            id: 2,
            name: "Morgan Lee",
            avatar: null,
            highScore: 452,
            totalWords: 1623,
            longestStreak: 24,
        },
        {
            id: 3,
            name: "Jamie Rodriguez",
            avatar: null,
            highScore: 425,
            totalWords: 1518,
            longestStreak: 22,
        },
        {
            id: 4,
            name: "Casey Wong",
            avatar: null,
            highScore: 391,
            totalWords: 1392,
            longestStreak: 19,
        },
        {
            id: 5,
            name: "Alex Thompson",
            avatar: null,
            highScore: 376,
            totalWords: 1284,
            longestStreak: 18,
        },
        {
            id: 6,
            name: "Riley Smith",
            avatar: null,
            highScore: 342,
            totalWords: 1168,
            longestStreak: 15,
        },
        {
            id: 7,
            name: "Jordan Patel",
            avatar: null,
            highScore: 315,
            totalWords: 1052,
            longestStreak: 14,
        },
        {
            id: 8,
            name: "Quinn Martin",
            avatar: null,
            highScore: 287,
            totalWords: 956,
            longestStreak: 12,
        },
        {
            id: 9,
            name: "Dakota Jones",
            avatar: null,
            highScore: 243,
            totalWords: 825,
            longestStreak: 10,
        },
        {
            id: 10,
            name: "Demo User",
            avatar: null,
            highScore: 48,
            totalWords: 18,
            longestStreak: 3,
        },
    ],
    overall: [
        {
            id: 1,
            name: "Alex Thompson",
            avatar: null,
            totalScore: 1256,
            gamesPlayed: 218,
            achievements: 24,
        },
        {
            id: 2,
            name: "Taylor Kim",
            avatar: null,
            totalScore: 1182,
            gamesPlayed: 202,
            achievements: 22,
        },
        {
            id: 3,
            name: "Jamie Rodriguez",
            avatar: null,
            totalScore: 1054,
            gamesPlayed: 187,
            achievements: 19,
        },
        {
            id: 4,
            name: "Jordan Patel",
            avatar: null,
            totalScore: 986,
            gamesPlayed: 174,
            achievements: 18,
        },
        {
            id: 5,
            name: "Morgan Lee",
            avatar: null,
            totalScore: 924,
            gamesPlayed: 162,
            achievements: 17,
        },
        {
            id: 6,
            name: "Casey Wong",
            avatar: null,
            totalScore: 856,
            gamesPlayed: 153,
            achievements: 16,
        },
        {
            id: 7,
            name: "Riley Smith",
            avatar: null,
            totalScore: 784,
            gamesPlayed: 142,
            achievements: 14,
        },
        {
            id: 8,
            name: "Quinn Martin",
            avatar: null,
            totalScore: 728,
            gamesPlayed: 129,
            achievements: 12,
        },
        {
            id: 9,
            name: "Dakota Jones",
            avatar: null,
            totalScore: 678,
            gamesPlayed: 116,
            achievements: 10,
        },
        {
            id: 10,
            name: "Demo User",
            avatar: null,
            totalScore: 84,
            gamesPlayed: 36,
            achievements: 4,
        },
    ],
};

const LeaderboardPage = () => {
    const [tabValue, setTabValue] = useState(0);
    const { user, gameHistory } = useAppContext();

    const handleTabChange = (_, newValue) => {
        setTabValue(newValue);
    };

    // Find user rank in each leaderboard
    const getUserRank = (gameType) => {
        const leaderboard = leaderboardData[gameType];
        const userIndex = leaderboard.findIndex(
            (player) => player.name === user?.name
        );
        return userIndex !== -1 ? userIndex + 1 : null;
    };

    // Function to highlight the user's row
    const isUserRow = (playerName) => {
        return user && playerName === user.name;
    };

    return (
        <Container maxWidth={false}>
            <Box sx={{ my: 4 }}>
                <Typography
                    variant="h3"
                    component="h1"
                    gutterBottom
                    align="center"
                >
                    Leaderboard
                </Typography>
                <Typography
                    variant="h6"
                    align="center"
                    color="text.secondary"
                    paragraph
                >
                    See how you rank against other players across all games.
                </Typography>

                <Paper sx={{ mb: 4 }}>
                    <Tabs
                        value={tabValue}
                        onChange={handleTabChange}
                        variant="scrollable"
                        scrollButtons="auto"
                        sx={{ borderBottom: 1, borderColor: "divider" }}
                    >
                        <Tab icon={<TrophyIcon />} label="Overall" />
                        <Tab icon={<TicTacToeIcon />} label="Tic-Tac-Toe" />
                        <Tab icon={<SudokuIcon />} label="Sudoku" />
                        <Tab icon={<SpellingBeeIcon />} label="Spelling Bee" />
                    </Tabs>

                    <Box sx={{ p: 3 }}>
                        {/* Overall Rankings */}
                        {tabValue === 0 && (
                            <TableContainer>
                                <Typography variant="subtitle1" gutterBottom>
                                    {user && getUserRank("overall")
                                        ? `Your Rank: #${getUserRank(
                                              "overall"
                                          )}`
                                        : "Play more games to appear on the leaderboard!"}
                                </Typography>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Rank</TableCell>
                                            <TableCell>Player</TableCell>
                                            <TableCell align="right">
                                                Total Score
                                            </TableCell>
                                            <TableCell align="right">
                                                Games Played
                                            </TableCell>
                                            <TableCell align="right">
                                                Achievements
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {leaderboardData.overall.map(
                                            (player, index) => (
                                                <TableRow
                                                    key={player.id}
                                                    sx={{
                                                        backgroundColor:
                                                            isUserRow(
                                                                player.name
                                                            )
                                                                ? "action.selected"
                                                                : "inherit",
                                                    }}
                                                >
                                                    <TableCell>
                                                        {index < 3 ? (
                                                            <Chip
                                                                label={`#${
                                                                    index + 1
                                                                }`}
                                                                color={
                                                                    index === 0
                                                                        ? "warning"
                                                                        : index ===
                                                                          1
                                                                        ? "primary"
                                                                        : "secondary"
                                                                }
                                                                size="small"
                                                            />
                                                        ) : (
                                                            `#${index + 1}`
                                                        )}
                                                    </TableCell>
                                                    <TableCell>
                                                        <Box
                                                            sx={{
                                                                display: "flex",
                                                                alignItems:
                                                                    "center",
                                                            }}
                                                        >
                                                            <Avatar
                                                                src={
                                                                    player.avatar
                                                                }
                                                                sx={{
                                                                    width: 32,
                                                                    height: 32,
                                                                    mr: 1,
                                                                }}
                                                            >
                                                                {player.name.charAt(
                                                                    0
                                                                )}
                                                            </Avatar>
                                                            {player.name}
                                                            {isUserRow(
                                                                player.name
                                                            ) && (
                                                                <Chip
                                                                    label="You"
                                                                    color="success"
                                                                    size="small"
                                                                    sx={{
                                                                        ml: 1,
                                                                    }}
                                                                />
                                                            )}
                                                        </Box>
                                                    </TableCell>
                                                    <TableCell align="right">
                                                        {player.totalScore}
                                                    </TableCell>
                                                    <TableCell align="right">
                                                        {player.gamesPlayed}
                                                    </TableCell>
                                                    <TableCell align="right">
                                                        {player.achievements}
                                                    </TableCell>
                                                </TableRow>
                                            )
                                        )}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        )}

                        {/* Tic-Tac-Toe Rankings */}
                        {tabValue === 1 && (
                            <TableContainer>
                                <Typography variant="subtitle1" gutterBottom>
                                    {user && getUserRank("tic-tac-toe")
                                        ? `Your Rank: #${getUserRank(
                                              "tic-tac-toe"
                                          )}`
                                        : "Play more Tic-Tac-Toe to appear on the leaderboard!"}
                                </Typography>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Rank</TableCell>
                                            <TableCell>Player</TableCell>
                                            <TableCell align="right">
                                                Wins
                                            </TableCell>
                                            <TableCell align="right">
                                                Losses
                                            </TableCell>
                                            <TableCell align="right">
                                                Win Rate
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {leaderboardData["tic-tac-toe"].map(
                                            (player, index) => (
                                                <TableRow
                                                    key={player.id}
                                                    sx={{
                                                        backgroundColor:
                                                            isUserRow(
                                                                player.name
                                                            )
                                                                ? "action.selected"
                                                                : "inherit",
                                                    }}
                                                >
                                                    <TableCell>
                                                        {index < 3 ? (
                                                            <Chip
                                                                label={`#${
                                                                    index + 1
                                                                }`}
                                                                color={
                                                                    index === 0
                                                                        ? "warning"
                                                                        : index ===
                                                                          1
                                                                        ? "primary"
                                                                        : "secondary"
                                                                }
                                                                size="small"
                                                            />
                                                        ) : (
                                                            `#${index + 1}`
                                                        )}
                                                    </TableCell>
                                                    <TableCell>
                                                        <Box
                                                            sx={{
                                                                display: "flex",
                                                                alignItems:
                                                                    "center",
                                                            }}
                                                        >
                                                            <Avatar
                                                                src={
                                                                    player.avatar
                                                                }
                                                                sx={{
                                                                    width: 32,
                                                                    height: 32,
                                                                    mr: 1,
                                                                }}
                                                            >
                                                                {player.name.charAt(
                                                                    0
                                                                )}
                                                            </Avatar>
                                                            {player.name}
                                                            {isUserRow(
                                                                player.name
                                                            ) && (
                                                                <Chip
                                                                    label="You"
                                                                    color="success"
                                                                    size="small"
                                                                    sx={{
                                                                        ml: 1,
                                                                    }}
                                                                />
                                                            )}
                                                        </Box>
                                                    </TableCell>
                                                    <TableCell align="right">
                                                        {player.wins}
                                                    </TableCell>
                                                    <TableCell align="right">
                                                        {player.losses}
                                                    </TableCell>
                                                    <TableCell align="right">
                                                        <Box
                                                            sx={{
                                                                display: "flex",
                                                                alignItems:
                                                                    "center",
                                                            }}
                                                        >
                                                            <Box
                                                                sx={{
                                                                    width: "100%",
                                                                    mr: 1,
                                                                }}
                                                            >
                                                                <LinearProgress
                                                                    variant="determinate"
                                                                    value={
                                                                        player.winRate
                                                                    }
                                                                    sx={{
                                                                        height: 8,
                                                                        borderRadius: 4,
                                                                    }}
                                                                />
                                                            </Box>
                                                            <Box
                                                                sx={{
                                                                    minWidth: 35,
                                                                }}
                                                            >
                                                                <Typography
                                                                    variant="body2"
                                                                    color="text.secondary"
                                                                >
                                                                    {
                                                                        player.winRate
                                                                    }
                                                                    %
                                                                </Typography>
                                                            </Box>
                                                        </Box>
                                                    </TableCell>
                                                </TableRow>
                                            )
                                        )}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        )}

                        {/* Sudoku Rankings */}
                        {tabValue === 2 && (
                            <TableContainer>
                                <Typography variant="subtitle1" gutterBottom>
                                    {user && getUserRank("sudoku")
                                        ? `Your Rank: #${getUserRank("sudoku")}`
                                        : "Play more Sudoku to appear on the leaderboard!"}
                                </Typography>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Rank</TableCell>
                                            <TableCell>Player</TableCell>
                                            <TableCell align="right">
                                                Completed
                                            </TableCell>
                                            <TableCell align="right">
                                                Average Time
                                            </TableCell>
                                            <TableCell align="right">
                                                Fastest Time
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {leaderboardData.sudoku.map(
                                            (player, index) => (
                                                <TableRow
                                                    key={player.id}
                                                    sx={{
                                                        backgroundColor:
                                                            isUserRow(
                                                                player.name
                                                            )
                                                                ? "action.selected"
                                                                : "inherit",
                                                    }}
                                                >
                                                    <TableCell>
                                                        {index < 3 ? (
                                                            <Chip
                                                                label={`#${
                                                                    index + 1
                                                                }`}
                                                                color={
                                                                    index === 0
                                                                        ? "warning"
                                                                        : index ===
                                                                          1
                                                                        ? "primary"
                                                                        : "secondary"
                                                                }
                                                                size="small"
                                                            />
                                                        ) : (
                                                            `#${index + 1}`
                                                        )}
                                                    </TableCell>
                                                    <TableCell>
                                                        <Box
                                                            sx={{
                                                                display: "flex",
                                                                alignItems:
                                                                    "center",
                                                            }}
                                                        >
                                                            <Avatar
                                                                src={
                                                                    player.avatar
                                                                }
                                                                sx={{
                                                                    width: 32,
                                                                    height: 32,
                                                                    mr: 1,
                                                                }}
                                                            >
                                                                {player.name.charAt(
                                                                    0
                                                                )}
                                                            </Avatar>
                                                            {player.name}
                                                            {isUserRow(
                                                                player.name
                                                            ) && (
                                                                <Chip
                                                                    label="You"
                                                                    color="success"
                                                                    size="small"
                                                                    sx={{
                                                                        ml: 1,
                                                                    }}
                                                                />
                                                            )}
                                                        </Box>
                                                    </TableCell>
                                                    <TableCell align="right">
                                                        {player.completed}
                                                    </TableCell>
                                                    <TableCell align="right">
                                                        {player.avgTime}
                                                    </TableCell>
                                                    <TableCell align="right">
                                                        <Typography
                                                            sx={{
                                                                fontWeight:
                                                                    "bold",
                                                                color:
                                                                    index === 0
                                                                        ? "warning.main"
                                                                        : "inherit",
                                                            }}
                                                        >
                                                            {player.fastestTime}
                                                        </Typography>
                                                    </TableCell>
                                                </TableRow>
                                            )
                                        )}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        )}

                        {/* Spelling Bee Rankings */}
                        {tabValue === 3 && (
                            <TableContainer>
                                <Typography variant="subtitle1" gutterBottom>
                                    {user && getUserRank("spelling-bee")
                                        ? `Your Rank: #${getUserRank(
                                              "spelling-bee"
                                          )}`
                                        : "Play more Spelling Bee to appear on the leaderboard!"}
                                </Typography>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Rank</TableCell>
                                            <TableCell>Player</TableCell>
                                            <TableCell align="right">
                                                High Score
                                            </TableCell>
                                            <TableCell align="right">
                                                Total Words
                                            </TableCell>
                                            <TableCell align="right">
                                                Longest Streak
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {leaderboardData["spelling-bee"].map(
                                            (player, index) => (
                                                <TableRow
                                                    key={player.id}
                                                    sx={{
                                                        backgroundColor:
                                                            isUserRow(
                                                                player.name
                                                            )
                                                                ? "action.selected"
                                                                : "inherit",
                                                    }}
                                                >
                                                    <TableCell>
                                                        {index < 3 ? (
                                                            <Chip
                                                                label={`#${
                                                                    index + 1
                                                                }`}
                                                                color={
                                                                    index === 0
                                                                        ? "warning"
                                                                        : index ===
                                                                          1
                                                                        ? "primary"
                                                                        : "secondary"
                                                                }
                                                                size="small"
                                                            />
                                                        ) : (
                                                            `#${index + 1}`
                                                        )}
                                                    </TableCell>
                                                    <TableCell>
                                                        <Box
                                                            sx={{
                                                                display: "flex",
                                                                alignItems:
                                                                    "center",
                                                            }}
                                                        >
                                                            <Avatar
                                                                src={
                                                                    player.avatar
                                                                }
                                                                sx={{
                                                                    width: 32,
                                                                    height: 32,
                                                                    mr: 1,
                                                                }}
                                                            >
                                                                {player.name.charAt(
                                                                    0
                                                                )}
                                                            </Avatar>
                                                            {player.name}
                                                            {isUserRow(
                                                                player.name
                                                            ) && (
                                                                <Chip
                                                                    label="You"
                                                                    color="success"
                                                                    size="small"
                                                                    sx={{
                                                                        ml: 1,
                                                                    }}
                                                                />
                                                            )}
                                                        </Box>
                                                    </TableCell>
                                                    <TableCell align="right">
                                                        <Typography
                                                            sx={{
                                                                fontWeight:
                                                                    "bold",
                                                                color:
                                                                    index === 0
                                                                        ? "warning.main"
                                                                        : "inherit",
                                                            }}
                                                        >
                                                            {player.highScore}
                                                        </Typography>
                                                    </TableCell>
                                                    <TableCell align="right">
                                                        {player.totalWords}
                                                    </TableCell>
                                                    <TableCell align="right">
                                                        {player.longestStreak}
                                                    </TableCell>
                                                </TableRow>
                                            )
                                        )}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        )}
                    </Box>
                </Paper>
            </Box>
        </Container>
    );
};

export default LeaderboardPage;
