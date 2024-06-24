import { test } from "vitest";
import { screen, render, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ResizableDemo } from "@/components/rezisable-layout";

test("click has no output with userEvent", async () => {
  render(<ResizableDemo />);
  const btn = screen.getByTestId("test");
  const user = userEvent.setup();
  await user.click(btn);
});

test("click has output with fireEvent", async () => {
  render(<ResizableDemo />);
  const btn = screen.getByTestId("test");
  fireEvent.click(btn);
});
