import { fireEvent, render } from "@testing-library/vue";
import { describe, it, expect } from "vitest";
import { GTabs } from "~/components/atoms";

describe("GTabs", () => {
  it("supports v-model", async () => {
    const { getByText, emitted, rerender } = render(GTabs, {
      props: {
        modelValue: "manual",
        tabs: [
          {
            value: "manual",
            label: "Manual",
          },
          {
            value: "auto",
            label: "Auto",
          },
        ],
      },
    });
    const manualButton = getByText("Manual");
    const autoButton = getByText("Auto");

    expect(manualButton.classList.contains("text-white")).toEqual(true);
    expect(autoButton.classList.contains("text-white")).toEqual(false);

    await fireEvent.click(autoButton);
    expect(emitted()).toHaveProperty("update:modelValue");
    expect(emitted<[string]>("update:modelValue")[0][0]).toEqual("auto");

    await rerender({ modelValue: "auto" });
    expect(manualButton.classList.contains("text-white")).toEqual(false);
    expect(autoButton.classList.contains("text-white")).toEqual(true);
  });
});
