import { useState } from "react";
import { handleSaveQuestion } from "../actions/questions";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";

const NewQuestion = (props) => {
  const { dispatch, authedUser } = props;
  const nav = useNavigate();

  const initialQuestionForm = {
    author: authedUser,
    optionOneText: "",
    optionTwoText: "",
  };

  const [question, setQuestion] = useState(initialQuestionForm);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setQuestion({ ...question, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(handleSaveQuestion(question)).then(() => {
      setQuestion(initialQuestionForm);
      nav("/");
    });
  };
  return (
    <div className="header-n-q">
      <h2> Would You Rather </h2>
      <span> Create Your Own Poll</span>
      <form className="header-n-q" onSubmit={handleSubmit}>
        <h3>First Option</h3>
        <input
          type="text"
          placeholder="Option One"
          value={question.optionOneText}
          onChange={handleInput}
          name="optionOneText"
          className="option-one"
          maxLength={60}
        />
        <h3>Second Option</h3>
        <input
          type="text"
          placeholder="Option Two"
          value={question.optionTwoText}
          onChange={handleInput}
          name="optionTwoText"
          className="option-two"
          maxLength={60}
        />
        <button className="submit-btn" type="submit">
          {" "}
          Submit{" "}
        </button>
      </form>
    </div>
  );
};

const mapStateToProps = ({ authedUser }) => {
  return { authedUser };
};
export default connect(mapStateToProps)(NewQuestion);
