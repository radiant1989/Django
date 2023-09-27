import MultiplierInput from "../src/components/molecules/inputs/MultiplierInput.vue";

export default {
  title: "Components/Gamba/Inputs",
  component: MultiplierInput,
  argTypes: {
    static: {
      control: "select",
      options: [true, false],
    },
  },
};

const Template = (args) => ({
  components: { MultiplierInput },
  setup: () => ({ args }),
  template: `
    <div style="width: calc(100vw - 40px); max-width: 250px;">
        <MultiplierInput v-bind="args"/>
    </div>`,
});

export const Multiplier = Template.bind({});
Multiplier.args = {
  modelValue: 2.0,
};
