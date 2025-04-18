import React, { useState, useEffect, useMemo } from "react";
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
    Stack,
    Chip,
    IconButton,
    TextField,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    LinearProgress,
} from "@mui/material";
import {
    Refresh as ResetIcon,
    Shuffle as ShuffleIcon,
    Delete as DeleteIcon,
    Help as HelpIcon,
} from "@mui/icons-material";
import Confetti from "react-confetti";
import { useAppContext } from "../../context/AppContext";

// Sample word lists
// In a real app, this would be loaded from an API or a much larger dataset
const WORD_LISTS = [
    {
        centerLetter: "a",
        letters: ["a", "b", "c", "n", "d", "o", "r"],
        words: [
            "abroad",
            "acorn",
            "adorn",
            "aboard",
            "abandon",
            "anaconda",
            "banana",
            "cabana",
            "carbona",
            "cardinal",
            "carnation",
            "corona",
            "coroband",
        ],
        pangrams: ["anaconda", "carbona"],
    },
    {
        centerLetter: "e",
        letters: ["e", "c", "l", "i", "p", "s", "t"],
        words: [
            "eclipse",
            "cellist",
            "closest",
            "clepes",
            "clipse",
            "elicit",
            "eclipse",
            "elastic",
            "epistle",
            "explicit",
            "peels",
            "pelisse",
            "pestilence",
            "pieces",
            "please",
            "select",
            "sellitis",
            "septic",
            "sleepiest",
            "sleet",
            "specie",
            "species",
            "splice",
            "spitel",
        ],
        pangrams: ["eclipse"],
    },
    {
        centerLetter: "i",
        letters: ["i", "g", "n", "t", "e", "a", "r"],
        words: [
            "attire",
            "entire",
            "entrain",
            "grain",
            "granite",
            "gratine",
            "grating",
            "ignite",
            "ingrate",
            "ingrain",
            "integer",
            "irate",
            "irrigate",
            "nitrate",
            "raging",
            "rating",
            "retina",
            "retain",
            "retaining",
            "ringent",
            "tearing",
            "terrain",
            "tiering",
            "tigrine",
            "tiring",
            "training",
            "triangle",
            "trinite",
            "trining",
        ],
        pangrams: ["triangle", "integrating"],
    },
];

// Helper to select a random puzzle
const getRandomPuzzle = () => {
    const randomIndex = Math.floor(Math.random() * WORD_LISTS.length);
    return WORD_LISTS[randomIndex];
};

// Helper to check if word is valid
const isValidWord = (word, centerLetter, letters, foundWords) => {
    // Word must be 4+ letters
    if (word.length < 4) return false;

    // Word must contain the center letter
    if (!word.includes(centerLetter)) return false;

    // Word must only contain allowed letters
    for (const char of word) {
        if (!letters.includes(char)) return false;
    }

    // Word must not have been found already
    if (foundWords.includes(word)) return false;

    return true;
};

