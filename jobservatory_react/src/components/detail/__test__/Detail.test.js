import { Detail } from "./Detail";
import { render } from "@testing-library/react";
import { prettyDOM } from "@testing-library/dom";
import { Provider } from "react-redux";
// Replace this with the appropriate imports for your project
import {
  detailReducer,
  initialState as detailInitialState,
} from "../../../features/detail/reducer";
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";

import thunk from "redux-thunk";

const customRender = (
  ui,
  {
    initialState,
    store = configureStore({
      reducer: {
        detail: detailReducer,
      },
      middleware: [...getDefaultMiddleware(), thunk],
    }),
    ...renderOptions
  } = {}
) => {
  const Wrapper = ({ children }) => (
    <Provider store={store}>{children}</Provider>
  );
  return render(ui, { wrapper: Wrapper, ...renderOptions });
};

describe("<Detail />", () => {
  test("display jobs open by day title correctly correctly", () => {
    const detailComponent = customRender(<Detail />, { detailInitialState });
    const result = detailComponent.getByText("Jobs open by day");
    expect(result).toBeInTheDocument();
  });
});
