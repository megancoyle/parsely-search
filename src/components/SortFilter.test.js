import { render, screen } from "@testing-library/react";
import SortFilter from "./SortFilter";
import { SearchProvider } from "../context/SearchContext";

describe("SortFilter", () => {
  test("it renders the filter", () => {
    const currentSort = "Relevance";
    render(
      <SearchProvider>
        <SortFilter currentSort={currentSort} />
      </SearchProvider>
    );
    const labelText = screen.getByText(currentSort);
    expect(labelText).toBeInTheDocument();
  });
});
