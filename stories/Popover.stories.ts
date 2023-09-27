import { ref } from "vue";
import type { Meta, StoryObj } from "@storybook/vue3";
import { GPopover, GButton } from "../src/components/atoms";

const meta: Meta<typeof GPopover> = {
  title: "Components/Gamba/Popover",
  component: GPopover,
  argTypes: {
    placement: {
      control: "select",
      options: ["top", "left", "right", "bottom", "topLeft", "topRight", "bottomLeft", "bottomRight"],
    },
  },
};

export default meta;

type Story = StoryObj<typeof GPopover>;

export const Default: Story = {
  render: (args) => ({
    components: { GPopover, GButton },
    setup() {
      return { args };
    },
    template: `<div>
    <div class="flex">
      <div class="shrink-0" style="height: 200vh; width: 100px;"></div>
      <div class="shrink-0">
        <GPopover v-bind="args">
          <template #trigger>
            <GButton>Open Popover</GButton>
          </template>
          <template #panel="{open, close}">
            <div class="p-4">
              <p>Any content can be here, and This is popover which will be used in our frontend.</p>
              <p class="mb-3">It opens to scale continously, it is composit headless ui popover, but applied style customization</p>
              <GButton @click="close">Got it</GButton>
            </div>
          </template>
        </GPopover>
      </div>
      <div class="shrink-0 w-full"></div>
      <div class="shrink-0">
        <GPopover v-bind="args">
          <template #trigger>
            <GButton>Open Popover</GButton>
          </template>
          <template #panel="{open, close}">
            <div class="p-4">
              <p>Any content can be here, and This is popover which will be used in our frontend.</p>
              <p class="mb-3">It opens to scale continously, it is composit headless ui popover, but applied style customization</p>
              <GButton @click="close">Got it</GButton>
            </div>
          </template>
        </GPopover>
      </div>
      <div class="shrink-0" style="height: 200vh; width: 100px;"></div>
    </div>
    <div class="flex">
      <div class="shrink-0" style="height: 200vh; width: 100px;"></div>
      <div class="shrink-0">
        <GPopover v-bind="args">
          <template #trigger>
            <GButton>Open Popover</GButton>
          </template>
          <template #panel="{open, close}">
            <div class="p-4">
              <p>Any content can be here, and This is popover which will be used in our frontend.</p>
              <p class="mb-3">It opens to scale continously, it is composit headless ui popover, but applied style customization</p>
              <GButton @click="close">Got it</GButton>
            </div>
          </template>
        </GPopover>
      </div>
      <div class="shrink-0 w-full"></div>
      <div class="shrink-0">
        <GPopover v-bind="args">
          <template #trigger>
            <GButton>Open Popover</GButton>
          </template>
          <template #panel="{open, close}">
            <div class="p-4">
              <p>Any content can be here, and This is popover which will be used in our frontend.</p>
              <p class="mb-3">It opens to scale continously, it is composit headless ui popover, but applied style customization</p>
              <GButton @click="close">Got it</GButton>
            </div>
          </template>
        </GPopover>
      </div>
      <div class="shrink-0" style="height: 200vh; width: 100px;"></div>
    </div>
    </div>`,
  }),
  args: {
    arrow: true,
    block: false,
    width: "320px",
    modelValue: true
  },
};
