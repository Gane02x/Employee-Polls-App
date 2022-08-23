import { connect } from "react-redux";
import { formatDate } from "../utils/api";
import { Link } from "react-router-dom";

const Question = (props) => {
  return (
    <div className="question">
      <h3>{props.question.author}</h3>
      <span>{formatDate(props.question.timestamp)}</span>
      <Link to={`/questions/${props.question.id}`}>
        <button className="show-Poll">show</button>
      </Link>
    </div>
  );
};

const mapStateToProps = ({ authedUser, questions }, { id }) => {
  const question = questions[id];

  return {
    authedUser,
    question,
  };
};

export default connect(mapStateToProps)(Question);
