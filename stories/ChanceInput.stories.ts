import ChanceInput from "../src/components/molecules/inputs/ChanceInput.vue";

export default {
  title: "Components/Gamba/Inputs",
  component: ChanceInput,
  argTypes: {
    static: {
      control: "select",
      options: [true, false],
    },
  },
};

const Template = (args) => ({
  components: { ChanceInput },
  setup: () => ({ args }),
  template: `
    <div style="width: calc(100vw - 40px); max-width: 250px;">
        <ChanceInput v-bind="args"/>
    </div>`,
});

export const Chance = Template.bind({});
Chance.args = {
  modelValue: 49.5,
};
