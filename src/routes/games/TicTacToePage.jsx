import React, { useState, useEffect } from "react";
import {
    Box,
    Typography,
    Grid,
    Paper,
    Button,
    Slider,
    Stack,
    Container,
    Card,
    CardContent,
    Divider,
    useTheme,
} from "@mui/material";
import {
    Refresh as ResetIcon,
    Settings as SettingsIcon,
    Close as XIcon,
    RadioButtonUnchecked as OIcon,
} from "@mui/icons-material";
import Confetti from "react-confetti";
import { useAppContext } from "../../context/AppContext";

const TicTacToePage = () => {
    const theme = useTheme();
    const { updateGameHistory, soundEnabled, gameHistory } = useAppContext();
    const [boardSize, setBoardSize] = useState(3);
    const [board, setBoard] = useState(Array(boardSize * boardSize).fill(null));
    const [xIsNext, setXIsNext] = useState(true);
    const [winner, setWinner] = useState(null);
    const [showConfetti, setShowConfetti] = useState(false);
    const [gameStats, setGameStats] = useState({
        wins: 0,
        losses: 0,
        draws: 0,
    });
    const [showSettings, setShowSettings] = useState(false);

    // Colors for X and O
    const xColor = theme.palette.primary.main;
    const oColor = theme.palette.secondary.main;

    // Reset game when board size changes
    useEffect(() => {
        resetGame();
    }, [boardSize]);

    // Get game stats from context
    useEffect(() => {
        if (gameHistory && gameHistory["tic-tac-toe"]) {
            setGameStats(gameHistory["tic-tac-toe"]);
        }
    }, [gameHistory]);

    // Play sound effect
    const playSound = (soundType) => {
        if (!soundEnabled) return;

        // In a real implementation, you would use react-howler or Audio API
        console.log(`Playing sound: ${soundType}`);
        // Example using HTML5 Audio API:
        // const sound = new Audio(`/sounds/${soundType}.mp3`);
        // sound.play();
    };

    // Handle cell click
    const handleClick = (index) => {
        // If cell is filled or game is won, do nothing
        if (board[index] || winner) {
            return;
        }

        const newBoard = [...board];
        newBoard[index] = xIsNext ? "X" : "O";
        setBoard(newBoard);
        setXIsNext(!xIsNext);
        playSound("move");

        // Check for winner after move
        const gameWinner = calculateWinner(newBoard, boardSize);
        if (gameWinner) {
            setWinner(gameWinner);
            setShowConfetti(true);
            playSound("win");
            // Update game history
            const newStats = { ...gameStats };
            if (gameWinner === "X") {
                newStats.wins += 1;
            } else if (gameWinner === "O") {
                newStats.losses += 1;
            } else if (gameWinner === "DRAW") {
                newStats.draws += 1;
            }
            setGameStats(newStats);
            updateGameHistory("tic-tac-toe", newStats);
        } else if (!newBoard.includes(null)) {
            // Draw game
            setWinner("DRAW");
            playSound("draw");
            const newStats = { ...gameStats, draws: gameStats.draws + 1 };
            setGameStats(newStats);
            updateGameHistory("tic-tac-toe", newStats);
        }
    };

    // Reset game
    const resetGame = () => {
        setBoard(Array(boardSize * boardSize).fill(null));
        setXIsNext(true);
        setWinner(null);
        setShowConfetti(false);
        playSound("reset");
    };

    // Render cell
    const renderCell = (index) => {
        const cellSize = `calc((min(80vh, 600px) - ${
            boardSize * 2
        }px) / ${boardSize})`;

        return (
            <Button
                key={index}
                onClick={() => handleClick(index)}
                sx={{
                    width: cellSize,
                    height: cellSize,
                    minWidth: 0,
                    minHeight: 0,
                    p: 0,
                    m: 0,
                    border: `1px solid ${theme.palette.divider}`,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 0,
                    fontSize: `calc(${cellSize} * 0.5)`,
                    fontWeight: "bold",
                    color: board[index] === "X" ? xColor : oColor,
                    backgroundColor:
                        winner &&
                        winner !== "DRAW" &&
                        calculateWinningCells(board, boardSize).includes(index)
                            ? theme.palette.mode === "dark"
                                ? "rgba(255, 255, 255, 0.1)"
                                : "rgba(0, 0, 0, 0.05)"
                            : "transparent",
                    "&:hover": {
                        bgcolor:
                            theme.palette.mode === "dark"
                                ? "rgba(255, 255, 255, 0.05)"
                                : "rgba(0, 0, 0, 0.02)",
                    },
                }}
                disabled={Boolean(board[index]) || Boolean(winner)}
            >
                {board[index] === "X" && (
                    <XIcon sx={{ fontSize: "inherit", color: xColor }} />
                )}
                {board[index] === "O" && (
                    <OIcon sx={{ fontSize: "inherit", color: oColor }} />
                )}
            </Button>
        );
    };

    // Render board
    const renderBoard = () => {
        return (
            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: `repeat(${boardSize}, 1fr)`,
                    gap: 0,
                    border: `2px solid ${theme.palette.divider}`,
                    width: "fit-content",
                    mx: "auto",
                    mt: 4,
                }}
            >
                {board.map((_, index) => renderCell(index))}
            </Box>
        );
    };

    // Game status message
    const getStatus = () => {
        if (winner === "X" || winner === "O") {
            return `Winner: ${winner === "X" ? "Player X" : "Player O"}`;
        } else if (winner === "DRAW") {
            return "Game ended in a draw!";
        } else {
            return `Next player: ${xIsNext ? "X" : "O"}`;
        }
    };

    return (
        <Container maxWidth={false}>
            {showConfetti && winner !== "DRAW" && (
                <Confetti
                    width={window.innerWidth}
                    height={window.innerHeight}
                    recycle={false}
                    numberOfPieces={500}
                    gravity={0.15}
                    colors={[xColor, oColor, "#FFD700", "#FF6B6B", "#4CAF50"]}
                    onConfettiComplete={() => setShowConfetti(false)}
                />
            )}

            <Box sx={{ my: 4 }}>
                <Typography
                    variant="h3"
                    component="h1"
                    gutterBottom
                    align="center"
                >
                    Tic-Tac-Toe
                </Typography>

                <Grid container spacing={3}>
                    <Grid size={{ xs: 12, md: 8 }}>
                        <Paper
                            elevation={3}
                            sx={{
                                p: 3,
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                minHeight: "60vh",
                            }}
                        >
                            <Box
                                sx={{
                                    width: "100%",
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    mb: 2,
                                }}
                            >
                                <Typography
                                    variant="h5"
                                    color={xIsNext ? xColor : oColor}
                                >
                                    {getStatus()}
                                </Typography>

                                <Stack direction="row" spacing={1}>
                                    <Button
                                        variant="outlined"
                                        startIcon={<SettingsIcon />}
                                        size="small"
                                        onClick={() =>
                                            setShowSettings(!showSettings)
                                        }
                                    >
                                        Settings
                                    </Button>
                                    <Button
                                        variant="contained"
                                        startIcon={<ResetIcon />}
                                        size="small"
                                        onClick={resetGame}
                                    >
                                        Reset
                                    </Button>
                                </Stack>
                            </Box>

                            {showSettings && (
                                <Paper sx={{ p: 2, width: "100%", mb: 3 }}>
                                    <Typography gutterBottom>
                                        Board Size: {boardSize}x{boardSize}
                                    </Typography>
                                    <Slider
                                        value={boardSize}
                                        onChange={(_, newValue) =>
                                            setBoardSize(newValue)
                                        }
                                        step={1}
                                        marks
                                        min={3}
                                        max={10}
                                        valueLabelDisplay="auto"
                                    />
                                    <Typography
                                        variant="caption"
                                        color="text.secondary"
                                    >
                                        Adjust the slider to change the grid
                                        size (3x3 to 10x10)
                                    </Typography>
                                </Paper>
                            )}

                            {renderBoard()}
                        </Paper>
                    </Grid>

                    <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                        <Card sx={{ height: "100%" }}>
                            <CardContent>
                                <Typography variant="h5" gutterBottom>
                                    Game Information
                                </Typography>
                                <Divider sx={{ mb: 2 }} />

                                <Box sx={{ mb: 3 }}>
                                    <Typography
                                        variant="subtitle1"
                                        gutterBottom
                                    >
                                        How to Play
                                    </Typography>
                                    <Typography variant="body2">
                                        Players take turns placing their marks
                                        (X or O) on the grid. The first player
                                        to get {Math.min(boardSize, 5)} of their
                                        marks in a horizontal, vertical, or
                                        diagonal row wins the game.
                                    </Typography>
                                </Box>

                                <Box>
                                    <Typography
                                        variant="subtitle1"
                                        gutterBottom
                                    >
                                        Game Statistics
                                    </Typography>
                                    <Typography variant="body2">
                                        Wins: {gameStats.wins}
                                    </Typography>
                                    <Typography variant="body2">
                                        Losses: {gameStats.losses}
                                    </Typography>
                                    <Typography variant="body2">
                                        Draws: {gameStats.draws}
                                    </Typography>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
};

