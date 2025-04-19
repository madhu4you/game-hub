import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "@tanstack/react-router";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { router } from "./routes";
import { AppProvider } from "./context/AppContext";
import { theme } from "./themes/theme";
import "./App.css";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <AppProvider>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <RouterProvider router={router} />
            </ThemeProvider>
        </AppProvider>
    </React.StrictMode>
);
