## What issue have I encountered

When using @testing-library/react inside of a component that lives inside of `<ResizablePanelGroup />`, I'm unable to dispatch events with the `@testing-library/user-event` library. This does not seem to be an issue with testing library nor any other dependency. I suspect that somewhere while rendering dom nodes are remounted.

By the time we want to dispatch an event the reference to the dom node is invalid. Strangely, events dispatches with fireEvent work.

## How to reproduce?

I've created a [repo for reproduction](https://github.com/florianmartens/resizable_example). The important part is the test file `resizable-layout.test.tsx`.

```typescript
test("click has no output with userEvent", async () => {
  render(<ResizableDemo />);
  const btn = screen.getByTestId("test");
  const user = userEvent.setup();
  await user.click(btn); // Will not call the onClick handler
});

test("click has output with fireEvent", async () => {
  render(<ResizableDemo />);
  const btn = screen.getByTestId("test");
  fireEvent.click(btn); // Will call the onClick handler
});
```

## Steps for reproduction

- Clone the repo
- `pnpm i`
- `pnpm run test`

**What is the impact**
React testing library is a popular way of testing react applications and `user-event` is the recommended way working with events. Currently any component inside of a resizable area cannot dispatch user events.
