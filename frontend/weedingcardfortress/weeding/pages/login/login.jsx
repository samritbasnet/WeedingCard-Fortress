// import React, { useState } from "react";
// import { Button, Container, TextField, Typography, Grid } from "@mui/material";
// import { AccountCircle, Google } from "@mui/icons-material";
// import firebase from "firebase/compat/app"; // Change this line
// import "firebase/compat/auth"; // Change this line
// import axios from 'axios';
// import toast from "react-hot-toast";
// // import { useHistory } from "react-router-dom";

// const firebaseConfig = {
//   apiKey: "your-api-key",
//   authDomain: "your-auth-domain",
//   databaseURL: "your-database-url",
//   projectId: "your-project-id",
//   storageBucket: "your-storage-bucket",
//   messagingSenderId: "your-messaging-sender-id",
//   appId: "your-app-id",
//   measurementId: "your-measurement-id"
// };

// if (!firebase.apps.length) {
//   firebase.initializeApp(firebaseConfig);
// }

// const Login = () => {
//   // const history = useHistory();

//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [errors, setErrors] = useState({});

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const errors = {};
//     if (!email.trim()) {
//       errors.email = 'Email is required';
//     }
//     if (!password.trim()) {
//       errors.password = 'Password is required';
//     }
//     if (Object.keys(errors).length > 0) {
//       setErrors(errors);
//       return;
//     }

//     try {
//       const response = await axios.post('http://localhost:3001/login', {
//         email,
//         password
//       });
//       console.log(response.data);
//       toast.success("Successfully logged in!");
//       localStorage.setItem("token", response.data?.token);
//       history.push("/home2");
//     } catch (error) {
//       console.error("Login error:", error);
//       toast.error("Failed to log in");
//     }
//   };

//   const handleGoogleSignIn = async () => {
//     const provider = new firebase.auth.GoogleAuthProvider();
//     try {
//       const result = await firebase.auth().signInWithPopup(provider);
//       console.log("User signed in:", result.user);
//       history.push("/home");
//     } catch (error) {
//       console.error("Google sign-in error:", error);
//       toast.error("Failed to sign in with Google");
//     }
//   };

//   return (
//     <div style={{ backgroundColor: "#ECEFF1", minHeight: "100vh" }}>
//       <Container
//         maxWidth="sm"
//         sx={{
//           paddingTop: "64px",
//           display: "flex",
//           flexDirection: "column",
//           alignItems: "center",
//           justifyContent: "center",
//           minHeight: "100vh",
//         }}
//       >
//         <Typography
//           variant="h4"
//           component="h1"
//           gutterBottom
//           sx={{ color: "#37474F", fontWeight: "bold", textAlign: "center" }}
//         >
//           Welcome Back
//         </Typography>
//         <div style={{ width: "100%", maxWidth: "400px", margin: "0 auto" }}>
//           <div
//             style={{
//               background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
//               padding: "24px",
//               borderRadius: "8px",
//               boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
//               marginBottom: "24px",
//             }}
//           >
//             <form onSubmit={handleSubmit}>
//               <Grid container spacing={2} alignItems="center">
//                 <Grid item>
//                   <AccountCircle />
//                 </Grid>
//                 <Grid item xs={11}>
//                   <TextField
//                     id="email"
//                     label="Email Address"
//                     variant="outlined"
//                     fullWidth
//                     margin="normal"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     error={errors.email}
//                     helperText={errors.email}
//                   />
//                 </Grid>
//                 <Grid item xs={11}>
//                   <TextField
//                     id="password"
//                     label="Password"
//                     type="password"
//                     variant="outlined"
//                     fullWidth
//                     margin="normal"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     error={errors.password}
//                     helperText={errors.password}
//                   />
//                 </Grid>
//               </Grid>
//               <Button
//                 type="submit"
//                 variant="contained"
//                 color="primary"
//                 fullWidth
//                 size="large"
//                 sx={{ marginTop: "16px", borderRadius: "999px" }}
//               >
//                 Sign In
//               </Button>
//             </form>
//           </div>
//           <div style={{ display: "flex", justifyContent: "space-between" }}>
//             <Button
//               variant="contained"
//               color="error"
//               startIcon={<Google />}
//               fullWidth
//               size="large"
//               sx={{ borderRadius: "999px" }}
//               onClick={handleGoogleSignIn}
//             >
//               Sign In with Google
//             </Button>
//           </div>
//         </div>
//         <Typography
//           variant="body2"
//           sx={{ marginTop: "24px", color: "#455A64" }}
//         >
//           Dont have an account?{" "}
//           <a href="/register" style={{ color: "#2196F3" }}>
//             Sign Up
//           </a>
//         </Typography>
//       </Container>
//     </div>
//   );
// };

