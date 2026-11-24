import { render, screen } from "@testing-library/react";
import { allRows, rowsByTag } from "@hundo/core/guide";
import { defaultState } from "@hundo/core/progress-state";
import { useProgress } from "@hundo/core/store/progress";
import type { Row } from "@hundo/core/types";
import { ALL_SECRETS, GameCheck } from "./GameCheck";

const show = (rows: Row[]) => {
  useProgress.setState({ data: { ...defaultState(), checks: Object.fromEntries(rows.map((row) => [row.id, true])) }, storageError: false });
  return render(<GameCheck />);
};

describe("Check against the game", () => {
  it("says how many secrets the game should list, and asks for nothing", () => {
    show([]);
    expect(screen.getByRole("heading", { name: "Check against the game" })).toBeInTheDocument();
    expect(screen.getByText("You should have 0 of the 641 secrets.")).toBeInTheDocument();
    expect(screen.queryByRole("textbox")).toBeNull();
    expect(screen.queryByRole("button")).toBeNull();
  });

  it("counts secrets only, a Hard mark that unlocks something once, and route steps not at all", () => {
    const { unmount } = show(rowsByTag("route"));
    expect(screen.getByText("You should have 0 of the 641 secrets.")).toBeInTheDocument();
    unmount();
    const heart = allRows.find((row) => row.id === "mark-isaac-heart");
    const plainMark = allRows.find((row) => row.id === "mark-isaac-isaac");
    show([heart!, plainMark!]);
    expect(screen.getByText("You should have 1 of the 641 secrets.")).toBeInTheDocument();
  });

  it("matches the game's own total, and says so when everything is ticked", () => {
    expect(rowsByTag("secret")).toHaveLength(ALL_SECRETS);
    show(allRows);
    expect(screen.getByText("You should have all 641 secrets.")).toBeInTheDocument();
    expect(screen.getByText(/under Stats, then Secrets: 641 of them on Repentance\+/)).toBeInTheDocument();
  });
});
