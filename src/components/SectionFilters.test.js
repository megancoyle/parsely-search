import { render, screen } from "@testing-library/react";
import SectionFilters from "./SectionFilters";
import { DEFAULT_SECTION } from "../helpers/searchVariables";
import { SearchProvider } from "../context/SearchContext";

describe("SectionFilters", () => {
  test("it renders the filters", () => {
    const currentSection = DEFAULT_SECTION;
    render(
      <SearchProvider>
        <SectionFilters currentSection={currentSection} />
      </SearchProvider>
    );
    const labelText = screen.getByText("All Results");
    expect(labelText).toBeInTheDocument();
    const nestedElement = screen
      .getByTestId("section-filters")
      .querySelector(".section-filter-active");
    expect(nestedElement).toHaveTextContent(currentSection);
  });
});
