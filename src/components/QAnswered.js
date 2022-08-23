import { connect } from "react-redux";
import { formatDate } from "../utils/api";

const qAnswered = (props) => {
  const { users, authedUser, question } = props;
  const { author, optionOne, optionTwo, timestamp } = question;

  const optionOneVotes = optionOne.votes.length;
  const optionTwoVotes = optionTwo.votes.length;
  const optionsVotes = optionOneVotes + optionTwoVotes;
  const answeredQuestion = optionOne.votes.includes(authedUser);

  return (
    <div className="question">
      <h2>Poll by {users[author].name}</h2>
      <span>{formatDate(timestamp)}</span>
      <h2> Would You Rather </h2>
      <span>
        "{optionOne.text}" or "{optionTwo.text}"
      </span>
      <br />
      <span>
        My answer: {answeredQuestion ? optionOne.text : optionTwo.text}
      </span>
      <p>
        Votes: {answeredQuestion ? optionOne.text : optionTwo.text}
        <span>
          {answeredQuestion
            ? Math.round((optionOneVotes / optionsVotes) * 100)
            : Math.round((optionTwoVotes / optionsVotes) * 100)}
          %
        </span>
      </p>
    </div>
  );
};

const mapStateToProps = ({ users, authedUser }, { question }) => {
  return { users, question, authedUser };
};
export default connect(mapStateToProps)(qAnswered);
