import React, { useState, useEffect } from "react";
import {
    Box,
    Typography,
    Grid,
    Paper,
    Button,
    Container,
    Card,
    CardContent,
    Divider,
    useTheme,
    TextField,
    ToggleButtonGroup,
    ToggleButton,
    Stack,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
} from "@mui/material";
import {
    Refresh as ResetIcon,
    LightbulbOutlined as HintIcon,
    Check as CheckIcon,
    Timer as TimerIcon,
} from "@mui/icons-material";
import Confetti from "react-confetti";
import { useAppContext } from "../../context/AppContext";

// Sample Sudoku puzzles for different difficulties
const SAMPLE_PUZZLES = {
    easy: [
        [5, 3, 0, 0, 7, 0, 0, 0, 0],
        [6, 0, 0, 1, 9, 5, 0, 0, 0],
        [0, 9, 8, 0, 0, 0, 0, 6, 0],
        [8, 0, 0, 0, 6, 0, 0, 0, 3],
        [4, 0, 0, 8, 0, 3, 0, 0, 1],
        [7, 0, 0, 0, 2, 0, 0, 0, 6],
        [0, 6, 0, 0, 0, 0, 2, 8, 0],
        [0, 0, 0, 4, 1, 9, 0, 0, 5],
        [0, 0, 0, 0, 8, 0, 0, 7, 9],
    ],
    medium: [
        [0, 0, 0, 2, 6, 0, 7, 0, 1],
        [6, 8, 0, 0, 7, 0, 0, 9, 0],
        [1, 9, 0, 0, 0, 4, 5, 0, 0],
        [8, 2, 0, 1, 0, 0, 0, 4, 0],
        [0, 0, 4, 6, 0, 2, 9, 0, 0],
        [0, 5, 0, 0, 0, 3, 0, 2, 8],
        [0, 0, 9, 3, 0, 0, 0, 7, 4],
        [0, 4, 0, 0, 5, 0, 0, 3, 6],
        [7, 0, 3, 0, 1, 8, 0, 0, 0],
    ],
    hard: [
        [0, 0, 0, 6, 0, 0, 4, 0, 0],
        [7, 0, 0, 0, 0, 3, 6, 0, 0],
        [0, 0, 0, 0, 9, 1, 0, 8, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 5, 0, 1, 8, 0, 0, 0, 3],
        [0, 0, 0, 3, 0, 6, 0, 4, 5],
        [0, 4, 0, 2, 0, 0, 0, 6, 0],
        [9, 0, 3, 0, 0, 0, 0, 0, 0],
        [0, 2, 0, 0, 0, 0, 1, 0, 0],
    ],
    expert: [
        [0, 2, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 6, 0, 0, 0, 0, 3],
        [0, 7, 4, 0, 8, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 3, 0, 0, 2],
        [0, 8, 0, 0, 4, 0, 0, 1, 0],
        [6, 0, 0, 5, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 1, 0, 7, 8, 0],
        [5, 0, 0, 0, 0, 9, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 4, 0],
    ],
};

// Generate a random puzzle based on difficulty
const getRandomPuzzle = (difficulty) => {
    return SAMPLE_PUZZLES[difficulty].map((row) => [...row]);
};

// Check if a number can be placed at a specific position
const isValid = (board, row, col, num) => {
    // Check row
    for (let x = 0; x < 9; x++) {
        if (board[row][x] === num) return false;
    }

    // Check column
    for (let y = 0; y < 9; y++) {
        if (board[y][col] === num) return false;
    }

    // Check 3x3 box
    const boxRow = Math.floor(row / 3) * 3;
    const boxCol = Math.floor(col / 3) * 3;
    for (let y = 0; y < 3; y++) {
        for (let x = 0; x < 3; x++) {
            if (board[boxRow + y][boxCol + x] === num) return false;
        }
    }

    return true;
};

// Check if the board is valid (no conflicts)
const isValidBoard = (board) => {
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            const value = board[row][col];
            if (value !== 0) {
                // Temporarily set the current value to 0
                board[row][col] = 0;
                // Check if the value is valid at this position
                const valid = isValid(board, row, col, value);
                // Restore the value
                board[row][col] = value;
                if (!valid) return false;
            }
        }
    }
    return true;
};

