import { connect } from "react-redux";
import { useState } from "react";
import Question from "./Question";

const Dashboard = (props) => {
  const { authedUser, questions, questionIds } = props;

  let qArr = [];
  for (let n = 0; n < questionIds.length; n++) {
    qArr.push(questions[questionIds[n]]);
  }

  const closedPolls = qArr.filter(
    (poll) =>
      poll.optionOne.votes.includes(authedUser) ||
      poll.optionTwo.votes.includes(authedUser)
  );

  const openPolls = qArr.filter(
    (poll) =>
      !poll.optionOne.votes.includes(authedUser) &&
      !poll.optionTwo.votes.includes(authedUser)
  );
  const [questionOnView, setQuestionsOnView] = useState(openPolls);
  const [status, setStatus] = useState(true);

  const showOpenPolls = () => {
    setQuestionsOnView(openPolls);
    setStatus(true);
  };
  const showClosedPolls = () => {
    setQuestionsOnView(closedPolls);
    setStatus(false);
  };

  return (
    <div className="dashboard">
      <h1 className="heading" data-testid="dashboard">
        <button
          className={status ? "active" : "disabled"}
          onClick={showOpenPolls}
          data-testid="open-polls"
        >
          Open Polls
        </button>
        <button
          className={!status ? "active" : "disabled"}
          onClick={showClosedPolls}
          data-testid="closed-polls"
        >
          Closed Polls
        </button>
      </h1>

      <ul>
        {questionOnView.length > 0 ? (
          questionOnView.map((q) => (
            <li key={q.id}>
              <Question id={q.id} />
            </li>
          ))
        ) : (
          <div>no polls available</div>
        )}
      </ul>
    </div>
  );
};
const mapStateToProps = ({ questions, authedUser }) => ({
  questionIds: Object.keys(questions).sort(
    (a, b) => questions[b].timestamp - questions[a].timestamp
  ),
  authedUser,
  questions,
});

export default connect(mapStateToProps)(Dashboard);
