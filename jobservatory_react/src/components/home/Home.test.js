import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { fireEvent, render, screen } from "@testing-library/react";
import { Home } from "./Home";
import { GoButton } from "./GoButton";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
import { App } from "./../../App";

import { prettyDOM } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";

test("render correctly title", () => {
  render(<Home />);
  const titlePage = screen.getByText(/Search your job or skill to check/i);
  expect(titlePage).toBeInTheDocument();
});

test("render searchBar correctly", () => {
  const component = render(<Home />);
  component.getByPlaceholderText("Example: React, Ruby ...");
  //console.log(prettyDOM(a));
  //component.debug(); -> interesante
});

test("render button on correctly", () => {
  const component = render(<Home />);
  component.getByText("Go");
});

test("click button works correctly", () => {
  const mockHandler = jest.fn();
  const component = render(<GoButton onSearch={() => mockHandler()} />);
  const goButton = component.getByText("Go");
  fireEvent.click(goButton);
  expect(mockHandler.mock.calls).toHaveLength(1);
});

test("click on Go button push to other screen", () => {
  const history = createMemoryHistory();
  render(
    <Router history={history}>
      <App />
    </Router>
  );
  expect(screen.getByText("Search your job or skill to check"));
  expect(screen.getByText("Go"));
  const goButton = screen.getByText("Go");
  const leftClick = { button: 0 };
  userEvent.click(goButton, leftClick);
  expect(screen.getByText(/Last 24 Hours/i)).toBeInTheDocument();
});
