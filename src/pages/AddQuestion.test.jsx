import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { login } from "../actions/authedUser";
import store from "../store";
import AddQuestion from "./AddQuestion";

describe("AddQuestion", () => {
  it("should match snapshot", () => {
    store.dispatch(login({ id: "id" }));
    const component = render(
      <Provider store={store}>
        <MemoryRouter>
          <AddQuestion />
        </MemoryRouter>
      </Provider>,
    );
    expect(component).toMatchSnapshot();
  });

  it("should have correct labels", () => {
    store.dispatch(login({ id: "id" }));
    render(
      <Provider store={store}>
        <MemoryRouter>
          <AddQuestion />
        </MemoryRouter>
      </Provider>,
    );
    expect(screen.getByText("Option One")).toBeInTheDocument();
    expect(screen.getByText("Option Two")).toBeInTheDocument();
  });
});
