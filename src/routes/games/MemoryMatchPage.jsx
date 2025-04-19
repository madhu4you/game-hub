import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Button,
  Stack,
  CardContent,
  Divider,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Chip,
  Fade,
  Container,
  Alert,
} from '@mui/material';
import { Memory as MemoryIcon, EmojiEvents } from '@mui/icons-material';
import MemoryCard from '../../components/games/memory/MemoryCard';
import { useAppContext } from '../../context/AppContext';

// Game icons/symbols with descriptions
const cardSymbols = [
  { symbol: '🚀', description: 'Rocket' },
  { symbol: '🌟', description: 'Star' },
  { symbol: '🎮', description: 'Game Controller' },
  { symbol: '🎯', description: 'Dart Target' },
  { symbol: '🎲', description: 'Dice' },
  { symbol: '🎭', description: 'Masks' },
  { symbol: '🎨', description: 'Paint Palette' },
  { symbol: '🎬', description: 'Movie Clapper' },
  { symbol: '🎵', description: 'Music Note' },
  { symbol: '📱', description: 'Mobile Phone' },
  { symbol: '💻', description: 'Laptop' },
  { symbol: '📷', description: 'Camera' },
  { symbol: '🚲', description: 'Bicycle' },
  { symbol: '🚗', description: 'Car' },
  { symbol: '✈️', description: 'Airplane' },
  { symbol: '🌍', description: 'Globe' },
  { symbol: '🍕', description: 'Pizza' },
  { symbol: '🍦', description: 'Ice Cream' },
  { symbol: '🍓', description: 'Strawberry' },
  { symbol: '🥑', description: 'Avocado' },
  { symbol: '🌮', description: 'Taco' },
  { symbol: '🍙', description: 'Rice Ball' },
  { symbol: '🧩', description: 'Puzzle Piece' },
  { symbol: '💎', description: 'Gem' },
];

