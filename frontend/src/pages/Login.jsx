import { useEffect } from "react";
import {
  Button,
  Box,
  Container,
  CssBaseline,
  Typography,
  TextField,
  Grid,
  Link,
} from "@material-ui/core";
import useStyles from "../styles/formstyles";
import { useState } from "react";
const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;
  useEffect(() => {
    document.title = "TrelloClone | Sign In";
  }, []);

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const classes = useStyles();
  const onSubmit = async (e) => {};
  return (
    <div>
      <Container component="main" maxWidth="xs" className={classes.container}>
        <CssBaseline />
        <div className={classes.paper}>
          <Typography component="h1" variant="h4">
            TrelloClone
          </Typography>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} onSubmit={(e) => onSubmit(e)}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => onChange(e)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => onChange(e)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Link href="/register" variant="body2">
                  Don't have an account? Sign Up
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={8}>
          <p className="copyright">
            Copyright © TrelloClone {new Date().getFullYear()}.
          </p>
        </Box>
      </Container>
    </div>
  );
};

export default Login;