// Helper function to calculate winner
const calculateWinner = (board, boardSize) => {
    const winLength = Math.min(boardSize, 5); // Win condition (in a row)

    // Check rows
    for (let row = 0; row < boardSize; row++) {
        for (let col = 0; col <= boardSize - winLength; col++) {
            const startIdx = row * boardSize + col;
            const range = [...Array(winLength).keys()].map((i) => startIdx + i);

            if (range.every((idx) => board[idx] === "X")) return "X";
            if (range.every((idx) => board[idx] === "O")) return "O";
        }
    }

    // Check columns
    for (let col = 0; col < boardSize; col++) {
        for (let row = 0; row <= boardSize - winLength; row++) {
            const startIdx = row * boardSize + col;
            const range = [...Array(winLength).keys()].map(
                (i) => startIdx + i * boardSize
            );

            if (range.every((idx) => board[idx] === "X")) return "X";
            if (range.every((idx) => board[idx] === "O")) return "O";
        }
    }

    // Check diagonals (top-left to bottom-right)
    for (let row = 0; row <= boardSize - winLength; row++) {
        for (let col = 0; col <= boardSize - winLength; col++) {
            const startIdx = row * boardSize + col;
            const range = [...Array(winLength).keys()].map(
                (i) => startIdx + i * boardSize + i
            );

            if (range.every((idx) => board[idx] === "X")) return "X";
            if (range.every((idx) => board[idx] === "O")) return "O";
        }
    }

    // Check diagonals (top-right to bottom-left)
    for (let row = 0; row <= boardSize - winLength; row++) {
        for (let col = winLength - 1; col < boardSize; col++) {
            const startIdx = row * boardSize + col;
            const range = [...Array(winLength).keys()].map(
                (i) => startIdx + i * boardSize - i
            );

            if (range.every((idx) => board[idx] === "X")) return "X";
            if (range.every((idx) => board[idx] === "O")) return "O";
        }
    }

    // Check for draw
    if (!board.includes(null)) return "DRAW";

    return null;
};

