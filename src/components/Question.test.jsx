import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Question from "./Question";

describe("Question", () => {
  it("should match snapshot", () => {
    const component = render(
      <MemoryRouter>
        <Question question={{ user: {} }} />
      </MemoryRouter>,
    );
    expect(component).toMatchSnapshot();
  });

  it("should contains show button", () => {
    render(
      <MemoryRouter>
        <Question question={{ user: {} }} />
      </MemoryRouter>,
    );
    expect(screen.getByText("Show")).toBeInTheDocument();
  });
});
