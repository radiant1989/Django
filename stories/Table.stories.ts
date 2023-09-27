import type { Meta, StoryObj } from "@storybook/vue3";
import GTable from "./examples/GTable.vue";

const meta: Meta<typeof GTable> = {
  title: "Components/Gamba/Tables",
  component: GTable
};

export default meta;

type Story = StoryObj<typeof GTable>;

export const Default: Story = {
  render: (args) => ({
    components: { GTable },
    setup() {
      return { args };
    },
    template: `<div class="bg-ebony-clay-color m-5 pt-5 rounded-lg" style="width: calc(100vw - 40px); max-width: 1350px;"><GTable v-bind="args" /></div>`,
  }),
  args: {},
};
