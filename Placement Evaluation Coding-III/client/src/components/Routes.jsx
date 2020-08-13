import React from "react";
import { Route, Switch } from "react-router-dom";
import LoginPage from "./LoginPage";
import SignUpPage from "./SignUpPage";
import { connect } from "react-redux";
import Dashboard from "./Dashboard";
import BookDetails from "./BookDetails";
import EditBooks from "./EditBook";
export default function Routes(props) {
  //   const { isSignin, currentUser } = props;
  const isSignin = true;

  return (
    <>
      <Switch>
        <Route exact path="/" render={() => <LoginPage {...props} />} />
        <Route path="/signup" render={(props) => <SignUpPage {...props} />} />
        {isSignin !== "" ? (
          <>
            <Route
              path="/dashboard"
              render={(props) => <Dashboard {...props} />}
            />
            <Route
              path="/book-details"
              render={(props) => <BookDetails {...props} />}
            />

            <Route path="/edit" render={(props) => <EditBooks {...props} />} />
          </>
        ) : (
          ""
        )}
      </Switch>
    </>
  );
}
// const mapStasteToProps = (state) => ({
//   isSignin: state.isSignin,
//   currentUser: state.currentUser,
// });
// export default connect(mapStasteToProps, null)(Routes);
