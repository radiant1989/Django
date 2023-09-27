import type { Meta, StoryObj } from "@storybook/vue3";
import { default as GBitcoinInput } from "../src/components/molecules/inputs/BitcoinInput.vue";

const meta: Meta<typeof GBitcoinInput> = {
  title: "Components/Gamba/Inputs",
  component: GBitcoinInput,
  argTypes: {
    static: {
      control: "select",
      options: [false, true],
    },
  },
  args: {},
};

export default meta;

type Story = StoryObj<typeof GBitcoinInput>;

export const BitcoinInput: Story = {
  render: (args) => ({
    components: { GBitcoinInput },
    setup() {
      return { args };
    },
    template: `<div style="width: calc(100vw - 40px); max-width: 300px;"><GBitcoinInput v-bind="args" /></div>`,
  }),
  args: {
    static: true,
    modelValue: 0,
  },
};
