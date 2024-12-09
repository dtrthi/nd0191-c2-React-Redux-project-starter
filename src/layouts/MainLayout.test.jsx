import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { login } from "../actions/authedUser";
import store from "../store";
import MainLayout from "./MainLayout";

describe("MainLayout", () => {
  it("should match snapshot", () => {
    store.dispatch(login({ id: "id" }));
    const component = render(
      <Provider store={store}>
        <MemoryRouter>
          <MainLayout />
        </MemoryRouter>
      </Provider>,
    );
    expect(component).toMatchSnapshot();
  });

  it("should have menu items", () => {
    store.dispatch(login({ id: "id" }));
    render(
      <Provider store={store}>
        <MemoryRouter>
          <MainLayout />
        </MemoryRouter>
      </Provider>,
    );
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Leaderboard")).toBeInTheDocument();
    expect(screen.getByText("New")).toBeInTheDocument();
  });
});
