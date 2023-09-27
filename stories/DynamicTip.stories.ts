import DynamicTip from "../src/components/molecules/games/dice/DynamicTip.vue";

export default {
  title: "Components/Gamba/DynamicTip",
  component: DynamicTip,
  argTypes: {
    randomValue: {
      control: "select",
      options: [10.0, 20.23, 30.45, 40.67, 50.45, 60.0, 70.0, 80.0, 90.0, 98.0],
      default: 10,
    },
  },
};

const Template = (args) => ({
  components: { DynamicTip },
  setup: () => ({ args }),
  template: `
    <div style="width: calc(100vw - 40px); max-width: 1000px; margin-top:20px">
        <DynamicTip v-bind="args"/>
    </div>`,
});

export const Dynamic = Template.bind({});
Dynamic.args = {};
