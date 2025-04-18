import {
    Grid3x3 as TicTacToeIcon,
    GridView as SudokuIcon,
    Spellcheck as SpellingBeeIcon,
} from "@mui/icons-material";

export const gamesList = [
    {
        id: "tic-tac-toe",
        title: "Tic-Tac-Toe",
        description:
            "Classic game with adjustable grid size from 3x3 to 10x10. Play against a friend with distinct colors.",
        icon: TicTacToeIcon,
        path: "/games/tic-tac-toe",
        difficulty: "Easy",
        players: "2 Players",
        duration: "1-5 minutes",
        rules: "Place your marks (X or O) on the grid. The first player to get a row of marks wins!",
        gradientFrom: "#2196F3",
        gradientTo: "#21CBF3",
    },
    {
        id: "sudoku",
        title: "Sudoku",
        description:
            "Challenge yourself with multiple difficulty levels: Easy, Medium, Hard, and Expert.",
        icon: SudokuIcon,
        path: "/games/sudoku",
        difficulty: "Easy to Expert",
        players: "1 Player",
        duration: "5-30 minutes",
        rules: "Fill the grid with numbers so each row, column, and 3x3 box contains numbers 1-9 exactly once.",
        gradientFrom: "#9C27B0",
        gradientTo: "#673AB7",
    },
    {
        id: "spelling-bee",
        title: "Spelling Bee",
        description:
            "Test your vocabulary by creating words from a set of letters with one required letter.",
        icon: SpellingBeeIcon,
        path: "/games/spelling-bee",
        difficulty: "Medium",
        players: "1 Player",
        duration: "10-20 minutes",
        rules: "Create words using the provided letters, always including the center letter.",
        gradientFrom: "#FFC107",
        gradientTo: "#FF9800",
    },
];
