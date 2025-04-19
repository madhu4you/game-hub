import React from "react";
import {
    Container,
    Typography,
    Box,
    Grid,
    Card,
    CardContent,
    CardHeader,
    Avatar,
    LinearProgress,
    Divider,
    useTheme,
} from "@mui/material";
import {
    EmojiEvents as TrophyIcon,
    Star as StarIcon,
    SportsTennis as GameIcon,
    Extension as PuzzleIcon,
    School as LearningIcon,
    AccessTime as TimeIcon,
    Whatshot as StreakIcon,
    CheckCircleOutline as CompleteIcon,
} from "@mui/icons-material";
import { useAppContext } from "../context/AppContext";

const achievements = [
    {
        id: "first-win",
        title: "First Victory",
        description: "Win your first game of Tic-Tac-Toe",
        icon: TrophyIcon,
        color: "#FFD700",
        category: "tic-tac-toe",
        condition: (gameHistory) => gameHistory["tic-tac-toe"].wins > 0,
    },
    {
        id: "tic-master",
        title: "Tic-Tac-Toe Master",
        description: "Win 10 games of Tic-Tac-Toe",
        icon: StarIcon,
        color: "#FF4500",
        category: "tic-tac-toe",
        condition: (gameHistory) => gameHistory["tic-tac-toe"].wins >= 10,
        progress: (gameHistory) =>
            Math.min(100, (gameHistory["tic-tac-toe"].wins / 10) * 100),
    },
    {
        id: "grid-explorer",
        title: "Grid Explorer",
        description: "Play Tic-Tac-Toe with all grid sizes from 3x3 to 10x10",
        icon: GameIcon,
        color: "#4169E1",
        category: "tic-tac-toe",
        condition: () => false, // We'd track this in real app
        progress: () => 25,
    },
    {
        id: "sudoku-beginner",
        title: "Sudoku Apprentice",
        description: "Complete 5 Sudoku puzzles",
        icon: PuzzleIcon,
        color: "#32CD32",
        category: "sudoku",
        condition: (gameHistory) => gameHistory["sudoku"].completed >= 5,
        progress: (gameHistory) =>
            Math.min(100, (gameHistory["sudoku"].completed / 5) * 100),
    },
    {
        id: "sudoku-expert",
        title: "Sudoku Master",
        description: "Complete an Expert level Sudoku puzzle",
        icon: LearningIcon,
        color: "#9932CC",
        category: "sudoku",
        condition: () => false, // Would track difficulty level completion
    },
    {
        id: "speed-demon",
        title: "Speed Demon",
        description: "Complete a Sudoku puzzle in under 5 minutes",
        icon: TimeIcon,
        color: "#FF8C00",
        category: "sudoku",
        condition: () => false,
    },
    {
        id: "spelling-novice",
        title: "Spelling Novice",
        description: "Find 20 words in Spelling Bee",
        icon: StarIcon,
        color: "#FFD700",
        category: "spelling-bee",
        condition: (gameHistory) =>
            gameHistory["spelling-bee"].wordsFound >= 20,
        progress: (gameHistory) =>
            Math.min(100, (gameHistory["spelling-bee"].wordsFound / 20) * 100),
    },
    {
        id: "queen-bee",
        title: "Queen Bee",
        description: "Reach the Queen Bee rank in Spelling Bee",
        icon: StreakIcon,
        color: "#FF6347",
        category: "spelling-bee",
        condition: () => false,
    },
    {
        id: "pangram-hunter",
        title: "Pangram Hunter",
        description: "Find 5 pangrams in Spelling Bee",
        icon: CompleteIcon,
        color: "#4682B4",
        category: "spelling-bee",
        condition: () => false,
        progress: () => 40,
    },
];

