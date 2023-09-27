import type { Meta, StoryObj } from "@storybook/vue3";
import GCarousel from "./examples/GCarousel.vue";

const meta: Meta<typeof GCarousel> = {
  title: "Components/Gamba/Carousel",
  component: GCarousel,
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof GCarousel>;

export const Default: Story = {
  render: (args) => ({
    components: { GCarousel },
    setup() {
      return { args };
    },
    template: `
    <div class="text-white p-5" style="max-width: 1350px;">
      <GCarousel v-bind="args" />
    </div>`,
  }),
  args: {},
};
