import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Logout from "./Logout";

const Nav = (props) => {
  return (
    <nav className="nav">
      <ul>
        <li>
          <Link to={"/"}>Home</Link>
        </li>
        <li>
          <Link to={"/add"}>New Question</Link>
        </li>
        <li>
          <Link to={"/leaderboard"}>Leaderboard</Link>
        </li>
        {!props.loading && <Logout />} {""}
      </ul>
    </nav>
  );
};
const mapStateToProps = ({ authedUser }) => ({
  loading: authedUser === null,
});

export default connect(mapStateToProps)(Nav);
