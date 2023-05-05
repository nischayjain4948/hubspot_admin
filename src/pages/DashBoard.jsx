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
import { green } from '@mui/material/colors';
import Fab from '@mui/material/Fab';
import CheckIcon from '@mui/icons-material/Check';
import SaveIcon from '@mui/icons-material/Save';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { useNavigate } from 'react-router-dom'



export default function DashBoard(props) {
    console.log(props, "dsfdf")
    const [open, setOpen] = React.useState(false);
    const [showUpdateButton, setShowUpdateButton] = React.useState(false);
    const [showConnectButton, setShowConnectButton] = React.useState(true);
    const [code, setCode] = React.useState("");
    const [loading, setLoading] = React.useState(false);
    const [success, setSuccess] = React.useState(false);
    const [updateTokenAlert, showUpdateTokenAlert] = React.useState(false);
    const [errorInUpdateToken, showErrorInUpdateToken] = React.useState(false);
    const timer = React.useRef();

    const navigate = useNavigate();

    const handleClose = () => {
        setOpen(false);
    };


    const buttonSx = {
        ...(success && {
            bgcolor: green[500],
            '&:hover': {
                bgcolor: green[700],
            },
        }),
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

    const handleAdminLogout = () => {
        props.logout();
        navigate("/");
    }

    React.useEffect(() => {
        const url = window.location.href;
        const code = url.split("=")[1];
        if (code) {
            localStorage.setItem("Oauth", code);
            setCode(code);
            setShowUpdateButton(true);
            setShowConnectButton(false);

        }
        return () => {
            clearTimeout(timer.current);
        };

    }, [code]);
    const updateToken = async () => {
        setLoading(true);
        const refreshTokenResponse = await fetch("http://localhost:8080/api/Oauth_callback", {
            method: "POST",
            body: JSON.stringify({ code }),
            headers: {
                'Content-Type': 'application/json'
            },

        });
        if (refreshTokenResponse.status === 200) {
            setLoading(false);
            setSuccess(true);
            showErrorInUpdateToken(false);
            showUpdateTokenAlert(true);
            setTimeout(() => {
                navigate("/home")
            }, 1000)

        }
        else {
            setLoading(false);
            showUpdateTokenAlert(false);
            showErrorInUpdateToken(true);
            setTimeout(() => {
                navigate("/dashboard");
                window.location.replace("http://localhost:3000/dashboard");
            }, 1000)




        }


    }









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
                    <Button color="inherit" onClick={handleAdminLogout}>Logout</Button>
                </Toolbar>
            </AppBar>



            <Stack sx={{ width: '100%' }}    >
                {updateTokenAlert ?
                    <Alert severity="success">Token Updated successfully!</Alert> : ""}
                {errorInUpdateToken ?
                    <Alert severity="error">Unable to update the token, Please choose your Hubspot  account again.</Alert> : ""}
            </Stack>





            <div style={{ textAlign: "center", marginTop: "20px" }}>


                {showConnectButton ? <Button onClick={handleOpen}>Connect Your Hubspot Account</Button> : ""}


                <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={open}
                    onClick={handleClose}
                >
                    <CircularProgress color="inherit" />
                </Backdrop>
                <br />












                <Box sx={{ m: 1, position: 'relative' }}>
                    {!showUpdateButton ? "" :
                        <Fab
                            aria-label="save"
                            color="primary"
                            sx={buttonSx}
                            onClick={updateToken}
                        >

                            {success ? <CheckIcon /> : <SaveIcon />}
                        </Fab>
                    }


                    {loading && (
                        <CircularProgress
                            size={68}
                            sx={{
                                color: green[500],
                                position: 'absolute',
                                top: -6,
                                left: -6,
                                zIndex: 1,
                            }}
                        />
                    )}
                </Box>

                <Box sx={{ m: 1, position: 'relative' }}>

                    {!showUpdateButton ? "" :
                        <Button
                            variant="contained"
                            sx={buttonSx}
                            disabled={loading}
                            onClick={updateToken}
                        >
                            Update Token
                        </Button>
                    }
                    {loading && (
                        <CircularProgress
                            size={24}
                            sx={{
                                color: green[500],
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                marginTop: '-12px',
                                marginLeft: '-12px',
                            }}
                        />
                    )}
                </Box>
            </div>




        </Box>

    );
}