const SpellingBeePage = () => {
    const theme = useTheme();
    const { updateGameHistory, soundEnabled, gameHistory } = useAppContext();
    const [puzzle, setPuzzle] = useState(null);
    const [input, setInput] = useState("");
    const [foundWords, setFoundWords] = useState([]);
    const [score, setScore] = useState(0);
    const [showConfetti, setShowConfetti] = useState(false);
    const [gameStats, setGameStats] = useState({ highScore: 0, wordsFound: 0 });
    const [letters, setLetters] = useState([]);
    const [centerLetter, setCenterLetter] = useState("");
    const [showCompletionDialog, setShowCompletionDialog] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [showHelp, setShowHelp] = useState(false);

    // Initialize game
    useEffect(() => {
        startNewGame();
    }, []);

    // Get game stats from context
    useEffect(() => {
        if (gameHistory && gameHistory["spelling-bee"]) {
            setGameStats(gameHistory["spelling-bee"]);
        }
    }, [gameHistory]);

    // Score calculations
    const maxScore = useMemo(() => {
        if (!puzzle) return 0;

        return puzzle.words.reduce((total, word) => {
            // Pangrams (words using all letters) get bonus points
            const isPangram = puzzle.pangrams.includes(word);
            const wordScore = isPangram ? word.length + 7 : word.length;
            return total + wordScore;
        }, 0);
    }, [puzzle]);

    // Progress percentage
    const progressPercentage = useMemo(() => {
        if (!score || !maxScore) return 0;
        return (score / maxScore) * 100;
    }, [score, maxScore]);

    // Ranks based on percentage of max score
    const rankLabels = [
        { threshold: 0, label: "Beginner" },
        { threshold: 2, label: "Good Start" },
        { threshold: 5, label: "Moving Up" },
        { threshold: 10, label: "Good" },
        { threshold: 20, label: "Solid" },
        { threshold: 30, label: "Nice" },
        { threshold: 40, label: "Great" },
        { threshold: 50, label: "Amazing" },
        { threshold: 70, label: "Genius" },
        { threshold: 90, label: "Queen Bee" },
    ];

    const currentRank = useMemo(() => {
        const percentage = (score / maxScore) * 100;
        for (let i = rankLabels.length - 1; i >= 0; i--) {
            if (percentage >= rankLabels[i].threshold) {
                return rankLabels[i].label;
            }
        }
        return "Beginner";
    }, [score, maxScore]);

    // Play sound effect
    const playSound = (soundType) => {
        if (!soundEnabled) return;
        console.log(`Playing sound: ${soundType}`);
    };

    // Start a new game
    const startNewGame = () => {
        const newPuzzle = getRandomPuzzle();
        setPuzzle(newPuzzle);
        setLetters(newPuzzle.letters);
        setCenterLetter(newPuzzle.centerLetter);
        setInput("");
        setFoundWords([]);
        setScore(0);
        setShowConfetti(false);
        setErrorMessage("");
    };

    // Shuffle the letters (except center)
    const shuffleLetters = () => {
        if (!puzzle) return;

        const outerLetters = letters.filter(
            (letter) => letter !== centerLetter
        );

        // Fisher-Yates shuffle
        for (let i = outerLetters.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [outerLetters[i], outerLetters[j]] = [
                outerLetters[j],
                outerLetters[i],
            ];
        }

        // Put center letter back in the center
        const newLetters = [...outerLetters];
        newLetters.splice(3, 0, centerLetter); // Insert at middle position
        setLetters(newLetters);
    };

    // Handle letter click
    const handleLetterClick = (letter) => {
        setInput((prev) => prev + letter);
        playSound("letter");
    };

    // Handle delete
    const handleDelete = () => {
        if (input.length > 0) {
            setInput((prev) => prev.slice(0, -1));
            playSound("delete");
        }
    };

    // Handle input submission
    const handleSubmit = () => {
        const word = input.toLowerCase().trim();

        if (!word) return;

        if (word.length < 4) {
            setErrorMessage("Word too short (4+ letters required)");
            playSound("error");
            return;
        }

        if (!word.includes(centerLetter)) {
            setErrorMessage(`Must include center letter: ${centerLetter}`);
            playSound("error");
            return;
        }

        // Check if word contains only allowed letters
        for (const char of word) {
            if (!letters.includes(char)) {
                setErrorMessage(`Invalid letter: ${char}`);
                playSound("error");
                return;
            }
        }

        if (foundWords.includes(word)) {
            setErrorMessage("Word already found");
            playSound("duplicate");
            return;
        }

        // Check if word is in the puzzle's word list
        if (puzzle.words.includes(word)) {
            // Word is valid
            setFoundWords((prev) => [...prev, word]);

            // Calculate score for this word
            const isPangram = puzzle.pangrams.includes(word);
            const wordScore = isPangram ? word.length + 7 : word.length;

            setScore((prev) => prev + wordScore);
            setInput("");
            setErrorMessage("");
            playSound(isPangram ? "pangram" : "correct");

            // Check if all words are found
            if (foundWords.length + 1 === puzzle.words.length) {
                handleGameCompletion();
            }

            // Update high score if needed
            if (score + wordScore > gameStats.highScore) {
                const newStats = {
                    highScore: score + wordScore,
                    wordsFound: gameStats.wordsFound + 1,
                };
                setGameStats(newStats);
                updateGameHistory("spelling-bee", newStats);
            } else {
                const newStats = {
                    ...gameStats,
                    wordsFound: gameStats.wordsFound + 1,
                };
                setGameStats(newStats);
                updateGameHistory("spelling-bee", newStats);
            }
        } else {
            setErrorMessage("Word not in list");
            playSound("error");
        }
    };

    // Handle game completion
    const handleGameCompletion = () => {
        setShowConfetti(true);
        setShowCompletionDialog(true);
        playSound("win");
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
                    colors={[
                        "#FFD700",
                        "#FFA500",
                        "#FF6347",
                        "#4CAF50",
                        "#2196F3",
                    ]}
                    onConfettiComplete={() => setShowConfetti(false)}
                />
            )}

            <Dialog
                open={showCompletionDialog}
                onClose={() => setShowCompletionDialog(false)}
            >
                <DialogTitle>You're a Queen Bee!</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Congratulations! You found all {puzzle?.words.length}{" "}
                        words and earned a perfect score of {score}!
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

            <Dialog open={showHelp} onClose={() => setShowHelp(false)}>
                <DialogTitle>How to Play Spelling Bee</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <Typography paragraph>
                            <strong>Goal:</strong> Create words using the
                            available letters.
                        </Typography>
                        <Typography paragraph>
                            <strong>Rules:</strong>
                            <ul>
                                <li>Words must be 4 or more letters long</li>
                                <li>
                                    Words must include the center letter (shown
                                    in gold)
                                </li>
                                <li>Letters can be used more than once</li>
                                <li>4-letter words = 1 point per letter</li>
                                <li>
                                    Pangrams (words using all 7 letters) get a
                                    7-point bonus
                                </li>
                            </ul>
                        </Typography>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setShowHelp(false)}>Got it!</Button>
                </DialogActions>
            </Dialog>

            <Box sx={{ my: 4 }}>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        mb: 3,
                    }}
                >
                    <Typography variant="h3" component="h1">
                        Spelling Bee
                    </Typography>
                    <IconButton onClick={() => setShowHelp(true)}>
                        <HelpIcon />
                    </IconButton>
                </Box>

                <Grid container spacing={3}>
                    <Grid size={{ xs: 12, md: 8 }}>
                        <Paper elevation={3} sx={{ p: 3 }}>
                            {/* Score & Rank */}
                            <Box sx={{ textAlign: "center", mb: 2 }}>
                                <Typography variant="h4">{score}</Typography>
                                <LinearProgress
                                    variant="determinate"
                                    value={progressPercentage}
                                    sx={{ height: 8, borderRadius: 4, my: 1 }}
                                />
                                <Typography variant="subtitle1">
                                    Rank: {currentRank} • {foundWords.length}/
                                    {puzzle?.words.length} words
                                </Typography>
                            </Box>

                            {/* Input field */}
                            <Box sx={{ textAlign: "center", mb: 3 }}>
                                <TextField
                                    value={input}
                                    onChange={(e) =>
                                        setInput(e.target.value.toLowerCase())
                                    }
                                    onKeyPress={(e) =>
                                        e.key === "Enter" && handleSubmit()
                                    }
                                    variant="outlined"
                                    fullWidth
                                    sx={{ mb: 1 }}
                                    InputProps={{
                                        sx: {
                                            fontSize: "1.5rem",
                                            textAlign: "center",
                                        },
                                    }}
                                    placeholder="Type or click letters"
                                />
                                <Box
                                    sx={{
                                        display: "flex",
                                        justifyContent: "center",
                                        gap: 1,
                                    }}
                                >
                                    <Button
                                        variant="outlined"
                                        onClick={handleDelete}
                                        startIcon={<DeleteIcon />}
                                    >
                                        Delete
                                    </Button>
                                    <Button
                                        variant="contained"
                                        onClick={handleSubmit}
                                    >
                                        Enter
                                    </Button>
                                </Box>
                                {errorMessage && (
                                    <Typography color="error" sx={{ mt: 1 }}>
                                        {errorMessage}
                                    </Typography>
                                )}
                            </Box>

                            {/* Honeycomb */}
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                    mb: 4,
                                }}
                            >
                                <Box
                                    sx={{
                                        position: "relative",
                                        width: 280,
                                        height: 240,
                                    }}
                                >
                                    {/* First row */}
                                    <Button
                                        sx={{
                                            position: "absolute",
                                            top: 0,
                                            left: "25%",
                                            width: 60,
                                            height: 60,
                                            borderRadius: "50%",
                                            backgroundColor:
                                                theme.palette.grey[200],
                                            color: theme.palette.text.primary,
                                        }}
                                        onClick={() =>
                                            handleLetterClick(letters[0])
                                        }
                                    >
                                        {letters[0]?.toUpperCase()}
                                    </Button>
                                    <Button
                                        sx={{
                                            position: "absolute",
                                            top: 0,
                                            right: "25%",
                                            width: 60,
                                            height: 60,
                                            borderRadius: "50%",
                                            backgroundColor:
                                                theme.palette.grey[200],
                                            color: theme.palette.text.primary,
                                        }}
                                        onClick={() =>
                                            handleLetterClick(letters[1])
                                        }
                                    >
                                        {letters[1]?.toUpperCase()}
                                    </Button>

                                    {/* Second row */}
                                    <Button
                                        sx={{
                                            position: "absolute",
                                            top: "33%",
                                            left: 0,
                                            width: 60,
                                            height: 60,
                                            borderRadius: "50%",
                                            backgroundColor:
                                                theme.palette.grey[200],
                                            color: theme.palette.text.primary,
                                        }}
                                        onClick={() =>
                                            handleLetterClick(letters[2])
                                        }
                                    >
                                        {letters[2]?.toUpperCase()}
                                    </Button>
                                    <Button
                                        sx={{
                                            position: "absolute",
                                            top: "33%",
                                            left: "50%",
                                            transform: "translateX(-50%)",
                                            width: 70,
                                            height: 70,
                                            borderRadius: "50%",
                                            backgroundColor:
                                                theme.palette.warning.main,
                                            color: theme.palette.common.white,
                                            fontSize: "1.5rem",
                                        }}
                                        onClick={() =>
                                            handleLetterClick(centerLetter)
                                        }
                                    >
                                        {centerLetter?.toUpperCase()}
                                    </Button>
                                    <Button
                                        sx={{
                                            position: "absolute",
                                            top: "33%",
                                            right: 0,
                                            width: 60,
                                            height: 60,
                                            borderRadius: "50%",
                                            backgroundColor:
                                                theme.palette.grey[200],
                                            color: theme.palette.text.primary,
                                        }}
                                        onClick={() =>
                                            handleLetterClick(letters[4])
                                        }
                                    >
                                        {letters[4]?.toUpperCase()}
                                    </Button>

                                    {/* Third row */}
                                    <Button
                                        sx={{
                                            position: "absolute",
                                            bottom: 0,
                                            left: "25%",
                                            width: 60,
                                            height: 60,
                                            borderRadius: "50%",
                                            backgroundColor:
                                                theme.palette.grey[200],
                                            color: theme.palette.text.primary,
                                        }}
                                        onClick={() =>
                                            handleLetterClick(letters[5])
                                        }
                                    >
                                        {letters[5]?.toUpperCase()}
                                    </Button>
                                    <Button
                                        sx={{
                                            position: "absolute",
                                            bottom: 0,
                                            right: "25%",
                                            width: 60,
                                            height: 60,
                                            borderRadius: "50%",
                                            backgroundColor:
                                                theme.palette.grey[200],
                                            color: theme.palette.text.primary,
                                        }}
                                        onClick={() =>
                                            handleLetterClick(letters[6])
                                        }
                                    >
                                        {letters[6]?.toUpperCase()}
                                    </Button>
                                </Box>
                            </Box>

                            {/* Controls */}
                            <Stack
                                direction="row"
                                spacing={2}
                                justifyContent="center"
                            >
                                <Button
                                    variant="outlined"
                                    startIcon={<ShuffleIcon />}
                                    onClick={shuffleLetters}
                                >
                                    Shuffle
                                </Button>
                                <Button
                                    variant="contained"
                                    startIcon={<ResetIcon />}
                                    onClick={startNewGame}
                                >
                                    New Game
                                </Button>
                            </Stack>
                        </Paper>
                    </Grid>

                    <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                        <Card sx={{ mb: 2 }}>
                            <CardContent>
                                <Typography variant="h5" gutterBottom>
                                    Your Statistics
                                </Typography>
                                <Divider sx={{ mb: 2 }} />
                                <Typography variant="body1">
                                    High Score: {gameStats.highScore}
                                </Typography>
                                <Typography variant="body1">
                                    Words Found: {gameStats.wordsFound}
                                </Typography>
                                <Typography variant="body1">
                                    Current Progress:{" "}
                                    {Math.round(progressPercentage)}%
                                </Typography>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardContent>
                                <Typography variant="h5" gutterBottom>
                                    Words Found ({foundWords.length})
                                </Typography>
                                <Divider sx={{ mb: 2 }} />
                                <Box
                                    sx={{
                                        display: "flex",
                                        flexWrap: "wrap",
                                        gap: 1,
                                    }}
                                >
                                    {foundWords.sort().map((word) => (
                                        <Chip
                                            key={word}
                                            label={word}
                                            color={
                                                puzzle?.pangrams.includes(word)
                                                    ? "warning"
                                                    : "default"
                                            }
                                        />
                                    ))}
                                    {foundWords.length === 0 && (
                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                        >
                                            No words found yet. Start typing!
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

export default SpellingBeePage;
