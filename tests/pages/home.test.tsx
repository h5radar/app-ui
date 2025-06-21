import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { describe, expect, it } from "vitest";

import { store } from "@/store";

import HomePage from "@/pages/home";

describe("HomePage", () => {
  it("get home page", () => {
    render(
      <Provider store={store}>
        <QueryClientProvider client={new QueryClient()}>
          <HomePage />
        </QueryClientProvider>
        ,
      </Provider>,
    );
    // TODO: fixme
    expect(screen.getByText("Loading...")).toBeDefined();
    // expect(screen.getByText("Home")).toBeDefined();
  });
});
