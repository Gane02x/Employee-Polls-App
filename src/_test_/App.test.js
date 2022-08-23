import * as React from "react";
import App from "../components/App";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../store";

test("checking if it is rendering the loginpage", async () => {
  render(
    <MemoryRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </MemoryRouter>
  );
  const loginpage = screen.getByText(/EMPLOYEE POLLS/i);
  const login = screen.getByText(/Login/i);
  expect(loginpage && login).toBeInTheDocument();
});
