import { connect } from "react-redux";

const Leaderboard = (props) => {
  const { users, userIds } = props;

  const LeaderboardEntry = (
    user,
    amountQuestionsAnswered,
    amountQuestionsAsked,
    score
  ) => {
    return {
      ...user,
      amountQuestionsAnswered,
      amountQuestionsAsked,
      score,
    };
  };
  let usersArr = [];
  for (let n = 0; n < userIds.length; n++) {
    const user = users[userIds[n]];

    const { questions, answers } = user;
    const amountQuestionsAnswered = Object.keys(answers).length;
    const amountQuestionsAsked = questions.length;
    const score = amountQuestionsAnswered + amountQuestionsAsked;

    const entryWithData = LeaderboardEntry(
      user,
      amountQuestionsAnswered,
      amountQuestionsAsked,
      score
    );
    usersArr.push(entryWithData);
  }
  const sortedData = usersArr.sort((a, b) => b.score - a.score);
  console.log(sortedData);

  return (
    <table className="leaderboard">
      <thead>
        <tr>
          <th>Users</th>
          <th>Answered</th>
          <th>Created</th>
        </tr>
      </thead>
      <tbody>
        {sortedData.map((user) => {
          return (
            <tr key={user.id}>
              <td>
                <img
                  src={user.avatarURL}
                  alt={`avatar of ${user.name}`}
                  width="50"
                  height="50"
                />
                {user.name}
              </td>
              <td>{user.amountQuestionsAnswered}</td>
              <td>{user.amountQuestionsAsked}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
const mapStateToProps = ({ users }) => {
  const userIds = Object.keys(users);

  return { users, userIds };
};
export default connect(mapStateToProps)(Leaderboard);
