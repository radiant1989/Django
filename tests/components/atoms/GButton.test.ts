import { describe, expect, it } from "vitest";
import { render } from "@testing-library/vue";
import { GButton, useButton } from "~/components/atoms";

describe("GButton.vue", () => {
  it("renders default slot", () => {
    const { getByText, unmount } = render(GButton, {
      slots: {
        default: "<div>Bet</div>",
      },
    });
    getByText("Bet");
    unmount();
  });
  it("renders primary button", () => {
    const { getByTestId, unmount } = render(GButton, {
      props: {
        block: true,
        styleType: "primary",
      },
      attrs: {
        'data-testid': 'button'
      },
      slots: {
        default: "Bet",
      },
    });
    const buttonElement = getByTestId("button");
    const { typeClassMap } = useButton();
    expect(buttonElement.className).toEqual(
      expect.stringContaining(typeClassMap["primary"])
    );
    unmount();
  });
  it("renders secondary button", () => {
    const { getByTestId, unmount } = render(GButton, {
      props: {
        block: true,
        styleType: "secondary",
      },
      attrs: {
        'data-testid': 'button'
      },
      slots: {
        default: "Bet",
      },
    });
    const buttonElement = getByTestId("button");
    const { typeClassMap } = useButton();
    expect(buttonElement.className).toEqual(
      expect.stringContaining(typeClassMap["secondary"])
    );
    unmount();
  });
  it("renders block button", () => {
    const { getByTestId, unmount } = render(GButton, {
      props: {
        block: true,
      },
      attrs: {
        'data-testid': 'button'
      },
      slots: {
        default: "Bet",
      },
    });
    const buttonElement = getByTestId("button");

    expect(buttonElement.className).toEqual(expect.stringContaining("block w-full"));
    unmount();
  });
});
