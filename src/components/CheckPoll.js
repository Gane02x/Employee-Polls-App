import { connect } from "react-redux";
import QAnswered from "./QAnswered";
import QUnanswered from "./QUnanswered";

const CheckPoll = (props) => {
  const { question, authedUser } = props;
  const { optionOne, optionTwo } = question;

  const voteOnOptOne = optionOne.votes.includes(authedUser);
  const voteOnOptTwo = optionTwo.votes.includes(authedUser);
  const open = !voteOnOptOne && !voteOnOptTwo;
  console.log(props);
  return (
    <div className="verify-poll">
      {open ? (
        <QUnanswered question={question} />
      ) : (
        <QAnswered question={question} />
      )}
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
export default connect(mapStateToProps)(CheckPoll);
