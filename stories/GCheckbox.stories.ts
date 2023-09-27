import { ref } from "vue";
import type { Meta, StoryObj } from "@storybook/vue3";

import GCheckbox from "../src/components/atoms/GCheckbox.vue";

const meta: Meta<typeof GCheckbox> = {
  title: "Components/Gamba/Checkboxes/Default",
  component: GCheckbox,
  argTypes: {
    size: {
      type: "string",
    },
    id: {
      type: "string",
    },
  },
  args: {},
};

export default meta;

type Story = StoryObj<typeof GCheckbox>;

export const GCheckboxs: Story = {
  render: (args) => ({
    components: { GCheckbox },
    setup() {
      const checked = ref<boolean>(false);
      return { args, checked };
    },
    template: `<div class="p-5"><GCheckbox v-model="checked" v-bind="args"
    ><slot
      ><span
        class="
          text-[12px]
          leading-[14.62px]
          font-proximanova font-medium
          inline-block
          align-middle
          transition-all
          duration-[0.3s]
          ease-[ease] ml-2
        "
        :class="checked ? 'text-[#b9b8c3]' : 'text-steel-color '"
        >I agree with user agreement, and confirm that I am at least 18
        years old!</span
      ></slot
    ></GCheckbox
  ></div>`,
  }),
  args: {
    size: "16px",
    id: "defaultId",
  },
};