const MemoryMatchPage = () => {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState([]);
  const [moves, setMoves] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [timer, setTimer] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);
  const [difficulty, setDifficulty] = useState('medium');

  // Get game history from AppContext
  const { gameHistory, updateGameHistory } = useAppContext();

  // Safely access memory match stats with defaults if properties don't exist
  const memoryStats = gameHistory['memory-match'] || {
    gamesCompleted: 0,
    totalPairsMatched: 0,
    bestScores: {},
  };

  // Safely access best score
  const bestScore = memoryStats.bestScores ? memoryStats.bestScores[difficulty] : null;

  // Difficulty settings
  const difficultySettings = {
    easy: { pairs: 6, gridSize: { cols: 3, rows: 4 } },
    medium: { pairs: 10, gridSize: { cols: 4, rows: 5 } },
    hard: { pairs: 15, gridSize: { cols: 5, rows: 6 } },
  };

  // Initialize cards based on difficulty
  const initializeCards = () => {
    const { pairs } = difficultySettings[difficulty];
    const selectedSymbols = [...cardSymbols].sort(() => 0.5 - Math.random()).slice(0, pairs);

    let newCards = [];
    selectedSymbols.forEach(({ symbol, description }) => {
      // Add two of each symbol
      newCards.push({ id: `${symbol}-1`, symbol, description, isFlipped: false, isMatched: false });
      newCards.push({ id: `${symbol}-2`, symbol, description, isFlipped: false, isMatched: false });
    });

    // Shuffle cards
    newCards = newCards.sort(() => Math.random() - 0.5);

    setCards(newCards);
    setFlippedCards([]);
    setMatchedPairs([]);
    setMoves(0);
    setTimer(0);
    setGameOver(false);
    setGameStarted(false);
    setTimerRunning(false);
  };

  // Handle card click
  const handleCardClick = cardId => {
    // Start game on first card click
    if (!gameStarted) {
      setGameStarted(true);
      setTimerRunning(true);
    }

    // Don't allow clicks if 2 cards are already flipped or if this card is matched
    if (flippedCards.length >= 2) return;

    // Find the clicked card
    const clickedCard = cards.find(card => card.id === cardId);

    // Don't allow clicking already flipped or matched cards
    if (clickedCard.isFlipped || clickedCard.isMatched) return;

    // Flip the card
    const updatedCards = cards.map(card =>
      card.id === cardId ? { ...card, isFlipped: true } : card
    );

    setCards(updatedCards);
    setFlippedCards([...flippedCards, clickedCard]);

    // If this is the second card flipped
    if (flippedCards.length === 1) {
      setMoves(moves + 1);

      // Check for a match
      if (flippedCards[0].symbol === clickedCard.symbol) {
        // It's a match!
        setTimeout(() => {
          const updatedCards = cards.map(card =>
            card.id === flippedCards[0].id || card.id === cardId
              ? { ...card, isFlipped: true, isMatched: true }
              : card
          );
          setCards(updatedCards);
          setMatchedPairs([...matchedPairs, clickedCard.symbol]);
          setFlippedCards([]);

          // Check if game is over
          if (matchedPairs.length + 1 === difficultySettings[difficulty].pairs) {
            setGameOver(true);
            setTimerRunning(false);

            // Update game history in AppContext
            const currentStats = gameHistory['memory-match'] || {
              gamesCompleted: 0,
              totalPairsMatched: 0,
              bestScores: {},
            };

            const newTotalPairs =
              currentStats.totalPairsMatched + difficultySettings[difficulty].pairs;
            const newScore = { moves, timeSeconds: timer, date: new Date().toISOString() };

            // Check if this is a new best score
            let newBestScores = { ...(currentStats.bestScores || {}) };
            if (
              !newBestScores[difficulty] ||
              moves < newBestScores[difficulty].moves ||
              (moves === newBestScores[difficulty].moves &&
                timer < newBestScores[difficulty].timeSeconds)
            ) {
              newBestScores[difficulty] = newScore;
            }

            updateGameHistory('memory-match', {
              gamesCompleted: currentStats.gamesCompleted + 1,
              totalPairsMatched: newTotalPairs,
              bestScores: newBestScores,
            });
          }
        }, 500);
      } else {
        // Not a match, flip both cards back
        setTimeout(() => {
          const updatedCards = cards.map(card =>
            card.id === flippedCards[0].id || card.id === cardId
              ? { ...card, isFlipped: false }
              : card
          );
          setCards(updatedCards);
          setFlippedCards([]);
        }, 1000);
      }
    }
  };

  // Handle difficulty change
  const handleDifficultyChange = event => {
    setDifficulty(event.target.value);
  };

  // Start a new game
  const startNewGame = () => {
    initializeCards();
  };

  // Timer effect
  useEffect(() => {
    let interval;
    if (timerRunning) {
      interval = setInterval(() => {
        setTimer(prevTimer => prevTimer + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timerRunning]);

  // Initialize game on mount and when difficulty changes
  useEffect(() => {
    initializeCards();
  }, [difficulty]);

  // Format time for display
  const formatTime = seconds => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Get current grid settings
  const { gridSize } = difficultySettings[difficulty];

  return (
    <Container maxWidth="lg" sx={{ pb: 4 }}>
      <Paper sx={{ p: 3, mb: 3 }}>
        <Stack direction="row" alignItems="center" spacing={2} mb={2}>
          <MemoryIcon fontSize="large" color="primary" />
          <Typography variant="h4" component="h1">
            Memory Match
          </Typography>
        </Stack>
        <Divider sx={{ mb: 3 }} />

        <Stack
          direction={{ xs: 'column', md: 'row' }}
          justifyContent="space-between"
          alignItems={{ xs: 'flex-start', md: 'center' }}
          spacing={2}
          mb={3}
        >
          <FormControl sx={{ minWidth: 120 }}>
            <InputLabel>Difficulty</InputLabel>
            <Select
              value={difficulty}
              label="Difficulty"
              onChange={handleDifficultyChange}
              disabled={gameStarted && !gameOver}
            >
              <MenuItem value="easy">Easy</MenuItem>
              <MenuItem value="medium">Medium</MenuItem>
              <MenuItem value="hard">Hard</MenuItem>
            </Select>
          </FormControl>

          <Stack direction="row" spacing={2} alignItems="center">
            <Chip label={`Time: ${formatTime(timer)}`} color="primary" variant="outlined" />
            <Chip label={`Moves: ${moves}`} color="secondary" variant="outlined" />
            <Chip
              label={`Pairs: ${matchedPairs.length}/${difficultySettings[difficulty].pairs}`}
              color="success"
              variant="outlined"
            />
          </Stack>

          <Button
            variant="contained"
            onClick={startNewGame}
            color={gameOver ? 'success' : 'primary'}
          >
            {gameOver ? 'Play Again' : gameStarted ? 'Restart Game' : 'New Game'}
          </Button>
        </Stack>

        {/* Display best score if available */}
        {bestScore && !gameStarted && (
          <Alert icon={<EmojiEvents fontSize="inherit" />} severity="success" sx={{ mb: 2 }}>
            Your best score ({difficulty}): {bestScore.moves} moves in{' '}
            {formatTime(bestScore.timeSeconds)}
          </Alert>
        )}

        {/* Game stats */}
        <Stack direction="row" spacing={2} justifyContent="center" mb={2}>
          <Chip
            label={`Games Completed: ${memoryStats.gamesCompleted}`}
            color="info"
            variant="outlined"
          />
          <Chip
            label={`Total Pairs Matched: ${memoryStats.totalPairsMatched}`}
            color="info"
            variant="outlined"
          />
        </Stack>

        {gameOver && (
          <Fade in={gameOver}>
            <Paper
              elevation={3}
              sx={{
                p: 2,
                mb: 3,
                bgcolor: 'success.light',
                color: 'success.contrastText',
              }}
            >
              <Typography variant="h6" align="center">
                🎉 Congratulations! Game Completed! 🎉
              </Typography>
              <Typography align="center">
                You matched all {difficultySettings[difficulty].pairs} pairs in {moves} moves and{' '}
                {formatTime(timer)} time!
              </Typography>
              {bestScore && bestScore.moves === moves && bestScore.timeSeconds === timer && (
                <Typography align="center" mt={1} fontWeight="bold">
                  🏆 New Personal Best! 🏆
                </Typography>
              )}
            </Paper>
          </Fade>
        )}

        <Grid
          container
          spacing={2}
          justifyContent="center"
          sx={{ maxWidth: { xs: '100%', md: '900px' }, mx: 'auto' }}
        >
          {cards.map(card => (
            <Grid size={12 / gridSize.cols} key={card.id}>
              <MemoryCard
                id={card.id}
                symbol={card.symbol}
                description={card.description}
                flippedState={card.isFlipped}
                matchedState={card.isMatched}
                onCardClick={handleCardClick}
              />
            </Grid>
          ))}
        </Grid>
      </Paper>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h5" mb={2}>
          How to Play
        </Typography>
        <Typography paragraph>
          Memory Match is a classic card matching game that tests your memory and concentration.
        </Typography>
        <Typography component="ol" sx={{ pl: 2 }}>
          <li>Click on any card to flip it and reveal the symbol.</li>
          <li>Click on another card to find its matching symbol.</li>
          <li>If the symbols match, the cards stay face up.</li>
          <li>If they don't match, both cards flip back down.</li>
          <li>Remember card positions to make fewer moves!</li>
          <li>The game is complete when all pairs are matched.</li>
        </Typography>
        <Typography variant="h6" mt={2}>
          Difficulty Levels:
        </Typography>
        <Typography paragraph>
          <strong>Easy:</strong> 6 pairs (12 cards) - Great for beginners or quick games
          <br />
          <strong>Medium:</strong> 10 pairs (20 cards) - Standard challenge
          <br />
          <strong>Hard:</strong> 15 pairs (30 cards) - Test your memory to the max!
        </Typography>
      </Paper>
    </Container>
  );
};

export default MemoryMatchPage;