const AchievementsPage = () => {
    const theme = useTheme();
    const { gameHistory } = useAppContext();

    // Group achievements by category
    const achievementsByCategory = {
        "tic-tac-toe": achievements.filter((a) => a.category === "tic-tac-toe"),
        sudoku: achievements.filter((a) => a.category === "sudoku"),
        "spelling-bee": achievements.filter(
            (a) => a.category === "spelling-bee"
        ),
    };

    // Calculate overall progress
    const unlockedAchievements = achievements.filter((a) =>
        a.condition(gameHistory)
    ).length;
    const overallProgress = (unlockedAchievements / achievements.length) * 100;

    return (
        <Container maxWidth={false}>
            <Box sx={{ my: 4 }}>
                <Typography variant="h3" component="h1" gutterBottom>
                    Achievements
                </Typography>

                <Box
                    sx={{
                        mb: 4,
                        p: 3,
                        backgroundColor: "background.paper",
                        borderRadius: 2,
                    }}
                >
                    <Typography variant="h6" gutterBottom>
                        Overall Progress: {unlockedAchievements} of{" "}
                        {achievements.length} unlocked (
                        {Math.round(overallProgress)}%)
                    </Typography>
                    <LinearProgress
                        variant="determinate"
                        value={overallProgress}
                        sx={{ height: 10, borderRadius: 5 }}
                    />
                </Box>

                {Object.entries(achievementsByCategory).map(
                    ([category, categoryAchievements]) => (
                        <Box key={category} sx={{ mb: 5 }}>
                            <Typography
                                variant="h4"
                                sx={{
                                    textTransform: "capitalize",
                                    mb: 2,
                                    pb: 1,
                                    borderBottom: `2px solid ${theme.palette.primary.main}`,
                                }}
                            >
                                {category.replace(/-/g, " ")}
                            </Typography>

                            <Grid container spacing={3}>
                                {categoryAchievements.map((achievement) => {
                                    const isUnlocked =
                                        achievement.condition(gameHistory);

                                    return (
                                        <Grid
                                            size={{ xs: 12, sm: 6, md: 4 }}
                                            key={achievement.id}
                                        >
                                            <Card
                                                elevation={2}
                                                sx={{
                                                    height: "100%",
                                                    opacity: isUnlocked
                                                        ? 1
                                                        : 0.7,
                                                    transition: "0.3s",
                                                    "&:hover": {
                                                        transform:
                                                            "translateY(-5px)",
                                                        boxShadow: 4,
                                                    },
                                                }}
                                            >
                                                <CardHeader
                                                    avatar={
                                                        <Avatar
                                                            sx={{
                                                                bgcolor:
                                                                    achievement.color,
                                                            }}
                                                        >
                                                            <achievement.icon />
                                                        </Avatar>
                                                    }
                                                    title={achievement.title}
                                                    titleTypographyProps={{
                                                        variant: "h6",
                                                    }}
                                                />
                                                <CardContent>
                                                    <Typography
                                                        variant="body2"
                                                        color="text.secondary"
                                                        paragraph
                                                    >
                                                        {
                                                            achievement.description
                                                        }
                                                    </Typography>

                                                    {achievement.progress && (
                                                        <>
                                                            <Divider
                                                                sx={{ my: 1 }}
                                                            />
                                                            <Box sx={{ mt: 2 }}>
                                                                <Typography
                                                                    variant="body2"
                                                                    color="text.secondary"
                                                                    gutterBottom
                                                                >
                                                                    Progress:{" "}
                                                                    {Math.round(
                                                                        achievement.progress(
                                                                            gameHistory
                                                                        )
                                                                    )}
                                                                    %
                                                                </Typography>
                                                                <LinearProgress
                                                                    variant="determinate"
                                                                    value={achievement.progress(
                                                                        gameHistory
                                                                    )}
                                                                    sx={{
                                                                        height: 6,
                                                                        borderRadius: 3,
                                                                    }}
                                                                />
                                                            </Box>
                                                        </>
                                                    )}

                                                    {isUnlocked && (
                                                        <Box
                                                            sx={{
                                                                mt: 2,
                                                                display: "flex",
                                                                alignItems:
                                                                    "center",
                                                                color: "success.main",
                                                            }}
                                                        >
                                                            <CompleteIcon
                                                                sx={{
                                                                    mr: 1,
                                                                    fontSize:
                                                                        "0.9rem",
                                                                }}
                                                            />
                                                            <Typography variant="body2">
                                                                Unlocked
                                                            </Typography>
                                                        </Box>
                                                    )}
                                                </CardContent>
                                            </Card>
                                        </Grid>
                                    );
                                })}
                            </Grid>
                        </Box>
                    )
                )}
            </Box>
        </Container>
    );
};

export default AchievementsPage;
