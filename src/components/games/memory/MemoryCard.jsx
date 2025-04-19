import React from 'react';
import { Box, Typography, Card } from '@mui/material';
import { styled } from '@mui/material/styles';

// Styled components
const StyledCard = styled(Card)(({ theme, isFlipped, isMatched }) => ({
  height: 120,
  width: '100%',
  cursor: isMatched ? 'default' : 'pointer',
  backgroundColor: isMatched
    ? theme.palette.success.main
    : isFlipped
      ? '#ffffff'
      : theme.palette.grey[100],
  transition: 'transform 0.6s ease',
  transformStyle: 'preserve-3d',
  transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
  position: 'relative',
  perspective: 1000,
  border: isMatched
    ? `3px solid ${theme.palette.success.dark}`
    : `2px solid ${theme.palette.divider}`,
  '&:hover': {
    transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(10deg)',
    boxShadow: isMatched ? theme.shadows[2] : theme.shadows[8],
    borderColor: theme.palette.primary.main,
  },
  '&:focus': {
    outline: `3px solid ${theme.palette.primary.main}`,
  },
}));

// Base card face component with shared styles
const BaseCardFace = styled(Box, {
  shouldForwardProp: prop => prop !== 'isFlipped' && prop !== 'isMatched',
})(({ theme }) => ({
  position: 'absolute',
  width: '100%',
  height: '100%',
  alignItems: 'center',
  justifyContent: 'center',
  backfaceVisibility: 'hidden',
  transition: 'all 0.6s ease',
  borderRadius: theme.shape.borderRadius,
}));

// Card front extends base styles - use display instead of opacity
const CardFront = styled(BaseCardFace)(({ theme, isFlipped }) => ({
  display: isFlipped ? 'none' : 'flex',
  backgroundColor: theme.palette.grey[100],
  border: `2px solid ${theme.palette.grey[300]}`,
}));

// Card back extends base styles - use display instead of opacity
const CardBack = styled(BaseCardFace, {
  shouldForwardProp: prop => prop !== 'isFlipped' && prop !== 'isMatched',
})(({ theme, isFlipped, isMatched }) => ({
  display: isFlipped ? 'flex' : 'none',
  flexDirection: 'column',
  backgroundColor: isMatched ? theme.palette.success.light : '#ffffff',
  color: isMatched ? theme.palette.success.contrastText : '#000000',
  fontWeight: 'bold',
  fontSize: '3rem',
  border: isMatched
    ? `3px solid ${theme.palette.success.dark}`
    : `2px solid ${theme.palette.primary.main}`,
  boxShadow: isMatched ? '0 0 10px rgba(76, 175, 80, 0.6)' : '0 2px 8px rgba(0,0,0,0.15)',
  zIndex: 1,
  // Add counter-rotation to fix the icon and text orientation
  '& > *': {
    transform: 'rotateY(-180deg)',
  },
}));

/**
 * MemoryCard component that encapsulates the card's appearance and behavior
 */
const MemoryCard = ({ id, symbol, description, flippedState, matchedState, onCardClick }) => {
  // Handle click and propagate to parent component
  const handleClick = () => {
    // Only trigger onClick if the card is not already flipped or matched
    if (!flippedState && !matchedState) {
      onCardClick(id);
    }
  };

  return (
    <StyledCard
      isFlipped={flippedState}
      isMatched={matchedState}
      onClick={handleClick}
      tabIndex={0}
      aria-label={
        flippedState ? `Card showing ${symbol}${matchedState ? ', matched' : ''}` : 'Card face down'
      }
    >
      <CardFront isFlipped={flippedState}>
        <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 'medium' }}>
          Memory Match
        </Typography>
      </CardFront>
      <CardBack isFlipped={flippedState} isMatched={matchedState}>
        <Typography
          variant="h4"
          sx={{
            fontSize: '2.5rem',
            color: matchedState ? 'inherit' : '#000',
          }}
          aria-hidden="false"
        >
          {symbol}
        </Typography>
        <Typography
          variant="caption"
          sx={{
            mt: 1,
            fontWeight: 'bold',
            color: matchedState ? 'inherit' : 'text.primary',
          }}
        >
          {description}
        </Typography>
      </CardBack>
    </StyledCard>
  );
};

export default MemoryCard;
