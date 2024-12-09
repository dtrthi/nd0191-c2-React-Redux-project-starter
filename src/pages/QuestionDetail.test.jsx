import "@testing-library/jest-dom/vitest";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { login } from "../actions/authedUser";
import store from "../store";
import QuestionDetail from "./QuestionDetail";

describe("QuestionDetail", () => {
  it("should match snapshot", () => {
    store.dispatch(login({ id: "id" }));
    const component = render(
      <Provider store={store}>
        <MemoryRouter>
          <QuestionDetail />
        </MemoryRouter>
      </Provider>,
    );
    expect(component).toMatchSnapshot();
  });
});
