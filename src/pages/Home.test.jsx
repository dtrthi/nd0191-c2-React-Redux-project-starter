import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import store from "../store";
import Home from "./Home";

describe("Home", () => {
  it("should match snapshot", () => {
    const component = render(
      <Provider store={store}>
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      </Provider>,
    );
    expect(component).toMatchSnapshot();
  });

  it("should contains two categories", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      </Provider>,
    );
    expect(screen.getByText("New Questions")).toBeInTheDocument();
    expect(screen.getByText("Done")).toBeInTheDocument();
  });
});
