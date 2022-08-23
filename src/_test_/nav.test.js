import * as React from "react";
import Nav from "../components/Nav";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../store";

test("checking if all links are rendered", async () => {
  render(
    <MemoryRouter>
      <Provider store={store}>
        <Nav />
      </Provider>
    </MemoryRouter>
  );

  const home = screen.getByText(/home/i);
  const newQuestion = screen.getByText(/new question/i);
  const leaderboard = screen.getByText(/leaderboard/i);

  expect(home).toBeInTheDocument();
  expect(newQuestion).toBeInTheDocument();
  expect(leaderboard).toBeInTheDocument();
});
