import { connect } from "react-redux";
import { handleLogin } from "../actions/shared";

const Login = (props) => {
  const { users, userIds } = props;

  let usersArr = [];
  for (let n = 0; n < userIds.length; n++) {
    usersArr.push(users[userIds[n]]);
  }

  const login = (e) => {
    props.dispatch(handleLogin(e.target.value));
  };

  return (
    <div className="login-container">
      <h1 className="login-heading">EMPLOYEE POLLS</h1>
      <div className="login">
        <h1>Login</h1>
        <select
          data-testid="test-select"
          name="login"
          onChange={(e) => login(e)}
        >
          <option>choose your username</option>
          {usersArr.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

const mapStateToProps = ({ users }) => {
  const userIds = Object.keys(users);

  return { users, userIds };
};

export default connect(mapStateToProps)(Login);
