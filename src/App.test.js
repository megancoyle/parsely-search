import { render, screen } from "@testing-library/react";
import App from "./App";

describe("App", () => {
  test("it renders the application", () => {
    render(<App />);
    const headerLogo = screen.getByTitle(/Ars Technica Homepage/i);
    expect(headerLogo).toBeInTheDocument();
  });
});
