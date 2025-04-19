import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  Avatar,
  Divider,
  Grid,
} from '@mui/material';
import { PlayArrow as PlayArrowIcon } from '@mui/icons-material';
import { Link } from '@tanstack/react-router';

/**
 * A reusable game card component that can be displayed in different variants
 *
 * @param {Object} props
 * @param {string} props.id - Game identifier
 * @param {string} props.title - Game title
 * @param {string} props.description - Game description
 * @param {Function} props.icon - Icon component for the game
 * @param {string} props.path - Route path to the game
 * @param {string} props.gradientFrom - Start color for gradient
 * @param {string} props.gradientTo - End color for gradient
 * @param {string} [props.difficulty] - Game difficulty level
 * @param {string} [props.players] - Number of players
 * @param {string} [props.duration] - Average game duration
 * @param {Object} [props.gameHistory] - User's history with this game
 * @param {string} [props.variant="simple"] - Card variant ("simple" or "detailed")
 */
const GameCard = ({
  id,
  title,
  description,
  icon: GameIcon,
  path,
  gradientFrom,
  gradientTo,
  difficulty,
  players,
  duration,
  gameHistory,
  variant = 'simple',
}) => {
  const isDetailedView = variant === 'detailed';

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        '&:hover': {
          transform: 'translateY(-8px)',
          boxShadow: theme => theme.shadows[8],
        },
      }}
    >
      <Box
        sx={{
          height: isDetailedView ? '150px' : '140px',
          background: `linear-gradient(135deg, ${gradientFrom} 0%, ${gradientTo} 100%)`,
          color: '#fff',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative',
        }}
      >
        <Avatar
          sx={{
            bgcolor: 'rgba(255, 255, 255, 0.9)',
            width: 60,
            height: 60,
            boxShadow: 2,
          }}
        >
          <GameIcon
            sx={{
              fontSize: 40,
              color: gradientFrom,
            }}
          />
        </Avatar>
        <Typography variant="h5" component="h3" align="center" sx={{ mt: 1 }}>
          {title}
        </Typography>
      </Box>

      <CardContent
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Typography
          variant="body1"
          sx={{
            ...(isDetailedView && {
              variant: 'body2',
              color: 'text.secondary',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              minHeight: '4.5em',
            }),
          }}
        >
          {description}
        </Typography>

        {isDetailedView && (
          <>
            <Divider sx={{ my: 2 }} />
            <Grid container spacing={2} sx={{ mb: 2, mt: 'auto' }}>
              <Grid size={4}>
                <Typography variant="caption" color="text.secondary" display="block">
                  Difficulty
                </Typography>
                <Typography variant="body2">{difficulty}</Typography>
              </Grid>
              <Grid size={4}>
                <Typography variant="caption" color="text.secondary" display="block">
                  Players
                </Typography>
                <Typography variant="body2">{players}</Typography>
              </Grid>
              <Grid size={4}>
                <Typography variant="caption" color="text.secondary" display="block">
                  Duration
                </Typography>
                <Typography variant="body2">{duration}</Typography>
              </Grid>
            </Grid>

            {gameHistory && gameHistory[id] && (
              <Box
                sx={{
                  p: 1,
                  bgcolor: 'background.default',
                  borderRadius: 1,
                  mb: 1,
                  minHeight: '40px',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <Typography variant="body2" color="text.secondary">
                  {id === 'tic-tac-toe' &&
                    `Wins: ${gameHistory['tic-tac-toe'].wins ?? 0} | Losses: ${
                      gameHistory['tic-tac-toe'].losses ?? 0
                    }`}
                  {id === 'sudoku' && `Puzzles Completed: ${gameHistory['sudoku'].completed ?? 0}`}
                  {id === 'spelling-bee' &&
                    `High Score: ${gameHistory['spelling-bee'].highScore ?? 0}`}
                  {id === 'memory-match' &&
                    `Games: ${gameHistory['memory-match']?.gamesCompleted ?? 0} | Pairs: ${
                      gameHistory['memory-match']?.totalPairsMatched ?? 0
                    }${
                      gameHistory['memory-match']?.bestScores?.medium
                        ? ` | Best: ${gameHistory['memory-match'].bestScores.medium.moves} moves`
                        : ''
                    }`}
                </Typography>
              </Box>
            )}
            {!gameHistory || (!gameHistory[id] && <Box sx={{ minHeight: '40px' }} />)}
          </>
        )}
      </CardContent>

      <CardActions sx={{ padding: 2 }}>
        <Button
          size="small"
          startIcon={<PlayArrowIcon />}
          component={Link}
          to={path}
          variant="contained"
          fullWidth
          sx={{
            background: `linear-gradient(135deg, ${gradientFrom} 0%, ${gradientTo} 100%)`,
            position: 'relative',
            overflow: 'hidden',
            fontWeight: 600,
            transition: 'all 0.3s',
            boxShadow: theme => theme.shadows[3],
            '&:hover': {
              boxShadow: theme => theme.shadows[5],
              transform: 'translateY(-2px)',
              '&:before': {
                transform: 'translateX(100%)',
              },
            },
          }}
        >
          Play Now
        </Button>
      </CardActions>
    </Card>
  );
};

export default GameCard;
