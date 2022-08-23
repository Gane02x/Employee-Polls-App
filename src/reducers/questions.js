import {
  ANSWER_QUESTION,
  GET_QUESTIONS,
  SAVE_QUESTION,
} from "../actions/questions";

function options(state = {}, action) {
  if (action.type === ANSWER_QUESTION) {
    const { authedUser } = action;
    const { votes } = state;

    return {
      ...state,
      votes: votes.concat([authedUser]),
    };
  }
}
function answerOnOption(state = {}, action) {
  switch (action.type) {
    case ANSWER_QUESTION:
      const { answer } = action;

      return {
        ...state,
        [answer]: options(state[answer], action),
      };
    default:
  }
}
export default function questions(state = {}, action) {
  switch (action.type) {
    case GET_QUESTIONS:
      return {
        ...state,
        ...action.questions,
      };
    case ANSWER_QUESTION:
      const { qid } = action;

      return {
        ...state,
        [qid]: answerOnOption(state[qid], action),
      };

    case SAVE_QUESTION:
      const { question } = action;
      const { id } = question;
      return {
        ...state,
        [id]: question,
      };

    default:
      return state;
  }
}
