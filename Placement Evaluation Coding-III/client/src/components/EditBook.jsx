import React from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    width: 580,
    display: "block",
    margin: "10px auto",
  },
  form: {
    height: 550,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-around",
  },
  buttons: {
    display: "flex",
    justifyContent: "flex-end",
  },
});

const EditBook = () => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography variant="h4" align="center" gutterBottom>
          Edit Book Details
        </Typography>
        <form autoComplete="off" className={classes.form}>
          <TextField
            fullWidth
            id="outlined-basic"
            label="Category"
            variant="outlined"
          />
          <TextField
            fullWidth
            id="outlined-basic"
            label="Title"
            variant="outlined"
          />
          <TextField
            fullWidth
            id="outlined-basic"
            label="Author"
            variant="outlined"
          />
          <TextField
            fullWidth
            id="outlined-basic"
            label="Price"
            variant="outlined"
          />
          <TextField
            fullWidth
            id="outlined-basic"
            label="Total Quantity"
            variant="outlined"
          />
          <TextField
            fullWidth
            id="outlined-basic"
            label="Description"
            variant="outlined"
          />
        </form>
      </CardContent>
      <CardActions>
        <Button fullWidth variant="contained" color="primary">
          SUBMIT
        </Button>
      </CardActions>
    </Card>
  );
};

export default EditBook;
