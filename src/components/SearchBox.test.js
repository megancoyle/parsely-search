import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SearchBox from "./SearchBox";

describe("SearchBox", () => {
  test("it renders empty search box with search button", () => {
    render(<SearchBox />);
    const searchInput = screen.getByPlaceholderText(/Search.../i);
    const searchButton = screen.getByRole("button");
    expect(searchInput).toBeInTheDocument();
    expect(searchButton).toBeInTheDocument();
  });

  test("it renders the disabled search button", () => {
    render(<SearchBox />);
    const searchButton = screen.getByRole("button");
    expect(searchButton).toBeDisabled();
  });

  test("it enables the search button when user types input", async () => {
    render(<SearchBox />);
    const searchInput = screen.getByPlaceholderText(/Search.../i);
    const searchButton = screen.getByRole("button");
    await userEvent.type(searchInput, "apple");
    expect(searchInput.value).toBe("apple");
    expect(searchButton).not.toBeDisabled();
  });
});
