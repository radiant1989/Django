import { ref } from "vue";
import type { Meta, StoryObj } from "@storybook/vue3";
import { GButton } from "../src/components/atoms";

const meta: Meta<typeof GButton> = {
  title: "Components/Gamba/Buttons",
  component: GButton,
  argTypes: {
    styleType: {
      control: "select",
      options: ["primary", "secondary", "primary-sm", "secondary-sm"],
    },
    disabled: {
      control: "select",
      options: [true, false],
    },
  },
  args: {
    block: true,
  },
};

export default meta;

type Story = StoryObj<typeof GButton>;

export const Primary: Story = {
  render: (args) => ({
    components: { GButton },
    setup() {
      return { args };
    },
    template: `<div style="width: calc(100vw - 40px); max-width: 250px;"><GButton v-bind="args">Button</GButton></div>`,
  }),
  args: {
    styleType: "primary",
  },
};

export const secondary: Story = {
  ...Primary,
  args: {
    styleType: "secondary",
  },
};

export const PrimarySmall: Story = {
  ...Primary,
  render: (args) => ({
    components: { GButton },
    setup() {
      return { args };
    },
    template: `<div style="width: calc(100vw - 40px); max-width: 70px;"><GButton v-bind="args">Button</GButton></div>`,
  }),
  args: {
    styleType: "primary-sm",
  },
};

export const secondarySmall: Story = {
  ...PrimarySmall,
  args: {
    styleType: "secondary-sm",
  },
};

export const Dynamic: Story = {
  render: (args) => ({
    components: { GButton },
    setup() {
      const styleType = ref(args.styleType);
      const toggleStyle = () => {
        styleType.value =
          styleType.value === "primary" ? "secondary" : "primary";
      };
      return { args, styleType, toggleStyle };
    },
    template: `<div style="width: calc(100vw - 40px); max-width: 250px;"><GButton v-bind="args" :style-type="styleType" @click="toggleStyle">{{styleType}}</GButton></div>`,
  }),
  args: {
    styleType: "primary",
  },
};
