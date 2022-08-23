import {
  GET_USERS,
  UPDATE_USERS_ANSWERS,
  UPDATE_USERS_QUESTIONS,
} from "../actions/users";

//Helper Functions
function answer(state = {}, action) {
  const { qid, answer } = action;
  const { answers } = state;

  return {
    ...state,
    answers: {
      ...answers,
      [qid]: answer,
    },
  };
}

function question(state = {}, action) {
  const { questions } = state;
  const { id } = action;

  return {
    ...state,
    questions: questions.concat(id),
  };
}

export default function users(state = {}, action) {
  switch (action.type) {
    case GET_USERS:
      return {
        ...state,
        ...action.users,
      };
    case UPDATE_USERS_ANSWERS: {
      const { authedUser } = action;

      return {
        ...state,
        [authedUser]: answer(state[authedUser], action),
      };
    }
    case UPDATE_USERS_QUESTIONS: {
      const { authedUser } = action;

      return {
        ...state,
        [authedUser]: question(state[authedUser], action),
      };
    }
    default:
      return state;
  }
}
