import { formatBreadcrumb, formatDescription } from "./textUtils";

describe("textUtils", () => {
  const shortFormattedText = "Ars Technica › apple › 2006/10 › 5489";
  const longFormattedText = "Ars Technica › video › watch › gear-gadgets-nest-protect-setup-demo";

  test("formatBreadcrumb from URL", () => {
    const url = "http://arstechnica.com/apple/2006/10/5489/?itm_source=parsely-api";
    expect(formatBreadcrumb(url)).toBe(shortFormattedText);
  });

  test("formatBreadcrumb when URL starts with https", () => {
    const url = "https://arstechnica.com/apple/2006/10/5489/?itm_source=parsely-api";
    expect(formatBreadcrumb(url)).toBe(shortFormattedText);
  });

  test("formatBreadcrumb when URL starts with https and www", () => {
    const url = "https://www.arstechnica.com/apple/2006/10/5489/?itm_source=parsely-api";
    expect(formatBreadcrumb(url)).toBe(shortFormattedText);
  });

  test("formatBreadcrumb without date in URL", () => {
    const url =
      "http://arstechnica.com/video/watch/gear-gadgets-nest-protect-setup-demo?itm_source=parsely-api";
    expect(formatBreadcrumb(url)).toBe(longFormattedText);
  });

  test("formatBreadcrumb without trailing param", () => {
    const url = "http://www.arstechnica.com/video/watch/gear-gadgets-nest-protect-setup-demo";
    expect(formatBreadcrumb(url)).toBe(longFormattedText);
  });

  test("formatDescription from metadata", () => {
    const metaData =
      '{"type":"brief","title":"Intel says \\u0022Let Apple be Apple\\u0022","post_id":87972,"lower_deck":"Intel says it\'s cool with Apple keeping a closed platform for its devices","upper_deck":"Product News & Reviews"}';
    const formattedDescription =
      "Intel says it's cool with Apple keeping a closed platform for its devices";
    expect(formatDescription(metaData)).toBe(formattedDescription);
  });
});
