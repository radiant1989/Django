import { ref } from "vue";
import type { Meta, StoryObj } from "@storybook/vue3";
import { GInputNumber } from "../src/components/atoms";

const meta: Meta<typeof GInputNumber> = {
  title: "Components/Gamba/Inputs",
  component: GInputNumber,
  argTypes: {
    modelValue: {
      control: "number",
    },
    toFixed: {
      control: {
        type: "number",
        min: 0,
        max: 10,
      },
    },
    static: {
      control: "select",
      options: [false, true],
    },
  },
  args: {},
};

export default meta;

type Story = StoryObj<typeof GInputNumber>;

export const Number: Story = {
  render: (args) => ({
    components: { GInputNumber },
    setup() {
      const modelValue = ref(args.modelValue);
      return { args, modelValue };
    },
    template: `<div style="width: calc(100vw - 40px); max-width: 300px;"><GInputNumber v-bind="args" v-model="modelValue" /></div>`,
  }),
  args: {
    modelValue: 12,
    toFixed: 4,
  },
};
