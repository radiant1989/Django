import { describe, it, expect } from "vitest";
import { fireEvent, render } from "@testing-library/vue";
import { GInputNumber } from "~/components/atoms";

describe("GInputNumber", () => {
  it("supports v-model", async () => {
    const { getByDisplayValue, emitted, rerender, unmount } = render(
      GInputNumber,
      {
        props: {
          modelValue: "12",
        },
      }
    );
    const inputElement = getByDisplayValue<HTMLInputElement>("12");
    await fireEvent.update(inputElement, "14");

    expect(emitted()).toHaveProperty("update:modelValue");

    await rerender({ modelValue: "15" });

    expect(inputElement.value).toBe("15");
    unmount();
  });
  it("supports toFixed", async () => {
    const { getByDisplayValue } = render(
      GInputNumber,
      {
        props: {
          modelValue: "12.5",
          toFixed: 4
        },
      }
    );
    const inputElement = getByDisplayValue<HTMLInputElement>('12.5000');
    
    await fireEvent.focus(inputElement);
    await fireEvent.update(inputElement, "14");
    expect(inputElement.value).toBe("14");
    await fireEvent.blur(inputElement);
    expect(inputElement.value).toBe("14.0000");
  });
});
