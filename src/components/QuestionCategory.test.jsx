import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import QuestionCategory from "./QuestionCategory";

describe("QuestionCategory", () => {
  it("should match snapshot", () => {
    const component = render(
      <MemoryRouter>
        <QuestionCategory title="Title" questions={[{ id: "id", user: {} }]} />
      </MemoryRouter>,
    );
    expect(component).toMatchSnapshot();
  });

  it("should contains show button", () => {
    render(
      <MemoryRouter>
        <QuestionCategory title="Title" questions={[{ id: "id", user: {} }]} />
      </MemoryRouter>,
    );
    expect(screen.getByText("Title")).toBeInTheDocument();
  });
});
