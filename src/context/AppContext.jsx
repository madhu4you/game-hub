import { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  const [mode, setMode] = useState(() => {
    const savedMode = localStorage.getItem('themeMode');
    return savedMode || 'light';
  });

  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [gameHistory, setGameHistory] = useState(() => {
    const savedHistory = localStorage.getItem('gameHistory');
    return savedHistory
      ? JSON.parse(savedHistory)
      : {
          'tic-tac-toe': { wins: 0, losses: 0, draws: 0 },
          sudoku: { completed: 0, abandoned: 0 },
          'spelling-bee': { highScore: 0, wordsFound: 0 },
          'memory-match': {
            gamesCompleted: 0,
            totalPairsMatched: 0,
            bestScores: {
              easy: null, // will store: {moves, timeSeconds, date}
              medium: null,
              hard: null,
            },
          },
        };
  });

  const [soundEnabled, setSoundEnabled] = useState(() => {
    const savedSetting = localStorage.getItem('soundEnabled');
    return savedSetting ? JSON.parse(savedSetting) : true;
  });

  useEffect(() => {
    localStorage.setItem('themeMode', mode);
  }, [mode]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem('gameHistory', JSON.stringify(gameHistory));
  }, [gameHistory]);

  useEffect(() => {
    localStorage.setItem('soundEnabled', JSON.stringify(soundEnabled));
  }, [soundEnabled]);

  const toggleThemeMode = () => {
    setMode(prevMode => (prevMode === 'light' ? 'dark' : 'light'));
  };

  const login = userData => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  const updateGameHistory = (game, result) => {
    setGameHistory(prev => ({
      ...prev,
      [game]: {
        ...prev[game],
        ...result,
      },
    }));
  };

  const toggleSound = () => {
    setSoundEnabled(prev => !prev);
  };

  const contextValue = {
    mode,
    toggleThemeMode,
    user,
    login,
    logout,
    gameHistory,
    updateGameHistory,
    soundEnabled,
    toggleSound,
  };

  return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>;
};
