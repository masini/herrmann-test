import { render, screen } from "@testing-library/react";
import App from "./App";

test("render start button", () => {
  render(<App />);
  const linkElement = screen.getByText(/Comenzar/i);
  expect(linkElement).toBeInTheDocument();
});
