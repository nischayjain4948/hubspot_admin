
import React, { useState } from 'react';
import { Grid, Paper, Avatar, TextField, Button, Typography } from '@mui/material'
import LockResetIcon from '@mui/icons-material/LockReset';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import AlertTitle from '@mui/material/AlertTitle';
import { useNavigate, Link } from 'react-router-dom';


const ForgotPassword = () => {


    const paperStyle = { padding: 20, heigth: '700vh', width: 280, margin: "20px auto" }
    const avatarStyle = { "background-color": "orange" }
    const [email, setEmail] = useState("");
    const [adminNotFound, setAdminNotFound] = useState("");
    const [emptyEmailError, setEmptyEmailError] = useState("");
    const [emailSent, setEmailSent] = useState("");

    const handleSubmit = async () => {
        if (!email) {
            setAdminNotFound("");
            setEmailSent("");
            return setEmptyEmailError("Please fill your email to reset your password");
        }
        const loginResponse = await fetch("http://localhost:8080/api/forgot-password", {
            method: "POST",
            body: JSON.stringify({ email }),
            headers: {
                'Content-Type': 'application/json'
            },

        });
        if (loginResponse.status === 404) {
            setEmptyEmailError("");
            setEmailSent("");
            setAdminNotFound("This email is not registered with us")
            return
        }
        setEmptyEmailError("");
        setAdminNotFound("")
        setEmailSent("Please check your email to reset your password");






    }


    return (
        <div>
            <Grid>
                <br />
                <br />
                <Paper elevation={10} style={paperStyle}>

                    <Grid align="center">
                        <Avatar style={avatarStyle}><LockResetIcon /></Avatar>
                        <h2>Enter your email to reset your password</h2>
                    </Grid>

                    <TextField label="email" placeholder='Enter your Mail ' type='email' value={email} onChange={(e) => setEmail(e.target.value)} fullWidth required />

                    <br />
                    <br />
                    <Button type="submit" color="primary" onClick={handleSubmit} fullWidth variant='contained'>Submit</Button>
                    <br />
                    <br />



                    {
                        emptyEmailError ?
                            <Stack sx={{ width: '100%' }} spacing={2}>
                                <Alert severity="error">{emptyEmailError}</Alert>
                            </Stack> : ""
                    }

                    {
                        adminNotFound ?
                            <Stack sx={{ width: '100%' }} spacing={2}>
                                <Alert severity="warning">{adminNotFound}</Alert>
                            </Stack> : ""
                    }


                    {emailSent ? <Alert severity="success">
                        <AlertTitle>Success</AlertTitle>
                        {emailSent}
                    </Alert> : ""}





                    <br />

                    <Typography>
                        <Link to={"/"} >Back To Login</Link>
                    </Typography>

                    <br />
                    <br />









                </Paper>




            </Grid>

        </div>
    )
}

export default ForgotPassword