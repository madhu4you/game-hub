import React from "react";
import {
    Drawer,
    Box,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Divider,
    Toolbar,
    Typography,
    Tooltip,
} from "@mui/material";
import {
    Home as HomeIcon,
    SportsEsports as GamesIcon,
    Grid3x3 as TicTacToeIcon,
    GridView as SudokuIcon,
    Spellcheck as SpellingBeeIcon,
    Memory as MemoryIcon,
    Leaderboard as LeaderboardIcon,
    EmojiEvents as AchievementsIcon,
    Info as AboutIcon,
    PolicyOutlined as PrivacyIcon,
    Gavel as TermsIcon,
    Menu as MenuIcon,
} from "@mui/icons-material";
import { Link, useLocation } from "@tanstack/react-router";

const Sidebar = ({
    open,
    drawerWidth,
    miniDrawerWidth,
    handleDrawerToggle,
    isMobile,
}) => {
    const location = useLocation();

    // Function to check if a path is active
    const isPathActive = (path) => {
        // Only match exact paths
        return location.pathname === path;
    };

    const mainMenuItems = [
        {
            text: "Home",
            icon: <HomeIcon />,
            path: "/",
        },
        {
            text: "Games",
            icon: <GamesIcon />,
            path: "/games",
            divider: true,
        },
        {
            text: "Tic-Tac-Toe",
            icon: <TicTacToeIcon />,
            path: "/games/tic-tac-toe",
        },
        {
            text: "Sudoku",
            icon: <SudokuIcon />,
            path: "/games/sudoku",
        },
        {
            text: "Spelling Bee",
            icon: <SpellingBeeIcon />,
            path: "/games/spelling-bee",
        },
        {
            text: "Memory Match",
            icon: <MemoryIcon />,
            path: "/games/memory-match",
            divider: true,
        },
        {
            text: "Leaderboard",
            icon: <LeaderboardIcon />,
            path: "/leaderboard",
        },
        {
            text: "Achievements",
            icon: <AchievementsIcon />,
            path: "/achievements",
        },
    ];

    const footerMenuItems = [
        {
            text: "About",
            icon: <AboutIcon />,
            path: "/about",
        },
        {
            text: "Privacy Policy",
            icon: <PrivacyIcon />,
            path: "/privacy",
        },
        {
            text: "Terms of Service",
            icon: <TermsIcon />,
            path: "/terms",
        },
    ];

    const drawerContent = (
        <>
            <Toolbar>
                <MenuIcon
                    onClick={handleDrawerToggle}
                    sx={{
                        mr: 2,
                        cursor: "pointer",
                    }}
                />
                {open && (
                    <Typography variant="h6" noWrap component="div">
                        Game Hub
                    </Typography>
                )}
            </Toolbar>
            <Divider />
            <List>
                {mainMenuItems.map((item) => (
                    <React.Fragment key={item.text}>
                        <ListItem disablePadding>
                            <Tooltip 
                                title={!open ? item.text : ""} 
                                placement="right" 
                                arrow
                            >
                                <ListItemButton
                                    component={Link}
                                    to={item.path}
                                    selected={isPathActive(item.path)}
                                    sx={{
                                        minHeight: 48,
                                        justifyContent: open ? "initial" : "center",
                                        px: 2.5,
                                    }}
                                >
                                    <ListItemIcon
                                        sx={{
                                            minWidth: 0,
                                            mr: open ? 3 : "auto",
                                            justifyContent: "center",
                                        }}
                                    >
                                        {item.icon}
                                    </ListItemIcon>
                                    {open && <ListItemText primary={item.text} />}
                                </ListItemButton>
                            </Tooltip>
                        </ListItem>
                        {item.divider && <Divider />}
                    </React.Fragment>
                ))}
            </List>
            <Box sx={{ flexGrow: 1 }} />
            <Divider />
            <List>
                {footerMenuItems.map((item) => (
                    <ListItem key={item.text} disablePadding>
                        <Tooltip 
                            title={!open ? item.text : ""} 
                            placement="right" 
                            arrow
                        >
                            <ListItemButton
                                component={Link}
                                to={item.path}
                                selected={isPathActive(item.path)}
                                sx={{
                                    minHeight: 48,
                                    justifyContent: open ? "initial" : "center",
                                    px: 2.5,
                                }}
                            >
                                <ListItemIcon
                                    sx={{
                                        minWidth: 0,
                                        mr: open ? 3 : "auto",
                                        justifyContent: "center",
                                    }}
                                >
                                    {item.icon}
                                </ListItemIcon>
                                {open && <ListItemText primary={item.text} />}
                            </ListItemButton>
                        </Tooltip>
                    </ListItem>
                ))}
            </List>
        </>
    );

    return (
        <Box
            component="nav"
            sx={{
                width: { md: open ? drawerWidth : miniDrawerWidth },
                flexShrink: { md: 0 },
            }}
        >
            {/* Mobile drawer */}
            {isMobile && (
                <Drawer
                    variant="temporary"
                    open={open}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile
                    }}
                    sx={{
                        display: { xs: "block", md: "none" },
                        "& .MuiDrawer-paper": {
                            boxSizing: "border-box",
                            width: drawerWidth,
                        },
                    }}
                >
                    {drawerContent}
                </Drawer>
            )}

            {/* Desktop drawer */}
            <Drawer
                variant="permanent"
                sx={{
                    display: { xs: "none", md: "block" },
                    "& .MuiDrawer-paper": {
                        boxSizing: "border-box",
                        width: open ? drawerWidth : miniDrawerWidth,
                        overflowX: "hidden",
                        transition: (theme) =>
                            theme.transitions.create("width", {
                                easing: theme.transitions.easing.sharp,
                                duration:
                                    theme.transitions.duration.enteringScreen,
                            }),
                    },
                }}
                open={open}
            >
                {drawerContent}
            </Drawer>
        </Box>
    );
};

export default Sidebar;
