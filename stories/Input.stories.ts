import { GInput } from "../src/components/atoms";

export default {
  title: "Components/Gamba/Inputs",
  component: GInput,
  argTypes: {
    autolostFocus: {
      control: "select",
      options: [500, 1000, 2000, 3000],
    },
    static: {
      control: "select",
      options: [true, false],
    },
  },
};

const Template = (args) => ({
  components: { GInput },
  setup: () => ({ args }),
  template: `
    <div style="width: calc(100vw - 40px); max-width: 250px;">
        <GInput v-bind="args"/>
    </div>`,
});

export const Default = Template.bind({});
Default.args = {};
