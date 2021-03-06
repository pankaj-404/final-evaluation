import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  root: {
    width: 850,
    display: "block",
    margin: "15% auto",
  },
});

const BookDetails = () => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent>
        <Button variant="outlined" color="primary">
          Back
        </Button>
        <Typography variant="h4" align="center" gutterBottom>
          Book Title
        </Typography>
        <Typography variant="h5" align="center" gutterBottom>
          Author
        </Typography>
        <Typography variant="h6" align="center" gutterBottom>
          Descriptiton
        </Typography>
      </CardContent>
    </Card>
  );
};

export default BookDetails;
