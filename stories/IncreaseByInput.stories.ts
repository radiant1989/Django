import { ref } from "vue";
import type { Meta, StoryObj } from "@storybook/vue3";
import { default as GIncreaseByInput } from "../src/components/molecules/inputs/IncreaseByInput.vue";

const meta: Meta<typeof GIncreaseByInput> = {
  title: "Components/Gamba/Inputs",
  component: GIncreaseByInput,
  argTypes: {
    static: {
      control: "select",
      options: [false, true],
    },
  },
  args: {},
};

export default meta;

type Story = StoryObj<typeof GIncreaseByInput>;

export const IncreaseBy: Story = {
  render: (args) => ({
    components: { GIncreaseByInput },
    setup() {
      const modelValue = ref(args.modelValue);
      return { args, modelValue };
    },
    template: `<div style="width: calc(100vw - 40px); max-width: 300px;"><GIncreaseByInput v-bind="args" v-model="modelValue" /></div>`,
  }),
  args: {
    modelValue: 12,
  },
};
