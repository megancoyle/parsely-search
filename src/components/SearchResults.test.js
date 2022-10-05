import { render, screen } from "@testing-library/react";
import SearchResults from "./SearchResults";

const emptyResults = [];
const results = [
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
    render(<SearchResults results={emptyResults} searchQuery="apple" />);
    expect(screen.getByText("No results for this section.")).toBeInTheDocument();
  });

  test("it renders search results if results isn't empty", () => {
    render(<SearchResults results={results} searchQuery="apple" />);
    const labelText = screen.getByText(results[0].section);
    const descriptionText = screen.getByText(results[0].description);
    const title = screen.getByText(results[0].title);
    expect(labelText).toBeInTheDocument();
    expect(descriptionText).toBeInTheDocument();
    expect(title).toBeInTheDocument();
  });
});
