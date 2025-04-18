import React from "react";
import {
    AppBar,
    Toolbar,
    Typography,
    IconButton,
    Avatar,
    Box,
    Menu,
    MenuItem,
    Tooltip,
    Stack,
} from "@mui/material";
import {
    Brightness4 as DarkModeIcon,
    Brightness7 as LightModeIcon,
    VolumeUp as VolumeUpIcon,
    VolumeOff as VolumeOffIcon,
    AccountCircle,
} from "@mui/icons-material";
import { Link } from "@tanstack/react-router";
import { useAppContext } from "../../context/AppContext";

const Header = ({ drawerWidth }) => {
    const { mode, toggleThemeMode, user, logout, soundEnabled, toggleSound } =
        useAppContext();
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        logout();
        handleClose();
    };

    return (
        <AppBar
            position="fixed"
            sx={{
                width: { md: `calc(100% - ${drawerWidth}px)` },
                ml: { md: `${drawerWidth}px` },
                zIndex: (theme) => theme.zIndex.drawer + 1,
                bgcolor: "background.paper",
                color: "text.primary",
            }}
            elevation={1}
        >
            <Toolbar>
                <Typography
                    variant="h6"
                    noWrap
                    component={Link}
                    to="/"
                    sx={{
                        flexGrow: 1,
                        fontWeight: "bold",
                        textDecoration: "none",
                        color: "inherit",
                    }}
                >
                    Game Hub
                </Typography>

                <Stack direction="row" spacing={1}>
                    <Tooltip
                        title={soundEnabled ? "Mute sounds" : "Enable sounds"}
                    >
                        <IconButton color="inherit" onClick={toggleSound}>
                            {soundEnabled ? (
                                <VolumeUpIcon />
                            ) : (
                                <VolumeOffIcon />
                            )}
                        </IconButton>
                    </Tooltip>

                    <Tooltip
                        title={
                            mode === "dark"
                                ? "Switch to light mode"
                                : "Switch to dark mode"
                        }
                    >
                        <IconButton color="inherit" onClick={toggleThemeMode}>
                            {mode === "dark" ? (
                                <LightModeIcon />
                            ) : (
                                <DarkModeIcon />
                            )}
                        </IconButton>
                    </Tooltip>

                    {user ? (
                        <Box>
                            <Tooltip title="Account settings">
                                <IconButton
                                    onClick={handleMenu}
                                    color="inherit"
                                >
                                    {user.avatar ? (
                                        <Avatar
                                            src={user.avatar}
                                            alt={user.name || "User"}
                                            sx={{ width: 32, height: 32 }}
                                        />
                                    ) : (
                                        <AccountCircle />
                                    )}
                                </IconButton>
                            </Tooltip>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorEl}
                                keepMounted
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                            >
                                <MenuItem
                                    component={Link}
                                    to="/profile"
                                    onClick={handleClose}
                                >
                                    Profile
                                </MenuItem>
                                <MenuItem onClick={handleLogout}>
                                    Logout
                                </MenuItem>
                            </Menu>
                        </Box>
                    ) : (
                        <Tooltip title="Login or sign up">
                            <IconButton
                                color="inherit"
                                component={Link}
                                to="/login"
                            >
                                <AccountCircle />
                            </IconButton>
                        </Tooltip>
                    )}
                </Stack>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
