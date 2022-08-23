import { connect } from "react-redux";
import { handleLogin } from "../actions/shared";
import { useNavigate } from "react-router-dom";

const Logout = (props) => {
  const nav = useNavigate();

  const { avatarURL, name } = props;

  const handleLogout = () => {
    props.dispatch(handleLogin(null));
    nav("/");
  };

  return (
    <div className="login-container">
      <div className="login-state">
        <img src={avatarURL} alt={`avatar of ${name}`} width="50" height="50" />
        <div className="user-name">{name}</div>
      </div>
      <button
        className="logout-btn"
        onClick={handleLogout}
        data-testid="logout"
      >
        Logout
      </button>
    </div>
  );
};
const mapStateToProps = ({ authedUser, users }) => {
  const user = users[authedUser];
  const { avatarURL, name } = user;

  return {
    avatarURL,
    name,
  };
};

export default connect(mapStateToProps)(Logout);
