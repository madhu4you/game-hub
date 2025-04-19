import React, { useState, useEffect } from "react";
import { Box, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { getDrawerState, setDrawerState } from "../../utils/localStorage";

const DRAWER_WIDTH = 240;
const MINI_DRAWER_WIDTH = 65;

const Layout = ({ children }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));

    // Get initial drawer state from localStorage utility or use screen size as fallback
    const [open, setOpen] = useState(() => {
        return getDrawerState(!isMobile);
    });

    // Update localStorage whenever drawer state changes
    useEffect(() => {
        setDrawerState(open);
    }, [open]);

    const handleDrawerToggle = () => {
        setOpen(!open);
    };

    return (
        <Box sx={{ display: "flex", height: "100vh", overflow: "hidden" }}>
            <Header drawerWidth={open ? DRAWER_WIDTH : MINI_DRAWER_WIDTH} />
            <Sidebar
                open={open}
                drawerWidth={DRAWER_WIDTH}
                miniDrawerWidth={MINI_DRAWER_WIDTH}
                handleDrawerToggle={handleDrawerToggle}
                isMobile={isMobile}
            />
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    width: {
                        md: `calc(100% - ${
                            open ? DRAWER_WIDTH : MINI_DRAWER_WIDTH
                        }px)`,
                    },
                    height: "100vh",
                    overflow: "auto",
                    pt: 8, // Space for header
                    backgroundColor: theme.palette.background.default,
                }}
            >
                <Box sx={{ p: 3, minHeight: "calc(100vh - 64px)" }}>
                    {children}
                </Box>
            </Box>
        </Box>
    );
};

export default Layout;
