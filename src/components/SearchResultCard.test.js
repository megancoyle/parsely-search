import { render, screen } from "@testing-library/react";
import SearchResultCard from "./SearchResultCard";
import { SearchProvider } from "../context/SearchContext";

const result = {
  breadcrumb: "Ars Technica",
  date: "Sep 22, 2022",
  description: "A former Google engineer reported the risk, but Meta found no privacy concern.",
  section: "Policy",
  thumbnail: "",
  title: "Test",
  url: "https://arstechnica.com/tech-policy/2022/09/lawsuits-say-meta",
};

describe("SearchResultCard", () => {
  test("it renders a search result card", () => {
    render(
      <SearchProvider>
        <SearchResultCard result={result} searchQuery="apple" />
      </SearchProvider>
    );
    const labelText = screen.getByText(result.section);
    const descriptionText = screen.getByText(result.description);
    const title = screen.getByText(result.title);
    expect(labelText).toBeInTheDocument();
    expect(descriptionText).toBeInTheDocument();
    expect(title).toBeInTheDocument();
  });
});
