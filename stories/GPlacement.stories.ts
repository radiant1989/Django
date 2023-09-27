import type { Meta, StoryObj } from "@storybook/vue3";
import GPlacement from "../src/components/atoms/GPlacement.vue";

const meta: Meta<typeof GPlacement> = {
  title: "Components/Gamba/ATooltip",
  component: GPlacement,
  argTypes: {
    placement: {
      control: "select",
      options: ["left", "right", "top", "bottom", "topLeft", "topRight", "bottomLeft", "bottomRight"],
    },
    trigger: {
      control: "select",
      options: ["hover", "click"],
    },
    arrow: {
      control: "boolean",
    },
    border: {
      control: "boolean",
    },
    gap: {
      control: "text",
    },
    leftDeviation: {
      control: "text",
    },
    topDeviation: {
      control: "text",
    },
  },
};

export default meta;

type Story = StoryObj<typeof GPlacement>;

export const Default: Story = {
  render: (args) => ({
    components: { GPlacement },
    setup() {
      return { args };
    },
    template: `
    <div class="flex flex-row items-center">
      <div style="height: 1000px; width: 100vw; flex-shrink: 0;"></div>
      <GPlacement style="flex-shrink: 0;" v-bind="args">
        <template #trigger>
            <div
              class="
                h-[40px]
                px-[21px]
                py-[13px]
                bg-ebony-clay-color
                border-2 border-cloud-burst-color
                rounded-lg
                overflow-hidden
                relative
                text-white text-sm
                font-semibold
                flex flex-row
                items-center
                justify-center
              "
            >
            This is a tooltip
          </div>
        </template>
        <template #content>
          <div class="w-[200px] p-4 shadow-popover bg-ebony-clay-color text-slate-color ">
            <p>Any content can be here, and This is popover which will be used in our frontend.</p>
            <p class="mb-3">It opens to scale continously, it is composit headless ui popover, but applied style customization</p>
            <p>Any content can be here, and This is popover which will be used in our frontend.</p>
          </div>
        </template>
      </GPlacement>
      <div style="height: 1000px; width: 100vw; flex-shrink: 0;"></div>
    </div>`,
  }),
  args: {
    placement: "top",
    trigger: "click",
    arrow: false,
    border: false,
    gap: "default",
    modelValue: false,
    leftDeviation: "0",
    topDeviation: "0",
  },
};
