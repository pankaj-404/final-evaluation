import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import { Link, Router, Redirect, useHistory } from "react-router-dom";
import { connect } from "react-redux";
// import { login } from "../service/api";
import axios from "axios";

// const useStyles = makeStyles({
//   root: {
//     width: 550,
//     display: "block",
//     margin: "10% auto",
//   },
//   form: {
//     height: 200,
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center",
//     justifyContent: "space-around",
//   },
//   buttons: {
//     display: "flex",
//     justifyContent: "flex-end",
//   },
// });

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      isSignin: false,
      token: "",
    };
  }

  handleChnage = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleClick = () => {
    const { email, password } = this.state;
    if (email.length > 0 && password.length > 0) {
      axios
        .post(`http://localhost:8002/login`, {
          email: email,
          password: password,
        })
        .then((res) => {
          console.log(res.data);
          this.setState({ token: res.data.token });
          res.data.succes && this.props.history.push("/login");
        });
    }
  };

  render() {
    const { email, password } = this.state;
    // const classes = useStyles();
    console.log(this.props);
    return (
      <Card>
        <CardContent>
          <Typography variant="h4" align="center" gutterBottom>
            LOGIN
          </Typography>
          <form autoComplete="off">
            <TextField
              fullWidth
              id="outlined-basic"
              label="Email Address"
              variant="outlined"
              name="email"
              onChange={(e) => this.handleChnage(e)}
            />
            <TextField
              fullWidth
              id="outlined-basic"
              type="password"
              label="Password"
              variant="outlined"
              onChange={(e) => this.handleChnage(e)}
              name="password"
            />
          </form>
        </CardContent>
        <CardActions>
          <Button
            onClick={() => this.handleClick(this.state)}
            fullWidth
            variant="contained"
            color="primary"
          >
            LOGIN
          </Button>
          <Button fullWidth variant="outlined" color="primary">
            <Link to="/signup">Not a member? SIGNUP</Link>
          </Button>
        </CardActions>
      </Card>
    );
  }
}
export default LoginPage;
