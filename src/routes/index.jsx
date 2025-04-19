import {
    createRootRoute,
    createRoute,
    createRouter,
    Outlet,
} from "@tanstack/react-router";
import Layout from "../components/common/Layout";
import HomePage from "./HomePage";
import GamesPage from "./GamesPage";
import TicTacToePage from "./games/TicTacToePage";
import SudokuPage from "./games/SudokuPage";
import SpellingBeePage from "./games/SpellingBeePage";
import MemoryMatchPage from "./games/MemoryMatchPage";
import LoginPage from "./LoginPage";
import ProfilePage from "./ProfilePage";
import LeaderboardPage from "./LeaderboardPage";
import AchievementsPage from "./AchievementsPage";
import AboutPage from "./AboutPage";
import PrivacyPage from "./PrivacyPage";
import TermsPage from "./TermsPage";
import NotFoundPage from "./NotFoundPage";

// Root route with layout
const rootRoute = createRootRoute({
    component: () => (
        <Layout>
            <Outlet />
        </Layout>
    ),
});

// Create routes
const indexRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/",
    component: HomePage,
});

const gamesRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/games",
    component: GamesPage,
});

const ticTacToeRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/games/tic-tac-toe",
    component: TicTacToePage,
});

const sudokuRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/games/sudoku",
    component: SudokuPage,
});

const spellingBeeRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/games/spelling-bee",
    component: SpellingBeePage,
});

const memoryMatchRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/games/memory-match",
    component: MemoryMatchPage,
});

const loginRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/login",
    component: LoginPage,
});

const profileRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/profile",
    component: ProfilePage,
});

const leaderboardRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/leaderboard",
    component: LeaderboardPage,
});

const achievementsRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/achievements",
    component: AchievementsPage,
});

const aboutRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/about",
    component: AboutPage,
});

const privacyRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/privacy",
    component: PrivacyPage,
});

const termsRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/terms",
    component: TermsPage,
});

const notFoundRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "*",
    component: NotFoundPage,
});

// Create and export the router
export const router = createRouter({
    routeTree: rootRoute.addChildren([
        indexRoute,
        gamesRoute,
        ticTacToeRoute,
        sudokuRoute,
        spellingBeeRoute,
        memoryMatchRoute,
        loginRoute,
        profileRoute,
        leaderboardRoute,
        achievementsRoute,
        aboutRoute,
        privacyRoute,
        termsRoute,
        notFoundRoute,
    ]),
});
