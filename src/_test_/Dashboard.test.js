import * as React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../store";
import Dashboard from "../components/Dashboard";

test("checking if it is rendering the dashboard", () => {
  render(
    <MemoryRouter>
      <Provider store={store}>
        <Dashboard />
      </Provider>
    </MemoryRouter>
  );
  const view = screen.getByTestId("dashboard");
  expect(view).toBeInTheDocument();
});

test("should swap the displayed questions", async () => {
  render(
    <MemoryRouter>
      <Provider store={store}>
        <Dashboard />
      </Provider>
    </MemoryRouter>
  );
  const openPollsBtn = screen.getByTestId("open-polls");
  const closedPollsBtn = screen.getByTestId("closed-polls");

  fireEvent.click(closedPollsBtn);
  expect(closedPollsBtn).toHaveClass("active");
  fireEvent.click(openPollsBtn);
  expect(openPollsBtn).toHaveClass("active");
});
