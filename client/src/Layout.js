import React from 'react';
import { Box, Drawer, List, ListItem, ListItemIcon, ListItemText, Toolbar, Button, AppBar, Typography } from '@mui/material';
import { Outlet, Link } from 'react-router-dom';
import { Home as HomeIcon, Dashboard, Payment, History } from '@mui/icons-material';

const drawerWidth = 240;

const Layout = () => {
    return (
        <Box sx={{ display: 'flex', height: '100vh' }}>
            {/* Navigation Bar (Fixed at the top) */}
            <AppBar position="fixed" sx={{ top: 0, left: 0, right: 0, zIndex: 1300 }}> {/* Increased zIndex */}
                <Toolbar>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                       Digital Payment App
                    </Typography>
                </Toolbar>
            </AppBar>

            {/* Main content area */}
            <Box sx={{ display: 'flex', flexGrow: 1, marginTop: '64px' }}>  {/* Offset content below the AppBar */}
                {/* Sidebar below the Navigation Bar */}
                <Drawer
                    variant="permanent"
                    sx={{
                        width: drawerWidth,
                        flexShrink: 0,
                        [`& .MuiDrawer-paper`]: { 
                            width: drawerWidth, 
                            boxSizing: 'border-box', 
                            zIndex: 1200, // Sidebar below the navigation bar
                            marginTop: '64px' // Added margin to shift the sidebar slightly below the navigation bar
                        },
                    }}
                >
                    <List>
                        <ListItem button component={Link} to="/">
                            <ListItemIcon>
                                <HomeIcon />
                            </ListItemIcon>
                            <ListItemText primary="Home" />
                        </ListItem>
                        <ListItem button component={Link} to="/dashboard">
                            <ListItemIcon>
                                <Dashboard />
                            </ListItemIcon>
                            <ListItemText primary="Dashboard" />
                        </ListItem>
                        <ListItem button component={Link} to="/send-payment">
                            <ListItemIcon>
                                <Payment />
                            </ListItemIcon>
                            <ListItemText primary="Send Payment" />
                        </ListItem>
                        <ListItem button component={Link} to="/transaction">
                            <ListItemIcon>
                                <History />
                            </ListItemIcon>
                            <ListItemText primary="Transaction History" />
                        </ListItem>
                    </List>
                </Drawer>

                {/* Main Content */}
                <Box component="main" sx={{ flexGrow: 1, p: 3, marginTop: '64px' }}> {/* Main content starts below the AppBar */}
                    {/* Using Outlet for routing */}
                    <Outlet />
                </Box>
            </Box>

            {/* Top-right Buttons (Login/Signup) */}
            <Box
                sx={{
                    position: 'absolute',
                    top: 16,
                    right: 16,
                    display: 'flex',
                    gap: 2,
                    zIndex: 1400, // Ensure it stays on top of the sidebar and navigation bar
                }}
            >
                <Button variant="contained" component={Link} to="/login">
                    Login
                </Button>
                <Button variant="contained" component={Link} to="/signup">
                    Signup
                </Button>
            </Box>
        </Box>
    );
};

export default Layout;
