
import React from "react";
import { render, screen } from "@testing-library/react";
import { AppErrorBoundary } from "@/components/error/AppErrorBoundary";

function BrokenComponent() {
  throw new Error("Boom");
}

describe("AppErrorBoundary", () => {
  test("renders fallback UI on error", () => {
    render(
      <AppErrorBoundary>
        <BrokenComponent />
      </AppErrorBoundary>
    );
    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /refresh/i })).toBeInTheDocument();
  });
});