// Check if the board is complete (no zeros) and valid
const isBoardComplete = (board) => {
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            if (board[row][col] === 0) return false;
        }
    }
    return isValidBoard(board);
};

// Clone a 2D array (deep copy)
const cloneBoard = (board) => {
    return board.map((row) => [...row]);
};

// Create an array with numbers 1-9
const numberArray = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const SudokuPage = () => {
    const theme = useTheme();
    const { updateGameHistory, soundEnabled, gameHistory } = useAppContext();
    const [difficulty, setDifficulty] = useState("easy");
    const [board, setBoard] = useState([]);
    const [initialBoard, setInitialBoard] = useState([]);
    const [selectedCell, setSelectedCell] = useState(null);
    const [isComplete, setIsComplete] = useState(false);
    const [errors, setErrors] = useState({});
    const [hintUsed, setHintUsed] = useState(0);
    const [gameStats, setGameStats] = useState({ completed: 0, abandoned: 0 });
    const [timer, setTimer] = useState(0);
    const [isTimerRunning, setIsTimerRunning] = useState(true);
    const [showConfetti, setShowConfetti] = useState(false);
    const [showCompletionDialog, setShowCompletionDialog] = useState(false);

    // Initialize game
    useEffect(() => {
        startNewGame();
    }, []);

    // Get game stats from context
    useEffect(() => {
        if (gameHistory && gameHistory["sudoku"]) {
            setGameStats(gameHistory["sudoku"]);
        }
    }, [gameHistory]);

    // Timer
    useEffect(() => {
        let interval;
        if (isTimerRunning && !isComplete) {
            interval = setInterval(() => {
                setTimer((prev) => prev + 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isTimerRunning, isComplete]);

    // Format time as MM:SS
    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, "0")}:${secs
            .toString()
            .padStart(2, "0")}`;
    };

    // Play sound effect
    const playSound = (soundType) => {
        if (!soundEnabled) return;

        // In a real implementation, you would use react-howler or Audio API
        console.log(`Playing sound: ${soundType}`);
    };

    // Start a new game
    const startNewGame = () => {
        const newBoard = getRandomPuzzle(difficulty);
        setBoard(cloneBoard(newBoard));
        setInitialBoard(cloneBoard(newBoard));
        setSelectedCell(null);
        setIsComplete(false);
        setErrors({});
        setHintUsed(0);
        setTimer(0);
        setIsTimerRunning(true);
        setShowConfetti(false);
    };

    // Handle cell selection
    const handleCellSelect = (row, col) => {
        // Don't allow editing of initial cells
        if (initialBoard[row][col] !== 0) return;

        setSelectedCell({ row, col });
    };

    // Handle number input
    const handleNumberInput = (num) => {
        if (!selectedCell) return;

        const { row, col } = selectedCell;
        if (initialBoard[row][col] !== 0) return;

        const newBoard = cloneBoard(board);
        newBoard[row][col] = num;
        setBoard(newBoard);

        // Check if this created an error
        const newErrors = { ...errors };

        if (num !== 0 && !isValid(newBoard, row, col, num)) {
            newErrors[`${row},${col}`] = true;
            playSound("error");
        } else {
            delete newErrors[`${row},${col}`];
            playSound("place");
        }

        setErrors(newErrors);

        // Check if the board is complete
        if (isBoardComplete(newBoard)) {
            handleGameCompletion();
        }
    };

    // Handle game completion
    const handleGameCompletion = () => {
        setIsComplete(true);
        setIsTimerRunning(false);
        setShowConfetti(true);
        setShowCompletionDialog(true);
        playSound("win");

        // Update game history
        const newStats = { ...gameStats, completed: gameStats.completed + 1 };
        setGameStats(newStats);
        updateGameHistory("sudoku", newStats);
    };

    // Get a hint
    const getHint = () => {
        if (!selectedCell) return;

        const { row, col } = selectedCell;
        if (initialBoard[row][col] !== 0) return;

        // Find a valid number for this cell
        for (let num = 1; num <= 9; num++) {
            if (isValid(board, row, col, num)) {
                const newBoard = cloneBoard(board);
                newBoard[row][col] = num;
                setBoard(newBoard);
                setHintUsed((prev) => prev + 1);
                playSound("hint");

                // Check if the board is complete after hint
                if (isBoardComplete(newBoard)) {
                    handleGameCompletion();
                }

                break;
            }
        }
    };

    // Change difficulty
    const handleDifficultyChange = (_, newDifficulty) => {
        if (newDifficulty !== null) {
            setDifficulty(newDifficulty);
            setTimeout(() => {
                startNewGame();
            }, 100);
        }
    };

    // Check the current board status
    const checkBoard = () => {
        const newErrors = {};
        let hasErrors = false;

        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                const value = board[row][col];
                if (value !== 0) {
                    board[row][col] = 0;
                    const valid = isValid(board, row, col, value);
                    board[row][col] = value;

                    if (!valid) {
                        newErrors[`${row},${col}`] = true;
                        hasErrors = true;
                    }
                }
            }
        }

        setErrors(newErrors);

        if (!hasErrors) {
            playSound("check_good");
        } else {
            playSound("check_bad");
        }

        return !hasErrors;
    };

    return (
        <Container maxWidth={false}>
            {showConfetti && (
                <Confetti
                    width={window.innerWidth}
                    height={window.innerHeight}
                    recycle={false}
                    numberOfPieces={500}
                    gravity={0.15}
                    onConfettiComplete={() => setShowConfetti(false)}
                />
            )}

            <Dialog
                open={showCompletionDialog}
                onClose={() => setShowCompletionDialog(false)}
            >
                <DialogTitle>Congratulations!</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        You've completed the {difficulty} Sudoku puzzle in{" "}
                        {formatTime(timer)}!
                        {hintUsed > 0 &&
                            ` You used ${hintUsed} hint${
                                hintUsed > 1 ? "s" : ""
                            }.`}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setShowCompletionDialog(false)}>
                        Close
                    </Button>
                    <Button
                        variant="contained"
                        onClick={() => {
                            setShowCompletionDialog(false);
                            startNewGame();
                        }}
                    >
                        New Game
                    </Button>
                </DialogActions>
            </Dialog>

            <Box sx={{ my: 4 }}>
                <Typography
                    variant="h3"
                    component="h1"
                    gutterBottom
                    align="center"
                >
                    Sudoku
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
                                <Box display="flex" alignItems="center">
                                    <Typography variant="h6" mr={1}>
                                        Difficulty:
                                    </Typography>
                                    <ToggleButtonGroup
                                        value={difficulty}
                                        exclusive
                                        onChange={handleDifficultyChange}
                                        aria-label="difficulty"
                                        size="small"
                                    >
                                        <ToggleButton value="easy">
                                            Easy
                                        </ToggleButton>
                                        <ToggleButton value="medium">
                                            Medium
                                        </ToggleButton>
                                        <ToggleButton value="hard">
                                            Hard
                                        </ToggleButton>
                                        <ToggleButton value="expert">
                                            Expert
                                        </ToggleButton>
                                    </ToggleButtonGroup>
                                </Box>

                                <Box display="flex" alignItems="center">
                                    <TimerIcon sx={{ mr: 1 }} />
                                    <Typography variant="body1">
                                        {formatTime(timer)}
                                    </Typography>
                                </Box>
                            </Box>

                            <Box
                                sx={{
                                    display: "grid",
                                    gridTemplateColumns: "repeat(9, 1fr)",
                                    gap: 0,
                                    border: `2px solid ${theme.palette.divider}`,
                                    width: { xs: "100%", sm: "500px" },
                                    aspectRatio: "1/1",
                                    mx: "auto",
                                    mt: 2,
                                }}
                            >
                                {board.map((row, rowIndex) =>
                                    row.map((cell, colIndex) => (
                                        <Box
                                            key={`${rowIndex}-${colIndex}`}
                                            onClick={() =>
                                                handleCellSelect(
                                                    rowIndex,
                                                    colIndex
                                                )
                                            }
                                            sx={{
                                                width: "100%",
                                                height: "100%",
                                                display: "flex",
                                                justifyContent: "center",
                                                alignItems: "center",
                                                border: `1px solid ${theme.palette.divider}`,
                                                borderRight:
                                                    (colIndex + 1) % 3 === 0
                                                        ? `2px solid ${theme.palette.text.primary}`
                                                        : undefined,
                                                borderBottom:
                                                    (rowIndex + 1) % 3 === 0
                                                        ? `2px solid ${theme.palette.text.primary}`
                                                        : undefined,
                                                bgcolor:
                                                    selectedCell?.row ===
                                                        rowIndex &&
                                                    selectedCell?.col ===
                                                        colIndex
                                                        ? theme.palette.action
                                                              .selected
                                                        : errors[
                                                              `${rowIndex},${colIndex}`
                                                          ]
                                                        ? theme.palette.error
                                                              .light
                                                        : initialBoard[
                                                              rowIndex
                                                          ][colIndex] !== 0
                                                        ? theme.palette.action
                                                              .hover
                                                        : "transparent",
                                                cursor:
                                                    initialBoard[rowIndex][
                                                        colIndex
                                                    ] === 0
                                                        ? "pointer"
                                                        : "default",
                                                "&:hover": {
                                                    bgcolor:
                                                        initialBoard[rowIndex][
                                                            colIndex
                                                        ] === 0
                                                            ? theme.palette
                                                                  .action.hover
                                                            : theme.palette
                                                                  .action
                                                                  .selected,
                                                },
                                            }}
                                        >
                                            <Typography
                                                variant="h6"
                                                sx={{
                                                    fontWeight:
                                                        initialBoard[rowIndex][
                                                            colIndex
                                                        ] !== 0
                                                            ? "bold"
                                                            : "normal",
                                                    color: errors[
                                                        `${rowIndex},${colIndex}`
                                                    ]
                                                        ? theme.palette.error
                                                              .main
                                                        : initialBoard[
                                                              rowIndex
                                                          ][colIndex] !== 0
                                                        ? theme.palette.text
                                                              .primary
                                                        : theme.palette.primary
                                                              .main,
                                                }}
                                            >
                                                {cell !== 0 ? cell : ""}
                                            </Typography>
                                        </Box>
                                    ))
                                )}
                            </Box>

                            <Box
                                sx={{
                                    mt: 3,
                                    width: { xs: "100%", sm: "500px" },
                                    mx: "auto",
                                }}
                            >
                                <Grid container spacing={1}>
                                    {numberArray.map((num) => (
                                        <Grid size={4} key={num}>
                                            <Button
                                                variant="outlined"
                                                fullWidth
                                                onClick={() =>
                                                    handleNumberInput(num)
                                                }
                                                disabled={isComplete}
                                            >
                                                {num}
                                            </Button>
                                        </Grid>
                                    ))}
                                </Grid>

                                <Stack
                                    direction="row"
                                    spacing={2}
                                    sx={{ mt: 2 }}
                                    justifyContent="center"
                                >
                                    <Button
                                        variant="outlined"
                                        onClick={() =>
                                            selectedCell && handleNumberInput(0)
                                        }
                                        disabled={!selectedCell || isComplete}
                                    >
                                        Erase
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        startIcon={<CheckIcon />}
                                        onClick={checkBoard}
                                        disabled={isComplete}
                                    >
                                        Check
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        startIcon={<HintIcon />}
                                        onClick={getHint}
                                        disabled={!selectedCell || isComplete}
                                    >
                                        Hint
                                    </Button>
                                    <Button
                                        variant="contained"
                                        startIcon={<ResetIcon />}
                                        onClick={startNewGame}
                                    >
                                        New Game
                                    </Button>
                                </Stack>
                            </Box>
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
                                    <Typography variant="body2" paragraph>
                                        Fill in the grid so that every row,
                                        column, and 3×3 box contains the digits
                                        1 through 9.
                                    </Typography>
                                    <Typography variant="body2" paragraph>
                                        Click on an empty cell to select it,
                                        then click on a number to place it.
                                    </Typography>
                                    <Typography variant="body2">
                                        Use the "Hint" button if you get stuck,
                                        or "Check" to validate your progress.
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
                                        Completed: {gameStats.completed}
                                    </Typography>
                                    <Typography variant="body2">
                                        Abandoned: {gameStats.abandoned}
                                    </Typography>
                                    <Typography variant="body2">
                                        Current time: {formatTime(timer)}
                                    </Typography>
                                    {hintUsed > 0 && (
                                        <Typography variant="body2">
                                            Hints used: {hintUsed}
                                        </Typography>
                                    )}
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
};

export default SudokuPage;
