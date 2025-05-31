import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";

import HomePage from "@/pages/home";

test("HomePage", () => {
  render(<HomePage />);
  expect(screen.getByText("Home")).toBeDefined();
});
