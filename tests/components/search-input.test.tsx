import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router";
import { describe, expect, it } from "vitest";

import { accountSearchItem } from "@/constants/search";
import { billingSearchItem } from "@/constants/search";
import { notificationSearchItem } from "@/constants/search";
import { radarSearchItem } from "@/constants/search";

import { SearchProvider } from "@/providers/search";

import { SearchInput } from "@/components/search-input";

describe("SearchInput", () => {
  it("get search input for empty nav items", () => {
    render(
      <BrowserRouter>
        <SearchProvider navItemList={[]}>
          <SearchInput />
        </SearchProvider>
      </BrowserRouter>,
    );
    expect(screen.getByText("Search")).toBeDefined();
  });

  it("get search input for account nav items", () => {
    render(
      <BrowserRouter>
        <SearchProvider navItemList={accountSearchItem}>
          <SearchInput />
        </SearchProvider>
      </BrowserRouter>,
    );
    expect(screen.getByText("Search")).toBeDefined();
  });

  it("get search input for billing nav items", () => {
    render(
      <BrowserRouter>
        <SearchProvider navItemList={billingSearchItem}>
          <SearchInput />
        </SearchProvider>
      </BrowserRouter>,
    );
    expect(screen.getByText("Search")).toBeDefined();
  });

  it("get search input for billing nav items", () => {
    render(
      <BrowserRouter>
        <SearchProvider navItemList={notificationSearchItem}>
          <SearchInput />
        </SearchProvider>
      </BrowserRouter>,
    );
    expect(screen.getByText("Search")).toBeDefined();
  });

  it("get search input for billing nav items", () => {
    render(
      <BrowserRouter>
        <SearchProvider navItemList={radarSearchItem}>
          <SearchInput />
        </SearchProvider>
      </BrowserRouter>,
    );
    expect(screen.getByText("Search")).toBeDefined();
  });
});
