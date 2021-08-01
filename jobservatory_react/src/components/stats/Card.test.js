import { render, screen } from "@testing-library/react";
import { Card } from "./Card";

describe("<Card />", () => {
  let title = "Last 24 Hours";
  let value = 324.12;
  let component;
  beforeEach(() => {
    component = render(<Card title={title} value={value} />);
  });
  test("display stats card depeding of content", () => {
    component.getByText(title);
    component.getByText(value);
    expect(value).toBeGreaterThan(1);
    title = "Last Month";
    value = null;
    component.rerender(<Card title={title} value={value} />);
    component.getByText(title);
    component.getByText(0);
  });
});
