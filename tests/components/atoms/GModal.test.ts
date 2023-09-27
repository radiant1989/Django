import { findByTestId, findByText, fireEvent, getByTestId, render, screen, waitFor } from "@testing-library/vue";
import { describe, it, expect } from "vitest";
import { GModal } from "~/components/atoms";

describe("GModal", () => {
  it("renders slot", async () => {
    const { getByText, unmount } = render(GModal, {
      props: {
        modelValue: true,
      },
      slots: {
        default: 'ModalContent'
      }
    });
    getByText("ModalContent");
    unmount();
  });
  it("supports v-model", async () => {
    const { getByText, getByTestId, unmount, rerender, emitted } = render(GModal, {
      props: {
        modelValue: true,
      },
      attrs: {
        'data-testid': 'modal'
      },
      slots: {
        default: 'ModalContent'
      }
    });
    getByTestId('modal');
    
    const closeButton = getByText('close modal').parentElement!;
    
    await fireEvent.click(closeButton);
    expect(emitted()).toHaveProperty('update:modelValue');
    expect(emitted<[string]>("update:modelValue")[0][0]).toBe(false);

    unmount();
  });
  // TODO: animation tests
});
