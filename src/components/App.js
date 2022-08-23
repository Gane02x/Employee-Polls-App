import { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import { handleInitialData } from "../actions/shared";
import Dashboard from "./Dashboard";
import Nav from "./Nav";
import Login from "./Login";
import Leaderboard from "./Leaderboard";
import { Route, Routes } from "react-router-dom";
import NewQuestion from "./NewQuestion";
import QuestionPage from "./QuestionPage";

const App = (props) => {
  const { loading } = props;

  useEffect(() => {
    props.dispatch(handleInitialData());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);
  return (
    <Fragment>
      <div className="App">
        <Nav />
        {loading === true ? (
          <Login />
        ) : (
          <Routes>
            <Route exact path="/" element={<Dashboard />} />
            <Route path="/add" element={<NewQuestion />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/questions/:question_id" element={<QuestionPage />} />
          </Routes>
        )}
      </div>
    </Fragment>
  );
};

const mapStateToProps = ({ authedUser }) => ({
  loading: authedUser === null,
});

export default connect(mapStateToProps)(App);
