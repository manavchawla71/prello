// import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setAlert } from "../actions/alert";
import { register } from "../actions/auth";
import {
  Button,
  CssBaseline,
  TextField,
  Link,
  Grid,
  Box,
  Typography,
  Container,
} from "@material-ui/core";
import useStyles from "../styles/formstyles";
const Register = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const { name, email, password, password2 } = formData;
  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      dispatch(setAlert("Passwords do not match", "error"));
    } else {
      dispatch(register({ name, email, password }));
    }
  };
  return (
    <Container component="main" maxWidth="xs" className={classes.container}>
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h4">
          TrelloClone
        </Typography>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} onSubmit={(e) => onSubmit(e)}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="name"
                name="name"
                variant="outlined"
                required
                fullWidth
                label="Your Name"
                autoFocus
                value={name}
                onChange={(e) => onChange(e)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                label="Email Address"
                name="email"
                autoComplete="email"
                value={email}
                onChange={(e) => onChange(e)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                value={password}
                onChange={(e) => onChange(e)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password2"
                label="Confirm Password"
                type="password"
                value={password2}
                onChange={(e) => onChange(e)}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <p className="copyright">
          Copyright © TrelloClone {new Date().getFullYear()}.
        </p>
      </Box>
    </Container>
  );
};

export default Register;
