import { ref } from "vue";
import type { Meta, StoryObj } from "@storybook/vue3";
import TabsWithIcon from "~/components/molecules/tabs/TabsWithIcon.vue";
import { cryptoBitcoinsIcon, eyeOffIcon } from "~/icons";

const tabs = [
  {
    value: 'crypto',
    label: "Crypto",
    icon: cryptoBitcoinsIcon
  },
  {
    value: "credit",
    label: "Credit & Debit Card",
    icon: eyeOffIcon
  },
];

const meta: Meta<typeof TabsWithIcon> = {
  title: "Components/Gamba/Tabs",
  component: TabsWithIcon,
  argTypes: {
    styleType: {
      control: "select",
      options: ["default", "primary"]
    },
    modelValue: {
      control: "select",
      options: tabs.map((tab) => tab.value),
    },
  },
};

export default meta;

type Story = StoryObj<typeof TabsWithIcon>;

export const PrimaryWithIcon: Story = {
  render: (args) => ({
    components: { TabsWithIcon },
    setup() {
      const tab = ref(args.modelValue);
      return { args, tab };
    },
    template: `<div style="width: calc(100vw - 40px); max-width: 500px;"><TabsWithIcon v-bind="args" v-model="tab" /></div>`,
  }),
  args: {
    styleType: "primary",
    modelValue: 'crypto',
    tabs,
  },
};
