import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { login } from "../actions/authedUser";
import store from "../store";
import Leaderboard from "./Leaderboard";

describe("Leaderboard", () => {
  it("should match snapshot", () => {
    store.dispatch(login({ id: "id" }));
    const component = render(
      <Provider store={store}>
        <MemoryRouter>
          <Leaderboard />
        </MemoryRouter>
      </Provider>,
    );
    expect(component).toMatchSnapshot();
  });

  it("should have correct headers", () => {
    store.dispatch(login({ id: "id" }));
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Leaderboard />
        </MemoryRouter>
      </Provider>,
    );
    expect(screen.getByText("Users")).toBeInTheDocument();
    expect(screen.getByText("Answered")).toBeInTheDocument();
    expect(screen.getByText("Created")).toBeInTheDocument();
  });
});
