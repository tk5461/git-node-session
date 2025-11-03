import { useState } from "react";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Axios from 'axios';
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@mui/material";
import { useDispatch } from "react-redux"
import { setToken, setAdmin } from "./userSlice" 
import { jwtDecode } from "jwt-decode";

export default function RegisterPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [email, setMail] = useState("");
    const [phone, setPhone] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch()

    const updateDetails = (accessToken) => {
        dispatch(setToken({ token: accessToken })); 

        const { roles } = jwtDecode(accessToken); 
        if (roles && roles.includes("Admin")) { 
            dispatch(setAdmin(true)); 
        } else {
            dispatch(setAdmin(false)); 
        }
    }

    const submit = async (e) => {
        e.preventDefault();
        setErrorMessage("");
        try {
            const { data } = await Axios.post("http://localhost:1004/user/register", { username, password, name, email, phone });
            updateDetails(data.accessToken);        
            navigate("/user/Login"); 
        } catch (error) {
            console.error("Registration failed:", error);
            if (error.response && error.response.data && error.response.data.message) {
                setErrorMessage(error.response.data.message);
            } else if (error.message) {
                setErrorMessage("שגיאת תקשורת: " + error.message);
            } else {
                setErrorMessage("אירעה שגיאה בלתי צפויה. אנא נסה שוב.");
            }
        }
    };
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh',
                backgroundColor: '#f0f2f5',
            }}
        >
            <Card sx={{ minWidth: 380, maxWidth: 450, boxShadow: 3, borderRadius: 2 }}>
                <CardContent sx={{ p: 4 }}>
                    <h2 style={{ textAlign: 'center', marginBottom: '24px', color: '#333' }}>הרשמה למערכת</h2>
                    <p style={{ textAlign: 'center', marginBottom: '24px', color: '#666' }}>אנא מלא/י את הפרטים להרשמה</p>
                    <Box
                        component="form"
                        onSubmit={submit}
                        sx={{
                            '& .MuiTextField-root, & .MuiFormControl-root': { mb: 2 },
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                        noValidate
                        autoComplete="off"
                    >
                        <TextField
                            label="שם משתמש"
                            variant="standard"
                            fullWidth
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                        <TextField
                            label="שם מלא"
                            variant="standard"
                            fullWidth
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                        <TextField
                            label="דוא''ל"
                            type="email"
                            variant="standard"
                            fullWidth
                            value={email}
                            onChange={(e) => setMail(e.target.value)}
                            required
                        />
                        <TextField
                            label="טלפון"
                            variant="standard"
                            fullWidth
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            required
                        />
                        <TextField
                            label="סיסמה"
                            type="password"
                            variant="standard"
                            fullWidth
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        {errorMessage && (
                            <p style={{ color: 'red', marginBottom: '16px', textAlign: 'center' }}>
                                {errorMessage}
                            </p>
                        )}
                        <Button
                            type="submit"
                            variant="contained"
                            sx={{
                                mt: 2,
                                py: 1.5,
                                fontSize: '1rem',
                                backgroundColor: '#1976d2',
                                '&:hover': {
                                    backgroundColor: '#1565c0',
                                },
                            }}
                            fullWidth
                        >
                            הרשמה
                        </Button>
                    </Box>
                </CardContent>
            </Card>
        </Box>
    );
}