// Helper function to calculate winning cells for highlighting
const calculateWinningCells = (board, boardSize) => {
    const winLength = Math.min(boardSize, 5); // Win condition (in a row)

    // Check rows
    for (let row = 0; row < boardSize; row++) {
        for (let col = 0; col <= boardSize - winLength; col++) {
            const startIdx = row * boardSize + col;
            const range = [...Array(winLength).keys()].map((i) => startIdx + i);

            if (range.every((idx) => board[idx] === "X")) return range;
            if (range.every((idx) => board[idx] === "O")) return range;
        }
    }

    // Check columns
    for (let col = 0; col < boardSize; col++) {
        for (let row = 0; row <= boardSize - winLength; row++) {
            const startIdx = row * boardSize + col;
            const range = [...Array(winLength).keys()].map(
                (i) => startIdx + i * boardSize
            );

            if (range.every((idx) => board[idx] === "X")) return range;
            if (range.every((idx) => board[idx] === "O")) return range;
        }
    }

    // Check diagonals (top-left to bottom-right)
    for (let row = 0; row <= boardSize - winLength; row++) {
        for (let col = 0; col <= boardSize - winLength; col++) {
            const startIdx = row * boardSize + col;
            const range = [...Array(winLength).keys()].map(
                (i) => startIdx + i * boardSize + i
            );

            if (range.every((idx) => board[idx] === "X")) return range;
            if (range.every((idx) => board[idx] === "O")) return range;
        }
    }

    // Check diagonals (top-right to bottom-left)
    for (let row = 0; row <= boardSize - winLength; row++) {
        for (let col = winLength - 1; col < boardSize; col++) {
            const startIdx = row * boardSize + col;
            const range = [...Array(winLength).keys()].map(
                (i) => startIdx + i * boardSize - i
            );

            if (range.every((idx) => board[idx] === "X")) return range;
            if (range.every((idx) => board[idx] === "O")) return range;
        }
    }

    return [];
};

export default TicTacToePage;
