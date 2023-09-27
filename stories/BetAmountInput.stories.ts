import { ref } from "vue";
import type { Meta, StoryObj } from "@storybook/vue3";
import { default as GBetAmountInput } from "../src/components/molecules/inputs/BetAmountInput.vue";

const meta: Meta<typeof GBetAmountInput> = {
  title: "Components/Gamba/Inputs",
  component: GBetAmountInput,
  argTypes: {
    static: {
      control: "select",
      options: [false, true],
    },
  },
  args: {},
};

export default meta;

type Story = StoryObj<typeof GBetAmountInput>;

export const BetAmount: Story = {
  render: (args) => ({
    components: { GBetAmountInput },
    setup() {
      const modelValue = ref(args.modelValue);
      return { args, modelValue };
    },
    template: `<div style="width: calc(100vw - 40px); max-width: 300px;"><GBetAmountInput v-bind="args" v-model="modelValue" /></div>`,
  }),
  args: {
    modelValue: 12,
  },
};
