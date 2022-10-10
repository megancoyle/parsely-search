import { render, screen } from "@testing-library/react";
import SearchResults from "./SearchResults";
import { DEFAULT_PAGE_NUMBER, DEFAULT_SECTION, DEFAULT_SORT } from "../helpers/searchVariables";

const emptyResults = [];
const searchResults = [
  {
    breadcrumb: "Ars Technica",
    date: "Sep 22, 2022",
    description: "A former Google engineer reported the risk, but Meta found no privacy concern.",
    section: "Policy",
    thumbnail: "",
    title: "Test",
    url: "https://arstechnica.com/tech-policy/2022/09/lawsuits-say-meta",
  },
];

describe("SearchResults", () => {
  test("it renders a message if no results exist in a section", () => {
    render(
      <SearchResults
        currentPage={DEFAULT_PAGE_NUMBER}
        currentSection={DEFAULT_SECTION}
        currentSort={DEFAULT_SORT}
        searchResults={emptyResults}
        searchQuery="apple"
      />
    );
    expect(screen.getByText("No results for this section.")).toBeInTheDocument();
  });

  test("it renders search results if results isn't empty", () => {
    render(
      <SearchResults
        currentPage={DEFAULT_PAGE_NUMBER}
        currentSection={DEFAULT_SECTION}
        currentSort={DEFAULT_SORT}
        searchResults={searchResults}
        searchQuery="apple"
      />
    );
    const labelText = screen.getByText(searchResults[0].section);
    const descriptionText = screen.getByText(searchResults[0].description);
    const title = screen.getByText(searchResults[0].title);
    expect(labelText).toBeInTheDocument();
    expect(descriptionText).toBeInTheDocument();
    expect(title).toBeInTheDocument();
  });
});
