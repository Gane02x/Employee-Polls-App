import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import CheckPoll from "./CheckPoll";

const QuestionPage = (props) => {
  const { ids } = props;

  const { question_id } = useParams();
  const id = question_id.replace(":question_", "");

  return ids.includes(id) ? <CheckPoll id={id}/> : <Navigate to='/404'/>
};
const mapStateToProps = ({ questions }) => {
  const ids = Object.keys(questions);
  return {
    ids,
  };
};
export default connect(mapStateToProps)(QuestionPage);
