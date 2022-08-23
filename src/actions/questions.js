import { _saveQuestion, _saveQuestionAnswer } from "../utils/_DATA";
import { updateUsersQuestions } from "./users";

export const GET_QUESTIONS = "GET_QUESTIONS";
export const ANSWER_QUESTION = "ANSWER_QUESTION";
export const SAVE_QUESTION = "SAVE_QUESTION";

export function getQuestions(questions) {
  return {
    type: GET_QUESTIONS,
    questions,
  };
}

export function handleAnswerQuestion({ authedUser, qid, answer }) {
  return (dispatch) => {
    return _saveQuestionAnswer({ authedUser, qid, answer }).then(() => {
      dispatch(addAnswer({ authedUser, qid, answer }));
    });
  };
}

export function handleSaveQuestion(question) {
  return (dispatch) => {
    return _saveQuestion(question)
      .then((formattedQuestion) => {
        dispatch(saveNewQuestion(formattedQuestion));
        dispatch(updateUsersQuestions(formattedQuestion));
      })
      .catch((e) => console.log("Error at handleSaveQuestion:", e));
  };
}
function addAnswer({ authedUser, qid, answer }) {
  return {
    type: ANSWER_QUESTION,
    authedUser,
    qid,
    answer,
  };
}
function saveNewQuestion(question) {
  return {
    type: SAVE_QUESTION,
    question,
  };
}
