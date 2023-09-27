import { describe, expect, it } from "vitest";
import { fireEvent, render } from "@testing-library/vue";
import { GInput } from "~/components/atoms";

describe("GInput.vue", () => {
  it("supports v-model", async () => {
    const { getByDisplayValue, emitted, unmount, rerender } = render(GInput, {
      props: {
        modelValue: "12",
      },
    });
    const inputElement = getByDisplayValue<HTMLInputElement>("12");
    await fireEvent.update(inputElement, "13");

    expect(emitted()).toHaveProperty("update:modelValue");
    expect(emitted<[string]>("update:modelValue")[0][0]).toBe("13");
    
    await rerender({
      modelValue: "15"
    });
    expect(inputElement.value).toBe("15");
    
    unmount();
  });
  it("renders prefix slot", () => {
    const { getByText, unmount } = render(GInput, {
      slots: {
        prefix: "<div>first</div>",
      },
    });
    getByText("first");
    
    unmount();
  });
  it("renders suffix slot", () => {
    const { getByText, unmount } = render(GInput, {
      slots: {
        prefix: "<div>last</div>",
      },
    });
    getByText("last");

    unmount();
  });
  it("emits focus and blur events", async () => {
    const { getByDisplayValue, emitted, unmount } = render(GInput, {
      props: {
        modelValue: "12",
      },
    });
    const inputElement = getByDisplayValue("12");

    await fireEvent.focus(inputElement);
    expect(emitted()).toHaveProperty("focus");
    await fireEvent.blur(inputElement);
    expect(emitted()).toHaveProperty("blur");

    unmount();
  });
});
