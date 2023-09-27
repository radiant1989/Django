import { ref } from "vue";
import type { Meta, StoryObj } from "@storybook/vue3";
import { GSwitch } from "../src/components/atoms";

const meta: Meta<typeof GSwitch> = {
  title: "Components/Gamba/Switch",
  component: GSwitch
};

export default meta;

type Story = StoryObj<typeof GSwitch>;

export const Default: Story = {
  render: (args) => ({
    components: { GSwitch },
    setup() {
      const value = ref(args.checked)
      return { args, value };
    },
    template: `<div style="width: calc(100vw - 40px); max-width: 100px;" class="m-4 flex flex-row items-center justify-center">
      <GSwitch v-model="value" class="w-full" />
    </div>`,
  }),
  args: {
    checked: true
  },
};
