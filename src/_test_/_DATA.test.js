import { getInitialData } from "../actions/shared";
import {
  generateUID,
  _saveQuestion,
  _saveQuestionAnswer,
} from "../utils/_DATA";
import { formatDate } from "../utils/api";

// An async unit test to verify that every existing user is returned
test("returns users and questions", async () => {
  const { users, questions } = await getInitialData();

  const numUsers = Object.keys(users).length;
  const numQuestions = Object.keys(questions).length;
  expect(numUsers).toEqual(4);
  expect(numQuestions).toEqual(6);
});

// A snapshot test to verify that the date is formatted
test("returns a correctly formatted date to the page", () => {
  expect(formatDate(new Date("January 1, 2000"))).toMatchSnapshot();
});

// An unit test to verify that a unique id is returned
test("returning an unique id", () => {
  const id1 = generateUID();
  const id2 = generateUID();
  const id3 = generateUID();
  expect(id1).not.toEqual(id2);
  expect(id1).not.toEqual(id3);
  expect(id2).not.toEqual(id3);
});

// UNIT TESTS FOR _saveQuestion()

// An async unit test to verify that the saved question is returned
test("returning true when correctly formatted data is passed into _saveQuestion()", async () => {
  const questionExample = {
    author: "name",
    optionOneText: "1",
    optionTwoText: "2",
  };

  const submit = await _saveQuestion(questionExample);

  const { author, optionOneText, optionTwoText } = submit;

  expect(author).toEqual("name");
  expect(submit.optionOneText).toEqual(optionOneText);
  expect(submit.optionTwoText).toEqual(optionTwoText);
});

// An async unit test to verify that an error is returned if incorrect data is passed to the function
test("returns an error if incorrect data is passed to _saveQuestion()", async () => {
  const questionExample = {
    author: null,
    optionOneText: null,
    optionTwoText: null,
  };
  await expect(_saveQuestion(questionExample)).rejects.toBe(
    "Please provide optionOneText, optionTwoText, and author"
  );
});

// UNIT TESTS FOR _saveQuestionAnswer()

// An async unit test to verify that true is returned when correctly formatted data is passed to the function
test("returning true when correctly formatted data is passed into _saveQuestionAnswer()", async () => {
  const answerExample = {
    authedUser: "sarahedo",
    qid: "8xf0y6ziyjabvozdd253nd",
    answer: "optionTwo",
  };
  const { users, questions } = await _saveQuestionAnswer(answerExample);

  expect(
    users[answerExample.authedUser].answers[answerExample.qid] ===
      answerExample.answer
  ).toBe(true);
  expect(
    questions[answerExample.qid][answerExample.answer].votes.includes(
      answerExample.authedUser
    )
  ).toBe(true);
});

// An async unit test to verify that an error is returned if incorrect data is passed to the function
test("returns an error if incorrect data is passed to _saveQuestionAnswer()", async () => {
  const answerExample = {
    authedUser: null,
    qid: null,
    answer: null,
  };

  await expect(_saveQuestionAnswer(answerExample)).rejects.toBe(
    "Please provide authedUser, qid, and answer"
  );
});
