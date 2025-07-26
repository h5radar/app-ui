import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router";
import { describe, expect, it } from "vitest";

import { MaturitiesPage } from "@/pages/maturities/table";

describe("MaturitiesPage", () => {
  it("get maturities page", () => {
    render(
      <BrowserRouter>
        <QueryClientProvider client={new QueryClient()}>
          <MaturitiesPage />
        </QueryClientProvider>
      </BrowserRouter>,
    );
    expect(screen.getByText("Columns")).toBeDefined();
  });
});