import React, { useState } from "react";
import { Button, Container, TextField, Typography, Grid } from "@mui/material";
import { AccountCircle, Google } from "@mui/icons-material";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import axios from 'axios';
import toast from "react-hot-toast";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCAgcdm8o5vsP2XLOPCejXKDi6b31X9o5w",
  authDomain: "weedingcardgenerator.firebaseapp.com",
  databaseURL: "https://weedingcardgenerator-default-rtdb.firebaseio.com",
  projectId: "weedingcardgenerator",
  storageBucket: "weedingcardgenerator.appspot.com",
  messagingSenderId: "466504306354",
  appId: "1:466504306354:web:ec62296897b5ec242d43ab",
  measurementId: "G-6FHG4XKYZC"
};
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = {};
    if (!email.trim()) {
      errors.email = 'Email is required';
    }
    if (!password.trim()) {
      errors.password = 'Password is required';
    }
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }

    try {
      const response = await axios.post('http://localhost:3001/login', {
        email,
        password
      });
      console.log(response.data);
      toast.success("Successfully logged in!");
      // Save IsLogin to localStorage
      localStorage.setItem("IsLogin", true);
      localStorage.setItem("token", response.data?.token);
      window.location.href = "/home2"; // Redirect after successful login
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Failed to log in");
    }
  };

  const handleGoogleSignIn = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    try {
      const result = await firebase.auth().signInWithPopup(provider);
      console.log("User signed in:", result.user);
      // Get the UID of the signed-in user
      const uid = result.user.uid;
      // Generate token using the UID
      const response = await axios.post('http://localhost:3001/generate-token', { uid });
      // Save the token to local storage
      const token = response.data.token;
      localStorage.setItem('token', token);
      // Save IsGoogleLogin to localStorage
      localStorage.setItem("IsGoogleLogin", true);
      // Perform any action with the token (send it to backend, store it locally, etc.)
      console.log("User token:", token);
      window.location.href = "/home2"; // Redirect after successful Google sign-in
    } catch (error) {
      console.error("Google sign-in error:", error);
      toast.error("Failed to sign in with Google");
    }
  };

  return (
    <div style={{ backgroundColor: "#ECEFF1", minHeight: "100vh" }}>
      <Container
        maxWidth="sm"
        sx={{
          paddingTop: "64px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
        }}
      >
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          sx={{ color: "#37474F", fontWeight: "bold", textAlign: "center" }}
        >
          Welcome Back
        </Typography>
        <div style={{ width: "100%", maxWidth: "400px", margin: "0 auto" }}>
          <div
            style={{
              background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
              padding: "24px",
              borderRadius: "8px",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
              marginBottom: "24px",
            }}
          >
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2} alignItems="center">
                <Grid item>
                  <AccountCircle />
                </Grid>
                <Grid item xs={11}>
                  <TextField
                    id="email"
                    label="Email Address"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    error={errors.email}
                    helperText={errors.email}
                  />
                </Grid>
                <Grid item xs={11}>
                  <TextField
                    id="password"
                    label="Password"
                    type="password"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    error={errors.password}
                    helperText={errors.password}
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                size="large"
                sx={{ marginTop: "16px", borderRadius: "999px" }}
              >
                Sign In
              </Button>
            </form>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Button
              variant="contained"
              color="error"
              startIcon={<Google />}
              fullWidth
              size="large"
              sx={{ borderRadius: "999px" }}
              onClick={handleGoogleSignIn}
            >
              Sign In with Google
            </Button>
          </div>
        </div>
        <Typography
          variant="body2"
          sx={{ marginTop: "24px", color: "#455A64" }}
        >
          Dont have an account?{" "}
          <a href="/register" style={{ color: "#2196F3" }}>
            Sign Up
          </a>
        </Typography>
      </Container>
    </div>
  );
};

export default Login;
