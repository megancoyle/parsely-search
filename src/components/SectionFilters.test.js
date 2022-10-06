import { render, screen } from "@testing-library/react";
import SectionFilters from "./SectionFilters";
import { DEFAULT_SECTION } from "../helpers/searchVariables";

describe("SectionFilters", () => {
  test("it renders the filters", () => {
    const currentSection = DEFAULT_SECTION;
    render(<SectionFilters currentSection={currentSection} />);
    const labelText = screen.getByText("All Results");
    expect(labelText).toBeInTheDocument();
    const nestedElement = screen
      .getByTestId("section-filters")
      .querySelector(".section-filter-active");
    expect(nestedElement).toHaveTextContent(currentSection);
  });
});
