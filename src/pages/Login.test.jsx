import "@testing-library/jest-dom/vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import store from "../store";
import Login from "./Login";

describe("Login", () => {
  it("should match snapshot", () => {
    const component = render(
      <Provider store={store}>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
        ,
      </Provider>,
    );
    expect(component).toMatchSnapshot();
  });

  it("should input username and password", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
        ,
      </Provider>,
    );
    const usernameInput = screen.getByTestId("username");
    const passwordInput = screen.getByTestId("password");
    fireEvent.change(usernameInput, { target: { value: "user" } });
    fireEvent.change(passwordInput, { target: { value: "pass" } });
    expect(screen.getByTestId("username").value).toBe("user");
    expect(screen.getByTestId("password").value).toBe("pass");
  });

  it("should have username and password", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
        ,
      </Provider>,
    );
    expect(screen.getByTestId("username")).toBeInTheDocument();
    expect(screen.getByTestId("password")).toBeInTheDocument();
  });
});
