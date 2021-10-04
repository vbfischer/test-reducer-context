import { renderHook } from "@testing-library/react-hooks";

import { useState } from "./use-counter-ctx";

describe("use-counter-ctx", () => {
  test("it defaults to 0", () => {
    const { result } = renderHook(() => useState());

    console.log(result.current);
    expect(result.current.state.count).toBe(1);
  });
});
