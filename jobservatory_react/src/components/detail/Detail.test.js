import { Detail } from "./Detail";
import { render, screen } from "@testing-library/react";
import { prettyDOM } from "@testing-library/dom";

test("display stat card in detail correctly", () => {
  const detailComponent = render(<Detail />);
  const result = detailComponent.getByText("Last 24 Hours");
  //console.log(prettyDOM(result));
});
