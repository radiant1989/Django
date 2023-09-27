import { ref } from "vue";
import type { Meta, StoryObj } from "@storybook/vue3";
import RollInput from "../src/components/molecules/inputs/RollInput.vue";

const meta: Meta<typeof RollInput> = {
  title: "Components/Gamba/Inputs",
  component: RollInput,
  argTypes: {
    modelValue: {
      control: "number",
    },
    static: {
      control: "select",
      options: [false, true],
    },
  },
  args: {
    modelValue: 12,
  },
};

export default meta;

type Story = StoryObj<typeof RollInput>;

export const Roll: Story = {
  render: (args) => ({
    components: { RollInput },
    setup() {
      const modelValue = ref(args.modelValue);
      return { args, modelValue };
    },
    template: `<div style="width: calc(100vw - 40px); max-width: 250px;"><RollInput v-bind="args" v-model="modelValue" /></div>`,
  }),
  args: {
    modelValue: 0.2,
  },
};
