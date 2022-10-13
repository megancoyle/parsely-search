import { render, screen } from "@testing-library/react";
import App from "./App";
import { SearchProvider } from "./context/SearchContext";

describe("App", () => {
  test("it renders the application", () => {
    render(
      <SearchProvider>
        <App />
      </SearchProvider>
    );
    const headerLogo = screen.getByTitle(/Ars Technica Homepage/i);
    expect(headerLogo).toBeInTheDocument();
  });
});
