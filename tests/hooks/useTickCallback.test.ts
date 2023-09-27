import { waitFor } from "@testing-library/vue";
import { describe, it, expect, vi } from "vitest";
import { useTickCallback } from "~/hooks";

describe("useTickCallback", () => {
  it("invokes callback after tickInterval", async () => {
    const callback = vi.fn();
    const { tickCallback } = useTickCallback(callback, 1000);
    
    tickCallback();
    expect(callback).toBeCalled();
    
    tickCallback();
    expect(callback).not.toBeCalledTimes(2);
    
    await waitFor(() => {
      tickCallback();
      expect(callback).toBeCalledTimes(2)
    }, {timeout: 1100});
  })
});
