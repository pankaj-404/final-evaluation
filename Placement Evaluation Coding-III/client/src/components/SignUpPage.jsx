import React from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { Link, Router, Redirect, useHistory } from "react-router-dom";

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

class SignUpPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      username: "",
      isSignin: false,
    };
  }

  handleChnage = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleClick = () => {
    const { email, password, username } = this.state;
    if (email.length > 0 && password.length > 0 && username.length > 0) {
    }
  };

  render() {
    const { email, password } = this.state;

    return (
      <Card>
        <CardContent>
          <Typography variant="h4" align="center" gutterBottom>
            Become a member today!
          </Typography>
          <form autoComplete="off">
            <TextField
              onChange={(e) => this.handleChnage(e)}
              name="username"
              fullWidth
              id="outlined-basic"
              label="Username"
              variant="outlined"
            />
            <TextField
              onChange={(e) => this.handleChnage(e)}
              name="email"
              fullWidth
              id="outlined-basic"
              label="Email Address"
              variant="outlined"
            />
            <TextField
              onChange={(e) => this.handleChnage(e)}
              name="password"
              fullWidth
              id="outlined-basic"
              type="password"
              label="Password"
              variant="outlined"
            />
          </form>
        </CardContent>
        <CardActions>
          <Button fullWidth variant="contained" color="primary">
            SIGNUP
          </Button>
        </CardActions>
      </Card>
    );
  }
}
export default SignUpPage;
