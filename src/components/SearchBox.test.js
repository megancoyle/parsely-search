import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SearchBox from "./SearchBox";
import { SearchProvider } from "../context/SearchContext";

describe("SearchBox", () => {
  test("it renders empty search box with search button", () => {
    render(
      <SearchProvider>
        <SearchBox />
      </SearchProvider>
    );
    const searchInput = screen.getByPlaceholderText(/Search.../i);
    const searchButton = screen.getByTestId("search-button");
    expect(searchInput).toBeInTheDocument();
    expect(searchButton).toBeInTheDocument();
  });

  test("it renders the disabled search button", () => {
    render(
      <SearchProvider>
        <SearchBox />
      </SearchProvider>
    );
    const searchButton = screen.getByTestId("search-button");
    expect(searchButton).toBeDisabled();
  });

  test("it enables the search button when user types input", async () => {
    render(
      <SearchProvider>
        <SearchBox />
      </SearchProvider>
    );
    const searchInput = screen.getByPlaceholderText(/Search.../i);
    const searchButton = screen.getByTestId("search-button");
    await userEvent.type(searchInput, "apple");
    expect(searchInput.value).toBe("apple");
    expect(searchButton).not.toBeDisabled();
  });
});
