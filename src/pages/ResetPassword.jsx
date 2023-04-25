import React, { useState } from 'react';
import { Grid, Paper, Avatar, TextField, FormControlLabel, Button, Typography } from '@mui/material'
import KeyTwoToneIcon from '@mui/icons-material/KeyTwoTone';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import { CheckBox } from '@mui/icons-material';
import { useNavigate, Link } from 'react-router-dom';



const ResetPassword = () => {

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");



    const handleResetPassword = async () => {
        if (password !== confirmPassword) {
            console.log("Password and confirm password must be same.")
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
                        <Avatar style={avatarStyle}><KeyTwoToneIcon /></Avatar>
                        <h2>Reset Password</h2>
                    </Grid>

                    <TextField label="password" placeholder='choose password' type='text' fullWidth required value={password} onChange={(e) => setPassword(e.target.value)} />

                    <br />
                    <br />
                    <TextField label="confirm password" placeholder='confirm password' type='password' fullWidth required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />

                    <br />
                    <br />
                    <FormControlLabel control={<CheckBox name="checkedB" color="primary" />} label="Remember me" />

                    <br />
                    <br />
                    <Button type="submit" color="primary" onClick={handleResetPassword} fullWidth variant='contained'>Reset</Button>
                    <br />
                    <br />

                    <Typography>
                        <Link to={"/"} >Login</Link>
                    </Typography>

                    <br />
                    <br />




                    <Box sx={{ width: '100%' }}>
                        {/* <LinearProgress /> */}
                    </Box>


                </Paper>




            </Grid>

        </div>

    )

}

export default ResetPassword;