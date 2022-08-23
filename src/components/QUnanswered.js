import { connect } from "react-redux";
import { handleAnswerQuestion } from "../actions/questions";
import { updateUsersAnswers } from "../actions/users";
import { formatDate } from "../utils/api";

const qUnanswered = (props) => {
  const { question, users, authedUser } = props;

  const { id, author, optionOne, optionTwo } = question;

  const vote = (e) => {
    const answer = e.target.value;
    const qid = id;

    props.dispatch(handleAnswerQuestion({ authedUser, qid, answer }));
    props.dispatch(updateUsersAnswers({ authedUser, qid, answer }));
  };

  return (
    <div className="poll">
      <h2>Poll by {users[author].name}</h2>
      <span>{formatDate(props.question.timestamp)}</span>
      <h2> Would You Rather </h2>
      <div className="btns" onChange={vote}>
        <div className="vote-btn">
          <input type="radio" name="options" value="optionOne" />
          {optionOne.text}
        </div>
        <div className="vote-btn">
          <input type="radio" name="options" value="optionTwo" />
          {optionTwo.text}
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = ({ users, authedUser }, { question }) => {
  return { users, question, authedUser };
};
export default connect(mapStateToProps)(qUnanswered);
