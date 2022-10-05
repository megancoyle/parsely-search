import { formatDate, isDateThisWeek } from "./dateUtils";

describe("dateUtils", () => {
  test("formatDate to MM DD, YYYY format", () => {
    expect(formatDate("2016-11-25T09:58:23")).toBe("Nov 25, 2016");
  });

  test("older dates will return false for isDateThisWeek", () => {
    expect(isDateThisWeek("2016-11-25T09:58:23")).toBe(false);
  });
});
