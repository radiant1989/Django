import { ref } from "vue";
import type { Meta, StoryObj } from "@storybook/vue3";
import { GTabs } from "../src/components/atoms";

const tabs = [
  {
    value: "deposit",
    label: "Deposit",
  },
  {
    value: "withdraw",
    label: "Withdraw",
  },
  {
    value: "vault",
    label: "Vault",
  },
  {
    value: "tip",
    label: "Tip",
  },
];

const meta: Meta<typeof GTabs> = {
  title: "Components/Gamba/Tabs",
  component: GTabs,
  argTypes: {
    styleType: {
      control: "select",
      options: ["default", "primary"],
    },
    modelValue: {
      control: "select",
      options: tabs.map((tab) => tab.value),
    },
    disabled: {
      control: "select",
      options: [true, false],
    },
  },
};

export default meta;

type Story = StoryObj<typeof GTabs>;

export const Default: Story = {
  render: (args) => ({
    components: { GTabs },
    setup() {
      const tab = ref(args.modelValue);
      return { args, tab };
    },
    template: `<div style="width: calc(100vw - 40px); max-width: 500px;"><GTabs v-bind="args" v-model="tab" /></div>`,
  }),
  args: {
    styleType: "default",
    modelValue: "deposit",
    tabs,
  },
};

export const Primary: Story = {
  render: (args) => ({
    components: { GTabs },
    setup() {
      const tab = ref(args.modelValue);
      return { args, tab };
    },
    template: `<div style="width: calc(100vw - 40px); max-width: 500px;"><GTabs v-bind="args" style-type="primary" v-model="tab" /></div>`,
  }),
  args: {
    styleType: "primary",
    modelValue: "deposit",
    tabs,
  },
};
