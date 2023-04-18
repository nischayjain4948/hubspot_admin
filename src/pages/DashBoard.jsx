import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';


export default function DashBoard() {
    const [open, setOpen] = React.useState(false);
    const [url, setURL] = React.useState("");
    const handleClose = () => {
        setOpen(false);
    };




    const handleOpen = async () => {
        setOpen(true);
        const uri = await fetch("http://localhost:8080/api/auth", {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            },

        });
        const { redirected_uri } = await uri.json();
        window.location.replace(redirected_uri);
    };








    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Nischay's DashBoard
                    </Typography>
                    <Button color="inherit">Logout</Button>
                </Toolbar>
            </AppBar>
            <div style={{ textAlign: "center", marginTop: "20px" }}>
                <Button onClick={handleOpen}>Connect Your Hubspot Account</Button>
                <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={open}
                    onClick={handleClose}
                >
                    <CircularProgress color="inherit" />
                </Backdrop>
                <br />

                <Button onClick={handleOpen}>Update Token</Button>
                <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={open}
                    onClick={handleClose}
                >
                    <CircularProgress color="inherit" />
                </Backdrop>


            </div>
        </Box>
    );
}