import React, { useState } from 'react';
import { Grid, Paper, Avatar, TextField, FormControlLabel, Button, Typography } from '@mui/material'
import LockClockOutlinedIcon from '@mui/icons-material/LockClockOutlined';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import { CheckBox } from '@mui/icons-material';
import { useNavigate, Link } from 'react-router-dom';



const Login = () => {



    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emptyFieldError, setEmptyFieldError] = useState("");
    const [adminNotFound, setAdminNotFound] = useState("");
    const [loginSuccess, setLoginSuccess] = useState("");
    const [somethingWentWrong, setSomethingWentWrong] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async () => {
        if (!email || !password) {
            setAdminNotFound("");
            setEmptyFieldError("Please fill all correct fields");

            return
        }
        try {


            const loginResponse = await fetch("http://localhost:8080/api/login", {
                method: "POST",
                body: JSON.stringify({ email, password }),
                headers: {
                    'Content-Type': 'application/json'
                },

            });
            if (loginResponse.status === 404) {
                setEmptyFieldError("");
                setAdminNotFound("Invalid email & password")
                return

            }
            setAdminNotFound("");
            setEmptyFieldError("");
            setLoginSuccess("login success");
            const {jwtToken} = await loginResponse.json();
            localStorage.setItem("ADMIN", `${Math.random().toString(36).substring(2, 7)}-${email}`);
            localStorage.setItem("TOKEN", jwtToken);
            setTimeout(() => {
                navigate("/dashboard");

            }, 3000)



        }
        catch (error) {
            setSomethingWentWrong("Something went wrong!")
        }




    }






    const paperStyle = { padding: 20, heigth: '700vh', width: 280, margin: "20px auto" }
    const avatarStyle = { "background-color": "teal" }

    return (
        <div>
            <Grid>
                <br />
                <br />
                <Paper elevation={10} style={paperStyle}>









                    <Grid align="center">
                        <Avatar style={avatarStyle}><LockClockOutlinedIcon /></Avatar>
                        <h2>Admin Login</h2>
                    </Grid>

                    <TextField label="email" placeholder='Enter your Mail ' type='email' fullWidth required value={email} onChange={(e) => setEmail(e.target.value)} />

                    <br />
                    <br />
                    <TextField label="password" placeholder='Enter your Password' type='password' fullWidth required value={password} onChange={(e) => setPassword(e.target.value)} />

                    <br />
                    <br />
                    <FormControlLabel control={<CheckBox name="checkedB" color="primary" />} label="Remember me" />

                    <br />
                    <br />
                    <Button type="submit" onClick={handleSubmit} color="primary" fullWidth variant='contained'>Login</Button>
                    <br />

                    <Typography>
                        <Link to={"/forgot-password"} >Forgot password ?</Link>
                    </Typography>

                    <br />
                    <br />

                    {
                        emptyFieldError ?
                            <Stack sx={{ width: '100%' }} spacing={2}>
                                <Alert severity="error">{emptyFieldError}</Alert>
                            </Stack> : ""
                    }

                    {adminNotFound ? <Alert severity="warning">{adminNotFound}</Alert> : ""}


                    {somethingWentWrong ? <Alert severity="error">{somethingWentWrong}</Alert> : ""}

                    {loginSuccess ? <Box sx={{ width: '100%' }}>
                        <LinearProgress />
                    </Box> : ""}


                </Paper>




            </Grid>

        </div>

    )

}

export default Login;