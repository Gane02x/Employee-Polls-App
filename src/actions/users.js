export const GET_USERS = "GET_USERS";
export const UPDATE_USERS_QUESTIONS = "UPDATE_USERS_QUESTIONS";
export const UPDATE_USERS_ANSWERS = "UPDATE_USERS_ANSWERS";

export function getUsers(users) {
  return {
    type: GET_USERS,
    users,
  };
}

export function updateUsersQuestions(question) {
  return {
    type: UPDATE_USERS_QUESTIONS,
    authedUser: question.author,
    id: question.id,
  };
}

export function updateUsersAnswers({ authedUser, qid, answer }) {
  return {
    type: UPDATE_USERS_ANSWERS,
    authedUser,
    qid,
    answer,
  };
}
