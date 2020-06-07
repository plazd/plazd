import React from "react";
import { Button } from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
// import FormControlLabel from "@material-ui/core/FormControlLabel";
// import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Namaste from "../elements/namastheLottie";
import { Redirect } from "react-router-dom";
import {
  makeStyles,
  createMuiTheme,
  ThemeProvider
} from "@material-ui/core/styles";
import Grow from '@material-ui/core/Grow';
import Container from "@material-ui/core/Container";
import { connect } from 'react-redux';
import {setAlert} from '../../actions/alert';
import PropTypes from 'prop-types';
import Alert from "../elements/Alert";
import {register} from '../../actions/auth';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://plazd.in/">
        plazd.in
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: ""
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));




const SignUp = ({ setAlert , register, isAuthenticated}) =>  {
  const classes = useStyles();
  const th = createMuiTheme({
    palette: {
      primary: {
        main: "#00897b"
      },
      secondary: {
        main: "#26a69a"
      }
    }
  });

  const [cred, setCred] = React.useState({
    name: "",
    email: "",
    password: "",
    college: "IIT Mandi"
  });
  
  function handleChange(event) {
    const { name, value } = event.target;
    // console.log(event.target);
    setCred(prevCred => {
      return {
        ...prevCred,
        [name]: value
      };
    });

    event.preventDefault();
  }

  const onSubmit = async event => {
    event.preventDefault();
    const { name, email, password, college} = cred;

    try {
      register({ name, email, password, college});
    } catch (error) {
        console.error(error.message);
    }
  }

  //Redirect 
  if(isAuthenticated) {
    return <Redirect to ="/dashboard" />
  }

  return (
    <ThemeProvider theme={th}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <img src="logo.svg" height="80" width="110" />
          <Namaste />
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Grow in={true}>  
          <form
            method="post"
            className={classes.form}
            onSubmit={onSubmit}
            noValidate
          >
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              type="name"
              id="name"
              label="Name"
              name="name"
              autoComplete="name"
              value={cred.name}
              onChange={handleChange}
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              type="email"
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              value={cred.email}
              onChange={handleChange}
            />
            <TextField
              onChange={handleChange}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              value={cred.password}
              autoComplete="current-password"
            />
            {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
          <Alert/>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              disableElevation
              size="large"
            >
              Sign Up
            </Button>
            <Grid container>
              <Grid item xs />
              <Grid item>
                <Link href="/signin" variant="body2">
                  {"Have an account? Sign In"}
                </Link>
              </Grid>
              <Grid item xs />
            </Grid>
            
          </form>
          </Grow>
        </div>
        <Box mt={8}>
          <Copyright />
        </Box>
      </Container>
    </ThemeProvider>
  );
};

SignUp.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { setAlert, register })(SignUp);