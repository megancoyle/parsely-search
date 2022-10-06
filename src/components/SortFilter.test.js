import { render, screen } from "@testing-library/react";
import SortFilter from "./SortFilter";

describe("SortFilter", () => {
  test("it renders the filter", () => {
    const currentSort = "Relevance";
    render(<SortFilter currentSort={currentSort} />);
    const labelText = screen.getByText(currentSort);
    expect(labelText).toBeInTheDocument();
  });
});
