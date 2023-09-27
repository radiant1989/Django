import type { Meta, StoryObj } from "@storybook/vue3";
import GTooltip from "../src/components/atoms/GTooltip.vue";

const meta: Meta<typeof GTooltip> = {
  title: "Components/Gamba/Tooltip",
  component: GTooltip,
  argTypes: {
    placement: {
      control: "select",
      options: ["left", "right", "top", "bottom"],
    },
  },
};

export default meta;

type Story = StoryObj<typeof GTooltip>;

export const Default: Story = {
  render: (args) => ({
    components: { GTooltip },
    setup() {
      return { args };
    },
    template: `
    <div class="h-[400px] flex flex-row items-center justify-center">
      <GTooltip v-bind="args">
        <template #trigger
          ><div
            class="
              text-sm
              font-medium
              leading-[17px]
              font-proximanova
              text-steel-color
              p-2
            "
          >
            Hover me
          </div></template
        >
        <template #panel>
          <div
            class="
              bg-ebony-clay-color
              rounded-lg
              overflow-hidden
              text-white text-sm
              font-semibold
            "
          >
            This is a tooltip
          </div>
        </template>
      </GTooltip>
    </div>`,
  }),
  args: {
    border: true,
    arrow: true,
    width: "100px",
  },
};
